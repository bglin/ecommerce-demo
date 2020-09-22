from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.automap import automap_base

from config import Config
import cx_Oracle


engine = create_engine(Config.SQLALCHEMY_DATABASE_URI,max_identifier_length=128, pool_recycle=300)
# test_engine = create_engine('sqlite:////Users/bglin/ecommerce_app/app/test.db')


## Test queries
# test_engine.execute('CREATE TABLE IF NOT EXISTS orders (order_id INTEGER PRIMARY KEY,order_date TEXT ,cost REAL)')
# test_engine.execute('CREATE TABLE IF NOT EXISTS products (product_id INTEGER PRIMARY KEY, name TEXT)')
#
# test_engine.execute('''CREATE TABLE IF NOT EXISTS inventory (inventory_id INTEGER PRIMARY KEY,
#                                                                product_id INTEGER,
#                                                                quantity INTEGER,
#                                                                restock_date TEXT,
#                                                                FOREIGN KEY (prod_id) REFERENCES Products (prod_id))''')
# test_engine.execute('''CREATE TABLE IF NOT EXISTS order_items (
# 	item_id integer,
# 	order_id integer,
#     product_id integer,
#     quantity integer,
# 	PRIMARY KEY (item_id, order_id,prod_id),
# 	FOREIGN KEY (order_id) REFERENCES Orders (order_id),
# 	FOREIGN KEY (prod_id) REFERENCES Products (prod_id)
# )''')

db_session = scoped_session(sessionmaker(bind = engine))

Base = automap_base()
Base.prepare(engine, reflect = True)
