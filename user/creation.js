const bcrypt = require ( 'bcrypt' )
const validate = require ( './validate' )
const database = require( '../config/database' )
const credentials = require ( '../config/credentials' )
const query = require ( './query' )

exports.validate = async ( form, callback ) => {
    /* validates signup form */
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
            this.hash ( form.password, ( err, hash ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    let hashed = new Promise (( res ) => {
                        user.password = hash
                        res ( user.password )
                    })
                    hashed.then ( _=> {
                        callback ( null, user )
                    }).catch ( err => {
                        callback ( err, null )
                    })
                }
            })
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.switcher = async ( key, value, callback ) => {
    /* sends input to the appropriate validator function */
    try {
        switch ( key ) {
            case 'username':
                validate.username ( value, ( err, res ) => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, res )
                    }
                })
                break
            case 'password':
                validate.password ( value, ( err, res ) => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, res )
                    }
                })
                break
            case 'email':
                validate.email ( value, ( err, res ) => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, res )
                    }
                })
                break
            default:
                validate.name ( value, ( err, res ) => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, res )
                    }
                })
        }
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.capture = async ( user, callback ) => {
    /* captures a new user's data */
    try {
        database.initDb ( err => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                query.create ( 'users', user, ( err, res ) => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, user.username )
                    }
                })
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.verificationLink = async ( req, callback ) => {
    /* sends a user verification link */
    try {
        let token = new Promise (( resolve, reject ) => {
            this.hash ( req.body.email, ( err, res ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( res )
                }
            })
        })
        token.then ( hash => {
            let link = `${ req.protocol }://${ req.get( 'host' )}/login?token=${ hash }`
            let subject = 'verification link'
            let text = `click <a href="${ link }" style="text-decoration: none;">here</a> `
                        +`to verify your reel account`
            credentials.email ( req.body.email, subject, text, ( err, res ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    this.saveToken ( 'tokens', req.body.username, hash, ( error, rows ) => {
                        if ( error ) {
                            callback ( error, null )
                        }
                        else {
                            callback ( null,  rows )
                        }
                    })
                }
            })
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.saveToken = async ( table, user, token, callback ) => {
    /* stores token in the database */
    query.read ( 'users', 'id', { username : user }, ( err, res ) => {
        if ( err ) {
            callback ( err, null )
        }
        else {
            query.create ( table, { user : res [ 0 ].id, token : token }, ( err, res ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    callback ( null, res )
                }
            })
        }
    })
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

exports.validateToken = async ( token, callback ) => {
    /* validates user and deletes token from the database if token is valid */
    try {
        query.read ( 'tokens', 'user', { token : token }, ( err, res ) =>{
            if ( err ) {
                callback ( err, null )
            }
            else {
                let updated = new Promise (( resolve, reject ) => {
                    query.update ( 'users', { verified : 1 }, { id : res [ 0 ].user }, ( err, res ) => {
                        if ( err ) {
                            reject ( err )
                        }
                        else {
                            resolve ( res )
                        }
                    })
                })
                updated.then ( _=> {
                    query.delete ( 'tokens', { token : token }, ( err, res ) => {
                        if ( err ) {
                            callback ( err, null )
                        }
                        else {
                            callback ( null, res )
                        }
                    })
                }).catch ( err => {
                    callback ( err, null )
                })
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}