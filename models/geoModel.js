var local = function() {}

local.locate = () => {
	if(navigator.geolocation)
		console.log('true')
	else
		console.log('false')
}

local.locate()
