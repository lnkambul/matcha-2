const Q = require('./queryModel')
const S = require('./securityModel')

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

Profile.register = (username, newpassword, p, callback) => {
	Q.fetchone("users", ['password'], 'username', username, (err, res) => {
		if (res.length > 0) {
			S.findHash(newpassword, res[0].password, (err, res) => {
				if (err)
					callback('password incorrect', null)
				else {
					var params = ['username', 'age', 'gender', 'orientation', 'preference', 'interests', 'location', 'bio']
					var values = [username, p.age, p.gender, p.sexual_orientation, p.preference, p.interests.join(','), p.locate, p.bio]
					Q.insert("profiles", params, values, (err, result) => {
						if (err)
							callback(err, null)
						else
							callback(null, "registration successful")
					})
				}
			})
		}
		else
			callback("password error")
	})
}

module.exports = Profile
