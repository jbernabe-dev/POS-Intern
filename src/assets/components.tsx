import logoImage from './pos-logo.png'
import profileImage from './profile.png'
import type { Product } from './products'

export type { Product } from './products'

export type CartLine = {
  product: Product
  quantity: number
}

export type NavItem =
  | 'Register'
  | 'Recent Orders'
  | 'Products / Inventory'

export type PaymentMethod = 'Cash' | 'Card' | 'QR'

const CATEGORIES = [
  'All Items',
  'Beverages',
  'Bakery',
  'Snacks',
  'Hot Food',
  'Combos',
]

const ICON_PATHS = {
  hold: 'M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z',
  percent:
    'M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4 18.58 18.59 4l1.41 1.41L5.42 20zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  clear:
    'M15 16h4v2h-4zm0-8h7v2h-7zm0 4h6v2h-6zM3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3v10zm2-8h6v8H5v-8zm5-6H6L5 5H2v2h12V5h-3z',
  customer:
    'M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H3zm17-3v-3h3v-2h-3V7h-2v3h-3v2h3v3z',
  trash:
    'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z',
  cash: 'M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H3V6h14v8zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm13 0v11c0 1.1-.9 2-2 2H4v-2h17V7h2z',
  card: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z',
  qr: 'M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z',
  receipt:
    'M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5zM19 19c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11v14zM9 7h6v2H9zm7 0h2v2h-2zm-7 3h6v2H9zm7 0h2v2h-2z',
  refund:
    'M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h14v14zm-3-6h-4v3l-5-5 5-5v3h4v4z',
  search:
    'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  calendar:
    'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z',
  caretDown: 'M7 10l5 5 5-5z',
  chevronLeft: 'M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  chevronRight: 'M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  hourglass:
    'M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5-4-4V4h8v3.5l-4 4z',
  cardOff:
    'M6.83 4H20c1.11 0 2 .89 2 2v12c0 .34-.08.66-.23.94L20 17.17V12h-5.17l-4-4H20V6H8.83l-2-2zm13.66 19.31L17.17 20H4c-1.11 0-2-.89-2-2l.01-12c0-.34.08-.66.22-.94L.69 3.51 2.1 2.1l19.8 19.8-1.41 1.41zM4 6.83V8h1.17L4 6.83zM15.17 18l-6-6H4v6h11.17z',
  print:
    'M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 14H8v-4h8v4zm2-4v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z',
  mail: 'M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z',
  lines: 'M3 5h18v2H3zm0 4h18v2H3zm0 4h18v2H3zm0 4h18v2H3z',
  checkCircle:
    'M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
}

export type IconName = keyof typeof ICON_PATHS

export function ContactlessIcon({ className = 'charge-icon' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8.5 9.5a4.5 4.5 0 0 1 0 5M11.5 8a7 7 0 0 1 0 8M14.5 6.5a9.5 9.5 0 0 1 0 11" />
    </svg>
  )
}

export function Icon({
  name,
  className = 'button-icon',
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

const PAYMENT_ICONS: Record<PaymentMethod, IconName> = {
  Cash: 'cash',
  Card: 'card',
  QR: 'qr',
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

type HeaderProps = {
  activeNav: NavItem
  isShiftActive: boolean
  onNavigate: (item: NavItem) => void
  onShiftToggle: () => void
}

export function Header({
  activeNav,
  isShiftActive,
  onNavigate,
  onShiftToggle,
}: HeaderProps) {
  const navItems: NavItem[] = [
    'Register',
    'Recent Orders',
    'Products / Inventory',
  ]

  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="SwiftPOS home">
        <img className="brand-logo" src={logoImage} alt="" />
        <span>SwiftPOS</span>
      </a>

      <div className="terminal-status">
        <span className="status-chip term-chip">
          <svg
            aria-hidden="true"
            className="term-icon"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H4V8h16v10zm-2-1h-6v-2h6v2zM7.5 17l-1.41-1.41L8.67 13l-2.59-2.59L7.5 9l4 4-4 4z" />
          </svg>
          Term #01
        </span>
        <span
          className={`status-chip shift-chip${isShiftActive ? ' is-active' : ''}`}
        >
          <span className="shift-indicator" aria-hidden="true" />
          Shift {isShiftActive ? 'Active' : 'Ended'}
        </span>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            className={activeNav === item ? 'nav-button is-current' : 'nav-button'}
            key={item}
            onClick={() => onNavigate(item)}
            type="button"
          >
            {item === 'Register' ? 'Register / New Sale' : item}
          </button>
        ))}
        <button className="nav-button" onClick={onShiftToggle} type="button">
          {isShiftActive ? 'Shift End' : 'Start Shift'}
        </button>
      </nav>

      <div className="cashier">
        <div className="cashier-copy">
          <strong>Alex M.</strong>
          <span>Cashier #402</span>
        </div>
        <img className="profile-image" src={profileImage} alt="Cashier profile" />
      </div>
    </header>
  )
}

type ProductCatalogProps = {
  category: string
  products: Product[]
  search: string
  onAdd: (productId: string) => void
  onCategoryChange: (category: string) => void
  onSearchChange: (value: string) => void
}

export function ProductCatalog({
  category,
  products,
  search,
  onAdd,
  onCategoryChange,
  onSearchChange,
}: ProductCatalogProps) {
  return (
    <section className="catalog" aria-label="Product catalog">
      <label className="search-field">
        <span className="visually-hidden">Search items</span>
        <input
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Scan barcode or search items (e.g. Espresso, 1002)..."
          type="search"
          value={search}
        />
        <button className="scan-button" onClick={() => onSearchChange('')} type="button">
          <svg
            aria-hidden="true"
            className="button-icon"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 5h3.5v2H5v10h1.5v2H3zM21 5h-3.5v2H19v10h-1.5v2H21z" />
            <rect height="10" width="1.5" x="8" y="7" />
            <rect height="10" width="1" x="10.5" y="7" />
            <rect height="10" width="2" x="12.5" y="7" />
            <rect height="10" width="1" x="15.5" y="7" />
          </svg>
          SKU Scan
        </button>
        <button aria-label="Open keypad" className="keypad-button" type="button">
          <svg
            aria-hidden="true"
            className="button-icon"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </label>

      <div className="category-list" aria-label="Product categories">
        {CATEGORIES.map((item) => (
          <button
            aria-pressed={category === item}
            className={`category-button${category === item ? ' is-selected' : ''}`}
            key={item}
            onClick={() => onCategoryChange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} onAdd={onAdd} product={product} />
        ))}
        {products.length === 0 && (
          <p className="empty-catalog">No items match your search.</p>
        )}
      </div>
    </section>
  )
}

type ProductCardProps = {
  product: Product
  onAdd: (productId: string) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <span className="stock-count">{product.stock} in stock</span>
      </div>
      <h2>{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <strong>{formatCurrency(product.price)}</strong>
        <button
          className="add-button"
          onClick={() => onAdd(product.id)}
          type="button"
        >
          + Add
        </button>
      </div>
    </article>
  )
}

type OrderPanelProps = {
  cart: CartLine[]
  hasCustomer: boolean
  hasDiscount: boolean
  isHeld: boolean
  isShiftActive: boolean
  message: string
  paymentMethod: PaymentMethod
  onCharge: (total: number) => void
  onClear: () => void
  onCustomerToggle: () => void
  onDiscountToggle: () => void
  onHoldToggle: () => void
  onPaymentChange: (method: PaymentMethod) => void
  onQuantityChange: (productId: string, change: number) => void
}

export function OrderPanel({
  cart,
  hasCustomer,
  hasDiscount,
  isHeld,
  isShiftActive,
  message,
  paymentMethod,
  onCharge,
  onClear,
  onCustomerToggle,
  onDiscountToggle,
  onHoldToggle,
  onPaymentChange,
  onQuantityChange,
}: OrderPanelProps) {
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )
  const discount = hasDiscount ? subtotal * 0.1 : 0
  const taxableAmount = subtotal - discount
  const tax = taxableAmount * 0.08
  const total = taxableAmount + tax
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <aside className="order-panel" aria-label="Current order">
      <div className="order-heading">
        <div>
          <div className="order-title">
            <h1>Order #1042</h1>
            <span className={`order-status${isHeld ? ' is-held' : ''}`}>
              {isHeld ? 'On Hold' : 'Dine In'}
            </span>
          </div>
          <p>Cashier: Alex M. • 10:48 AM</p>
        </div>
        <button
          aria-pressed={hasCustomer}
          className={`customer-button${hasCustomer ? ' is-assigned' : ''}`}
          onClick={onCustomerToggle}
          type="button"
        >
          <Icon name="customer" />
          {hasCustomer ? 'Customer Added' : 'Customer'}
        </button>
      </div>

      <div className="order-toolbar">
        <button
          aria-pressed={isHeld}
          className={`order-action${isHeld ? ' is-toggled' : ''}`}
          onClick={onHoldToggle}
          type="button"
        >
          <Icon name="hold" />
          {isHeld ? 'Resume' : 'Hold'}
        </button>
        <button
          aria-pressed={hasDiscount}
          className={`order-action${hasDiscount ? ' is-toggled' : ''}`}
          onClick={onDiscountToggle}
          type="button"
        >
          <Icon name="percent" />
          {hasDiscount ? 'Discount 10%' : 'Discount'}
        </button>
        <button className="order-action clear-action" onClick={onClear} type="button">
          <Icon name="clear" />
          Clear
        </button>
      </div>

      <div className="order-items">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.product.id}
            onQuantityChange={onQuantityChange}
          />
        ))}
        {cart.length === 0 && (
          <p className="empty-order">No items in this order yet.</p>
        )}
      </div>

      <div className="order-bottom">
        <OrderSummary
          discount={discount}
          itemCount={itemCount}
          subtotal={subtotal}
          tax={tax}
          total={total}
        />
        <PaymentMethods
          onChange={onPaymentChange}
          selectedMethod={paymentMethod}
        />
        <ChargeButton
          disabled={cart.length === 0 || !isShiftActive || isHeld}
          onCharge={() => onCharge(total)}
          total={total}
        />
        {message && <p className="order-message" role="status">{message}</p>}
        {!isShiftActive && (
          <p className="order-message" role="status">
            Start the shift to take payments.
          </p>
        )}
        {isHeld && (
          <p className="order-message" role="status">
            Resume this order before charging.
          </p>
        )}
      </div>
    </aside>
  )
}

type OrderItemProps = {
  item: CartLine
  onQuantityChange: (productId: string, change: number) => void
}

export function OrderItem({ item, onQuantityChange }: OrderItemProps) {
  return (
    <article className="order-item">
      <div className="order-item-copy">
        <strong>{item.product.name}</strong>
        <span>{formatCurrency(item.product.price)} ea</span>
      </div>
      <div className="quantity-control" aria-label={`${item.product.name} quantity`}>
        <button
          aria-label={`Remove one ${item.product.name}`}
          onClick={() => onQuantityChange(item.product.id, -1)}
          type="button"
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          aria-label={`Add one ${item.product.name}`}
          onClick={() => onQuantityChange(item.product.id, 1)}
          type="button"
        >
          +
        </button>
      </div>
      <strong className="line-total">
        {formatCurrency(item.product.price * item.quantity)}
      </strong>
      <button
        aria-label={`Remove ${item.product.name} from order`}
        className="remove-item"
        onClick={() => onQuantityChange(item.product.id, -item.quantity)}
        type="button"
      >
        <Icon name="trash" />
      </button>
    </article>
  )
}

type OrderSummaryProps = {
  discount: number
  itemCount: number
  subtotal: number
  tax: number
  total: number
}

export function OrderSummary({
  discount,
  itemCount,
  subtotal,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <section className="order-summary" aria-label="Order totals">
      <div className="summary-row">
        <span>Subtotal ({itemCount} items)</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="summary-row discount-row">
          <span>Discount (10%)</span>
          <span>−{formatCurrency(discount)}</span>
        </div>
      )}
      <div className="summary-row">
        <span>Tax (8.00%)</span>
        <span>{formatCurrency(tax)}</span>
      </div>
      <div className="summary-total">
        <strong>Total</strong>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </section>
  )
}

type PaymentMethodsProps = {
  onChange: (method: PaymentMethod) => void
  selectedMethod: PaymentMethod
}

export function PaymentMethods({
  onChange,
  selectedMethod,
}: PaymentMethodsProps) {
  const methods: PaymentMethod[] = ['Cash', 'Card', 'QR']

  return (
    <div className="payment-methods" aria-label="Payment method">
      {methods.map((method) => (
        <button
          aria-pressed={selectedMethod === method}
          className={selectedMethod === method ? 'is-selected' : ''}
          key={method}
          onClick={() => onChange(method)}
          type="button"
        >
          <Icon name={PAYMENT_ICONS[method]} />
          {method}
        </button>
      ))}
    </div>
  )
}

type ChargeButtonProps = {
  disabled: boolean
  onCharge: () => void
  total: number
}

export function ChargeButton({
  disabled,
  onCharge,
  total,
}: ChargeButtonProps) {
  return (
    <button
      className="charge-button"
      disabled={disabled}
      onClick={onCharge}
      type="button"
    >
      <ContactlessIcon />
      Charge {formatCurrency(total)} / Pay
    </button>
  )
}