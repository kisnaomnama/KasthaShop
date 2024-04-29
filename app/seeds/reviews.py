from app.models import db, environment, SCHEMA, User, Product, Review
from sqlalchemy.sql import text

def seed_reviews():
   
    reviews = [
    {
        "product_id": 3,
        "user_id": 1,
        "review": "Impressive product, exceeded my expectations!",
        "rating": 5
    },
    {
        "product_id": 2,
        "user_id": 3,
        "review": "Could be better, but overall decent.",
        "rating": 3
    },
    {
        "product_id": 4,
        "user_id": 4,
        "review": "Not satisfied with the quality, needs improvement.",
        "rating": 2
    },
    {
        "product_id": 3,
        "user_id": 5,
        "review": "Amazing value for the price, highly recommend!",
        "rating": 5
    },
    {
        "product_id": 5,
        "user_id": 2,
        "review": "Absolutely fantastic! Will buy again.",
        "rating": 5
    },
    {
        "product_id": 1,
        "user_id": 1,
        "review": "Very beautiful",
        "rating": 5
    },
    {
        "product_id": 2,
        "user_id": 2,
        "review": "I enjoy this very much. Awesome quality.",
        "rating": 5
    },
    {
        "product_id": 1,
        "user_id": 2,
        "review": "Not bad!",
        "rating": 4
    },
    {
        "product_id": 1,
        "user_id": 3,
        "review": "Great for the value.",
        "rating": 4
    }
]

    [db.session.add(Review(**review)) for review in reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
