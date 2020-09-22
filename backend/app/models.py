from app.db import Base

# mapped classes are now created with names by default
# matching that of the table name.
Item = Base.classes.order_items
Product = Base.classes.products
Inventory = Base.classes.inventory
Order = Base.classes.orders
