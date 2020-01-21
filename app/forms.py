from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
	username = StringField('Username', validators=[DataRequired()])
	password = PasswordField('Password', validators=[DataRequired()])
	submit = SubmitField('login')

class SignupForm(FlaskForm):
	username = StringField('Username')
	email = StringField('Email')
	first_name = StringField('FirstName')
	last_name = StringField('LastName')
	password = PasswordField('Password')
	password2 = PasswordField('Password')
	submit = SubmitField('Sign_up')
