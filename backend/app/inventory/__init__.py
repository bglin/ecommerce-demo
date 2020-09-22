from flask import Blueprint, request, jsonify, make_response
from sqlalchemy import text
import cx_Oracle

from app.db import db_session
from app.models import Inventory

inventory_blueprint = Blueprint('inventory', __name__,url_prefix='/api/v0/inventory/')


@inventory_blueprint.route('/', methods = ['GET'])
def get_all_inventory():
    # would users even need this api endpoint?
    result = db_session.execute("SELECT product_id, quantity FROM inventory").fetchall()
    formatted_result = [{'product_id':item[0],'quantity':item[1]} for item in result]
    return(jsonify(formatted_result))

@inventory_blueprint.route('/<product_id>', methods = ['GET'])
def get_prod_inventory(product_id):

    stmt = text("SELECT product_id, quantity FROM inventory WHERE product_id = :id ").bindparams(id=product_id)


    result = db_session.execute(stmt).first()

    if result:
        formatted_result = {'product_id':result[0],'quantity':result[1]}
        if formatted_result.get('quantity') > 0:
            return (jsonify(formatted_result))
        else:
            return (jsonify(message = 'Out of Stock'))
    else:
        return (jsonify(message = 'Product does not exist'))
