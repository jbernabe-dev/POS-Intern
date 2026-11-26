import { useState } from 'react'
import { TopBar, type PageId } from './components/TopBar'
import { InventoryPage } from './pages/InventoryPage'
import { ShiftEndPage } from './pages/ShiftEndPage'
import './App.css'

function App() {
  // Which page is showing. Clicking a nav link calls setActivePage.
  const [activePage, setActivePage] = useState<PageId>('inventory')

  return (
    <div className="app-shell">
      <TopBar activePage={activePage} onNavigate={setActivePage} />

      {activePage === 'inventory' && <InventoryPage />}
      {activePage === 'shift-end' && <ShiftEndPage />}
      {(activePage === 'register' || activePage === 'orders') && (
        <main className="dashboard">
          <p>This page is not built yet.</p>
        </main>
      )}
    </div>
  )
}

export default App
