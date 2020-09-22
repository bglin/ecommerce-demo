from flask import Blueprint,request, jsonify
from flask_wtf.csrf import CSRFError

errors_blueprint = Blueprint('errors', __name__)


class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@errors_blueprint.app_errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@errors_blueprint.app_errorhandler(CSRFError)
def handle_csrf_error(e):
    return jsonify(error=e.description), 400
