from flask import Blueprint,request, jsonify
from sqlalchemy import text
import cx_Oracle
import json
from app.errors import *
from app.db import db_session

product_blueprint = Blueprint('product', __name__,url_prefix='/api/v0/products/')


# json_template
# use plain SQL for these database reads
@product_blueprint.route('/', methods = ['GET'])
def all_product():
    # result = db_session.execute('''SELECT product_id,name,unit_price,image_url,description
    #                                FROM products''').fetchall()
    # formatted_result = [{'product_id':item[0],'name':item[1],'unit_price':item[2],'image_url':item[3],'description':item[4]} for item in result]
    # return(jsonify(formatted_result))

    # result is list of tuples
    result = db_session.execute('''SELECT prod_json FROM products''' ).fetchall()
    formatted_result = [json.loads(item[0]) for item in result]
    return (jsonify(formatted_result))



@product_blueprint.route('/<product_id>', methods = ['GET'])
def get_product(product_id):
    # stmt = text('''SELECT product_id,name,unit_price,image_url,description
    #                 FROM products WHERE product_id = :id ''').bindparams(id=product_id)
    stmt = text('''SELECT p.prod_json FROM products p WHERE p.prod_json.product_id = :id''').bindparams(id=product_id)
    result = db_session.execute(stmt).first()
    if result:
        # formatted_result = json.loads(result[0])
        # formatted_result = {'product_id':result[0],'name':result[1],'unit_price':result[2],'image_url':result[3],'description':result[4]}
        return jsonify(json.loads(result[0]))
    else:
        raise InvalidUsage("Product does not Exist",404)
