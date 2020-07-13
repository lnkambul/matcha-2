const fs = require ('fs')
const path = require ('path')

try {
    if (!fs.existsSync(path.join(__dirname, 'credentials'))) {
        fs.mkdirSync(path.join(__dirname, 'credentials', (err) =>{
            if (err) {
                console.log(err)
            }
            else {
                
            }
        }))
    }
}
catch (err) {
    console.log (err)    
}