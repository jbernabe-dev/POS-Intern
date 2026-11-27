import { useMemo, useState } from 'react'
import LoginPage from './features/cashier-login/LoginPage'
import RegistrationPage from './features/cashier-registration/RegistrationPage'
import {
  Header,
  OrderPanel,
  ProductCatalog,
  type CartLine,
  type NavItem,
  type PaymentMethod,
} from './assets/components'
import { RecentOrdersPage } from './assets/pages'
import { PRODUCTS } from './assets/products'
import './App.css'

const INITIAL_ORDER: Record<string, number> = {
  'iced-latte': 2,
  'avocado-toast': 1,
  'blueberry-muffin': 1,
}

function App() {
  const [page, setPage] = useState<'login' | 'register' | 'pos'>('login')
  const [cart, setCart] = useState<CartLine[]>(() =>
    Object.entries(INITIAL_ORDER).flatMap(([id, quantity]) => {
      const product = PRODUCTS.find((item) => item.id === id)
      return product ? [{ product, quantity }] : []
    }),
  )
  const [category, setCategory] = useState('All Items')
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState<NavItem>('Register')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash')
  const [isHeld, setIsHeld] = useState(false)
  const [hasDiscount, setHasDiscount] = useState(false)
  const [hasCustomer, setHasCustomer] = useState(false)
  const [isShiftActive, setIsShiftActive] = useState(true)
  const [message, setMessage] = useState('')

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        category === 'All Items' || product.category === category
      const matchesSearch =
        !query ||
        `${product.name} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(query)

      return matchesCategory && matchesSearch
    })
  }, [category, search])

  function addToCart(productId: string) {
    const product = PRODUCTS.find((item) => item.id === productId)
    if (!product) return

    setMessage('')
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === productId,
      )

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentCart, { product, quantity: 1 }]
    })
  }

  function updateQuantity(productId: string, change: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function chargeOrder(total: number) {
    setCart([])
    setIsHeld(false)
    setHasDiscount(false)
    setHasCustomer(false)
    setMessage(`${paymentMethod} payment of $${total.toFixed(2)} complete.`)
  }

  if (page === 'register') {
    return <RegistrationPage onCancel={() => setPage('login')} />
  }

  if (page === 'login') {
    return (
      <LoginPage
        onRegister={() => setPage('register')}
        onSignIn={() => setPage('pos')}
      />
    )
  }

  return (
    <div className="app-shell">
      <Header
        activeNav={activeNav}
        isShiftActive={isShiftActive}
        onNavigate={setActiveNav}
        onShiftToggle={() => setIsShiftActive((active) => !active)}
      />

      {activeNav === 'Recent Orders' ? (
        <RecentOrdersPage />
      ) : (
        <main className="pos-layout">
          <ProductCatalog
            category={category}
            products={visibleProducts}
            search={search}
            onAdd={addToCart}
            onCategoryChange={setCategory}
            onSearchChange={setSearch}
          />
          <OrderPanel
            cart={cart}
            hasCustomer={hasCustomer}
            hasDiscount={hasDiscount}
            isHeld={isHeld}
            isShiftActive={isShiftActive}
            message={message}
            paymentMethod={paymentMethod}
            onCharge={chargeOrder}
            onClear={() => {
              setCart([])
              setMessage('')
            }}
            onCustomerToggle={() => setHasCustomer((assigned) => !assigned)}
            onDiscountToggle={() => setHasDiscount((discounted) => !discounted)}
            onHoldToggle={() => setIsHeld((held) => !held)}
            onPaymentChange={setPaymentMethod}
            onQuantityChange={updateQuantity}
          />
        </main>
      )}
    </div>
  )
}

export default App
