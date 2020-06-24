const Profile = require('../models/profileModel')
const Q = require('../models/queryModel')
const params = ['age', 'gender', 'orientation', 'preference', 'interests', 'location', 'bio', 'popularity']
const upload = require('../models/imageModel')
const Geo = require('../models/geoModel')
const http = require('http')
const https = require('https')
const B = require('../models/browseModel')

exports.auth = (req, res, next) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	if (!token)
		res.redirect('/login')
	else {
		Q.fetchone("tokens", ['username'], 'username', req.session.user, (err, result) => {
			if (result && result.length > 0) {
				Q.fetchone("users", ['verified'], 'username', req.session.user, (err, result) => {
					if (result && result.length > 0) {
						if (result[0].verified == 1)
							res.redirect('/p')
						else if (result[0].verified == 2)
							res.redirect('/p/upload')
						else
							next()
					}
				})
			}
			else
				res.redirect('/login')
		})
	}
}

exports.formProfile = (req, res) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	if (token)
		Q.fetchone("profiles", params, 'username', req.session.user, (err, result) => { 
			if (err)
				res.redirect('/login')
			else if (result.length > 0)
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
				bio: p.bio,
				adminToken: adminToken,
				user: req.session.user
			})
		})
	else
		res.redirect('/login')
}

exports.userProfile = (req, res) => {
	Q.fetchone("profiles", ['username', params], 'username', req.session.user, (err, result) => {
		if (err)
			res.redirect('/p')
		else if (result.length > 0) {
			res.render('profile', {
				token: req.session.token, 
				user: req.session.user,
				profile: result[0],
				adminToken: req.session.adminToken
			})
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
			B.visit(req.session.user, match, (err, success) => {
				if (err)
					console.log(err)
				else {
					console.log(success)
					res.render('matchProfile', {
						token: req.session.token, 
						match: result[0],
						user: req.session.user,
						adminToken: req.session.adminToken
					})
				}
			})
		}
	})
}


exports.likeTweaked = (req, res) => {
	var user = req.session.user
	var liked = req.body.like
	B.likeTweaked(user, liked, (err, result) => {
		if (err) {
			res.send(err)
		} 
		else {
			res.send(result)
			B.checkMatch(user, liked, (err, result) => {
				if (err) {
					console.log(err)
				} 
				else {
					console.log(result)
				}
			})
		}
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
							/*successful profile registration/update triggers geolocation function*/
							exports.geolocation(req)
							/*end of modifications to registerProfile*/
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
	var adminToken = req.session.adminToken
	res.render('uploadForm', {
		token: token,
		adminToken: adminToken,
		user: req.session.user
	})
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
				res.redirect('/p/u')
			}
		})
	}
}

exports.geolocation = (req) => {
	let promise = new Promise ((resolve, reject) => {
		var ipaddress = req.ip
		//::1 is IPV6 notation for localhost
		if (ipaddress === "::1") {
			let pubip = ''
			https.get('https://ip.seeip.org/jsonip', (res) => {
				res.on('data', function(chunk) {
					pubip += chunk
				})
				res.on('end', () => {
					resolve(JSON.parse(pubip).ip)
				})
			}).on('error', function(e) { reject(e) })
		}
		else { resolve (ipaddress.ip) }
	})
	promise.then( ipaddress => {
		http.get('http://ip-api.com/json/' + `${ipaddress}`, (res) => {
			let data = ''
			res.on('data', (chunk) => {
				data += chunk
			})
			res.on('end', () => {
				let parsed = JSON.parse(data)
				Geo.create(req.session.user, parsed.lat, parsed.lon, parsed.city, parsed.regionName, parsed.country)
			})
		}).on("error", (err) => { console.log("Error: " +err.message) })
	}).catch(err => console.log(err.message))
}

exports.block = (req, res) => {
	let username = req.session.user
	let promise = new Promise ((resolve, reject) => {
		Q.fetchone("users", ['admin'], 'username', username, (err, res) => {
			if (err) {
				reject(err)
			}
			else {
				resolve(res)
			}
		})
	})
	promise.then(success =>{
		if (success && success.length > 0 && success[0].admin === 1) {
			B.suspend(req.body.block, req.session.user, (error, result) => {
				if (error) {
					console.log("could not suspend account")
				}
				else {
					res.send(result)
				}
			})
		}
		else { 
			B.block(req.body.block, req.session.user, (error, result) => {
				if (error) {
					console.log("could not block account")
				}
				else {
					res.send(result)
				}
			})
		}
	}).catch(err => { console.log(error) })
}
