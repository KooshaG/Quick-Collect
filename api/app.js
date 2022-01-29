const express = require('express');
const apiHelper = require('./API_helper');
const db = require('./db');

const app = express();
const sapURL = 'https://sapstore.conuhacks.io/';

db.connect((err) => {
  if (!!err) {
    console.log('Error');
  } else {
    console.log('Connected');
  }
});

app.get('/customer/:email', (req, res) => {
  console.log('hello');
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  const path = 'orders/byEmail?email=';
  const email = req.params.email;
  apiHelper
    .make_API_call(sapURL + path + email)
    .then((response) => {
      const sql = `SELECT * FROM bookings WHERE email = '${email}'`;
      db.query(sql, (err, result) => {
        if (err) throw err;

        const cutomerOrders = response;
        const map = new Map();
        /*result.forEach((bookedOrder) =>
          map.add(bookedOrder.orderId, bookedOrder)
        );
        */

        for (let order of cutomerOrders) {
          if (map.has(order.orderId)) {
            order.booked = true;
            order.booking = map.get(order.orderId);
          } else {
            order.booked = false;
          }
        }
        res.json(cutomerOrders);
      });
    })
    .catch((error) => {
      console.log(error);
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
