const connex = require('./setup')
const tables = require('./tables')
//const dbname = 'inIIit'


exports.create = (callback) => {
    let sql = `CREATE DATABASE IF NOT EXISTS ${dbname} `
                + `CHARACTER SET utf8 COLLATE utf8_general_ci`
    connex.query(sql, (err, rows) => {
        if (err) {
            callback(err, null)
        }
        else {
            callback(null, rows)
        }
    })
}

exports.tables = (callback) => {
    let promise = new Promise ((res, rej) => {
        tables.tablesArray(result => {
            res(result)
        })
    })
    promise.then(result => {
        for (let i in result) {
            sql = result[i]
            connex.query(sql, (err, rows) => {
                if (err) {
                    callback(err, null)
                }
                else {
                    callback(null, rows)
                }
            })
        }
    })
}

exports.dbname = (callback) => {
    if (dbname) {
        callback(null, dbname)
    }
    else {
        callback("database name is not initialized", null)
    }
}