from flask import render_template, flash, redirect, url_for
from app import app, mysql
from app.forms import LoginForm

@app.route('/')
@app.route('/index')
def index():
	cursor = mysql.connect().cursor()
	cursor.execute("SELECT * FROM users")
	data = cursor.fetchone()
	return render_template('index.html', title='home', data=data)

@app.route('/login', methods=['GET', 'POST'])
def login():
	form=LoginForm()
	if form.validate_on_submit():
		flash('{} login request'.format(form.username.data))
		return redirect(url_for('index'))
	return render_template('login.html', title='login', form=form)
