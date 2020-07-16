const credentials = require ('./credentials')

exports.main = async(next) => {
    /* checks database login credentials */
    try {
            credentials.connection((err, res) => {
                if (err) {
                    next('configs', 'setup')
                }
                else {
                    next('index', 'main')
                }
            })
    }
    catch(err) { 
        console.log('database authenticate error thrown:', err)
        next('configs', 'setup')
    }
}

exports.mysqlLogin = async(req, next) => {
    /* captures and processes mysql login credentials */
    try {
        let hostname = req.body.hostname || 'localhost'
        credentials.verifyDbLogins(req.body.username, req.body.password, hostname, (err, res) => {
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
        console.log ('mysql login error thrown:', err)
        next('configs', 'setup')
    }
}