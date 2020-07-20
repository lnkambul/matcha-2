const credentials = require ( '../config/credentials' )

exports.forgotPassword = async ( form, callback ) => {
    credentials.email ( form.email, ( err, res ) => {
        if ( err ) {
            callback ( err, null )
        }
        else {
            callback ( null, res )
        }
    })
}