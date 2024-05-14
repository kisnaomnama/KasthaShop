from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Review, Product
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/', methods=["GET"])
def all_reviews():
    reviews = Review.query.all()
    return { "reviews": [review.to_dict() for review in reviews]}, 200

@review_routes.route('/<int:id>')
@login_required
def review(id):
    """Returns a review specified by id"""
    review = Review.query.get(id)
    if not review:
        return {"message": "review couldn't be found"}, 404
    return review.to_dict(), 200


@review_routes.route('/<int:id>/<int:productId>', methods=['PUT'])
@login_required
def update_review(id, productId):
    """Update a review by id"""
    review = Review.query.get(id)
    form = ReviewForm(obj=review) 

    form["csrf_token"].data = request.cookies["csrf_token"]
    for key, value in form.data.items():
            print("product Before====>", key, "= ", value)

    # if not review:
    #     return {"message": "Review couldn't be found"}, 404

    # if review.user_id != current_user.id:
    #     return {"message": "Unathorized User!"}, 401

    # form = ReviewForm(obj=review)  # Pass the existing review object to the form

    if form.validate_on_submit():
        review.review = form.data["review"]
        review.rating = form.data["rating"]
        review.product_id = productId
        review.user_id= current_user.id

        db.session.commit()

        return review.to_dict(), 200

    return form.errors, 400


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """Delete a review by id"""
    # print("id----", id)
    review = Review.query.get(id)
    # print("review----", review)

    # csrf_token = request.cookies.get("csrf_token")
 
    if not review:
        return {"message": "review couldn't be found"}, 404

    # if review.user_id != current_user.id:
    #     return {"message": "Unathorized User!"}, 401

    db.session.delete(review)
    db.session.commit()

    return {"message": "Successfully deleted review"}, 200

@review_routes.route('/currentt')
@login_required
def user_reviews():
    """Returns all products created by the current user"""
    user_id = current_user.id
    reviews = Review.query.filter_by(user_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}, 200
