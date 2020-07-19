const bcrypt = require ( 'bcrypt' )
const validate = require ( './validate' )
const database = require( '../config/database' )
const query = require ( './query' )

exports.validate = async ( form, callback ) => {
    try {
        let user = {
            'username' : form.username,
            'password' : form.password,
            'firstname' : form.firstname,
            'lastname' : form.lastname,
            'email' : form.email
        }
        let validated = Object.entries ( user ).map (([ key, value ]) => {
            return (
                new Promise (( res, rej ) => {
                    this.switcher ( key, value, ( err, val ) => {
                        if ( err ) {
                            rej ( err )
                        }
                        else {
                            res ( val )
                        }
                    })
                })
            )
        })
        Promise.all ( validated ).then ( _=> {
            callback ( null, user )
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.switcher = async ( key, value, callback ) => {
    switch ( key ) {
        case 'username':
            validate.username ( value, ( err, res ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    callback ( null, key )
                }
            })
            break
        case 'password':
            validate.password ( value, ( err, res ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    callback ( null, key )
                }
            })
            break
        case 'email':
            validate.email ( value, ( err, res ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    callback ( null, key )
                }
            })
            break
        default:
            validate.name ( value, ( err, res ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    callback ( null, key )
                }
            })
    }
}

exports.capture = async ( user, callback ) => {
    try {
        database.initDb ( err => {
            if ( err ) {
                callback ( err, null )
            }
        })
        query.create ( 'users', user, ( err, res ) => {
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

exports.hash = async ( key, callback ) => {
    /* hashes a string */
    try {
        bcrypt.genSalt ( 10, ( err, salt ) => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                bcrypt.hash ( key, salt, ( err, hash ) => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, hash )
                    }
                })
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}