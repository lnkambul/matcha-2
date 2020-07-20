const credentials = require ( './credentials' )

exports.main = async ( next ) => {
    /* checks database login credentials */
    try {
        credentials.connection ( err => {
            if ( err ) {
                console.log ('mysql connection error:', err )
                next ( 'configs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
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
        credentials.verifyDb ( form.username, form.password, hostname, ( err ) => {
            if ( err ) {
                console.log ( 'mysql login details error:', err )
                next ( 'configs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( 'mysql login error:', err )
        next ( 'configs', 'setup' )
    }
}

exports.testEmail = async ( next ) => {
    /* verifies gmail logins */
    try {
        credentials.email ( user.email, subject, text, err => {
            if ( err ) {
                next ( 'configs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( 'gmail logins error:', err )
        next ( 'configs', 'setup' )
    }
}

exports.setEmail = async ( form, next ) => {
    /* sets and verifies gmail logins */
    try {
        credentials.verifyEmail( form.email, form.password, err => {
            if ( err ) {
                console.log ( 'gmail login error:', err )
                next ( 'configs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( 'email setup error:', err )
        next ( 'configs', 'setup' )
    }
}