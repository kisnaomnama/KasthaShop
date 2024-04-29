from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import db, Product, Review
from app.forms import ProductForm, ReviewForm
from .aws_helpers import upload_file_to_s3, get_unique_filename

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def all_products():
    products = Product.query.all();
    """Returns a list of all products"""
    return {'Products': [product.to_dict() for product in products]}, 200


@product_routes.route('/<int:id>')
@login_required
def product_by_id(id):
      """Returns a product specified by id"""
      product = Product.query.get(id)

      if not product:
           return {"message" : "Product couldn't be found"}, 404
      return product.to_dict(), 200
   

@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    """Create a new product"""
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["product_image"]
        url = None

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"product_image": "Image upload fail. Please try again later."}, 500
            url = upload["url"]

        new_product = Product(
            name=form.data["name"],
            category=form.data["category"],
            description=form.data["description"],
            price=form.data["price"],
            seller_id=current_user.id,
            product_image=url
        )

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict(), 201
    
    return form.errors, 400


@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    """Update an existing product by id"""
    product = Product.query.get(id)

    if not product:
        return {"message": "Product couldn't be found"}, 404

    if product.seller_id != current_user.id:
        return {"message": "Unathorized! seller_id does not match with user_id "}, 401

    form = ProductForm(obj=product)  # Pass the existing product data to the form

    if form.validate_on_submit():
        image = form.data["product_image"]
        url = None

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"product_image": "Image upload fail. Please try again later."}, 500
            url = upload["url"]

        product.name = form.data["name"]
        product.category = form.data["category"]
        product.description = form.data["description"]
        product.price = form.data["price"]
        if url is not None:
            product.product_image = url

        db.session.commit()
        return product.to_dict(), 200
    
    return form.errors, 400




@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    """Delete a product by id"""
    product = Product.query.get(id)

    if not product:
        return {"message": "Product couldn't be found"}, 404

    if product.seller_id != current_user.id:
            return {"message": "Unathorized! seller_id does not match with user_id "}, 401

    db.session.delete(product)
    db.session.commit()

    return {"message": "Successfully deleted product"}, 200


@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_product_review(id):
    """Create a new review for a product by id"""
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        product = Product.query.get(id)

        if not product:
            return {"message": "Product couldn't be found"}, 404

        if Review.query.filter(Review.product_id == id).filter(Review.user_id == current_user.id).one_or_none():
            return {"message": "You already had a review on this product"}, 500

        new_review = Review(
            product_id=id,
            user_id=current_user.id,
            review=form.data["review"],
            rating=form.data["rating"]
        )

        db.session.add(new_review)
        db.session.commit()

        return {**new_review.to_dict(), "user": new_review.user.to_dict()}, 200

    return form.errors, 400
