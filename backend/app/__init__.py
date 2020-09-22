from flask import Flask, make_response, jsonify
from flask_wtf.csrf import CSRFProtect,generate_csrf


from app.product import product_blueprint
from app.inventory import inventory_blueprint
from app.errors import errors_blueprint
from app.cart import cart_blueprint
from app.analytics import analytics_blueprint

from config import Config

## app uses a mix of ORM and plain SQLALCHEMY Core
## for example, when multiple updates are needed, plain sql offers better performance
from .db import db_session

##All POST requests need to include 'X-CSRFToken' in the header
# csrf = CSRFProtect()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    # csrf.init_app(app)
    # cors.init_app(app)

    with app.app_context():
        # Locust test endpoints
        @app.route('/', methods = ['GET'])
        def index():
            return "Home Page"

        @app.route('/catalog', methods = ['GET'])
        def catalog():
            return "Product Catalog"

        @app.route('/catalog/test_id', methods = ['GET'])
        def test_product():
            return "Test Product Page"

        # @app.route('/token', methods=['GET'])
        # def generate_token():
        #     csrf_token = generate_csrf()
        #     return jsonify(csrf_token=csrf_token)

        ## called when requests are finished
        ## closes db session after every request
        @app.teardown_appcontext
        def teardown_db(resp_or_exc):
            print("session Removal intiating")
            db_session.remove()

        app.register_blueprint(errors_blueprint)
        app.register_blueprint(product_blueprint)
        app.register_blueprint(inventory_blueprint)
        app.register_blueprint(cart_blueprint)
        app.register_blueprint(analytics_blueprint)
        return(app)
