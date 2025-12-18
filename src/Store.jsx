const saveGameState = async (gameState) => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  
  try {
    await fetch(`http://localhost:4000/game/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameState })
    });
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

const items = [
  { id: 1, name: 'WrestleBest Hat', price: 1000, multiplier: 1.5 },
  { id: 2, name: 'WrestleBest Shirt', price: 15000, multiplier: 2.5 },
  { id: 3, name: 'WrestleBest Title', price: 1000000, multiplier: 5 }
]

function Store({ gameState, setGameState }) {
  const purchasedItems = gameState.purchasedItems || []

  const handlePurchase = (item) => {
    if (gameState.money >= item.price) {
      const newGameState = { 
        ...gameState, 
        money: gameState.money - item.price,
        purchasedItems: [...purchasedItems, item.id]
      }
      setGameState(newGameState)
      saveGameState(newGameState)
    }
  }

  return (
    <div style={{ marginTop: 0, maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>WrestleBest Store</h2>
      <div style={{ 
        border: '2px solid #ccc', 
        borderRadius: '12px', 
        padding: '20px', 
        backgroundColor: 'rgb(36, 36, 36)' 
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {items.map(item => (
          <div key={item.id} style={{ 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '20px', 
            width: '200px',
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white'
          }}>
            <h3>{item.name}</h3>
            <p>${item.price.toLocaleString()}</p>
            <p style={{ fontSize: '14px', color: '#666' }}>{item.multiplier}x Score Multiplier</p>
            {purchasedItems.includes(item.id) ? (
              <p style={{ color: 'green' }}>✓ Purchased</p>
            ) : (
              <button 
                onClick={() => handlePurchase(item)}
                disabled={gameState.money < item.price}
                style={{
                  padding: '10px 20px',
                  backgroundColor: gameState.money >= item.price ? '#007bff' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: gameState.money >= item.price ? 'pointer' : 'not-allowed'
                }}
              >
                {gameState.money >= item.price ? 'Buy Now' : 'Not Enough Money'}
              </button>
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Store