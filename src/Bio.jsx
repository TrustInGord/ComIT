import { useState } from 'react';
import { roster } from './Wrestler.jsx';

function Bio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrestler = roster[currentIndex];

  const nextWrestler = () => {
    setCurrentIndex((prev) => (prev + 1) % roster.length);
  };

  const prevWrestler = () => {
    setCurrentIndex((prev) => (prev - 1 + roster.length) % roster.length);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px auto' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2>{wrestler.name}</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <p><strong>Hometown:</strong> {wrestler.hometown}</p>
          <p><strong>Gender:</strong> {wrestler.gender}</p>
          <p><strong>Trait:</strong> {wrestler.trait}</p>
        </div>
        
        <div>
          <h3>Stats</h3>
          <p><strong>Strength:</strong> {wrestler.strength}</p>
          <p><strong>Stamina:</strong> {wrestler.stamina}</p>
          <p><strong>Agility:</strong> {wrestler.agility}</p>
          <p><strong>Charisma:</strong> {wrestler.charisma}</p>
          <p><strong>Grapple:</strong> {wrestler.grapple}</p>
          <p><strong>Aerial:</strong> {wrestler.aerial}</p>
          <p><strong>Fatigue:</strong> {wrestler.fatigue}</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', gap: '20px' }}>
        <button onClick={prevWrestler}>← Previous</button>
        <p style={{ color: '#666', margin: 0 }}>
          {currentIndex + 1} of {roster.length}
        </p>
        <button onClick={nextWrestler}>Next →</button>
      </div>
    </div>
  );
}

export default Bio;