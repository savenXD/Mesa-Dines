import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'inherit',
    }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Oops — this page doesn't exist.</p>
      <Link href="/" style={{
        padding: '0.75rem 2rem',
        borderRadius: '999px',
        background: '#000',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 600,
      }}>
        Back to Home
      </Link>
    </main>
  )
}
