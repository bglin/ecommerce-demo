import os


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret-hidden-key'
    ## str(os.urandom(16))

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    ORACLE_CONFIG = os.environ.get('ORACLE_CONFIG')
    BUCKET_NAME =  os.environ.get('BUCKET_NAME')
