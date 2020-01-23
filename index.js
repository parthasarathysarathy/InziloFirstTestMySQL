const mysql = require('mysql');

const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: '*********',
    password: '*********',
    database: '**********'
})

mysqlConnection.connect((err) => {
    if (!err)
        console.log("DB connection succeeded");
    else
        console.log("DB connection failed", err);
})

app.listen(3000, () => console.log("Server is running at port no : 3000"));

//Get All Restaurant Details
app.get('/getAllRestaurantDetails', (req, res) => {
    let sql = 'SELECT * FROM restaurant';
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            res.send(err)
    })
})

//get A Restaurant Detail
app.get('/getOneRestaurantDetail', (req, res) => {
    let data = { restaurantID: req.body.restaurantID };
    let sql = 'SELECT * FROM restaurant WHERE restaurantID = ?';
    mysqlConnection.query(sql, data, (err, results) => {
        if (!err)
            res.send(results);
        else
            res.send(err)
    })
})

//Delete A Restaurant Detail
app.post('/deleteRestaurant', (req, res) => {
    let data = { restaurantID: req.body.restaurantID };
    let sql = 'DELETE FROM restaurant WHERE restaurantID = ?';
    mysqlConnection.query(sql, data, (err, results) => {
        if (!err)
            res.send('Deleted Successfully');
        else
            res.send(err)
    })
})

//Add A Restaurant Detail
app.post('/insertRestaurant', (req, res) => {
    let data = { restaurantID: req.body.restaurantID, restaurantName: req.body.restaurantName, restaurantAddress: req.body.restaurantAddress, orders: req.body.orders };
    let sql = "INSERT INTO restaurant SET ?";
    mysqlConnection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(results)
    });
});

//Update A Restaurant Detail
app.post('/updateRestaurantOrders', (req, res) => {
    var sql = "UPDATE restaurant set orders =? WHERE restaurantID = ?";
    mysqlConnection.query(sql, [req.body.orders, req.body.restaurantID], (err, results) => {
        if (err) throw err;
        res.send(results)
    });
});