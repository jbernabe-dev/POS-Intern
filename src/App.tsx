import { useState } from 'react'
import LoginPage from './features/cashier-login/LoginPage'
import RegistrationPage from './features/cashier-registration/RegistrationPage'

function App() {
  const [page, setPage] = useState<'login' | 'register'>('login')

  if (page === 'register') {
    return <RegistrationPage onCancel={() => setPage('login')} />
  }

  return <LoginPage onRegister={() => setPage('register')} />
}

export default App
