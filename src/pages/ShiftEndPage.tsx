import { useState, type ReactNode } from 'react'
import { uiIcons } from '../assets/icons'
import { Button } from '../components/Button'

type IconTileProps = {
  children?: ReactNode
  src?: string
  tone?: 'blue' | 'green'
}

type TenderMethod = {
  icon: string
  name: string
  detail: string
  amount: number
  status: string
  tone?: 'blue' | 'green'
}

function IconTile({ children, src, tone = 'blue' }: IconTileProps) {
  return (
    <span className={`icon-tile icon-tile--${tone}${src ? ' icon-tile--image' : ''}`} aria-hidden="true">
      {src ? <img src={src} alt="" /> : children}
    </span>
  )
}

const tenderMethods: TenderMethod[] = [
  { icon: uiIcons.visaMastercard, name: 'Visa / Mastercard', detail: '38 swipes • Batch #801', amount: 842, status: 'Settled' },
  { icon: uiIcons.applePay, name: 'Apple Pay / NFC', detail: '14 contactless • Instant', amount: 320.5, status: 'Settled' },
  { icon: uiIcons.physicalCash, name: 'Physical Cash', detail: '18 transactions in drawer', amount: 320, status: 'Drawer #1', tone: 'green' },
  { icon: uiIcons.storeGiftCards, name: 'Store Gift Cards', detail: '2 redemptions • Internal', amount: 0, status: 'No usage' },
]

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

export function ShiftEndPage() {
  const [actualCashCount, setActualCashCount] = useState('520.00')
  const actualCount = actualCashCount === '' ? 0 : Number(actualCashCount)
  const cashVariance = actualCount - 520
  const isBalanced = cashVariance === 0

  return (
    <main className="dashboard">
      <section className="summary-card" aria-labelledby="shift-title">
        <div>
          <div className="session-line">
            <span className="phase-badge"><i /> Reconciliation Phase</span>
            <span>Session #4092</span>
          </div>
          <h1 id="shift-title">Shift Summary • Terminal 01</h1>
          <p>Cashier: Alex M. (ID #402)&nbsp; | &nbsp;Shift Window: 08:00 AM – 04:00 PM (8h 00m)</p>
        </div>
        <div className="register-status">
          <small>REGISTER STATUS</small>
          <strong><img className="status-icon" src={uiIcons.awaitingDrawer} alt="" /> Awaiting Drawer Count</strong>
        </div>
      </section>

      <section className="stats-grid" aria-label="Shift totals">
        <article className="stat-card">
          <div className="stat-label"><span>GROSS SALES</span><IconTile src={uiIcons.grossSales} /></div>
          <strong className="stat-value">$1,482.50</strong>
          <small className="positive">↑ +14.2% vs target</small>
        </article>
        <article className="stat-card">
          <div className="stat-label"><span>COMPLETED ORDERS</span><IconTile src={uiIcons.completedOrders} /></div>
          <strong className="stat-value">68</strong>
          <small>Avg. ticket: <b>$21.80</b></small>
        </article>
        <article className="stat-card">
          <div className="stat-label"><span>CASH TENDERED</span><IconTile src={uiIcons.cashTendered} tone="green" /></div>
          <strong className="stat-value">$320.00</strong>
          <small>21.5% of total volume</small>
        </article>
        <article className="stat-card">
          <div className="stat-label"><span>ELECTRONIC / CARD</span><IconTile src={uiIcons.electronicCard} /></div>
          <strong className="stat-value">$1,162.50</strong>
          <small>78.5% of total volume</small>
        </article>
      </section>

      <div className="details-grid">
        <section className="panel cash-panel" aria-labelledby="cash-title">
          <div className="panel-heading">
            <div className="panel-title">
              <IconTile src={uiIcons.cashDrawerBalancing} tone="green" />
              <h2 id="cash-title">Cash Drawer Balancing</h2>
            </div>
            {isBalanced ? (
              <img
                className="balance-badge-image"
                src={uiIcons.cashDrawerBalanced}
                alt="+$0.00 Balanced"
              />
            ) : (
              <span className="balance-badge balance-badge--unbalanced">
                <span aria-hidden="true">!</span>
                {`${cashVariance > 0 ? '+' : '−'}${formatCurrency(Math.abs(cashVariance))} Difference`}
              </span>
            )}
          </div>

          <p className="panel-description">
            Count physical notes, rolls, and loose coins inside Drawer #1. Compare against registered starting float and logged cash payments.
          </p>

          <div className="cash-facts">
            <article className="fact-card">
              <small>Opening Float</small>
              <strong>$200.00</strong>
              <span>Verified at 08:00 AM</span>
            </article>
            <article className="fact-card">
              <small>Net Cash Intake</small>
              <strong>+$320.00</strong>
              <span>18 cash sales • 0 refunds</span>
            </article>
          </div>

          <div className="expected-cash">
            <small>SYSTEM EXPECTED CASH</small>
            <div className="expected-row">
              <strong>$520.00</strong>
              <span>Float ($200.00) + Cash Sales ($320.00)</span>
            </div>
            <label htmlFor="cash-count">Actual Physical Cash Count ($)</label>
            <div className="cash-input-wrap">
              <span aria-hidden="true">$</span>
              <input
                id="cash-count"
                type="number"
                min="0"
                step="0.01"
                value={actualCashCount}
                onChange={(event) => setActualCashCount(event.target.value)}
              />
            </div>
          </div>

          <div className="cash-panel-footer">
            <span><img className="footer-icon" src={uiIcons.dualCountVerification} alt="" /> Dual-count verification enabled</span>
            <span className="denomination-label"><img className="footer-icon" src={uiIcons.denomination} alt="" /> Denomination Breakdown</span>
          </div>
        </section>

        <section className="panel tender-panel" aria-labelledby="tender-title">
          <div className="panel-heading">
            <div className="panel-title">
              <IconTile src={uiIcons.tenderMethods} />
              <h2 id="tender-title">Tender Methods</h2>
            </div>
            <small>4 Channels</small>
          </div>

          <ul className="tender-list">
            {tenderMethods.map((method) => (
              <li className="tender-row" key={method.name}>
                <IconTile src={method.icon} tone={method.tone} />
                <div className="tender-details">
                  <strong>{method.name}</strong>
                  <small>{method.detail}</small>
                </div>
                <div className="tender-amount">
                  <strong>{formatCurrency(method.amount)}</strong>
                  <small>{method.status}</small>
                </div>
              </li>
            ))}
          </ul>

          <div className="batch-total">
            <strong>Digital Batch Total</strong>
            <strong>$1,162.50</strong>
          </div>
        </section>
      </div>

      <footer className="action-footer">
        <div className="report-actions">
          <Button><img className="button-icon" src={uiIcons.printXReport} alt="" /> Print X-Report (Mid-Shift)</Button>
          <Button><img className="button-icon" src={uiIcons.printZReport} alt="" /> Print Z-Report (Official)</Button>
        </div>
        <div className="finalize-actions">
          <span className="finalize-label"><small>Terminal Action</small><strong>Session Finalization</strong></span>
          <Button variant="primary"><img className="button-icon" src={uiIcons.closeRegister} alt="" /> Close Register &amp; Clock Out</Button>
        </div>
      </footer>
    </main>
  )
}
