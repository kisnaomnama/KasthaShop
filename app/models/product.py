 
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Numeric(10, 2) , nullable=False)
    category = db.Column(db.String(50), nullable=False) 
    description = db.Column(db.String, nullable=False)
    product_image = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    #one to many#
    seller = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="product", cascade="all, delete-orphan")

    
    @classmethod
    def allowed_categories(cls):
        return ["Thanka Paintings", "Budda Statues","Singings Bowls", "Prayer Flags", "Prayer Wheels", "Others" ]
 
    def to_dict(self):
        reviews = [{**review.to_dict(), "customer": review.customer.to_dict() } for review in self.reviews]

        return {
            "id": self.id,
            "name": self.name,
            "price": str(self.price),
            "category": self.category,
            "description": self.description,
            "product_image": self.product_image,
            "seller": self.seller.to_dict(),
            "created_at": str(self.created_at.strftime("%Y-%m-%d %H:%M:%S")),
            "reviews": reviews
        }
