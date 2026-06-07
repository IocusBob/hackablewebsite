import './Auth.css'

export default function AuthCard({ title, description, children, footer }) {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <header className="auth-card__header">
          <span className="auth-card__badge">Hackable</span>
          <h1 className="auth-card__title">{title}</h1>
          <p className="auth-card__description">{description}</p>
        </header>

        <div className="auth-card__content">{children}</div>

        {footer && <footer className="auth-card__footer">{footer}</footer>}
      </div>
    </section>
  )
}
