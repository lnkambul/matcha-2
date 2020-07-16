const bcrypt = require ('bcrypt')

exports.saltNHash = (key, callback) => {
    /* hashes a string */
    try {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log ('salting error:', err)
                callback (err, null)
            }
            else {
                bcrypt.hash(key, salt, (err, hash) => {
                    if (err) {
                        console.log('hashing error:', err)
                        callback (err, null)
                    }
                    else {
                        callback (null, hash)
                    }
                })
            }
        })
    }
    catch (err) {
        console.log ('salt n hash error:', err)
        callback (err, null)
    }
}