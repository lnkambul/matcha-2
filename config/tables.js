const database = require('./database')

exports.tablesArray = (callback) => {
    let promise = new Promise((res, rej) => {
        database.dbname((err , name) => {
            if (err) {
                console.log(err)
                rej(err)
            }
            else {
                res(name)
            }
        })
    })
    promise.then(dbname => {
        let tables = []

        let users = `CREATE TABLE IF NOT EXISTS ${dbname}.users (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`username varchar(20) UNIQUE NOT NULL, `
                        +`firstname varchar(50) NOT NULL, `
                        +`lastname varchar(50) NOT NULL, `
                        +`email varchar(140) NOT NULL, `
                        +`password varchar(60) NOT NULL, `
                        +`gender varchar(10) DEFAULT NULL, `
                        +`preference varchar(5) DEFAULT 'both', `
                        +`bio varchar(140) DEFAULT NULL, `
                        +`interests varchar(60) DEFAULT NULL, `
                        +`pics int(1) UNSIGNED DEFAULT 0, `
                        +`visitors int(12) UNSIGNED DEFAULT 0, `
                        +`likes int(12) UNSIGNED DEFAULT 0, `
                        +`matches int(12) UNSIGNED DEFAULT 0, `
                        +`city varchar (85) DEFAULT NULL, `
                        +`country varchar (60) DEFAULT NULL, `
                        +`verified int(1) UNSIGNED DEFAULT 0, `
                        +`suspended int(1) UNSIGNED DEFAULT 0, `
                        +`lastseen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, `
                        +`PRIMARY KEY (id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`
        
        let likes = `CREATE TABLE IF NOT EXISTS ${dbname}.likes (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`liker int(12) UNSIGNED NOT NULL, `
                        +`likee int(12) UNSIGNED NOT NULL, `
                        +`reciprocated int(1) UNSIGNED DEFAULT 0, `
                        +`PRIMARY KEY (id), `
                        +`FOREIGN KEY (liker) REFERENCES ${dbname}.users(id), `
                        +`FOREIGN KEY (likee) REFERENCES ${dbname}.users(id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`
        
        let blocks = `CREATE TABLE IF NOT EXISTS ${dbname}.blocks (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`blocker int(12) UNSIGNED NOT NULL, `
                        +`blockee int(12) UNSIGNED NOT NULL, `
                        +`PRIMARY KEY (id), `
                        +`FOREIGN KEY (blocker) REFERENCES ${dbname}.users(id), `
                        +`FOREIGN KEY (blockee) REFERENCES ${dbname}.users(id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`
        
        let places = `CREATE TABLE IF NOT EXISTS ${dbname}.places (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`city varchar(20) NOT NULL, `
                        +`country varchar(20) NOT NULL, `
                        +`latitude decimal(6, 4) NOT NULL, `
                        +`longitude decimal(6, 4) NOT NULL, `
                        +`PRIMARY KEY (id), `
                        +`FOREIGN KEY (user) REFERENCES ${dbname}.users(id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`
    
        callback(null, tables = [...tables, users, likes, blocks, places])
    }).catch(err => {
        callback(err, null)
    })
}