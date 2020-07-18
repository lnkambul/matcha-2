const mysql = require ( 'mysql' )
const files = require ( './files' )

exports.getDbLogins = async ( callback ) => {
    /* fetches mysql login details from file */
    try {
            let promises = [ 'user', 'password', 'hostname' ].map ( value => {
                return (
                    new Promise ( (resolve, reject ) => {
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
            Promise.all ( promises ).then ( logins => {
                callback ( null, { user: logins[0], password: logins[1], hostname: logins[2] })
            }).catch ( err => { console.log( err ) })  
    }
    catch ( err ) {
        console.log ( 'get mysql login details error thrown:', err )
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
                    files.createFolder ( 'mysql' )
                }
                for ( const [ key, value ] of credentials ) {
                    files.writeVal ( `mysql/${ key }`, value, ( err ) => {
                        if ( err ) {
                            callback ( err, null )
                        }
                    })
                }
                callback ( null, credentials )
            }
            catch ( err ) {
                console.log ( 'error encountered while updating mysql credentials:', err )
            }
        })
    }
    catch ( err ) {
        console.log ( 'verify database login credentials error thrown:', err )
        callback ( err, null )
    }
}

exports.connection = async ( callback ) => {
    try {
        this.getDbLogins (( err, res ) => {
            if ( err ) {
                console.log ( 'database login details retreival error:', err )
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
                        console.log ( 'database connection error:', err )
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
        console.log ( 'database connection error thrown:', err )
        callback ( err, null )
    }
}