const express = require('express')
const config = require('./config/router')
const router = express.Router()

/* logged in routes */

router.get('/', (req, res) => {
    config.main((page, layout) => { res.render(page, { layout: layout }) })
})

router.get('/profile', (req, res) => {
    res.render('index', { layout: 'main' })
})

router.get('/notifications', (req, res) => {
    res.render('index', { layout: 'main' })
})

router.get('/chat', (req, res) => {
    res.render('index', { layout: 'main' })
})

/* logged out routes */

router.get('/login', (req, res) => {
    res.render('login', { layout: 'anon' })
})
router.get('/forgot-password', (req, res) => {
    res.render('forgot-password', { layout: 'anon' })
})

router.get('/signup', (req, res) => {
    res.render('signup', { layout: 'anon' })
})

/* setup routes */

router.get('/dbconfigs', (req, res) => {
    res.render('configs', { layout: 'setup' })
})

router.post('/dbconfigs', (req, res) => {
    config.mysqlLogin(req, (page, layout) => { res.render(page, { layout: layout }) })
})

router.get('/emailconfigs', (req, res) => {
    res.render('configs', { layout: 'setup' })
})

router.get('/info', (req, res) => {
    res.render('info', { title: 'reel info', layout: 'setup' })
})

module.exports = router