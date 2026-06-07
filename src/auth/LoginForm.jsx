import { useState } from 'react'
import AuthCard from './AuthCard.jsx'
import FormField from './FormField.jsx'

export default function LoginForm({ onSwitch }) {
  const [formState, setFormState] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('Use your credentials to sign in.')
  const [status, setStatus] = useState('info')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formState.username || !formState.password) {
      setStatus('error')
      setMessage('Please enter both username and password.')
      return
    }

    setStatus('success')
    setMessage('Login submitted successfully. This is a demo authentication form.')
  }

  return (
    <AuthCard
      title="Login"
      description="Sign in to your account with a username and password."
      footer={
        <div className="auth-switch">
          <span>New to the site?</span>
          <button type="button" className="secondary-button" onClick={onSwitch}>
            Create an account
          </button>
        </div>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          label="Username"
          name="username"
          value={formState.username}
          onChange={handleChange}
          placeholder="Enter username"
          autoComplete="username"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="current-password"
        />
        <button type="submit" className="primary-button">
          Login
        </button>
      </form>

      <div className={`form-message ${status}`}>{message}</div>
    </AuthCard>
  )
}
