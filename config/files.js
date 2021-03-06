const fs = require ( 'fs' )
const path = require ( 'path' )

exports.createFolder = ( folder, callback ) => {
    /* creates folder */
    try {
        let dir = new Promise (( resolve, reject ) => {
            resolve ( fs.mkdirSync ( path.join( __dirname, folder )))
        })
        dir.then ( _=> {
            callback ( null, `${ folder } created` )
        }).catch ( err => {
            callback ( err, null )
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.writeVal = ( file, val, callback ) => {
    /* writes data to file */
    try {
        let filePath = path.join ( __dirname, file )
        fs.writeFile ( filePath, val, err => {
            if ( err ) {
                callback ( err, null )
            }
            else {
                callback ( null, `${ file } updated` )
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.getFileContents = ( fpath, callback ) => {
    /* reads in contents of specified file */
    try {
        if ( !this.checkExists ( fpath )) {
            callback ( `${ fpath } not found`, null )
        }
        fs.readFile ( path.join ( __dirname, fpath ), 'utf-8', ( err, data ) => {
            if ( err ) {
                callback ( err, null )
            }
            else {
            callback ( null, data )
            }
        })
    }
    catch ( err ) {
        callback ( err, null )
    }
}

exports.checkExists = ( file ) => {
    /* checks if a file/folder exists */
    try {
        if ( !fs.existsSync ( path.join( __dirname, file ))) {
            return ( false )
        }
        return ( true )
    }
    catch ( err ) {
        throw ( err )    
    }
}