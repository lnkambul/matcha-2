exports.username = ( username, callback ) => {
    let characters = /^[a-z0-9_]+$/
    if ( !characters.test ( username )) {
        callback ( 'valid username characters are lowercase letters (a-z), digits (0-9), and the underscore (_)', null )
    }
    else if ( username.length < 4 || username.length > 20 ) {
        callback ( 'username must be between 3 and 20 characters in length', null )
    }
    else {
        callback ( null, username )
    }
}

exports.password = ( password, callback ) => {
    let complexity = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
    
    if ( !complexity.test ( password )) {
        callback ( 'password must contain at least: one uppercase letter, one lowercase letter, and one digit', null )
    }
    else if ( password.length < 8 ) {
        callback ( 'password must be at least 8 characters in length', null )
    }
    else {
        callback ( null, password )
    }
}

exports.email = ( email, callback ) => {
    let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if ( !regex.test ( email )) {
        callback ( 'invalid email address', null )
    }
    else {
        callback ( null, email )
    }
}

exports.name = ( name, callback ) => {
    let regex = /^[a-zA-Z-]+$/
    if ( !regex.test ( name )) {
        callback ( 'name can only contain letters and a dash', null )
    }
    else {
        callback ( null, name )
    }
}