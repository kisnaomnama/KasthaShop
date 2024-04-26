from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    discription =db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float)
    catagory_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('catagories.id')), nullable=False)
    preview_img = db.Column(db.String(255))

    catagory = db.relationship('Catagories', backpopulates = 'products')
 
