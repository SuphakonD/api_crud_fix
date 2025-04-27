
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    res.send('Hello world!!')
})

app.get('/books', (req, res) => {
    connection.query(
        'SELECT * FROM books',
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM books WHERE id = ?', [id],
        function (err, results, fields) {
            res.send(results)
        }
    )
})

app.post('/books', (req, res) => {
    connection.query(
        'INSERT INTO `books` (`bname`, `aname`, `detail`, `price`, `cover`) VALUES (?, ?, ?, ?, ?)',
        [req.body.banme, req.body.anmae, req.body.detail, req.body.price, req.body.cover],
         function (err, results, fields) {
            if (err) {
                console.error('Error in POST /books:', err);
                res.status(500).send('Error adding book');
            } else {
                res.status(200).send(results);
            }
        }
    )
})

app.put('/books', (req, res) => {
    connection.query(
        'UPDATE `books` SET `banme`=?, `aname`=?, `detail`=?, `price`=?, `cover`=? WHERE id =?',
        [req.body.bname, req.body.aname, req.body.detail, req.body.price, req.body.cover, req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.delete('/books', (req, res) => {
    connection.query(
        'DELETE FROM `books` WHERE id =?',
        [req.body.id],
         function (err, results, fields) {
            res.send(results)
        }
    )
})

app.listen(process.env.PORT || 3000, () => {
    console.log('CORS-enabled web server listening on port 3000')
})

// export the app for vercel serverless functions
module.exports = app;

