from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    if environment == 'production':
        unseed_all_tables()
    seed_all_tables()


@seed_commands.command('undo')
def undo():
    unseed_all_tables()


@seed_commands.command("reset")
def seed_reset():
    unseed_all_tables()
    seed_all_tables()


def seed_all_tables():
    seed_users()
    seed_products()
    seed_reviews()


def unseed_all_tables():
    undo_reviews()
    undo_products()
    undo_users()


# # Creates the `flask seed all` command
# @seed_commands.command('all')
# def seed():
#     if environment == 'production':
#         # Before seeding in production, you want to run the seed undo 
#         # command, which will  truncate all tables prefixed with 
#         # the schema name (see comment in users.py undo_users function).
#         # Make sure to add all your other model's undo functions below
#         undo_users()
#     seed_users()
#     # Add other seed functions here


# # Creates the `flask seed undo` command
# @seed_commands.command('undo')
# def undo():
#     undo_users()
#     # Add other undo functions here
