drop table orders;
drop table products;
drop table order_items;
drop table inventory;

--ALTER TABLE orders MODIFY(ID Generated as Identity (START WITH 1));
CREATE TABLE orders (order_id NUMBER GENERATED ALWAYS AS IDENTITY, order_date VARCHAR(10),order_total FLOAT, PRIMARY KEY(order_id));
CREATE TABLE products (product_id VARCHAR(50) PRIMARY KEY,name VARCHAR(50),description VARCHAR(500),image_url VARCHAR(500),unit_price FLOAT);
CREATE TABLE inventory (inventory_id VARCHAR(50) PRIMARY KEY,product_id VARCHAR(50),quantity NUMBER,restock_date VARCHAR(30),FOREIGN KEY (product_id) REFERENCES products (product_id));
CREATE TABLE order_items (item_id VARCHAR(500),order_id NUMBER,product_id VARCHAR(50),quantity NUMBER,item_total FLOAT,PRIMARY KEY (item_id, order_id,product_id),FOREIGN KEY (order_id) REFERENCES orders (order_id),FOREIGN KEY (product_id) REFERENCES products (product_id));


INSERT INTO products (product_id,name,description,image_url,unit_price) VALUES('BGB-US-001','Bathroom Mirror','A small mirror for your bathroom','https://objectstorage.us-ashburn-1.oraclecloud.com/p/KmddNDE6xDn4Ufbp5BaqXK-7E_FrEvI0yj-612AXPiA/n/orasenatdoracledigital04/b/blin-ecommerce/o/bathroom.png',15.25);
INSERT INTO products (product_id,name,description,image_url,unit_price) VALUES('BGB-US-002','Coffee Maker','Coffee machine suitable for your office','https://objectstorage.us-ashburn-1.oraclecloud.com/p/IGrfiu1rVw9hAcT_IU_abIBwznyAKei-Y8SrsVXbKHM/n/orasenatdoracledigital04/b/blin-ecommerce/o/coffee-cup.png',75.50);
INSERT INTO products (product_id,name,description,image_url,unit_price) VALUES('BGB-US-003','Vacuum Cleaner','High-powered, lightweight vacuum for all your cleaning needs','https://objectstorage.us-ashburn-1.oraclecloud.com/p/REhJeJnU7egI9AtqyAbDtk9nKi_wVDwKCSsz3CvUjhI/n/orasenatdoracledigital04/b/blin-ecommerce/o/vacuum-cleaner.png',200);
INSERT INTO products (product_id,name,description,image_url,unit_price) VALUES('BGB-US-004','Rice Cooker','Multi-functional induction heating electric rice cooker','https://objectstorage.us-ashburn-1.oraclecloud.com/p/9GiB5otGmz_Nt_0uaT-471nUBMW8vhhwVBjPyZzS5Kw/n/orasenatdoracledigital04/b/blin-ecommerce/o/rice-cooker.png',118.99);
INSERT INTO products (product_id,name,description,image_url,unit_price) VALUES('BGB-US-005','Mesh Desk Chair','ergonomic high back office chair with a breathable mesh back','https://objectstorage.us-ashburn-1.oraclecloud.com/p/olu5bxrj7mBXWIn315MY33WWMOWtB9Dlip0avYymXc0/n/orasenatdoracledigital04/b/blin-ecommerce/o/studying.png',74.99);
INSERT INTO products (product_id,name,description,image_url,unit_price) VALUES('BGB-US-006','Humidifier','Provides cool mist to maintain humidity levels in your household','https://objectstorage.us-ashburn-1.oraclecloud.com/p/wyRRdMx6LmDI8f6jm0Qf2gdBtnlvPOLDJByuS4rIDg4/n/orasenatdoracledigital04/b/blin-ecommerce/o/humidifier.png',57.99);
INSERT INTO products (product_id,name,description,image_url,unit_price) VALUES('BGB-US-007','Shower Head','Brushed nickel showerheard with six settings','https://objectstorage.us-ashburn-1.oraclecloud.com/p/pJoPb9NaZb-4SD456JT9gEEnuwn7p3ntLtrjbuaV-zA/n/orasenatdoracledigital04/b/blin-ecommerce/o/water.svg',48.99);

-- ALTER TABLE products DROP COLUMN prod_json;

ALTER TABLE products
ADD prod_json VARCHAR2(23767);

ALTER TABLE products
ADD CONSTRAINT "ENSURE_JSON" CHECK (prod_json IS JSON);

UPDATE products
SET
	prod_json = '{"product_id":"BGB-US-007","name":"Shower Head","description":"Brushed nickel showerheard with six settings","image_url":"https://objectstorage.us-ashburn-1.oraclecloud.com/p/pJoPb9NaZb-4SD456JT9gEEnuwn7p3ntLtrjbuaV-zA/n/orasenatdoracledigital04/b/blin-ecommerce/o/water.svg","unit_price":48.99}'
WHERE
	product_id = 'BGB-US-007';

UPDATE products
SET
	prod_json = '{"product_id":"BGB-US-006","name":"Humidifier","description":"Provides cool mist to maintain humidity levels in your household","image_url":"https://objectstorage.us-ashburn-1.oraclecloud.com/p/wyRRdMx6LmDI8f6jm0Qf2gdBtnlvPOLDJByuS4rIDg4/n/orasenatdoracledigital04/b/blin-ecommerce/o/humidifier.png","unit_price":57.99}'
WHERE
	product_id = 'BGB-US-006';

UPDATE products
SET
	prod_json = '{"product_id":"BGB-US-005","name":"Mesh Desk Chair","description":"ergonomic high back office chair with a breathable mesh back","image_url":"https://objectstorage.us-ashburn-1.oraclecloud.com/p/olu5bxrj7mBXWIn315MY33WWMOWtB9Dlip0avYymXc0/n/orasenatdoracledigital04/b/blin-ecommerce/o/studying.png","unit_price":74.99}'
WHERE
	product_id = 'BGB-US-005';

UPDATE products
SET
	prod_json = '{"product_id":"BGB-US-004","name":Rice Cooker","description":"Multi-functional induction heating electric rice cooker","image_url":"https://objectstorage.us-ashburn-1.oraclecloud.com/p/9GiB5otGmz_Nt_0uaT-471nUBMW8vhhwVBjPyZzS5Kw/n/orasenatdoracledigital04/b/blin-ecommerce/o/rice-cooker.png","unit_price":118.99}'
WHERE
	product_id = 'BGB-US-004';

UPDATE products
SET
	prod_json = '{"product_id":"BGB-US-003","name":"Vacuum Cleaner","description":"High-powered, lightweight vacuum for all your cleaning needs","image_url":"https://objectstorage.us-ashburn-1.oraclecloud.com/p/REhJeJnU7egI9AtqyAbDtk9nKi_wVDwKCSsz3CvUjhI/n/orasenatdoracledigital04/b/blin-ecommerce/o/vacuum-cleaner.png","unit_price":200}'
WHERE
	product_id = 'BGB-US-003';

UPDATE products
SET
	prod_json = '{"product_id":"BGB-US-002","name":"Coffee Maker","description":"Coffee machine suitable for your office","image_url":"https://objectstorage.us-ashburn-1.oraclecloud.com/p/IGrfiu1rVw9hAcT_IU_abIBwznyAKei-Y8SrsVXbKHM/n/orasenatdoracledigital04/b/blin-ecommerce/o/coffee-cup.png","unit_price":75.50}'
WHERE
	product_id = 'BGB-US-002';

UPDATE products
SET
	prod_json = '{"product_id":"BGB-US-001","name":"Bathroom Mirror","description":"A small mirror for your bathroom","image_url":"https://objectstorage.us-ashburn-1.oraclecloud.com/p/KmddNDE6xDn4Ufbp5BaqXK-7E_FrEvI0yj-612AXPiA/n/orasenatdoracledigital04/b/blin-ecommerce/o/bathroom.png","unit_price":15.25}'
WHERE
	product_id = 'BGB-US-001';


INSERT INTO inventory (inventory_id,product_id,quantity,restock_date) VALUES('WH-ASH-001','BGB-US-001',1000,'05-12-20');
INSERT INTO inventory (inventory_id,product_id,quantity,restock_date) VALUES('WH-ASH-002','BGB-US-002',1000,'05-09-20');
INSERT INTO inventory (inventory_id,product_id,quantity,restock_date) VALUES('WH-ASH-003','BGB-US-003',1000,'05-18-20');
INSERT INTO inventory (inventory_id,product_id,quantity,restock_date) VALUES('WH-ASH-004','BGB-US-004',1000,'06-13-20');
INSERT INTO inventory (inventory_id,product_id,quantity,restock_date) VALUES('WH-ASH-005','BGB-US-005',1000,'05-24-20');
INSERT INTO inventory (inventory_id,product_id,quantity,restock_date) VALUES('WH-ASH-006','BGB-US-006',1000,'05-15-20');
INSERT INTO inventory (inventory_id,product_id,quantity,restock_date) VALUES('WH-ASH-007','BGB-US-007',1000,'06-01-20');

-- CREATE DEMO TABLES --
CREATE TABLE GA_SINK (ga_date VARCHAR2(500),product_id VARCHAR2(500),page_views NUMBER);

CREATE TABLE DEMO_SALES (sale_date VARCHAR2(500),product_id VARCHAR2(500),amount NUMBER);

INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-05','BGB-US-001',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-05','BGB-US-002',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-05','BGB-US-003',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-05','BGB-US-004',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-05','BGB-US-005',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-05','BGB-US-006',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-05','BGB-US-007',floor(dbms_random.value(2000,6000)));

INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-06','BGB-US-001',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-06','BGB-US-002',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-06','BGB-US-003',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-06','BGB-US-004',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-06','BGB-US-005',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-06','BGB-US-006',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-06','BGB-US-007',floor(dbms_random.value(2000,6000)));

INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-07','BGB-US-001',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-07','BGB-US-002',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-07','BGB-US-003',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-07','BGB-US-004',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-07','BGB-US-005',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-07','BGB-US-006',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-07','BGB-US-007',floor(dbms_random.value(2000,6000)));

INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-08','BGB-US-001',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-08','BGB-US-002',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-08','BGB-US-003',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-08','BGB-US-004',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-08','BGB-US-005',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-08','BGB-US-006',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-08','BGB-US-007',floor(dbms_random.value(2000,6000)));

INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-09','BGB-US-001',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-09','BGB-US-002',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-09','BGB-US-003',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-09','BGB-US-004',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-09','BGB-US-005',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-09','BGB-US-006',floor(dbms_random.value(2000,6000)));
INSERT INTO DEMO_SALES (sale_date,product_id,amount) VALUES('2020-10-09','BGB-US-007',floor(dbms_random.value(2000,6000)));

-- MATERIALIZED VIEW --
CREATE OR REPLACE VIEW product_sales AS
SELECT orders.order_date AS "Date" ,order_items.product_id AS "Product ID",SUM(order_items.item_total) AS "Total Sale"
FROM orders
JOIN order_items
ON orders.order_id = order_items.order_id
GROUP BY order_items.product_id,orders.order_date;


-- QUERY STATEMENTS --
-- SELECT *
-- FROM products
-- JOIN inventory
-- ON products.product_id = inventory.product_id;
--
--
-- select COUNT(*) from orders;
--
-- SELECT order_date,sum(order_total)
-- FROM orders
-- GROUP BY order_date;
--
-- SELECT product_id,sum(item_total)
-- FROM order_items
-- GROUP BY product_id;
--
-- select ga_date,sum(page_views),floor(dbms_random.value(2000, 6000)) as sales
-- from ga_sink
-- group by ga_date;


--DELETE FROM INVENTORY;
--DELETE FROM order_items;
--DELETE FROM orders;
--DELETE FROM products;

--DELETE FROM orders where order_id=6;
--DELETE FROM order_items where item_id='XX-0';
--ROLLBACK;
COMMIT;
