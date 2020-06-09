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

Profile.register = (profile, callback) => {
	callback(null, "profile complete")
}

module.exports = Profile
