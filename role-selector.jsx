import React from 'react'

const styles = {
  page: {
    margin: 0,
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    fontFamily: 'Helvetica, Arial, sans-serif',
    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
    padding: '16px'
  },
  card: {
    width: 'min(92vw, 420px)',
    background: '#ffffff',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
    padding: '28px',
    textAlign: 'center'
  },
  title: {
    margin: '0 0 8px'
  },
  subtitle: {
    margin: '0 0 22px',
    color: '#334155'
  },
  actions: {
    display: 'grid',
    gap: '12px'
  },
  button: {
    display: 'inline-block',
    textDecoration: 'none',
    border: 0,
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#ffffff'
  },
  driver: {
    background: '#0f766e'
  },
  passenger: {
    background: '#1d4ed8'
  }
}

export default function RoleSelectorPage() {
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Choose Your Role</h1>
        <p style={styles.subtitle}>Select one option to continue.</p>

        <div style={styles.actions}>
          <a href="#/driver-details" style={{ ...styles.button, ...styles.driver }}>
            Driver
          </a>
          <a href="#/passenger-details" style={{ ...styles.button, ...styles.passenger }}>
            Passenger
          </a>
        </div>
      </section>
    </main>
  )
}
