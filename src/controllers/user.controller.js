'user strict';

const User = require('../models/user.model');

exports.create = function(req, res) {
	const new_user = new User(req.body);

	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		req.status(400).send({ error:true, message: 'missing fields' });
	}
	else{
		User.create(new_user, function(err, user) {
				if (err)
				res.send(err);
				res.json({error:false, message:"user added", data:user});
				});
	}
}
