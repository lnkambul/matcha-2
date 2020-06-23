const Q = require('./queryModel')
const gen = require('./keyGeneratorModel')
const S = require ('./securityModel')

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
        if (err) {
            callback(err, null) 
        }
        else if (res && res.length > 0) {
            callback(null, res[0].admin)
        }
    })
}

exports.genUser = (callback) => {
    let secure = new Promise ((y, n) => {
        gen.genPass((err, pword) => { 
            if (err) { 
                n(err) 
            } 
            else { 
                S.createHash(pword, (error, hash) => { 
                    if(error) { 
                        throw(error) 
                    }  else {
                        var passes =[pword, hash]
                        y(passes)
                    } 
                })
            }
        })
    })
    secure.then(passes => {
        let promise = new Promise ((res, rej) => {
            var user = {
                username : "", 
                firstName : "",
                lastName : "",
                email : "",
                password : `${passes[1]}`,
                unhash : `${passes[0]}`,
                age : "",
                gender : "",
                orientation : "",
                preference : "",
                interests : "",
                location : "",
                bio : ""
            }
            gen.genUsername((err, uname) => { if (err) { rej(err) } else { user.username = uname } })
            gen.genName((err, fname) => { if (err) { rej(err) } else { user.firstName = fname } })
            gen.genName((err, lname) => { if (err) { rej(err) } else { user.lastName = lname } })
            gen.genEmail((err, mail) => { if(err) { rej(err) } else { user.email = mail } })
            gen.genAge((err, old) => { if (err) { rej(err) } else { user.age = old } })
            gen.genSex((err, sex) => { if (err) { rej(err) } else { user.gender = sex } })
            gen.genOrientation((err, type) => { if (err) { rej(err) } else { user.orientation = type } })
            gen.genPreference((err, pref) => { if (err) { rej(err) } else { user.preference = pref } })
            gen.genInterests((err, inter) => { if (err) { rej(err) } else { user.interests = inter } })
            gen.genPlace((err, locate) => { if (err) { rej(err) } else { user.location = locate } })
            gen.genBio((err, b) => { if (err) { rej(err) } else { user.bio = b } })
    
            res(user)
        })
        promise.then(user => {
        var uParams = ['username', 'first_name', 'last_name', 'email', 'password', 'verified']
        var uVals = [user.username, user.firstName, user.lastName, user.email, user.password, 2]
        var pParams = ['username', 'age', 'gender', 'orientation', 'preference', 'interests', 'location', 'bio']
        var pVals = [user.username, user.age, user.gender, user.orientation, user.preference, user.interests, user.location, user.bio]
        Q.insert("users", uParams, uVals, (err, res) => { if (err) { throw(err) } else { /*console.log(res)*/ } })
        Q.insert("profiles", pParams, pVals, (err, res) => { if (err) { throw(err) } else { /*console.log(res)*/ } })
        Q.fetchone("users", "id", 'username', user.username, (err, res) => {
            if (res && res.length > 0) {
                Q.insert("test", ['username'], user.username, (error, result) => {
                    if (error)
                        throw (error)
                })
            }
        })
        callback(null, user)
        }).catch(err => { throw(err) })
    }).catch(err => { callback(err, null) })
}
