const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body

    if (!email || !username || !password) {
      return res.status(400).json({ success: false, message: 'Email, username, and password are required.' })
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() })
    if (existingEmail) {
      return res.status(409).json({ success: false, message: 'Email already in use.' })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(409).json({ success: false, message: 'Username already taken.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
    })

    await user.save()

    return res.status(201).json({ success: true, message: 'User registered successfully.' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Registration failed.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, username, password } = req.body

    if ((!email && !username) || !password) {
      return res.status(400).json({ success: false, message: 'Email or username and password are required.' })
    }

    const user = await User.findOne(email ? { email: email.toLowerCase() } : { username })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '1h' },
    )

    return res.json({ success: true, token, user: { id: user._id, email: user.email, username: user.username } })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Login failed.' })
  }
})

module.exports = router
