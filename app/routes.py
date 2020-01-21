from app import app
from flask import render_template, flash, redirect, url_for
from app.forms import LoginForm, SignupForm

@app.route('/')
@app.route('/index')
def index():
	user = {'name' : 'kori', 'username' : 'ksefeane'}
	return render_template('index.html', title='home', user=user)

@app.route('/login', methods=['GET', 'POST'])
def login():
	form = LoginForm()
	if form.validate_on_submit():
		flash('request user login -> {}'.format(form.username.data))
		return redirect(url_for('index'))
	return render_template('login.html', title='log in', form=form)

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
