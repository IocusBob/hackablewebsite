import { useState } from 'react'
import LoginForm from './auth/LoginForm.jsx'
import SignupForm from './auth/SignupForm.jsx'
import Success from './backend/success.jsx'

function App() {
  const [mode, setMode] = useState('login')

  const handleLoginSuccess = () => {
    setMode('success')
  }

  if (mode === 'success') {
    return <Success />
  }

  return mode === 'login' ? (
    <LoginForm onSwitch={() => setMode('signup')} onSuccess={handleLoginSuccess} />
  ) : (
    <SignupForm onSwitch={() => setMode('login')} onSuccess={handleLoginSuccess} />
  )
}

export default App
