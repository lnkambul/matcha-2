const fs = require ('fs')
const path = require ('path')

exports.createFolder = (folder, callback) => {
    /* creates folder */
    try {
        fs.mkdirSync(path.join(__dirname, folder), (err) =>{
            if (err) {
                throw(`failed to create ${folder}`)
            }
            console.log(`${folder} created`)
            callback (null, `${folder} created`)
        })
    }
    catch (err) {
        console.log('folder creation error thrown:', err)
        callback (err, null)
    }
}

exports.writeVal = (file, val, callback) => {
    /* writes data to file */
    try {
        let filePath = path.join(__dirname, file)
        fs.writeFile(filePath, val, err => {
            if (err) {
                throw(err)
            }
            console.log(`${file} updated`)
            callback (null, `${file} updated`)
        })
    }
    catch (err) {
        console.log('writing to file error thrown:', err)
        callback (err, null)
    }
}

exports.getFileContents = async(fpath, callback) => {
    /* reads in contents of specified file */
    try {
        let filePath = path.join(fpath)
        if (!this.checkExists(fpath)) {
            throw(`${fpath} not found`)
        }
        fs.readFile(path.join(__dirname, filePath), 'utf-8', (err, data) => {
            callback (null, data)
        })
    }
    catch (err) {
        console.log('get file contents error thrown:', err)
        callback (err, null)
    }
}

exports.checkExists = (file) => {
    /* checks if the credentials folder exists */
    try {
        if (!fs.existsSync(path.join(__dirname, file))) {
            return(false)
        }
        return(true)
    }
    catch (err) {
        console.log('check file existence error thrown:', err)    
    }
}


