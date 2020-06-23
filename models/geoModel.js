const Q = require('./queryModel')
//const S = require('./securityModel')
/*
var local = function() {}

local.locate = () => {
	if(navigator.geolocation)
		console.log('true')
	else
		console.log('false')
}

local.locate()
*/

exports.create = (username, latitude, longitude, city, region, country) => {
	var params = ['username', 'latitude', 'longitude', 'city', 'region', 'country']
	var vals = [username, latitude, longitude, city, region, country]
	Q.fetchone("geolocation", ['id'], 'username', username, (err, res) => {
		if (res && res.length > 0) {
			Q.update("geolocation", params, vals, 'username', username, (err, res) => {
				if (err) {
					console.log(err)
				}
				else {
					Q.update("profiles", ['location'], city, 'username', username, (err, res) => {
						if (err) {
							console.log('geolocation profile update :', err)
						}
					})
				}
			})
		} else {
			Q.insert("geolocation", params, vals, (err, res) => {
		 		if (err)
					 console.log(err)
				Q.update("users", 'location', city, 'username', username, (err, res) => {
					if (err) {
						throw(err)
					}
				})
		 	})
		}
	})
}