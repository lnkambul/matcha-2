const credentials = require ( './credentials' )

exports.main = async ( next ) => {
    /* checks database login credentials */
    try {
            credentials.connection (( err, res ) => {
                if ( err ) {
                    console.log ('mysql connection error:', err)
                    next ( 'configs', 'setup' )
                }
                else {
                    next ( 'index', 'anon' )
                }
            })
    }
    catch( err ) { 
        console.log ( 'database error:', err )
        next ( 'configs', 'setup' )
    }
}

exports.mysqlLogin = async ( form, next ) => {
    /* captures and processes mysql login credentials */
    try {
        let hostname = form.hostname || 'localhost'
        credentials.verifyDbLogins ( form.username, form.password, hostname, ( err ) => {
            if ( err ) {
                console.log ( 'mysql login details verification error:', err )
                next ( 'configs', 'setup' )
            }
            else {
                next ( 'index', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( 'mysql login error:', err )
        next ( 'configs', 'setup' )
    }
}