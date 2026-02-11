import React from 'react';
import FormComponent from './FormComponent';

function App() {
  return (
    <div className="app-container" style={{ width: '100%' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>
          Experiment 5
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          margin: 0,
          fontWeight: 300
        }}>
          React Controlled Form Component
        </p>
      </header>

      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <FormComponent />
      </main>

      <footer style={{
        marginTop: '4rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        opacity: 0.6
      }}>
        <p>© 2026 SrutiW5 Project</p>
      </footer>
    </div>
  );
}

export default App;
