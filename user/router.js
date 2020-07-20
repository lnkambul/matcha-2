const creation = require ( './creation' )
const session = require ( './session' )

exports.main = async ( form, next ) => {
    /* checks database login credentials */
    try {
        creation.validate ( form, ( err, res ) => {
            if ( err ) {
                console.log ( 'input validation error:', err )
                next ( 'signup', 'anon' )
            }
            else {
                creation.capture ( res, ( err, rows ) => {
                    if ( err ) {
                        console.log ( 'input capture error:', err )
                        next ( 'signup', 'anon' )
                    }
                    else {
                        console.log ( rows )
                        next ( 'login', 'anon' )
                    }
                })
            }
        })
    }
    catch( err ) { 
        console.log ( 'user creation error:', err )
        next( 'login', 'anon' )
    }
}

exports.mail = async ( form, next ) => {
    try {
        session.forgotPassword ( form, ( err, res ) => {
            if ( err ) {
                console.log ( 'err' )
                next ( 'login', 'anon' )
            }
            else {
                console.log ( res )
                next ( 'index', 'main' )
            }
        })
    }
    catch ( err ) {
        console.log ( 'email configuration error', err )
        next ( 'login', 'anon' )
    }
}