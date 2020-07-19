exports.username = ( username, callback ) => {
    let characters = /^[a-z0-9_]$/
    if ( !characters.test ( username )) {
        callback ( 'valid username characters are lowercase letters (a-z), digits (0-9), and the underscore (_)' )
    }
    else if ( username.length < 4 || username.length > 20 ) {
        callback ( 'username must be between 3 and 20 characters in length' )
    }
}

exports.password = ( password, callback ) => {
    let complexity = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    console.log (password)
    
    if ( !complexity.test ( password )) {
        console.log (password)
        callback ( 'password must contain at least: one uppercase letter, one lowercase letter, and one digit' )
    }
    else if ( password.length < 8 ) {
        callback ( 'password must be at least 8 characters in length' )
    }
}

exports.email = ( address, callback ) => {
    let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if ( !regex.test ( address )) {
        callback ( 'invalid email address' )
    }
}

exports.name = ( name, callback ) => {
    let regex = /^[a-zA-Z-]+$/
    if ( !regex.test ( name )) {
        callback ( 'name can only contain letters and a dash' )
    }
}