const mysql = require ( 'mysql' )
const nodemailer = require ( 'nodemailer' )
const files = require ( './files' )

exports.getLogins = async ( array, folder, callback ) => {
    /* fetches login details from file */
    try {
        let credentials = array.map ( value => {
            return (
                new Promise (( resolve, reject ) => {
                    files.getFileContents ( `${ folder }/${ value }`, ( err, res ) => {
                        if ( err ) {
                            reject ( err )
                        }
                        else {
                            resolve ( res )
                        }
                    })
                })
            )
        })
        Promise.all ( credentials ).then ( logins => {
            callback ( null, logins )
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.verifyDb = async ( user, password, hostname, callback ) => {
    /* verifies mysql logins */
    try {
        let folder = new Promise (( resolve, reject ) => {
            if( !files.checkExists ( 'mysql' )) {
                files.createFolder ( 'mysql', ( err, res ) => {
                    if ( err ) {
                        reject ( err )
                    }
                    else {
                        resolve ( res )
                    }
                })
            }
            else {
                resolve ()
            }  
        })
        folder.then ( _=> {
            let credentials = {
                'user' : user,
                'password' : password,
                'hostname' : hostname
            }
    
            let mapped = Object.entries ( credentials ).map (([ key, value ]) => {
                return (
                    new Promise (( resolve, reject ) => {
                        files.writeVal ( `mysql/${ key }`, value, ( err, res )  => {
                            if ( err ) {
                                reject ( err )
                            }
                            else {
                                resolve ( res )
                            }
                        })
                    })
                )
            })
            Promise.all ( mapped ).then ( _=> {
                this.connection (( err, connection ) => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, connection )
                    }
                })
            }).catch ( err => {
                callback ( err, null )
            })
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.connection = async ( callback ) => {
    /* returns a database connection object */
    try {
        let params = [ 'user', 'password', 'hostname' ]
        let folder = 'mysql'

        this.getLogins ( params, folder, ( err, res ) => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                let connection = mysql.createConnection ({
                    user: res [ 0 ],
                    password : res [ 1 ],
                    host: res [ 2 ],
                })

                connection.connect ( err => {
                    if ( err ) {
                        callback ( err, null )
                    }
                    else {
                        callback ( null, connection )
                    }
                })
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.verifyEmail = async ( user, password, callback ) => {
    /* sets and verifies gmail logins */
    try {
        if( !files.checkExists ( 'email' )) {
            files.createFolder ( 'email', err => {
                if ( err ) {
                    callback ( err, null )
                }
            })
        }
        let text = 'success!'
        let subject = 'this is a test email'
        let recepient = user
        let credentials = {
            'user' : user,
            'password' : password,
        }

        let mapped = Object.entries ( credentials )

        for ( const [ key, value ] of mapped ) {
            files.writeVal ( `email/${ key }`, value, ( err, res ) => {
                if ( err ) {
                    console.log ( err )
                }
            })
        }

        this.email ( recepient, subject, text, ( err, res )  => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                callback ( null, res )
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.email = async ( recepient, subject, text, callback ) => {
    /* sends email */
    try {
        let params = [ 'user', 'password' ]
        let folder = 'email'

        this.getLogins ( params, folder, ( err, res ) => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                let transporter = nodemailer.createTransport ({
                    service: 'gmail',
                    auth: {
                    user: res [ 0 ],
                    pass: res [ 1 ]
                    }
                })
                
                let mailOptions = {
                    from: 'reel',
                    to: recepient || res[0],
                    subject: subject,
                    html: text
                }
                
                transporter.sendMail (mailOptions, ( err, info ) => {
                    if ( err ) {
                        callback ( err, null )
                    } 
                    else {
                        callback ( null, info.response )
                    }
                })
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}