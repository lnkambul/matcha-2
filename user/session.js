const bcrypt = require ( 'bcrypt' )
const credentials = require ( '../config/credentials' )
const query = require ( './query' )

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

exports.validate = async ( form, callback ) => {
    /* logs a user in */
    try {
        query.read ( 'users', 'password', { username : form.username }, ( err, res ) => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                bcrypt.compare ( form.password, res [ 0 ].password, ( err, isMatch ) => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, isMatch )
                    }
                })
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }

}