# from flask_wtf import FlaskForm
# from wtforms import StringField, DateField, SubmitField, FloatField
# from wtforms.validators import DataRequired
# from flask_wtf.file import FileField, FileAllowed, FileRequired
# from app.aws_helpers import ALLOWED_EXTENSIONS, AUDIO_ALLOWED_EXTENSIONS


# class ProductForm(FlaskForm):
#     name = StringField('Name', validators=[DataRequired()])
#     discription = StringField('Discription', validators=[DataRequired()])
#     price = FloatField('Price', validators=[DataRequired()])
#     # preview_img = StringField('Preview Image URL')
#     preview_img = FileField('preview image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
