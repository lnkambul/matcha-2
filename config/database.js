const tables = require ('./tables')
const files = require ('./files')
const connection = require ('./dblogins')

exports.createDb = async(callback) => {
    /* creates the app database */
    try {
        let dbname = await this.getDbName()
        let sql = `CREATE DATABASE IF NOT EXISTS ${dbname} `
                    + `CHARACTER SET utf8 COLLATE utf8_general_ci`
        connection.query(sql, (err, rows) => {
            if (err) {
                console.log('failed to connect to database:', err)
                callback(err, null)
            }
            else {
                callback(null, rows)
            }
        })
    }
    catch (err) {
        console.log('create database error thrown:', err)
        callback(err, null)
    }
}

exports.createTables = async(callback) => {
    /* creates the app database tables */
    try {
        let result = await tables.tablesArray()
        for (const val of result) {
            sql = val
            connection.query(sql, (err, rows) => {
                if (err) {
                    console.log('create tables error:', err)
                    callback(err, null)
                }
                else {
                    callback(null, rows)
                }
            })
        }
    }
    catch (err) {
        console.log('table creation error thrown:', err)
    }
}

exports.initDb = async(callback) => {
    /* initializes the app database and accompanying tables */
    try {
        let db = await this.createDb((err, res) => {if (err) { console.log('initialize database error:', err) }})
        let tables = this.createTables((err, res) => { if (err) { console.log('initialize tables error', err) } })
        let database = await Promise.all([db, tables])
        callback (null, database)
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
            files.writeVal('credentials/dbname.txt', 'reel')
            callback(null, 'reel')
        }
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