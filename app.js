const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: '34.122.100.222',
  user: 'trafa-instance',
  password: 'trafa',
  database: 'trafa_databases'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Connected to database');
  }
});

//API for data.
app.get('/desc/:id', (req, res) => {
    connection.query('SELECT * FROM tbl_desc', (err, results) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch data.' });
      } else {
        res.status(200).json({ tbl_desc: results });
      }
    });
  });

//start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

