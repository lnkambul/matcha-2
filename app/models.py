from datetime import datetime
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import login

class User(UserMixin, db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	email = db.Column(db.String(120), index=True, unique=True)
	first_name = db.Column(db.String(64))
	last_name = db.Column(db.String(64))
	password_hash = db.Column(db.String(128))
	images = db.relationship('Image', backref='user', lazy='dynamic')

	def __repr__(self):
		return 'user -> {}\nemail -> {}\nfirst_name -> {}\nlast_name -> {}\npassword_hash -> {}\n\n'.format(self.username, self.email, self.first_name, self.last_name, self.password_hash)

	def set_password(self, password):
		self.password_hash = generate_password_hash(password)

	def check_password(self, password):
		return check_password_hash(self.password_hash, password)

@login.user_loader
def load_user(id):
	return User.query.get(int(id))

class Image(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	image_url = db.Column(db.String(120), index=True, unique=True)
	timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

	def __repr__(self):
		return '<Image {}>'.format(self.image_url)
