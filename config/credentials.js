const mysql = require ( 'mysql' )
const files = require ( './files' )

exports.getDbLogins = async ( callback ) => {
    /* fetches mysql login details from file */
    try {
            let credentials = [ 'user', 'password', 'hostname' ].map ( value => {
                return (
                    new Promise (( resolve, reject ) => {
                        files.getFileContents ( `mysql/${ value }`, ( err, res ) => {
                            if ( err ) {
                                reject ( err )
                            }
                            else {
                                resolve ( res )
                            }
                        })
                    })
                )
            })
            Promise.all ( credentials ).then ( logins => {
                callback ( null, { user: logins[0], password: logins[1], hostname: logins[2] })
            }).catch ( err => { callback ( err, null ) })  
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.verifyDbLogins = async ( user, password, hostname, callback ) => {
    /* verifies mysql logins */
    try {
        this.connection (( err,res ) => {
            if ( err ) {
                callback ( err, null )
            }
            try {
                let credentials = new Map ([ [ 'hostname', hostname ], [ 'user', user ], [ 'password', password ] ])
                if( !files.checkExists ( 'mysql' )) {
                    files.createFolder ( 'mysql', err => { if ( err ) { callback ( err, null ) } } )
                }
                for ( const [ key, value ] of credentials ) {
                    files.writeVal ( `mysql/${ key }`, value, ( err ) => {
                        if ( err ) {
                            callback ( err, null )
                        }
                    })
                }
            }
            catch ( err ) {
               callback ( err, null )
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.connection = async ( callback ) => {
    try {
        this.getDbLogins (( err, res ) => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                let connection = mysql.createConnection ({
                    user: res.user,
                    password : res.password,
                    host: res.hostname,
                })
                connection.connect ( err => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        console.log ( `connected to database` )
                        callback ( null, connection )
                    }
                })
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}