import { useState } from 'react'
import { Button } from '../components/Button'
import { productIcons } from '../assets/icons'
import { Icon } from '../components/Icon'
import './InventoryPage.css'

// ─── 1. DATA TYPES ───────────────────────────────────────────────
// A "type" describes the shape of one product object.
type Product = {
  sku: string
  barcode: string
  name: string
  subtitle: string
  category: string
  price: number
  cost: number
  stock: number
  icon: string // image path from productIcons
}

type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

// ─── 2. SAMPLE DATA ──────────────────────────────────────────────
// Later this would come from a backend/API. For now it is hard-coded.
const initialProducts: Product[] = [
  { sku: 'SKU-8021', barcode: '084920194812', name: 'Ethiopian Yirgacheffe (250g)', subtitle: 'Single Origin, Light Roast', category: 'Retail Coffee', price: 18.5, cost: 8.2, stock: 42, icon: productIcons.ethiopian },
  { sku: 'SKU-1044', barcode: '084920194833', name: 'Matcha Ceremonial Grade', subtitle: 'Uji Kyoto Organic Tin', category: 'Hot Beverages', price: 24, cost: 11.5, stock: 3, icon: productIcons.matcha },
  { sku: 'SKU-3199', barcode: '084920194888', name: 'Almond Croissant', subtitle: 'Daily Fresh Baked', category: 'Bakery & Sweets', price: 4.75, cost: 1.8, stock: 0, icon: productIcons.almondCroissant },
  { sku: 'SKU-2051', barcode: '084920194901', name: 'Cold Brew Concentrate (1L)', subtitle: 'House Blend 1:4 Ratio', category: 'Cold Drinks', price: 16, cost: 6.5, stock: 4, icon: productIcons.coldBrew },
  { sku: 'SKU-7712', barcode: '084920194990', name: 'Insulated Tumbler 12oz', subtitle: 'Matte Sage Green', category: 'Merchandise', price: 28, cost: 12, stock: 19, icon: productIcons.tumbler },
  { sku: 'SKU-1088', barcode: '084920194602', name: 'Oat Flat White (12oz)', subtitle: 'Barista Edition Barista Milk', category: 'Hot Beverages', price: 5.25, cost: 1.4, stock: 88, icon: productIcons.oatFlatWhite },
]

// Catalog-wide numbers (the real catalog has 142 items; we only show page 1).
const TOTAL_CATALOG_SKUS = 142
const LOW_STOCK_THRESHOLD = 5

// ─── 3. HELPER FUNCTIONS ─────────────────────────────────────────
// "Pure" functions: same input → same output. Easy to test and reuse.
function getStatus(stock: number): StockStatus {
  if (stock === 0) return 'out-of-stock'
  if (stock <= LOW_STOCK_THRESHOLD) return 'low-stock'
  return 'in-stock'
}

const statusLabels: Record<StockStatus, string> = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
}

const money = (n: number) => `$${n.toFixed(2)}`

function downloadCsv(products: Product[]) {
  const header = ['SKU', 'Barcode', 'Name', 'Category', 'Retail Price', 'Unit Cost', 'Stock', 'Status']
  const rows = products.map((p) => [
    p.sku, p.barcode, p.name, p.category, p.price.toFixed(2), p.cost.toFixed(2), p.stock, statusLabels[getStatus(p.stock)],
  ])
  // Wrap every value in quotes so commas inside names don't break columns.
  const csv = [header, ...rows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'inventory.csv'
  link.click()
  URL.revokeObjectURL(url)
}

// ─── 4. THE PAGE COMPONENT ───────────────────────────────────────
export function InventoryPage() {
  // STATE: values that change while the user interacts with the page.
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [statusFilter, setStatusFilter] = useState<'all' | StockStatus | 'needs-attention'>('all')
  const [showAlert, setShowAlert] = useState(true)

  // DERIVED VALUES: calculated from state on every render (no extra state needed).
  const categories = [...new Set(products.map((p) => p.category))]
  const lowStockCount = products.filter((p) => getStatus(p.stock) !== 'in-stock').length
  const soldOutCount = products.filter((p) => p.stock === 0).length

  const visibleProducts = products.filter((p) => {
    const term = search.trim().toLowerCase()
    const matchesSearch =
      term === '' ||
      p.name.toLowerCase().includes(term) ||
      p.sku.toLowerCase().includes(term) ||
      p.barcode.includes(term)
    const matchesCategory = category === 'all' || p.category === category
    const status = getStatus(p.stock)
    const matchesStatus =
      statusFilter === 'all' ||
      status === statusFilter ||
      (statusFilter === 'needs-attention' && status !== 'in-stock')
    return matchesSearch && matchesCategory && matchesStatus
  })

  // EVENT HANDLER: never change state directly — build a NEW array instead.
  function adjustStock(sku: string, amount: number) {
    setProducts((current) =>
      current.map((p) =>
        p.sku === sku ? { ...p, stock: Math.max(0, p.stock + amount) } : p,
      ),
    )
  }

  return (
    <div className="inventory-page">
      {/* Alert banner — only rendered while showAlert is true */}
      {showAlert && lowStockCount > 0 && (
        <div className="stock-alert" role="alert">
          <Icon name="alert" size={17} />
          <p>
            <strong>Immediate Stock Attention:</strong> {lowStockCount} catalog items have
            depleted below critical replenishment thresholds.
          </p>
          <button className="link-button" type="button" onClick={() => setStatusFilter('needs-attention')}>
            Filter Low Stock Only
          </button>
          <button className="icon-button" type="button" aria-label="Dismiss alert" onClick={() => setShowAlert(false)}>
            <Icon name="close" size={16} />
          </button>
        </div>
      )}

      <main className="dashboard inventory-dashboard">
        {/* ── Stat cards ── */}
        <section className="inventory-stats" aria-label="Inventory totals">
          <article className="inv-stat">
            <div>
              <small>TOTAL CATALOG SKUS</small>
              <strong className="inv-stat-value">{TOTAL_CATALOG_SKUS}</strong>
              <span className="inv-stat-note positive"><Icon name="arrowUp" size={12} /> +8 added this month</span>
            </div>
            <span className="inv-stat-icon"><Icon name="archive" size={24} /></span>
          </article>

          <article className="inv-stat">
            <div>
              <small>ACTIVE INVENTORY VALUATION</small>
              <strong className="inv-stat-value">$4,280<span className="cents">.50</span></strong>
              <span className="inv-stat-note"><Icon name="receipt" size={12} /> Cost basis: $2,190.20 (49% margin)</span>
            </div>
            <span className="inv-stat-icon"><Icon name="dollar" size={24} /></span>
          </article>

          <article className="inv-stat">
            <div>
              <small>LOW STOCK TRIGGERED</small>
              <strong className="inv-stat-value danger">{lowStockCount}</strong>
              <span className="inv-stat-note danger">
                <b>!</b> {soldOutCount} SKU completely sold out
              </span>
            </div>
            <span className="inv-stat-icon inv-stat-icon--danger"><Icon name="alert" size={24} /></span>
          </article>
        </section>

        {/* ── Toolbar: search, filters, actions ── */}
        <section className="inventory-toolbar" aria-label="Filter products">
          <label className="search-field">
            <Icon name="search" size={18} />
            <input
              type="search"
              placeholder="Search SKU, Barcode, or Title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            aria-label="Inventory status"
          >
            <option value="all">All Inventory Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="needs-attention">Low + Out of Stock</option>
          </select>

          <div className="toolbar-actions">
            <Button className="toolbar-button" onClick={() => downloadCsv(visibleProducts)}>
              <Icon name="download" size={16} /> Export CSV
            </Button>
            <Button className="toolbar-button" variant="primary">
              <Icon name="plus" size={18} /> Add New Product
            </Button>
          </div>
        </section>

        {/* ── Product table ── */}
        <section className="inventory-table-card">
          <div className="table-scroll">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product / Item Name</th>
                  <th>SKU / Barcode</th>
                  <th>Category</th>
                  <th className="num">Retail Price</th>
                  <th className="num">Unit Cost</th>
                  <th className="center">Stock on Hand</th>
                  <th>Status</th>
                  <th className="center">Stock Adjustment</th>
                  <th className="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((p) => {
                  const status = getStatus(p.stock)
                  return (
                    <tr key={p.sku}>
                      <td>
                        <div className="product-cell">
                          <img className="product-icon" src={p.icon} alt="" />
                          <div>
                            <strong>{p.name}</strong>
                            <small>{p.subtitle}</small>
                          </div>
                        </div>
                      </td>
                      <td className="mono">
                        {p.sku}
                        <small>{p.barcode}</small>
                      </td>
                      <td><span className="category-tag">{p.category}</span></td>
                      <td className="num mono price">{money(p.price)}</td>
                      <td className="num mono cost">{money(p.cost)}</td>
                      <td className={`center stock-count ${status !== 'in-stock' ? 'danger' : ''}`}>{p.stock}</td>
                      <td><span className={`status-pill status-pill--${status}`}>{statusLabels[status]}</span></td>
                      <td className="center">
                        <div className="stepper">
                          <button type="button" aria-label={`Decrease ${p.name} stock`} onClick={() => adjustStock(p.sku, -1)} disabled={p.stock === 0}>-</button>
                          <button type="button" aria-label={`Increase ${p.name} stock`} onClick={() => adjustStock(p.sku, 1)}>+</button>
                        </div>
                      </td>
                      <td className="center">
                        <button className="icon-button" type="button" aria-label={`Edit ${p.name}`}>
                          <Icon name="pencil" size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })}

                {visibleProducts.length === 0 && (
                  <tr>
                    <td colSpan={9} className="empty-row">No products match your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="table-footer">
            <span>Showing {visibleProducts.length} of {TOTAL_CATALOG_SKUS} products</span>
            <nav className="pagination" aria-label="Pagination">
              <button type="button">Previous</button>
              <button type="button" className="is-current" aria-current="page">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">Next</button>
            </nav>
          </footer>
        </section>
      </main>
    </div>
  )
}
