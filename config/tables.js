const database = require ( './database' )

exports.tablesArray = async ( callback ) => {
    /* initializes an array with the database tables' sql creation queries */
    try {
        database.getDbName (( err, dbname ) => {
            if ( err ) {
                callback ( err, null )
            }

            let users = `CREATE TABLE IF NOT EXISTS ${ dbname }.users (`
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
  
            let likes = `CREATE TABLE IF NOT EXISTS ${ dbname }.likes (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`liker int(12) UNSIGNED NOT NULL, `
                        +`likee int(12) UNSIGNED NOT NULL, `
                        +`reciprocated int(1) UNSIGNED DEFAULT 0, `
                        +`PRIMARY KEY (id), `
                        +`FOREIGN KEY (liker) REFERENCES ${ dbname }.users(id), `
                        +`FOREIGN KEY (likee) REFERENCES ${ dbname }.users(id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`
                
            let blocks = `CREATE TABLE IF NOT EXISTS ${ dbname }.blocks (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`blocker int(12) UNSIGNED NOT NULL, `
                        +`blockee int(12) UNSIGNED NOT NULL, `
                        +`PRIMARY KEY (id), `
                        +`FOREIGN KEY (blocker) REFERENCES ${ dbname }.users(id), `
                        +`FOREIGN KEY (blockee) REFERENCES ${ dbname }.users(id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`
                
            let location = `CREATE TABLE IF NOT EXISTS ${ dbname }.location (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`user int(12) UNSIGNED NOT NULL, `
                        +`city varchar(20) NOT NULL, `
                        +`country varchar(20) NOT NULL, `
                        +`latitude decimal(6, 4) NOT NULL, `
                        +`longitude decimal(6, 4) NOT NULL, `
                        +`PRIMARY KEY (id), `
                        +`FOREIGN KEY (user) REFERENCES ${ dbname }.users(id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`

            let pokens = `CREATE TABLE IF NOT EXISTS ${ dbname }.pokens (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`user int(12) UNSIGNED NOT NULL, `
                        +`token varchar(60) NOT NULL, `
                        +`PRIMARY KEY (id), `
                        +`FOREIGN KEY (user) REFERENCES ${ dbname }.users(id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`

            let vokens = `CREATE TABLE IF NOT EXISTS ${ dbname }.vokens (`
                        +`id int(12) UNSIGNED NOT NULL AUTO_INCREMENT, `
                        +`user int(12) UNSIGNED NOT NULL, `
                        +`token varchar(60) NOT NULL, `
                        +`PRIMARY KEY (id), `
                        +`FOREIGN KEY (user) REFERENCES ${ dbname }.users(id)`
                        +`) ENGINE=InnoDB DEFAULT CHARSET=utf8`


            let tables = [ users, likes, blocks, location, pokens, vokens ]
            callback ( null, tables )
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}