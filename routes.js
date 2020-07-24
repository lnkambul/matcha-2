const express = require ( 'express' )
const user = require ( './user/router' )
const config = require ( './config/router' )
const router = express.Router ()

/* logged in routes */

router.get ( '/', ( req, res ) => {
    config.main (( page, layout ) => { res.render ( page, { layout : layout }) })
})

router.get ( '/profile', ( req, res ) => {
    res.render ( 'index', { layout: 'main' })
})

router.get ( '/notifications', ( req, res ) => {
    res.render ( 'index', { layout: 'main' })
})

router.get ( '/chat', ( req, res ) => {
    res.render ( 'index', { layout: 'main' })
})

/* logged out routes */

router.get ( '/login', ( req, res ) => {
    user.verify ( req.originalUrl, ( page, layout ) => { res.render ( page, { layout : layout }) })
})

router.get ( '/forgot-password', ( req, res ) => {
    res.render ( 'forgot-password', { layout: 'anon' })
})

router.post ( '/forgot-password', ( req, res ) => {
    user.mail ( req.body, ( page, layout ) => { res.render ( page, { layout : layout }) })
})

router.get ( '/signup', ( req, res ) => {
    res.render ( 'signup', { layout: 'anon' })
})

router.post ( '/signup', ( req, res ) => {
    user.main ( req, ( page, layout ) => { res.render ( page, { layout : layout }) })
})

/* setup routes */

router.get ( '/dbconfigs', ( req, res ) => {
    res.render ( 'dbconfigs', { layout: 'setup' })
})

router.post ( '/dbconfigs', ( req, res ) => {
    config.mysqlLogin ( req.body, ( page, layout ) => { res.render ( page, { layout : layout }) })
})

router.get ( '/emailconfigs', ( req, res ) => {
    res.render ( 'emailconfigs', { layout: 'setup' })
})

router.post ('/emailconfigs', ( req, res ) => {
    config.setEmail ( req.body, ( page, layout ) => { res.render ( page, { layout : layout }) })
})

router.get ( '/info', ( req, res ) => {
    res.render ( 'info', { title: 'reel info', layout : 'setup' })
})

module.exports = router