const mysql = require ('mysql')
const files = require ('./files')
//const bcrypt = require ('bcrypt')

exports.getLogins = async(path, callback) => {
    /* fetches login details from file */
    try {
        let username = this.getFileContents(path, 'username')
        let password = this.getFileContents(path, 'password')
        let logins = await Promise.all([username, password])

        callback (null, logins)
    }
    catch (err) {
        console.log('check login details error:', err)
        callback (err, null)
    }
}

exports.verifyDb = async(user, password, hostname, callback) => {
    /* verifies mysql logins */
    try {
        let connection = mysql.createConnection({
            host: hostname,
            user: user,
            password : password
        })
        connection.connect( err => {
            if (err) {
                throw (err)
            }
            try {
                let credentials = new Map ([['hostname', hostname], ['user', user], ['password', password]])
                if(!files.checkExists('../credentials')) {
                    files.createFolder('../credentials')
                }
                for (const [key, value] of credentials) {
                    files.writeVal(`../credentials/${key}`, value, (err, res) => {
                        if (err) {
                            throw(err)
                        }
                        else {

                        }
                    })
                }
            }
            catch (err) {
                console.log (`error encountered while updating mysql credentials:`, err)
            }
            callback (null, connection)
        })
    }
    catch (err) {
        console.log('verify database login credentials error:', err)
        callback (err, null)
    }
}