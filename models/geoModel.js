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

exports.create = (username, latitude, longitude, city, country, callback) => {
	var params = ['username', 'latitude', 'longitude', 'city', 'country']
	var vals = [username, latitude, longitude, city, country]
	Q.fetchone("geolocation", ['id'], 'username', username, (err, res) => {
		if (res && res.length > 0) {
			Q.update("geolocation", params, vals, 'username', username, (err, res) => {
				if (err) {
					console.log(err)
							callback(err, null)
				}
				else {
					Q.update("profiles", ['location'], city, 'username', username, (err, res) => {
						if (err) {
							console.log('location update : ', err)
							callback(err, null)
						} else {
							console.log(`location updated`)
							callback(null, "success")
						}
					})
				}
			})
		} else {
			Q.insert("geolocation", params, vals, (err, res) => {
		 		if (err)
					 console.log(err)
				else {
					Q.update("profiles", ['location'], city, 'username', username, (err, res) => {
						if (err) {
							callback(err, null)
						}
						else {
							callback(null, "success")
						}
					})
				}
		 	})
		}
	})
}
