const tables = require ('./tables')
const files = require ('./files')
const credentials = require ('./credentials')

exports.createDb = async(callback) => {
    /* creates the app database */
    try {
        let promise = new Promise((res, rej) => {
            this.getDbName((err, res) => {
                if (err) {
                    console.log('database name retreival error:', err)
                    rej (err)
                }
                else {
                    const dbname = res
                }
            })
        })
        promise.then (dbname => {
            let sql = `CREATE DATABASE IF NOT EXISTS ${dbname} `
                    + `CHARACTER SET utf8 COLLATE utf8_general_ci`
            credentials.connection((err, res) => {
                if (err) {
                    console.log('failed to connect to database:', err)
                    callback (err, null)
                }
                res.query(sql, (err, rows) => {
                    if (err) {
                        console.log('failed to initialize database:', err)
                        callback (err, null)
                    }
                    else {
                        callback (null, rows)
                    }
                })
            })
        }).catch (err => {
            console.log ('create database error thrown:', err)
            callback (err, null)
        })
    }
    catch (err) {
        console.log('create database error thrown:', err)
        callback (err, null)
    }
}

exports.createTables = async(callback) => {
    /* creates the app database tables */
    try {
        tables.tablesArray((err, res) => {
            if (err) {
                console.log('tables array error:', err)
                callback (err, null)
            }
            credentials.query((error, connection) => {
                if (error) {
                    callback (error, null)
                }
                let promise = new Promise (async(resolve, reject) => {
                    let tabs = []
                    for (const val of res) {
                        let sql = val
                        await connection.query(sql, (err, rows) => {
                            if (err) {
                                console.log('create tables error:', err)
                                callback (err, null)
                            }
                            else {
                                tabs = [...tabs, rows]
                            }
                        })
                    }
                    resolve (tabs)
                })
                promise.then(_=> {
                    callback (null, 'tables created successfully')
                })
            })
        })
    }
    catch (err) {
        console.log('table creation error thrown:', err)
    }
}

exports.initDb = async(callback) => {
    /* initializes the app database and accompanying tables */
    try {
        await this.createDb((err, res) => {
            if (err) {
                console.log('initialize database error:', err)
                callback (err)
            }
        })
        this.createTables((err, res) => {
            if (err) {
                console.log('initialize tables error', err)
                callback (err)
            }
            else {
                console.log('database created successfully')
            }
        })
    }
    catch (err) {
        console.log('initialize database error thrown:', err)
        callback (err, null)
    }
} 

exports.getDbName = async(callback) => {
    /* returns the database name */
    try {
        if (files.checkExists('credentials') && files.checkExists('credentials/dbname')) {
            files.getFileContents('credentials/dbname', (err, res) => {
                callback (null, res)
            })
        }
        else if (!files.checkExists('credentials')) {
            files.createFolder('credentials')
        }
        files.writeVal('credentials/dbname.txt', 'reel')
        callback (null, 'reel')
    }
    catch (err) {
        console.log('get database name error thrown:', err)
        callback (err, null)
    }
}

exports.setDbName = (dbname) => {
    /* sets the database name */
    try {
        if (!files.checkExists('credentials')) {
            files.createFolder('credentials')
        }
        files.writeVal('credentials/dbname.txt', dbname)
    }
    catch {
        console.log('set database name error thrown', err)
    }
}