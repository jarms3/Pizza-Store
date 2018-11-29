var express    = require('express');        // call express
var app        = express();// define our app using express
var bodyParser = require('body-parser');
var staffId;
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pizza"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  con.query("SET FOREIGN_KEY_CHECKS=0");

  con.query("SELECT COUNT(*) as count FROM pizza.staff", function(err, result){
    staffId = result[0].count;
  });

  app.use('/api', router);

  router.use(function(req, res, next) {
    // do logging
    res.setHeader('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers", "Origin, XRequested-With,Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
  });

  router.get('/', function(req, res) {
    con.query("SELECT * FROM pizza.order", function(err, result){
        if (err) throw err;
        res.json(result);
    });   
  });

  router.route('/orders/:store_id')

  .get(function(req, res){
    console.log(req.params.store_id);
    if(req.params.store_id == "" || req.params.store_id == undefined){
        res.json("Store must be defined first");
    }
    else{
        con.query("SELECT * FROM pizza.order WHERE storeID = " + req.params.store_id, function(err, result){
            if (err) throw err;
            res.json(result);
        }); 
    }  
  })


  router.route('/customers')

  .get(function(req, res){
      con.query("SELECT customer.name, address.streetNum, address.streetName FROM pizza.customer inner join pizza.address on address.addressID = customer.addressID inner join pizza.order on order.customerID = customer.customerID WHERE order.status = 'PREP' OR order.status = 'COOK'", function(err, result){
          res.json(result);
      })
  })

  router.route('/staff/:store_id')

  .get(function(req, res){
      con.query("SELECT order.staffID, name, COUNT(*) as orders FROM pizza.order left join pizza.staff on order.staffID = staff.staffID GROUP BY order.staffID, order.storeID HAVING order.storeID = " + req.params.store_id, function(err, result){
        if(err) throw err;

        res.json(result);
      });
  })

  .post(function(req, res){
    staffId++;
    console.log(req.body.name);
    con.query("INSERT INTO pizza.staff (name, staffID, storeID) VALUES (" + req.body.name + ", " + staffId + ", " + req.params.store_id + ")", function(err, result){
              if(err) throw err;
    });
      res.json("add staff");
  });


  router.route('/:order_id')

  .get(function(req, res) {
    con.query("UPDATE pizza.order SET amountTotal = (SELECT SUM(price*quantity) FROM pizza.pizzas inner join pizza.pizzasinorder on pizzasinorder.pizzaName = pizzas.pizzaName WHERE orderID = " + req.params.order_id + ") WHERE orderID = " + req.params.order_id, function(err, result){
        if(err) throw err;
    });

    con.query("SELECT amountTotal FROM pizza.order WHERE orderID = " + req.params.order_id, function(err, result){
        if(err) throw err;

        res.json(result);
    });
  })



  .post(function(req, res){
      con.query("UPDATE pizza.pizzasinorder SET status = " + req.body.status + " WHERE orderID = " + req.params.order_id, function(err, result){
          if(err) throw err;
      });

      con.query("UPDATE piza.order SET status = " + req.body.status + " WHERE orderID = " + req.params.order_id, function(err, result){
        if(err) throw err;
        console.log(req.body.status);
        if(req.body.status == "'DONE'"){
            con.query("DELETE pizza.order, pizza.pizzasinorder FROM pizza.order inner join pizza.pizzasinorder on pizzasinorder.orderID = order.orderID WHERE order.status = 'DONE' AND pizzasinorder.status = 'DONE'", function(error, resp){
                if(error) throw error;
                res.send("Order Completed");
            });
        }
      });

      res.send("Updated!")

  })

  

app.listen(port);
console.log('Magic happens on port ' + port);