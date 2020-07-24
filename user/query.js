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
            let values = Object.values ( object ).map ( value => { return ( value = `'${ value }'` ) } )
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

exports.read = async ( table, columns, conditionObject, callback ) => {
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
            let conditions = Object.entries ( conditionObject ).map (([ key, value ]) => {
                return (
                    new Promise ( resolve => {
                        let condition = `${ key } = '${ value }'`
                        resolve ( condition )
                    })
                )
            })
            Promise.all ( conditions ).then ( conditions => {
                let connection = new Promise (( resolve, reject ) => {
                    credentials.connection (( err, res ) => {
                        if ( err ) {
                            reject ( err )
                        }
                        else {
                            resolve ( res )
                        }
                    })
                })
                connection.then ( res => {
                    let joined = conditions.join ( ' AND ' )
                    let sql = `SELECT ${ columns } `
                            + `FROM ${ dbname }.${ table } `
                            + `WHERE ${ joined }`
                    res.query ( sql, ( err, rows ) => {
                        if ( err ) {
                            callback ( err, null )
                        }
                        else {
                            callback ( null, rows )
                        }
                    })
                })
            }).catch ( err => {
                callback ( err, null )
            })
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch (err) {
        callback ( err, null )
    }
}

exports.update = async ( table, object, conditionObject, callback ) => {
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
            let conditions = Object.entries ( conditionObject ).map (([ key, value ]) => {
                return (
                    new Promise ( resolve => {
                        let condition = `${ key } = '${ value }'`
                        resolve ( condition )
                    })
                )
            })
            Promise.all ( conditions ).then ( conditions => {
                let joined = conditions.join ( ' AND ' )
                let updated = Object.entries ( object ).map (([ key, value ]) => {
                    return (
                        new Promise (( resolve, reject ) => {
                            let sql = `UPDATE ${ dbname }.${ table } `
                                    + `SET ${ key } = ${ value } `
                                    + `WHERE ${ joined }`
                            credentials.connection (( err, res ) => {
                                if ( err ) {
                                    callback ( err, null )
                                }
                                else {
                                    res.query ( sql, ( err, rows ) => {
                                        if ( err ) {
                                            reject ( err )
                                        }
                                        else {
                                            resolve ( rows )
                                        }
                                    })
                                }
                            })
                        })
                    )
                })
                Promise.all ( updated ).then ( rows => {
                    callback ( null, rows )
                }).catch ( err => {
                    callback ( err, null )
                })    
            }).catch ( err => {
                callback ( err, null )
            })
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch (err) {
        callback ( err, null )
    }
}

exports.delete = async ( table, conditionObject, callback ) => {
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
            let conditions = Object.entries ( conditionObject ).map (([ key, value ]) => {
                return (
                    new Promise ( resolve => {
                        let condition = `${ key } = '${ value }'`
                        resolve ( condition )
                    })
                )
            })
            Promise.all ( conditions ).then ( conditions => {
                let joined = conditions.join ( ' AND ' )
                let sql = `DELETE FROM ${ dbname }.${ table } `
                        + `WHERE ${ joined }`
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
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch (err) {
        callback ( err, null )
    }
}