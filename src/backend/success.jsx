export default function Success() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#f8fafc',
      color: '#111827',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        maxWidth: '520px',
        textAlign: 'center',
        padding: '32px',
        borderRadius: '24px',
        background: '#ffffff',
        boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Congratulations!</h1>
        <p style={{ margin: '18px 0 0', fontSize: '1rem', lineHeight: 1.75 }}>
          You are now logged in. This is the temporary success screen for the
          current auth flow.
        </p>
      </div>
    </main>
  )
}
