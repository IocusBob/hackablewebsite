import { useState } from 'react'
import LoginForm from './auth/LoginForm.jsx'
import SignupForm from './auth/SignupForm.jsx'

function App() {
  const [mode, setMode] = useState('login')

  return mode === 'login' ? (
    <LoginForm onSwitch={() => setMode('signup')} />
  ) : (
    <SignupForm onSwitch={() => setMode('login')} />
  )
}

export default App
