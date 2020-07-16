const files = require ('./files')
const credentials = require ('./credentials')

exports.authenticate = async(next) => {
    /* checks database login credentials */
    try {
            files.getFileContents('temp/flag.txt', (err, res) => {
                if (res && res === 'database') {
                    next('configs', 'setup')
                }
                else {
                    next('index', 'main')
                }
            })
    }
    catch(err) { 
        console.log('database authenticate error:', err)
        next('configs', 'setup')
    }
}

exports.mysqlLogin = async(req, next) => {
    /* captures and processes mysql login credentials */
    try {
        let hostname = req.body.hostname || 'localhost'
        credentials.verifyDb(req.body.username, req.body.password, hostname, (err, res) => {
            if (err) {
                console.log('mysql login error:', err)
                next('configs', 'setup')
            }
            else {
                next('index', 'main')
            }
        })
    }
    catch (err) {
        console.log ('mysql login error:', err)
        next('configs', 'setup')
    }
}

exports.setFlag = (type, callback) => {
    /* sets a flag indicating source of failed verification error */
    try {
        if (!files.checkExists('temp')) {
            files.createFolder('temp')
        }
        files.writeVal('temp/flag.txt', type, (err, res) => {
            if (err) { 
                callback (err, null) 
            } 
            else {
                callback (null, `${type} flag set`)
            }
        })
    }
    catch (err) {
        console.log('set flag error:', err)
        callback (err, null)
    }
}