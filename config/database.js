const tables = require ( './tables' )
const files = require ( './files' )
const credentials = require ( './credentials' )

exports.createDb = async( callback ) => {
    /* creates the app database */
    try {
        let promise = new Promise (( resolve, reject ) => {
            this.getDbName (( err, res ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( res )
                }
            })
        })
        promise.then ( dbname => {
            let sql = `CREATE DATABASE IF NOT EXISTS ${ dbname } `
                    + `CHARACTER SET utf8 COLLATE utf8_general_ci`
            credentials.connection (( err, res ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    res.query ( sql, ( err, rows ) => {
                        if ( err ) {
                            callback ( err, null )
                        }
                        else {
                            callback ( null, rows )
                        }
                    })
                }
            })
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch (err) {
        callback ( err, null )
    }
}

exports.createTables = async( callback ) => {
    /* creates the app database tables */
    try {
        tables.tablesArray (( err, res ) => {
            if ( err ) {
                callback ( err, null )
            }
            credentials.connection (( error, connection ) => {
                if ( error ) {
                    callback ( error, null )
                }
                let tabs = res .map ( value => {
                    return (
                        new Promise (( resolve, reject ) => {
                            connection.query ( value, ( err, rows ) => {
                                if ( err ) {
                                    reject ( err )
                                }
                                else {
                                    resolve ( rows )
                                }
                            })
                        })
                    )
                })
                Promise.all ( tabs ).then ( tabs => {
                    callback ( null, tabs )
                }).catch ( err => {
                    callback (err, null)
                })
            })
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.initDb = async ( callback ) => {
    /* initializes the app database and accompanying tables */
    try {
        let db = new Promise (( resolve, reject ) => {
            this.createDb (( err, res ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( res )
                }
            })    
        })
        db.then ( db => {
            this.createTables (( err, res ) => {
                if ( err ) {
                    callback ( err )
                }
                else {
                    callback ( null, [ db, res ])
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

exports.getDbName = async ( callback ) => {
    /* returns the database name */
    try {
        if ( files.checkExists ( 'mysql' ) && files.checkExists ( 'mysql/dbname' )) {
            files.getFileContents ( 'mysql/dbname', ( err, res ) => {
                if ( err ) {
                    callback ( err, null )
                }
                else {
                    callback ( null, res )
                }
            })
        }
        else {
            let def = 'reel'
            this.setDbName ( def )
            callback ( null, def )
        }
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.setDbName = ( dbname ) => {
    /* sets the database name */
    try {
        if ( !files.checkExists ( 'mysql' )) {
            files.createFolder ( 'mysql', err => { if ( err ) { console.log ( 'create folder error:', err) } })
        }
        files.writeVal ( 'mysql/dbname', dbname, ( err ) => { 
            if ( err ) {
                console.log ( `write database name error: ${ err }` )
            }
         })
    }
    catch {
        console.log ( `set database name error thrown: ${ err }` )
    }
}