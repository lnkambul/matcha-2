from app import app
from flask import render_template, flash, redirect, url_for
from app.forms import LoginForm

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
