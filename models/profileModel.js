const Q = require('./queryModel')
const S = require('./securityModel')
const fs = require('fs')
const dir = 'public/uploads/temp/'
const dest = 'public/uploads/'

var Profile = function(username, profile) {
	this.username = username
	this.age = profile.age
	this.gender = profile.gender
	this.sexual_orientation = profile.sexual_orientation
	this.preference = profile.preference
	this.interests = profile.interests
	this.locate = profile.locate
	this.bio = profile.bio
}

//validate inputs
Profile.validate = (profile, callback)  => {
	var e = {age: null, gender: null, sexual_orientation: null, preference: null, interests: null, locate: null, bio: null}
	S.strage(profile.age, (err, res) => {e.age = err})
	S.radio('gender', profile.gender, ['male', 'female'], (err, res) => {e.gender = err})
	S.radio('sexual_orientation', profile.sexual_orientation, ['heterosexual', 'homosexual', 'bisexual'], (err, res) => {e.sexual_orientation = err})
	S.radio('preference', profile.preference, ['men', 'women', 'both'], (err, res) => {e.preference = err})
	S.tags(profile.interests, (err, res) => {
		e.interests = err
		profile.interests = res})
	S.locate(profile.locate, (err, res) => {e.locate = err})
	S.bio(profile.bio, (err, res) => {e.bio = err})
	if (e.age || e.gender || e.sexual_orientation || e.preference || e.interests || e.locate || e.bio)
		callback(e, null)
	else 
		callback(null, "valid form")
}

Profile.interests = (id, interests, callback) => {
	params = ['interest', 'user_list']
	r = 0
	e = []
	s = []
	for (let i in interests) {
		Q.fetchone("interests", params, 'interest', interests[i], (err, res) => {
			if (res.length > 0) {
				var users = res[0].user_list.split(',')
				var newlist = `${res[0].user_list}`
				if (users.find(element => element ==`${id}`) == null)
					newlist += `,${id}`
				Q.update("interests", ['user_list'], newlist, 'interest', interests[i], (err, result) => {
					r += 1
					if (err)
						e.push(err)
					else
						s.push(`${interests[i]} ${result}`)
					if (r == interests.length && e.length > 0)
						callback(e)
					else if (r == interests.length)
						callback(null, s)
				})
			} else {
				Q.insert("interests", params, [interests[i], id], (err, result) => {
					r += 1
					if (err)
						e.push(err)
					else
						s.push(`${interests[i]} inserted`)
					if (r == interests.length && e.length > 0)
						callback(e)
					else if (r == interests.length)
						callback(null, s)
				})
			}
		})
	}
}

Profile.create = (id, vals, interests, callback) => {
	var params = ['username', 'age', 'gender', 'orientation', 'preference', 'interests', 'location', 'bio']
	var e = []
	var r = []
	Q.fetchone("profiles", ['username'], 'username', vals[0], (err, res) => {
		if (res.length > 0) {
			Q.update("profiles", params, vals, 'username', vals[0], (err, res) => {
				if (err)
					callback(res)
			})
		} else {
			Q.insert("profiles", params, vals, (err, res) => {
		 		if (err)
		 			callback(err)
				else {
					Q.update("users", ['verified'], 2, 'username', vals[0], (err, res) => {
						if (err)
							callback(err)
					})
		 		}
		 	})
		}
	})
	Profile.interests(id, interests, (err, result) => {
		if (err)
			callback(err)
		else
			callback(null, result)
	})
}

Profile.register = (username, newpassword, p, callback) => {
	Q.fetchone("users", ['id', 'password'], 'username', username, (err, res) => {
		if (res.length > 0) {
			var id = res[0].id
			S.findHash(newpassword, res[0].password, (err, res) => {
				if (err)
					callback('password incorrect', null)
				else {
					var params = ['username', 'age', 'gender', 'orientation', 'preference', 'interests', 'location', 'bio']
					var values = [username, p.age, p.gender, p.sexual_orientation, p.preference, p.interests.join(','), p.locate, p.bio]
					Profile.create(id, values, p.interests, (err, result) => {
						if (err)
							callback(err)
						else
							callback(null, result)
					})
				}
			})
		}
		else
			callback("password error")
	})
}

Profile.uploadImage = (user, callback) => {
	fs.readdir(dir, (err, file) => {
		if (err)
			console.log('directory not found')
		else {
			var path = dest+file
			fs.rename(dir+file, path, (err) => {
				if (err)
					callback(err)
				else {
					Q.fetchone("images", ['img_src'], 'username', user, (err, result) => {
						if (err)
							callback(err)
						else if (result.length > 4) {
							Q.update("images", ['img_src'], `${path}${result.length}`, 'img_src', `${path}${result.length}`, (err, res) => {
								if (err)
									callback(err)
								else
									callback(null, path)
							})
						} else {
							Q.insert("images", ['username', 'img_src'], [user, `${path}${result.length}`], (err, res) => {
								if (err)
									callback(err)
								else
									callback(null, path)
							})
						}
					})
				}
			})
		}
	})
}

module.exports = Profile