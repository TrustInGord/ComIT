import { useState, useEffect } from 'react'
import Card from './Card.jsx'
import Bio from './Bio.jsx'
import Store from './Store.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('card')
  const [gameState, setGameState] = useState({ money: 0, currentDay: 1, wrestlers: [], matches: [] })
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // You could verify token here
      setUser({ username: 'User' }) // Simplified for now
    }
    
    const hash = window.location.hash.slice(1) || 'card'
    setCurrentPage(hash)
  }, [])

  const handleLogin = (userData, userGameState) => {
    setUser(userData)
    setGameState(userGameState || { money: 1000, currentDay: 1, wrestlers: [], matches: [] })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setGameState({ money: 0, currentDay: 1, wrestlers: [], matches: [] })
  }

  if (!user) {
    return (
      <div>
        {authMode === 'login' ? (
          <Login onLogin={handleLogin} switchToRegister={() => setAuthMode('register')} />
        ) : (
          <Register switchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>WrestleBest</h1>
      <p>Welcome, {user.username}! | Day: {gameState.currentDay} | Money: ${gameState.money}</p>
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => { setCurrentPage('card'); window.location.hash = 'card'; }}>Card</button>
        <button onClick={() => { setCurrentPage('bio'); window.location.hash = 'bio'; }} style={{ marginLeft: '10px' }}>Wrestler Bios</button>
        <button onClick={() => { setCurrentPage('store'); window.location.hash = 'store'; }} style={{ marginLeft: '10px' }}>Store</button>
        <button onClick={handleLogout} style={{ marginLeft: '10px', backgroundColor: '#dc3545', color: 'white' }}>Logout</button>
      </nav>
      {currentPage === 'card' && <Card gameState={gameState} setGameState={setGameState} user={user} />}
      {currentPage === 'bio' && <Bio />}
      {currentPage === 'store' && <Store gameState={gameState} setGameState={setGameState} user={user} />}
    </div>
  )
}

export default App
