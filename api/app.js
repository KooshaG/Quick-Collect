var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
const apiHelper = require('./API_helper');
const sapURL = 'https://sapstore.conuhacks.io/';
const cors = require('cors');
const db = require('./Firestore');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sampleDB',
});

connection.connect((err) => {
  if (!!err) {
    console.log('Error');
  } else {
    console.log('Connected');
  }
});

app.get('/customer/:email', (req, res) => {
  console.log('hello');
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  const path = 'orders/byEmail?email=';
  const email = req.params.email;
  apiHelper
    .make_API_call(sapURL + path + email)
    .then((response) => {
      const q = query(collection(db, 'bookings'), where('email', '==', email));
      const querySnapshot = getDocs(q);

      const cutomerOrders = response.json();
      console.log(cutomerOrders);
      const map = new Map();
      querySnapshot.forEach((bookedOrder) =>
        map.add(bookedOrder.orderId, bookedOrder)
      );

      for (let order of cutomerOrders) {
        if (map.has(order.orderId)) {
          order.booked = true;
          order.booking = map.get(order.orderId);
        } else {
          order.booked = false;
        }
      }

      res.json(response);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error 404 (Not Found)',
    message: "Couldn't find the requested URL.",
  });
});

app.listen(3333, () => {
  console.log('Server is up on port 3333.');
});
