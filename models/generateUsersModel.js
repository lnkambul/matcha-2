const Q = require('./queryModel')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const kg = require('./keyGeneratorModel')

exports.initAdmin = (username, callback) => {
    let promise = new Promise((res, rej) => { 
        bcrypt.genSalt(10, function(err, salt) {
            kg.genPass((passkey) => {
                console.log(`passkey : ${passkey}`)
                bcrypt.hash(passkey, salt, function(err, hash) {
                    if (err)
                        throw(err)
                    else if (hash){
                        res(hash)
                    }
                })
            })
        })
    }) 
    promise.then( hash => {
        const configPath = path.join(__dirname, '../config')
        fs.writeFile(`${configPath}/${username}.txt`, `${hash}`, (err) => {
            if (err)
                throw (err)
        })
        callback(`${username} enter passkey to verify admin status`)
    }).catch(err => rej(err.message))
}

exports.verifyAdmin = (username, passkey, callback) => {
    const filePath = path.join(__dirname, `../config/${username}.txt`)
    let promise = new Promise ((res, rej) => {
        fs.readFile(filePath, 'utf8', (err, contents) => {
            if (err)
                throw(err)
            else {
                res(contents)
            }
        })
    })
    promise.then(contents => {
        bcrypt.compare(passkey, contents, (err, match) => {
            if (err)
                throw(err)
            else if (match) {
                params = ['admin']
                val = 1
                Q.update("users", params, val, "username", username, (err, res) => {
                    if (err)
                        throw(err)
                    else {
                        callback(null, `${username} is now an admin`)
                    }
                })
            }
            else {
                callback("passkey authentication failed", null)
            }
        })
    }).catch(err => callback(err, null)) 
}

exports.initTestAccounts = (adminName, count, callback) => {
    Q.fetchone("users", ['admin'], 'username', adminName, (err, res) => {
        if (err)
            callback(err, null)
        else if (res && res[0].admin) {
            let promise = new Promise ((res, rej) => {
                for (i = 0; i < count; i++) {
                    /*kg.gen(user => {
                        console.log(user)
                    })*/
                }
            })
            promise.then( () => { 
                callback(null, `${count} test-accounts created successfully`) 
            }).catch(err => callback(err, null))
        }
    })
}
