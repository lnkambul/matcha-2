const credentials = require ( '../config/credentials' )
const database = require ( '../config/database' )

exports.create = async ( table, object, callback ) => {
    /* populates a new row in the database */
    try {
        let promise = new Promise (( resolve, reject ) => {
            database.getDbName (( err, res ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( res )
                }
            })
        })
        promise.then ( dbname => {
            let values = Object.values ( object ).map ( key => { return ( key = `'${key}'` ) } )
            let sql = `INSERT INTO ${ dbname }.${ table } ( ${ Object.keys ( object ) } ) `
                    + `VALUES ( ${ values } )`
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

exports.read = async ( table, object, condition, callback ) => {
    /* fetches a row from the database */
    try {
        let promise = new Promise (( resolve, reject ) => {
            database.getDbName (( err, res ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( res )
                }
            })
        })
        promise.then ( dbname => {
            let values = Object.values ( object ).map ( key => { return ( key = `'${key}'` ) } )
            let sql = `SELECT ( ${ Object.keys ( object ) } ) `
                    + `FROM ${ dbname }.${ table }`
                    + `WHERE ( ${ condition } )`
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

exports.update = async ( table, object, condition, callback ) => {
    /* updates an existing row in the database */
    try {
        let promise = new Promise (( resolve, reject ) => {
            database.getDbName (( err, res ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( res )
                }
            })
        })
        promise.then ( dbname => {
            let values = Object.values ( object ).map ( key => { return ( key = `'${key}'` ) } )
            let sql = `UPDATE ${ dbname }.${ table } `
                    + `SET ( ${ Object.keys ( object ) } ) `
                    + `WHERE ( ${ condition } )`
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

exports.delete = async ( table, condition, callback ) => {
    /* deletes a row from the database */
    try {
        let promise = new Promise (( resolve, reject ) => {
            database.getDbName (( err, res ) => {
                if ( err ) {
                    reject ( err )
                }
                else {
                    resolve ( res )
                }
            })
        })
        promise.then ( dbname => {
            let values = Object.values ( object ).map ( key => { return ( key = `'${key}'` ) } )
            let sql = `DELETE FROM ${ dbname }.${ table } `
                    + `WHERE ( ${ Object.keys ( condition ) } )`
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