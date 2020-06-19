const Profile = require('../models/profileModel')
const Q = require('../models/queryModel')
const params = ['age', 'gender', 'orientation', 'preference', 'interests', 'location', 'bio']
const upload = require('../models/imageModel')
const Geo = require('../models/geoModel')
const ipLocation = require("iplocation")
const http = require('http')


exports.formProfile = (req, res) => {
	var token = req.session.token
	if (token)
		Q.fetchone("profiles", params, 'username', req.session.user, (err, result) => { 
			if (result && result.length > 0)
				var p = result[0]
			else
				var p = []
			res.render('profileForm', {
				token: token,
				age: p.age,
				gender: p.gender,
				orientation: p.orientation,
				preference: p.preference,
				interests: p.interests,
				locate: p.location,
				bio: p.bio
			})
		})
	else
		res.redirect('/login')
}

exports.userProfile = (req, res) => {
	Q.fetchone("profiles", ['username', params], 'username', req.session.user, (err, result) => {
		if (err)
			res.redirect('/p')
		else if (result && result.length > 0) {
			res.render('profile', {token: req.session.token, user: result[0]})
		} else
			res.redirect('/p')
	})
}

exports.matchProfile = (req, res) => {
	var match = req.params.match
	Q.fetchone("profiles", ['username', params], 'username', match, (err, result) => {
		if (err)
			res.redirect('/')
		else if (result.length > 0) {
			res.render('matchProfile', {token: req.session.token, match: result[0]})
		} else
			res.redirect('/')
	})
}

exports.registerProfile = (req, res, next) => {
	var sess = req.session
	Q.fetchone("tokens", ['username'], 'token', sess.token, (err, result) => {
		if (result && result.length > 0) {
			var newProfile = new Profile(result[0].username, req.body)
			Profile.validate(newProfile, (err, success) => {
				if (err)
					console.log("error ", err)
				else {
					Profile.register(result[0].username, req.body.password, newProfile, (err, success) => {
						if (err)
							console.log('failed to update profile')
						else {
							console.log('profile updated')
							res.redirect('/p/upload')
						}
					})
				}
			})
		}
		else {
			console.log("please log in to register")
			res.redirect('/login')
		}
	})
}

exports.formPhotos = (req, res) => {
	var token = req.session.token
	res.render('uploadForm', {token: token})
}

exports.uploadPhotos = (req, res) => {
	var file = req.file
	if (!file)
		res.send('error please upload')
	else {
		Profile.uploadImage(req.session.user, (err, result) => {
			if (err)
				console.log(err)
			else {
				console.log(result)
				res.redirect('upload')
			}
		})
	}
}

exports.geolocation = (req,res) => {
	console.log(req.body.lat)
	console.log(req.body.lng)
		Geo.create( req.session.user,req.body.lat, req.body.lng)
	var ipaddress = '41.211.36.26'
	/*
	let addy = req.ip;
	console.log("addy = " + addy.clientIp)

	const promise = new Promise ((resolve, reject) => {
	*/
		http.get('http://api.ipstack.com/' + `${ipaddress}` + '?access_key=a38364d86e7b0804af0bf7e03865f3aa', (res) => {
			let data = ''

			res.on('data', (chunk) => {
				data += chunk
			})

			res.on('end', () => {
				console.log(JSON.parse(data).city)
			})
		}).on("error", (err) => {
			console.log("Error: " +err.message)
		})
	}
	/*promise.then(iplocation => {
		console.log(iplocation.region)
	}).catch(err => console.log(err.message))
	*/

