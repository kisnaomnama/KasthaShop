import re
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    
def validate_email(form, field):
    regex = r"^[^@]+@[^@]+\.[^@]+$"
    if not bool(re.match(regex, field.data)):
        raise ValidationError('Email is invalid.')


def username_check_len(form, field):
    if len(field.data) < 4:
        raise ValidationError('Username must be at least 4 characters.')


def password_check_len(form, field):
    if len(field.data) < 6:
        raise ValidationError('Password must be at least 6 characters.')


class SignUpForm(FlaskForm):
    first_name = StringField("First name", validators=[DataRequired()])
    last_name = StringField("Last name", validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired(), username_check_len, username_exists])
    email = StringField('Email', validators=[DataRequired(), validate_email, user_exists])
    password = StringField('Password', validators=[DataRequired(), password_check_len])
