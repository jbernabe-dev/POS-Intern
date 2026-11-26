import { useMemo, useState } from 'react'
import { ContactlessIcon, Icon, type IconName } from './components'
import { ORDERS, type Order, type OrderStatus, type PaymentType } from './orders'

const formatMoney = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    amount,
  )

type StatCardProps = {
  label: string
  value: string
  icon: IconName
  tone?: 'default' | 'danger'
}

function StatCard({ label, value, icon, tone = 'default' }: StatCardProps) {
  return (
    <article className={`stat-card${tone === 'danger' ? ' is-danger' : ''}`}>
      <div>
        <span className="stat-label">{label}</span>
        <strong className="stat-value">{value}</strong>
      </div>
      <span className="stat-icon">
        <Icon name={icon} className="stat-icon-svg" />
      </span>
    </article>
  )
}

const FILTERS = ['All Orders', 'Completed', 'Held / Parked', 'Refunded'] as const
type Filter = (typeof FILTERS)[number]

const FILTER_STATUS: Record<Filter, OrderStatus | null> = {
  'All Orders': null,
  Completed: 'Paid',
  'Held / Parked': 'Held',
  Refunded: 'Refunded',
}

const PAYMENT_ICON: Record<Exclude<PaymentType, 'cash' | 'contactless'>, IconName> = {
  card: 'card',
  tab: 'hourglass',
  refund: 'cardOff',
}

function PaymentCell({ payment }: { payment: Order['payment'] }) {
  let icon
  if (payment.type === 'cash') {
    icon = <span className="cash-sign">$</span>
  } else if (payment.type === 'contactless') {
    icon = <ContactlessIcon className="payment-icon" />
  } else {
    icon = <Icon name={PAYMENT_ICON[payment.type]} className="payment-icon" />
  }

  return (
    <div className={`payment-cell is-${payment.type}`}>
      {icon}
      <span>
        {payment.label}
        <br />
        {payment.detail}
      </span>
    </div>
  )
}

function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span className={`status-pill is-${status.toLowerCase()}`}>
      <span className="status-dot" aria-hidden="true" />
      {status}
    </span>
  )
}

function itemsSummary(order: Order) {
  return order.lines.map((line) => `${line.quantity}x ${line.name}`).join(', ')
}

type ReceiptPanelProps = {
  order: Order
  onAction: (message: string) => void
}

function ReceiptPanel({ order, onAction }: ReceiptPanelProps) {
  const subtotal = order.lines.reduce((sum, line) => sum + line.amount, 0)
  const tax = Math.abs(order.total) - subtotal
  const totalLabel =
    order.status === 'Refunded'
      ? 'Total Refunded'
      : order.status === 'Held'
        ? 'Total Due'
        : 'Total Paid'

  return (
    <aside className="receipt-panel" aria-label={`Receipt #${order.id}`}>
      <header className="receipt-header">
        <h2>
          <Icon name="receipt" className="receipt-title-icon" />
          Receipt #{order.id}
        </h2>
        <span className={`receipt-badge is-${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </header>

      <div className="receipt-body">
        <div className="receipt-store">
          <h3>SwiftPOS Coffee &amp; Roastery</h3>
          <p>Store #08 • 542 Downtown Ave</p>
          <p className="receipt-date">
            {order.date} • {order.time}
          </p>
        </div>

        <div className="receipt-people">
          <div>
            <span>Customer</span>
            <strong>{order.customer}</strong>
          </div>
          <div className="is-right">
            <span>Cashier / Register</span>
            <p>{order.cashier} (Term 01)</p>
          </div>
        </div>

        <ul className="receipt-lines">
          {order.lines.map((line) => (
            <li key={line.name}>
              <div>
                <p>
                  {line.quantity}x {line.name}
                </p>
                {line.note && <span>{line.note}</span>}
              </div>
              <strong>{formatMoney(line.amount)}</strong>
            </li>
          ))}
        </ul>

        <div className="receipt-totals">
          <div>
            <span>Subtotal</span>
            <strong>{formatMoney(subtotal)}</strong>
          </div>
          <div>
            <span>Sales Tax (8%)</span>
            <strong>{formatMoney(tax)}</strong>
          </div>
          <div className="receipt-grand-total">
            <strong>{totalLabel}</strong>
            <strong>{formatMoney(Math.abs(order.total))}</strong>
          </div>
        </div>

        <div className="receipt-payment">
          <Icon name="card" className="receipt-payment-icon" />
          <div>
            <strong>{order.payment.receiptLabel}</strong>
            {order.payment.authCode && <span>Auth Code: {order.payment.authCode}</span>}
          </div>
          {order.status !== 'Held' && (
            <Icon name="checkCircle" className="receipt-check" />
          )}
        </div>

        <div className="receipt-actions">
          <button
            className="receipt-button"
            onClick={() => onAction(`Ticket #${order.id} sent to printer.`)}
            type="button"
          >
            <Icon name="print" />
            Print Ticket
          </button>
          <button
            className="receipt-button"
            onClick={() => onAction(`Receipt #${order.id} emailed.`)}
            type="button"
          >
            <Icon name="mail" />
            Email Receipt
          </button>
        </div>
        <button
          className="reprint-button"
          onClick={() => onAction(`Customer receipt #${order.id} reprinted.`)}
          type="button"
        >
          <Icon name="lines" />
          Reprint Customer Receipt
        </button>
        <button
          className="refund-button"
          disabled={order.status === 'Refunded'}
          onClick={() => onAction(`Refund / void started for #${order.id}.`)}
          type="button"
        >
          <Icon name="refund" />
          Issue Refund / Void
        </button>
      </div>
    </aside>
  )
}

export function RecentOrdersPage() {
  const [filter, setFilter] = useState<Filter>('All Orders')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState(ORDERS[0].id)
  const [message, setMessage] = useState('')

  const visibleOrders = useMemo(() => {
    const query = search.trim().toLowerCase()
    const status = FILTER_STATUS[filter]

    return ORDERS.filter((order) => {
      const matchesStatus = !status || order.status === status
      const matchesSearch =
        !query ||
        `#${order.id} ${order.customer} ${order.cashier} ${itemsSummary(order)}`
          .toLowerCase()
          .includes(query)
      return matchesStatus && matchesSearch
    })
  }, [filter, search])

  const selectedOrder =
    ORDERS.find((order) => order.id === selectedId) ?? ORDERS[0]

  return (
    <main className="orders-page">
      <section className="stats-grid" aria-label="Today's summary">
        <StatCard icon="receipt" label="Today's Transactions" value="142" />
        <StatCard icon="cash" label="Gross Sales" value="$3,428.50" />
        <StatCard icon="hold" label="Active / Held" value="4" />
        <StatCard icon="refund" label="Refunded (24h)" tone="danger" value="$84.20" />
      </section>

      <div className="orders-layout">
        <section className="orders-card" aria-label="Recent orders">
          <div className="orders-toolbar">
            <div className="orders-filters" role="group" aria-label="Filter orders">
              {FILTERS.map((item) => (
                <button
                  aria-pressed={filter === item}
                  className={filter === item ? 'is-selected' : ''}
                  key={item}
                  onClick={() => setFilter(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>

            <label className="orders-search">
              <Icon name="search" />
              <span className="visually-hidden">Search orders</span>
              <input
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Receipt # or customer..."
                type="search"
                value={search}
              />
            </label>

            <button className="date-button" type="button">
              <Icon name="calendar" />
              Today
              <Icon name="caretDown" className="caret-icon" />
            </button>
          </div>

          <div className="orders-table-wrap">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Time &amp; Cashier</th>
                  <th>Items Summary</th>
                  <th>Payment</th>
                  <th className="is-right">Total</th>
                  <th className="is-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => {
                  const isSelected = order.id === selectedOrder.id
                  const isRefunded = order.status === 'Refunded'
                  return (
                    <tr
                      aria-selected={isSelected}
                      className={`${isSelected ? 'is-selected' : ''}${isRefunded ? ' is-refunded' : ''}`}
                      key={order.id}
                      onClick={() => {
                        setSelectedId(order.id)
                        setMessage('')
                      }}
                    >
                      <td className="order-id">#{order.id}</td>
                      <td className="order-time">
                        {order.time}
                        <span>{order.cashier}</span>
                      </td>
                      <td className="order-summary-cell">
                        <p>{itemsSummary(order)}</p>
                        <span>{order.detail}</span>
                      </td>
                      <td>
                        <PaymentCell payment={order.payment} />
                      </td>
                      <td className="order-total is-right">{formatMoney(order.total)}</td>
                      <td className="is-center">
                        <StatusPill status={order.status} />
                      </td>
                    </tr>
                  )
                })}
                {visibleOrders.length === 0 && (
                  <tr>
                    <td className="orders-empty" colSpan={6}>
                      No orders match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="orders-footer">
            <span>
              Showing <strong>1 - {visibleOrders.length}</strong> of 142 records
            </span>
            <nav className="pagination" aria-label="Pages">
              <button
                aria-label="Previous page"
                className="page-arrow"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                type="button"
              >
                <Icon name="chevronLeft" />
              </button>
              {[1, 2, 3].map((number) => (
                <button
                  aria-current={page === number ? 'page' : undefined}
                  className={page === number ? 'is-current' : ''}
                  key={number}
                  onClick={() => setPage(number)}
                  type="button"
                >
                  {number}
                </button>
              ))}
              <button
                aria-label="Next page"
                className="page-arrow"
                disabled={page === 3}
                onClick={() => setPage((current) => current + 1)}
                type="button"
              >
                <Icon name="chevronRight" />
              </button>
            </nav>
          </footer>
        </section>

        <div className="receipt-column">
          <ReceiptPanel onAction={setMessage} order={selectedOrder} />
          {message && (
            <p className="receipt-message" role="status">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
