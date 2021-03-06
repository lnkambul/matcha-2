const creation = require ( './creation' )
const session = require ( './session' )
const { callbackPromise } = require('nodemailer/lib/shared')

exports.main = async ( req, next ) => {
    /* checks database login credentials */
    try {
        let validated = new Promise (( resolve, reject ) => {
            creation.validate ( req.body, ( err, res ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( res )
                }
            })
        })
        validated.then( res => {
            creation.capture ( res, ( err, user ) => {
                if ( err ) {
                    console.log ( `input capture error: ${ err }` )
                    next ( 'signup', 'anon' )
                }
                else {
                    creation.verificationLink ( req, error => {
                        if ( err ) {
                            console.log ( `verification link error ${ error }` )
                            next ( 'emailconfigs', 'setup' )
                        }
                        else {
                            console.log ( `user ${ user } created` )
                            next ( 'login', 'anon' )
                        }
                    })
                }
            }).catch ( err => {
                console.log ( `user creation error: ${ err }`)
                next ( 'signup', 'anon' )
            })             
        })
    }
    catch( err ) { 
        console.log ( `user creation error: ${ err }` )
        next( 'login', 'anon' )
    }
}

exports.mail = async ( form, next ) => {
    /* sends email with password reset link */
    try {
        session.forgotPassword ( form, err => {
            if ( err ) {
                console.log ( 'err' )
                next ( 'forgot-password', 'anon' )
            }
            else {
                next ( 'reset-password', 'anon' )
            }
        })
    }
    catch ( err ) {
        console.log ( `email configuration error: ${ err }` )
        next ( 'login', 'anon' )
    }
}

exports.verify = async ( originalURL, next ) => {
    /* verifies user creation token */
    try {
        if ( originalURL.indexOf ( 'token' ) != 7 ) {
            next ( 'login', 'anon' )
        }
        else {
            token = originalURL.slice( originalURL.indexOf ( 'token' ) + 6 )
            creation.validateToken ( token, err => {
                if ( err ) {
                    console.log ( `token validation error: ${ err }` )
                    next ( 'login', 'anon' )
                }
                else {
                    next ( 'index', 'main' )
                }
            })
        }
    }
    catch ( err ) {
        console.log ( `token validation error: ${ err }` )
        next ( 'signup', 'anon' )
    }
}

exports.login = async ( form, next ) => {
    /* logs a validated user in */
    try {
        session.validate ( form, err => {
            if ( err ) {
                console.log ( `user validation error ${ err }` )
                next ( 'login', 'anon' )
            }
            else {
                console.log ( `${ form.username } logged in` )
                next ( 'index', 'main' )
            }
        })
    }
    catch ( err ) {
        console.log ( `user login error ${ err }` )
        next ( 'login', 'anon' )
    }
}