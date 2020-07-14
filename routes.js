const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/config', (req, res) => {
    res.render('config')
})

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/forgot-password', (req, res) => {
    res.render('forgot-password')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/profile', (req, res) => {
    res.render('profile')
})

router.get('/notifications', (req, res) => {
    res.render('notifications')
})

router.get('/chat', (req, res) => {
    res.render('chat')
})

router.get('/info', (req, res) => {
    res.render('info')
})

module.exports = router