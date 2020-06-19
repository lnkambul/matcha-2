const multer = require('multer')

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		var dest = 'uploads/temp'
		callback(null, 'public/'+dest)
	},
	filename: (req, file, callback) => {
		var save = `${req.session.user}`
		callback(null, save)
	}
})

const upload = multer({ storage: storage })

module.exports = upload
