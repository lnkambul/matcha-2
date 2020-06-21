const Q = require('./queryModel')

exports.parseForm = (form, callback) => {
    count = parseInt(form.testAccounts, 10)
    if (typeof(count) ==='number' && isFinite(count) && Math.round(count) === count)
    {
        if (count > 0 && count <= 500)
            callback(null, count)
        else
            callback(`requested test accounts ${count} out of allowed range`, null)
    }
    else
        callback(`invalid request for ${count} test accounts`, null)
}

exports.isAdmin = (username, callback) => {
    Q.fetchone("users", 'admin', 'username', username, (err, res) =>{
        if (err) { callback(err, null) }
        else if (res && res.length > 0 && res[0].admin === 1) {
            callback(null, 1)
        }
        else { callback("not admin", null) }
    })
}