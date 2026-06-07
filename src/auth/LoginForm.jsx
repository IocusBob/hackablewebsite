import { useState } from 'react'
import AuthCard from './AuthCard.jsx'
import FormField from './FormField.jsx'

export default function LoginForm({ onSwitch, onSuccess }) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('Use your credentials to sign in.')
  const [status, setStatus] = useState('info')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formState.email || !formState.password) {
      setStatus('error')
      setMessage('Please enter both email and password.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(data.message || 'Login failed. Please check your credentials.')
        return
      }

      localStorage.setItem('authToken', data.token)
      setStatus('success')
      setMessage('Login successful! Redirecting...')
      onSuccess?.()
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <AuthCard
      title="Login"
      description="Sign in to your account with your email and password."
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
          label="Email"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Enter email"
          autoComplete="email"
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
