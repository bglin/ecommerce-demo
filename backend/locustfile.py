from locust import HttpLocust, TaskSet, task, between
from random import choice, randint

class UserBehaviour(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.catalog = self.all_products()

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        pass

    def all_products(self):
        return self.client.get("/api/v0/products").json()

    # @task(1)
    # def checkout(self):
    #     self.client.post("/api/v0/cart/checkout")

    @task(4)
    def home_page(self):
        self.client.get("/")

    @task(2)
    def product_catalog(self):
        self.client.get("/catalog")

    @task(2)
    def product_page(self):
        self.client.get("/catalog/test_id")

    @task(1)
    def checkout(self):
        self.client.get("/api/v0/cart")
        cart_item = choice(self.catalog)
        item_id = cart_item['product_id']
        price = cart_item['unit_price']

        self.client.post("/api/v0/cart/add",json = {'product_id':item_id,'quantity':randint(1,5),'unit_price':price})
        self.client.post("/api/v0/cart/checkout")

class WebsiteUser(HttpLocust):
    task_set = UserBehaviour
    wait_time = between(5, 9)
