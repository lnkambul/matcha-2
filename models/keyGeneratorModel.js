var generateKey = require("password-generator")
var generateUsername = require ("random-username-generator")
var generateEmail = require ("random-email")
var generateSentence = require ("random-sentence")
var Chance = require ("chance")
var admod = require ("./adminModel")



exports.genPass = (callback) => {   
    var maxLength = 18
    var minLength = 12
    var uppercaseMinCount = 3
    var lowercaseMinCount = 3
    var numberMinCount = 2
    var specialMinCount = 2
    var UPPERCASE_RE = /([A-Z])/g
    var LOWERCASE_RE = /([a-z])/g
    var NUMBER_RE = /([\d])/g
    var SPECIAL_CHAR_RE = /([\?\-])/g
    var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g
    
    function isStrongEnough(password) {
        var uc = password.match(UPPERCASE_RE)
        var lc = password.match(LOWERCASE_RE)
        var n = password.match(NUMBER_RE)
        var sc = password.match(SPECIAL_CHAR_RE)
        var nr = password.match(NON_REPEATING_CHAR_RE)
        return password.length >= minLength &&
            !nr &&
            uc && uc.length >= uppercaseMinCount &&
            lc && lc.length >= lowercaseMinCount &&
            n && n.length >= numberMinCount &&
            sc && sc.length >= specialMinCount
    }
    
    function customPassword() {
        var password = "";
        var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength
        while (!isStrongEnough(password)) {
            password = generateKey(randomLength, false, /[\w\d\?\-]/)
        }
        callback(null, password)
    }
    customPassword()
}

exports.genUsername = (callback) => {
    var minLength = 3
    var maxLength = 20
    var ALLOWED_CHARS = /^[a-zA-Z0-9_]+$/

    function validUsername(username) {
        return (username.match(ALLOWED_CHARS) && username.length > minLength && username.length < maxLength)
    }

    function customUsername() {
        var username = ""
        while (!validUsername(username)) {
            generateUsername.setSeperator('_')
            username = generateUsername.generate()
        }
        callback(null, username)
    }
    customUsername()
}

exports.genEmail = (callback) => {
    callback(null, generateEmail( {domain : 'matcha.com'} ))
}

exports.genAge = (callback) => {
    maxAge = 120
    minAge = 18
    callback(null, Math.floor(Math.random() * (maxAge - minAge)) + minAge)
}

exports.genBio = (callback) => {
    callback(null, generateSentence({min: 4, max: 7}))
}

exports.genPlace = (callback) => {
    var chance = new Chance
    callback(null, chance.city())
}

exports.genName = (callback) => {
    var chance = new Chance
    callback(null, chance.first())
}

exports.genSurname = (callback) => {
    var chance = new Chance
    callback(null, chance.last())
}

exports.genSex = (callback) => {
    var gender = ["male", "female"]
    callback(null, gender[Math.floor(Math.random() * 2)])

}

exports.genOrientation = (callback) => {
    var orientation = ["heterosexual", "homosexual", "bisexual"]
    callback(null, orientation[Math.floor(Math.random() * 3)])
}

exports.genPreference = (callback) => {
    var preference = ["men", "women", "both"]
    callback(null, preference[Math.floor(Math.random() * 3)])
}

exports.genInterests = (callback) => {
    var interests = ""
    var chance = new Chance

    for (i = 0; i < (Math.floor(Math.random() * (8 - 1)) + 1); i++)
    {
        if (i > 0) {
            interests += ","
        }
        interests += chance.animal({type: 'pet'})
    }
    callback(null, interests)
}