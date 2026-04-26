// SIMPLE TEST - Delete this file after testing
import React from 'react'
import ReactDOM from 'react-dom/client'

function TestApp() {
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'system-ui',
      background: 'linear-gradient(to right, #3b82f6, #10b981)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>✅ K.E.I Notebook Test</h1>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>If you see this, React is working!</p>
      <p style={{ fontSize: '16px', opacity: 0.9 }}>The issue is with routing or CSS.</p>

      <div style={{ marginTop: '30px', background: 'white', color: '#333', padding: '20px', borderRadius: '12px' }}>
        <h2 style={{ marginBottom: '10px' }}>Next Steps:</h2>
        <ol style={{ marginLeft: '20px' }}>
          <li>If you see this page, React works ✓</li>
          <li>Change index.html to use /src/main.tsx instead of test-main.tsx</li>
          <li>Check browser console (F12) for errors</li>
        </ol>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)
