const bcrypt = require ('bcrypt')
const validate = require ('./validate')
const database = require('../config/database')

exports.validate = async(form, callback) => {
    try {
        let promise = new Promise ((res, rej) => {
            let user = new Map ([['username', form.username],['password', form.password],
                                    ['firstname', form.firstname],['lastname', form.lastname],['email', form.email]])
            for (let [key, value] of user) {
                switch (key) {
                    case 'username':
                        validate.username(value, err => { if (err) { rej (err) } })
                        break
                    case 'password':
                        validate.password(value, err => { if (err) { rej (err) } })
                        break
                    case 'email':
                        validate.email(value, err => { if (err) { rej (err) } })
                        break
                    default:
                        validate.name(value, err => { if (err) { rej (err) } })
                }
            }
            res (user)
        })
        promise.then ( _=> {
            callback (null, 'input valid')
        }).catch (err => {
            console.log('input validation error:', err)
            callback (err, null)
        })
    }
    catch (err) {
        console.log('input validation error thrown:', err)
        callback (err, null)
    }
}

exports.capture = async(form, callback) => {
    try {
        database.initDb(err => { if (err) { callback (err, null) } })
        callback(null, 1)
    }
    catch (err) {
        console.log('input capture error thrown:', err)
        callback (err, null)
    }
}

exports.saltNHash = async(key, callback) => {
    /* hashes a string */
    try {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log ('salting error:', err)
                callback (err, null)
            }
            else {
                bcrypt.hash(key, salt, (err, hash) => {
                    if (err) {
                        console.log('hashing error:', err)
                        callback (err, null)
                    }
                    else {
                        callback (null, hash)
                    }
                })
            }
        })
    }
    catch (err) {
        console.log ('salt n hash error:', err)
        callback (err, null)
    }
}