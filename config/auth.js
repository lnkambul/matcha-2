const credentials = require ('./credentials')
const fs = require ('fs')
const path = require ('path')

exports.authenticate = async(next) => {
    /* checks database login credentials */
    try {
            this.getFileContents('temp/flag.txt', (err, res) => {
                if (res && res === 'database') {
                    next('configs', 'setup')
                }
                next('index', 'main')
            })
    }
    catch(err) { 
        console.log('database authenticate error:', err) 
    }
}

exports.getFileContents = async(fpath, callback) => {
    /* reads in contents of specified file */
    try {
        let filePath = path.join(fpath)
        if (!this.checkExists(fpath)) {
            throw(`${fpath} not found`)
        }
        fs.readFile(path.join(__dirname, filePath), 'utf-8', (err, data) => {
            callback (null, data)  
        })
    }
    catch (err) {
        console.log('get file contents error:', err)
        callback (err, null)
    }
}

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

exports.setFlag = (type) => {
    /* sets a flag indicating source of failed verification error */
    try {
        if (!this.checkExists('temp')) {
            credentials.createFolder('temp')
        }
        credentials.writeVal('temp/flag.txt', type)
    }
    catch (err) {
        console.log('set flag error:', err)
    }
}