exports.username = (username, callback) => {
    let characters = /^[a-z0-9_]+$/
    let length = /.{3}/
    if (!username.match(characters)) {
        callback ('valid username characters are lowercase letters, digits and the underscore')
    }
    else if (!username.match(length)) {
        callback ('username must be between 3 and 20 characters in length')
    }
}

exports.password = (password, callback) => {
    let complexity = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    let length = /.{8}/
    if (!password.test(complexity)) {
        callback ('password must contain at least: one uppercase letter, one lowercase letter, and one digit')
    }
    else if (!password.match(length)) {
        callback ('password must be at least 8 characters in length')
    }
}

exports.email = (address, callback) => {
    let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!address.match(regex)) {
        callback ('invalid email address')
    }
}

exports.name = (name, callback) => {
    let regex = /^[a-zA-Z-]+$/
    if (!name.match(regex)) {
        callback ('name can only contain letters and a dash')
    }
}