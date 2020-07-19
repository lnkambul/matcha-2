const creation = require ('./creation')

exports.main = async ( form, next ) => {
    /* checks database login credentials */
    try {
        creation.validate ( form, ( err, res ) => {
            if ( err ) {
                console.log ( 'input validation error:', err )
                next ( 'signup', 'anon' )
            }
            else {
                creation.capture ( res, err => {
                    if ( err ) {
                        console.log ( 'input capture error:', err )
                        next ( 'signup', 'anon' )
                    }
                    else {
                        console.log ('user signup successful')
                        next ( 'login', 'anon' )
                    }
                })
            }
        })
    }
    catch( err ) { 
        console.log ('user creation error:', err )
        next( 'login', 'anon' )
    }
}
