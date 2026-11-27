import contactLogo from '../assets/contact-logo.png'
import { uiIcons } from '../assets/icons'
import swiftPosLogo from '../assets/swiftpos-logo.png'

// Every page the app can show. Using a union type means TypeScript
// will warn us if we ever type a page name wrong.
export type PageId = 'register' | 'orders' | 'inventory' | 'shift-end'

const navLinks: { id: PageId; label: string }[] = [
  { id: 'register', label: 'Register / New Sale' },
  { id: 'orders', label: 'Recent Orders' },
  { id: 'inventory', label: 'Products / Inventory' },
  { id: 'shift-end', label: 'Shift End' },
]

type TopBarProps = {
  activePage: PageId
  onNavigate: (page: PageId) => void
}

export function TopBar({ activePage, onNavigate }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#" aria-label="SwiftPOS home">
          <img className="brand-logo" src={swiftPosLogo} alt="" />
          <span>SwiftPOS</span>
        </a>

        <div className="terminal-status">
          <span><img src={uiIcons.terminal} alt="" />&nbsp; Term #01</span>
          <span><i /> Shift Active</span>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = link.id === activePage
            return (
              <a
                key={link.id}
                href="#"
                className={isActive ? 'nav-active' : undefined}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault() // stop the browser jumping to "#"
                  onNavigate(link.id)
                }}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="cashier">
          <span><strong>Alex M.</strong><small>Cashier #402</small></span>
          <img className="cashier-avatar" src={contactLogo} alt="" />
        </div>
      </div>
    </header>
  )
}
