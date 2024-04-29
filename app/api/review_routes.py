from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Review, Product
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>')
@login_required
def review(id):
    """Returns a review specified by id"""
    review = Review.query.get(id)
    if not review:
        return {"message": "review couldn't be found"}, 404
    return review.to_dict(), 200


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    """Update a review by id"""
    review = Review.query.get(id)

    if not review:
        return {"message": "Review couldn't be found"}, 404

    if review.user_id != current_user.id:
        return {"message": "Unathorized! review user_id does not match with current.user_id "}, 401

    form = ReviewForm(obj=review)  # Pass the existing review object to the form

    if form.validate_on_submit():
        review.review = form.data["review"]
        review.rating = form.data["rating"]

        db.session.commit()

        return {**review.to_dict(), "user": review.user_id.to_dict()}, 200

    return {**form.errors, "review": review.to_dict()}, 400



@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """Delete a review by id"""
    review = Review.query.get(id)

    if not review:
        return {"message": "review couldn't be found"}, 404

    if review.user_id != current_user.id:
        return {"message": "Unathorized! review user_id does not match with current.user_id "}, 401

    db.session.delete(review)
    db.session.commit()

    return {"message": "Successfully deleted review"}, 200
