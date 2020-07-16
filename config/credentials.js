const mysql = require ('mysql')
const files = require ('./files')

exports.getDbLogins = async(callback) => {
    /* fetches mysql login details from file */
    try {
        let promise = new Promise ((res, rej) => {
            let logins = new Map ([['user', null], ['password', null], ['hostname', null]])
            for (let [key, value] of logins) {
                files.getFileContents(`mysql/${key}`, (err, res) =>{
                    if (err) {
                        rej (err)
                    }
                    else {
                        value = res
                    }
                })
            }
            res (logins)
        })
        promise.then (logins => {
            callback (null, logins)
        }).catch (err => { 
            console.log('get mysql login details failed:', err)
            callback (err, null)
        })
    }
    catch (err) {
        console.log('get mysql login details error thrown:', err)
        callback (err, null)
    }
}

exports.verifyDbLogins = async(user, password, hostname, callback) => {
    /* verifies mysql logins */
    try {
        this.connection((err,res) => {
            if (err) {
                callback(err, null)
            }
            try {
                let credentials = new Map ([['hostname', hostname], ['user', user], ['password', password]])
                if(!files.checkExists('mysql')) {
                    files.createFolder('mysql')
                }
                for (const [key, value] of credentials) {
                    files.writeVal(`mysql/${key}`, value, (err, res) => {
                        if (err) {
                            callback(err, null)
                        }
                    })
                }
                callback (null, credentials)
            }
            catch (err) {
                console.log ('error encountered while updating mysql credentials:', err)
            }
        })
    }
    catch (err) {
        console.log('verify database login credentials error thrown:', err)
        callback (err, null)
    }
}

exports.connection = async(callback) => {
    try {
        this.getDbLogins((err, res) => {
            if (err) {
                console.log('database login details retreival error:', err)
                callback (err, null)
            }
            else {
                let connection = mysql.createConnection({
                    user: res.user,
                    password : res.password,
                    host: res.hostname,
                })
                connection.connect(err => {
                    if (err) {
                        console.log ('database connection error:', err)
                        callback (err, null)
                    }
                    else {
                        console.log(`connected to database`)
                        callback (null, connection)
                    }
                })
            }
        })
    }
    catch (err) {
        console.log('database connection error thrown:', err)
        callback (err, null)
    }
}