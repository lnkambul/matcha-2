from app import app
from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user
from app.models import User
from werkzeug.urls import url_parse
from flask_login import login_required
from app.forms import LoginForm
from app.forms import SignupForm
from app import db

@app.route('/')
@app.route('/index')
@login_required
def index():
	return render_template('index.html', title='home')

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
	if current_user.is_authenticated:
		return redirect(url_for('index'))
	form = SignupForm()
	if form.validate_on_submit():
		user = User(username=form.username.data, email=form.email.data, first_name=form.first_name.data, last_name=form.last_name.data)
		user.set_password(form.password.data)
		db.session.add(user)
		db.session.commit()
		flash('welcome to matcha! your partner awaits!')
		return redirect(url_for('login'))
	return render_template('sign_up.html', title='sign_up', form=form)

@app.route('/u/<username>')
@login_required
def u(username):
	user = User.query.filter_by(username=username).first_or_404()
	return render_template('user.html', title='profile', user=user)


