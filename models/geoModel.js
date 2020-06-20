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
var Geo = function (){}

Geo.create = (username, city, region, country) => {
	var params = ['username', 'city', 'region', 'country']
	var vals = [username, city, region, country]
	Q.fetchone("geolocation", ['id'], 'username', username, (err, res) => {
		if (res && res.length > 0) {
			Q.update("geolocation", params, vals, 'username', vals[0], (err, res) => {
				if (err)
					console.log(err)
			})
		} else {
			Q.insert("geolocation", params, vals, (err, res) => {
		 		if (err)
		 			console.log(err)
		 	})
		}
	})
}

module.exports = Geo
