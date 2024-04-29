from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    leo = User(username='leonardo', first_name ='Leo', last_name = 'Diocaprio', email='leo@aa.io', password='password')
    tommy = User(username='tommy', first_name ='Tom', last_name = 'Cruise', email='tom@aa.io', password='password')
    demo = User(username='Demo', first_name ='Demo', last_name = 'Lition', email='demo@aa.io', password='password')
    marnie = User(username='marnie', first_name ='Marnie', last_name = 'Plater', email='marnie@aa.io', password='password')
    bobbie = User(username='bobbie', first_name ='Bobbie', last_name = 'Blazer', email='bobbie@aa.io', password='password')

    db.session.add(leo)
    db.session.add(tommy)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    # db.session.add_all([leo, tommy, demo, marnie, bobbie])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
