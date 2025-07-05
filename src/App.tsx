

function App() {
  console.log('App component rendering...');
  
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      color: 'white',
      textAlign: 'center'
    }}>
      <h1>Badbygg VVS</h1>
      <p>Få ditt prisestimat på 2 minutter</p>
      <div style={{ 
        background: 'white', 
        color: 'black', 
        padding: '20px', 
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2>Test - Kalkulator fungerer!</h2>
        <p>Hvis du ser dette, fungerer React-applikasjonen.</p>
      </div>
    </div>
  );
}

export default App;
