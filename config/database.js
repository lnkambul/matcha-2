const tables = require ('./tables')
const files = require ('./files')
const connex = require ('./setup')

exports.createDatabase = async(callback) => {
    /* creates the app database */
    try {
        let dbname = await this.getDbName()
        let sql = `CREATE DATABASE IF NOT EXISTS ${dbname} `
                    + `CHARACTER SET utf8 COLLATE utf8_general_ci`
        connex.query(sql, (err, rows) => {
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
        console.log('create database error:', err)
        callback(err, null)
    }
}

exports.createTables = async() => {
    /* creates the app database tables */
    try {
        let tabs = await tables.tablesArray()
        /*
        for (let i in result) {
            sql = result[i]
            connex.query(sql, (err, rows) => {
                if (err) {
                    throw(err)
                }
                else {
                    return(rows)
                }
            })
        }
        */
        let result = tabs.map(async val => {
            let sql = await connex.query(val, (err, rows) => {
                if (err) {
                    throw(err)
                }
                else {
                    console.log(rows)
                }
            })
        })
    }
    catch (err) {
        console.log('table creation error:', err)
    }
}

exports.initializeDatabase = async(callback) => {
    /* initializes the app database and accompanying tables */
    try {
        let db = await this.createDatabase((err, res) => {if (err) { throw(err) }})
        let tables = this.createTables((err, res) => { if (err) { throw(err) } })
        let database = await Promise.all([db, tables])
        callback (null, database)
    }
    catch (err) {
        console.log('initialize database error:', err)
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
        console.log('get database name error:', err)
        callback (err, null)
    }
}

exports.setDbName = (dbname) => {
    /* sets the databse name */
    try {
        if (!files.checkExists('credentials')) {
            files.createFolder('credentials')
        }
        files.writeVal('credentials/dbname.txt', dbname)
    }
    catch {
        console.log('set database name error', err)
    }
}