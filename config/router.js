const credentials = require ( './credentials' )
const database = require ( './database' )

exports.main = async ( next ) => {
    /* checks database login credentials */
    try {
        credentials.connection ( err => {
            if ( err ) {
                console.log ( `mysql connection error: ${ err }` )
                next ( 'dbconfigs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch( err ) { 
        console.log ( `database error: ${ err }` )
        next ( 'dbconfigs', 'setup' )
    }
}

exports.mysqlLogin = async ( form, next ) => {
    /* captures and processes mysql login credentials */
    try {
        let hostname = form.hostname || 'localhost'
        let db = new Promise (( resolve, reject ) => {
            credentials.verifyDb ( form.username, form.password, hostname, ( err, connection ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( connection )
                }      
            })  
        })
        db.then ( _=> {
            database.initDb ( err => {
                if ( err ) {
                    console.log ( `database initialization error ${ err }` )
                    next ( 'dbconfigs', 'setup' )
                }
                else {
                    console.log ( 'database initialized' )
                    next ( 'signup', 'anon' )
                }
            })
        }).catch ( err => {
            console.log ( `mysql login error: ${ err }` )
            next ( 'dbconfigs', 'setup' )
        })
    }
    catch ( err ) {
        console.log ( `mysql login error: ${ err }` )
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
        console.log ( `gmail config error: ${ err }` )
        next ( 'emailconfigs', 'setup' )
    }
}

exports.setEmail = async ( form, next ) => {
    /* sets and verifies gmail logins */
    try {
        credentials.verifyEmail( form.email, form.password, err => {
            if ( err ) {
                console.log ( `gmail login error: ${ err }` )
                next ( 'emailconfigs', 'setup' )
            }
            else {
                next ( 'login', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( `email setup error: ${ err }` )
        next ( 'emailconfigs', 'setup' )
    }
}