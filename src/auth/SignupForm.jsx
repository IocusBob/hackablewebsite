import { useState } from 'react'
import AuthCard from './AuthCard.jsx'
import FormField from './FormField.jsx'

export default function SignupForm({ onSwitch }) {
  const [formState, setFormState] = useState({ email: '', username: '', password: '', confirmPassword: '' })
  const [message, setMessage] = useState('Create a new account to access the hackable site.')
  const [status, setStatus] = useState('info')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formState.email || !formState.username || !formState.password || !formState.confirmPassword) {
      setStatus('error')
      setMessage('Please fill in all fields.')
      return
    }

    if (formState.password !== formState.confirmPassword) {
      setStatus('error')
      setMessage('Passwords do not match. Please try again.')
      return
    }

    setStatus('success')
    setMessage('Signup submitted. This is a demo form, so no account is actually created.')
  }

  return (
    <AuthCard
      title="Sign Up"
      description="Register a new account to start hacking through the site."
      footer={
        <div className="auth-switch">
          <span>Already have an account?</span>
          <button type="button" className="secondary-button" onClick={onSwitch}>
            Sign in
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
          label="Username"
          name="username"
          value={formState.username}
          onChange={handleChange}
          placeholder="Choose a username"
          autoComplete="username"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Create password"
          autoComplete="new-password"
        />
        <FormField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleChange}
          placeholder="Repeat password"
          autoComplete="new-password"
        />
        <button type="submit" className="primary-button">
          Sign Up
        </button>
      </form>

      <div className={`form-message ${status}`}>{message}</div>
    </AuthCard>
  )
}
