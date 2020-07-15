const tables = require ('./tables')
const credentials = require ('./credentials')
const connex = require ('./setup')
const auth = require ('./auth')

exports.createDatabase = async() => {
    /* creates the app database */
    try {
        let dbname = await this.getDbName()
        let sql = `CREATE DATABASE IF NOT EXISTS ${dbname} `
                    + `CHARACTER SET utf8 COLLATE utf8_general_ci`
        connex.query(sql, (err, rows) => {
            if (err) {
                throw(err)
            }
            else {
                return(rows)
            }
        })
    }
    catch (err) {
        console.log('create database error:', err)
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

exports.initializeDatabase = async() => {
    /* initializes the app database and accompanying tables */
    try {
        let db = this.createDatabase()
        let tables = this.createTables()
        let database = await Promise.all([db, tables])
        return (database)
    }
    catch (err) {
        console.log('initialize database error:', err)
    }
} 

exports.getDbName = _=> {
    /* returns the database name */
    try {
        if (auth.checkExists('credentials') && auth.checkExists('credentials/dbname')) {
            let dbname = auth.getFileContents('credentials', 'dbname')
            return (dbname)
        }
        else if (!auth.checkExists('credentials')) {
            credentials.createFolder('credentials')
        }
        credentials.writeVal('credentials/dbname.txt', 'reel')
        return('reel')
    }
    catch (err) {
        console.log('get database name error:', err)
    }
}

exports.setDbName = (dbname) => {
    /* sets the databse name */
    try {
        if (!auth.checkExists('credentials')) {
            credentials.createFolder('credentials')
        }
        credentials.writeVal('credentials/dbname.txt', dbname)
    }
    catch {
        console.log('set database name error', err)
    }
}