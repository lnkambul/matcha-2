exports.username = (username, callback) => {
    let characters = /^[a-z0-9_]+$/
    let length = /.{3}/
    if (!characters.test(username)) {
        callback ('valid username characters are lowercase letters (a-z), digits (0-9), and the underscore (_)')
    }
    else if (!length.test(username)) {
        callback ('username must be between 3 and 20 characters in length')
    }
}

exports.password = (password, callback) => {
    let complexity = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    let length = /.{8}/
    if (!complexity.test(password)) {
        callback ('password must contain at least: one uppercase letter, one lowercase letter, and one digit')
    }
    else if (!length.test(password)) {
        callback ('password must be at least 8 characters in length')
    }
}

exports.email = (address, callback) => {
    let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!regex.test(address)) {
        callback ('invalid email address')
    }
}

exports.name = (name, callback) => {
    let regex = /^[a-zA-Z-]+$/
    if (!regex.test(name)) {
        callback ('name can only contain letters and a dash')
    }
}