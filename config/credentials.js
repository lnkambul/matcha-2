const fs = require ('fs')
const path = require ('path')
const mysql = require ('mysql')
//const bcrypt = require ('bcrypt')

exports.getLogins = async(path) => {
    /* fetches login details from file */
    try {
        let username = this.getFileContents(path, 'username')
        let password = this.getFileContents(path, 'password')
        let logins = await Promise.all([username, password])

        return(logins)
    }
    catch (err) {
        console.log('check login details error:', err)
    }
}

exports.createFolder = (folder) => {
    /* creates folder */
    try {
        fs.mkdirSync(path.join(__dirname, folder), (err) =>{
            if (err) {
                throw(`failed to create ${folder}`)
            }
            console.log(`${folder} created`)
        })
    }
    catch (err) {
        console.log('folder creation error:', err)
    }
}

exports.verifyCredentials = async(user, password, hostname) => {
    /* tries to log in to mysql with the user-provided details */
    try {
        let connection = mysql.createConnection({
            host: hostname || 'localhost',
            user: user,
            password : password
        })
        connection.connect( err => {
            if (err) {
                throw (err)
            }
            let content = `const mysql = require('mysql')\n\n`
                            +`const connex = mysql.createConnection({\n`
                            +`host: ${connection.host},\nuser: ${user},\npassword: ${password}\n`
                            +`})\n\nmodule.exports = connex`
            this.writeVal('config/dblogin.js', content)
            return (connection)
        })
    }
    catch (err) {
        console.log('verify database login credentials error:', err)
    }
}

exports.writeVal = (file, val) => {
    /* writes data to file */
    try {
        let filePath = path.join(__dirname, file)
        fs.writeFile(filePath, val, err => {
            if (err) {
                throw(err)
            }
            console.log(`${file} updated`)
        })
    }
    catch (err) {
        console.log('writing to file error:', err)
    }
}

/*
exports.saltNHash = (key, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
             throw (err)
        }
        else {
            bcrypt.hash(key, salt, (err, hash) => {
                if (err) {
                    throw (err)
                }
                else {
                    return (hash)
                }
            })
        }
    })
}
*/