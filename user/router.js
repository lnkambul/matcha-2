const creation = require ('./creation')

exports.main = async(form, next) => {
    /* checks database login credentials */
    try {
        creation.validate(form, (err, res) => {
            if (err) {
                console.log('input validation error:', err)
                next ('signup', 'anon')
            }
            else {
                creation.capture(form, (err, res) => {
                    if (err) {
                        console.log('input capture error:', err)
                        next ('signup', 'anon')
                    }
                    else {
                        next ('login', 'anon')
                    }
                })
            }
        })
    }
    catch(err) { 
        console.log(':', err)
        next('login', 'anon')
    }
}
