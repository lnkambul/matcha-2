from app import app
from flask import render_template, flash, redirect, url_for, request
from app.forms import LoginForm, SignupForm
from flask_login import current_user, login_user, logout_user
from app.models import User
from werkzeug.urls import url_parse
from flask_login import login_required

@app.route('/')
@app.route('/index')
@login_required
def index():
	user = {'name' : 'kori', 'username' : 'ksefeane'}
	return render_template('index.html', title='home', user=user)

@app.route('/login', methods=['GET', 'POST'])
def login():
	if current_user.is_authenticated:
		return redirect(url_for('index'))
	form = LoginForm()
	if form.validate_on_submit():
		user = User.query.filter_by(username=form.username.data).first()
		if user is None or not user.check_password(form.password.data):
			flash('Invalid username or password')
			return redirect(url_for('login'))
		login_user(user)
		next_page = request.args.get('next')
		if not next_page or url_parse(next_page) != '':
			next_page = url_for('index')
		return redirect(next_page)
	return render_template('login.html', title='log in', form=form)

@app.route('/logout')
def logout():
	logout_user()
	return redirect(url_for('index'))

@app.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
	form = SignupForm()
	if form.validate_on_submit():
		return redirect(url_for('index'))
	return render_template('sign_up.html', title='sign_up', form=form)

@app.route('/profile')
def profile():
	user = {'name' : 'kori', 'username' : 'ksefeane'}
	return render_template('profile.html', title='profile', user=user)

@app.route('/browse')
def browse():
	user = {'name' : 'kori', 'username' : 'ksefeane'}
	return render_template('browse.html', title='browse', user=user)

@app.route('/matches')
def matches():
	user = {'name' : 'kori', 'username' : 'ksefeane'}
	return render_template('matches.html', title='matches', user=user)

@app.route('/chat')
def chat():
	user = {'name' : 'kori', 'username' : 'ksefeane'}
	return render_template('chat.html', title='chat', user=user)
