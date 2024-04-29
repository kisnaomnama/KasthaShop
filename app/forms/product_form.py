from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed#, FileRequired
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.aws_helpers import ALLOWED_EXTENSIONS
from ..models import Product


def check_name(form, field):
    if len(field.data) < 4:
        raise ValidationError("Name must be at least 4 characters")


def check_price(form, field):
    if field.data <= 0:
        raise ValidationError("Price must be greater than 0")
    if  field.data > 10000:
        raise ValidationError("Price must be smaller than or equal to 10,000")


def check_category(form, field):
    categories = Product.allowed_categories()
    if field.data not in categories:
        raise ValidationError(f"Invalid category! Here is a list of allowed categories: {categories}")


def check_description(form, field):
    if len(field.data) < 50:
        raise ValidationError("Description must be at least 50 characters")



class ProductForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), check_name])
    price = DecimalField("price", validators=[DataRequired(), check_price])
    category = StringField("category", validators=[DataRequired(), check_category])
    description = StringField("description", validators=[DataRequired(), check_description])
    product_image = FileField("Profile Image Url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
