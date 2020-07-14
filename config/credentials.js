const fs = require ('fs')
const path = require ('path')
const mysql = require ('mysql')
//const bcrypt = require ('bcrypt')

exports.checkExists = (file) => {
    /* checks if the credentials folder exists */
    try {
        if (!fs.existsSync(path.join(__dirname, file))) {
            return(false)
        }
        return(true)
    }
    catch (err) {
        console.log('check file existence error:', err)    
    }
}

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

exports.getFileContents = async(fpath, filename) => {
    /* reads in contents of specified file */
    try {
        let filePath = path.join(__dirname, fpath, filename)
        if (!this.checkExists(fpath)) {
            throw(`${fpath} not found`)
        }
        else if (!this.checkExists(filePath)) {
            throw(`${filePath} not found`)
        }
        let data = fs.readFile(filePath, 'utf8')
        return (data)
    }
    catch (err) {
        console.log('get file contents error:', err)
        return (null)
    }
}

exports.createFolder = (folder) => {
    /* creates folder */
    try {
        fs.mkdirSync(path.join(__dirname, folder, (err) =>{
            if (err) {
                throw(`failed to create ${folder}`)
            }
            console.log(`${folder} created`)
        }))
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

exports.setFlag = (type) => {
    /* sets a flag indicating source of failed verification error */
    try {
        if (!this.checkExists('temp')) {
            this.createFolder('temp')
        }
        credentials.writeVal('temp/flag.txt', type)
    }
    catch (err) {
        console.log('set flag error:', err)
    }
}

exports.checkFlag = async() => {
    /* checks whether or not a flag has been set, returns flag if found */
    try {
        let flagType = this.getFileContents('temp', 'flag.txt')
        return (flagType)
    }
    catch (err) {
        console.log('check flag error:', err)
        return (null)
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