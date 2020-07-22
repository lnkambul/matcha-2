const credentials = require ( './credentials' )

exports.main = async ( next ) => {
    /* checks database login credentials */
    try {
        credentials.connection ( err => {
            if ( err ) {
                console.log ('mysql connection error:', err )
                next ( 'dbconfigs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch( err ) { 
        console.log ( 'database error:', err )
        next ( 'dbconfigs', 'setup' )
    }
}

exports.mysqlLogin = async ( form, next ) => {
    /* captures and processes mysql login credentials */
    try {
        let hostname = form.hostname || 'localhost'
        credentials.verifyDb ( form.username, form.password, hostname, ( err ) => {
            if ( err ) {
                console.log ( 'mysql login details error:', err )
                next ( 'dbconfigs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( 'mysql login error:', err )
        next ( 'dbconfigs', 'setup' )
    }
}

exports.testEmail = async ( next ) => {
    /* verifies gmail logins */
    try {
        let subject = 'this is a test email'
        let text = 'success!'
        credentials.email ( null, subject, text, err => {
            if ( err ) {
                next ( 'emailconfigs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( 'gmail config error:', err )
        next ( 'emailconfigs', 'setup' )
    }
}

exports.setEmail = async ( form, next ) => {
    /* sets and verifies gmail logins */
    try {
        credentials.verifyEmail( form.email, form.password, err => {
            if ( err ) {
                console.log ( 'gmail login error:', err )
                next ( 'emailconfigs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( 'email setup error:', err )
        next ( 'emailconfigs', 'setup' )
    }
}