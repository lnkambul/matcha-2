var generateKey = require("password-generator")
var generateUsername = require ("random-username-generator")
var generateEmail = require ("random-email")
var generateSentence = require ("random-sentence")
var Chance = require ("chance")

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
        callback(password)
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
        callback(username)
    }
    customUsername()
}

exports.genEmail = (callback) => {
    callback(generateEmail( {domain : 'matcha.com'} ))
}

exports.genAge = (callback) => {
    maxAge = 120
    minAge = 18
    callback(Math.floor(Math.random() * (maxAge - minAge)) + minAge)
}

exports.genBio = (callback) => {
    callback(generateSentence({min: 4, max: 7}))
}

exports.genPlace = (callback) => {
    var chance = new Chance
    callback(chance.city())
}
