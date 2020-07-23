const credentials = require ( '../config/credentials' )
const session = require ( 'client-sessions' )

exports.forgotPassword = async ( form, callback ) => {
    /* sends a link to reset user's password */
    try {
        let subject = 'reset password'
        let text = ''
        credentials.email ( form.email, subject, text, ( err, res ) => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                callback ( null, res )
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.login = async ( form, callback ) => {
    /* logs a user in */
    try {

    }
    catch ( err ) {
        
    }

}