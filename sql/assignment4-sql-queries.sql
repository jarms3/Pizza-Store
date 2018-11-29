-- get current amount of staff
SELECT COUNT(*) as count FROM pizza.staff;

-- get current orders
SELECT * FROM pizza.order;

-- get orders from a specific store
SELECT * FROM pizza.order WHERE storeID =  req.params.store_id;

-- get customer information for active orders for a specific store
SELECT customer.name, address.streetNum, address.streetName FROM pizza.customer inner join pizza.address on address.addressID = customer.addressID inner join pizza.order on order.customerID = customer.customerID WHERE order.status = 'PREP' OR order.status = 'COOK' AND storeID = req.params.store_id;

-- get staff and amount of orders each one is handling from a specific store
SELECT order.staffID, name, COUNT(*) as orders FROM pizza.order left join pizza.staff on order.staffID = staff.staffID GROUP BY order.staffID, order.storeID HAVING order.storeID =  req.params.store_id;

-- insert employee into a store
INSERT INTO pizza.staff (name, staffID, storeID) VALUES (req.body.name , staffId , req.params.store_id );

-- get amount total for specific order
UPDATE pizza.order SET amountTotal = (SELECT SUM(price*quantity) FROM pizza.pizzas inner join pizza.pizzasinorder on pizzasinorder.pizzaName = pizzas.pizzaName WHERE orderID = req.params.order_id ) WHERE orderID = req.params.order_id;

-- set status of an order
UPDATE pizza.order SET status = req.body.status WHERE orderID = req.params.order_id;

-- delete order if it is 'DONE'
DELETE pizza.order, pizza.pizzasinorder FROM pizza.order inner join pizza.pizzasinorder on pizzasinorder.orderID = order.orderID WHERE order.status = 'DONE' AND pizzasinorder.status = 'DONE';