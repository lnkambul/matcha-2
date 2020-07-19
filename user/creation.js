const bcrypt = require ( 'bcrypt' )
const validate = require ( './validate' )
const database = require( '../config/database' )
const query = require ( './query' )

exports.validate = async ( form, callback ) => {
    try {
        let user = {
                    'username': form.username,
                    'password': form.password,
                    'firstname': form.firstname,
                    'lastname': form.lastname,
                    'email': form.email
        }
        let promises = Object.entries ( user ).map ( key => {
            return (
                new Promise (( res, rej ) => {
                    console.log ( key )
                    this.switcher ( key[0], key[1], err => {
                        if ( err ) {
                            rej ( err )
                        }
                        else {
                            res ( key )
                        }
                    })
                })
            )
        })
        Promise.all ( promises ).then ( valid => {
            console.log ( 'valid:', valid )
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
            validate.username ( value, err => { if ( err ) { callback ( err ) } })
            break
        case 'password':
            validate.password ( value, err => { if ( err ) { callback ( err ) } })
            break
        case 'email':
            validate.email ( value, err => { if ( err ) { callback ( err ) } })
            break
        default:
            validate.name ( value, err => { if ( err ) { callback ( err ) } })
    }
}

exports.capture = async ( user, callback ) => {
    try {
        database.initDb ( err => { if ( err ) { callback ( err, null ) } })
        query.create ( user, 'users', err => { if ( err ) { callback ( err, null ) } })
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