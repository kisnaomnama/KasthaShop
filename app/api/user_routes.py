from flask import Blueprint, redirect, jsonify
from flask_login import login_required
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user:
        return {"message": "User couldn't be found"}, 404
    return user.to_dict()



@user_routes.route('/<int:id>/reviews')
@login_required
def user_reviews(id):
    """Get all reviews belonged to a user by id"""
    user = User.query.get(id)

    if not user:
        return {"message": "User couldn't be found"}, 404

    if user.id != current_user.id:
        return redirect("/")

    reviews = [review.to_dict() for review in user.reviews]

    return reviews, 200
