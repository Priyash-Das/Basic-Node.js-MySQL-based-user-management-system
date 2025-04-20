const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const port = 8080;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'X_app',
    password: 'XXXXXXXXXXXX'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); // For pass from data

let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
}

// Insert fake users data into the database
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let data = [];
// for (let i = 1; i <= 100; i++) {
//     data.push(getRandomUser()); // 100 fake users data
// }

// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// } catch (err) {
//     console.log("Catch Error:", err);
// }

// connection.end();

// Home route
app.get('/', (req, res) => {
    let q = `SELECT COUNT(*) FROM user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]['COUNT(*)'];
            // res.send(`Total Users: ${result[0]['COUNT(*)']}`); // "result[0]" = object and "COUNT(*)" = key
            res.render('home.ejs', { count });
        });
    } catch (err) {
        console.log("Catch Error:", err);
        res.send(`Error: ${err}`);
    }
});

// Show route
app.get('/users', (req, res) => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;
            res.render('showusers.ejs', { users });
        });
    } catch (err) {
        console.log("Catch Error:", err);
        res.send(`Error: ${err}`);
    }
});

// Edit route
app.get('/users/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render('edit.ejs', { user });
        });
    } catch (err) {
        console.log("Catch Error:", err);
        res.send(`Error: ${err}`);
    }
});

// Update route (DB)
app.patch('/users/:id', (req, res) => {
    let { id } = req.params;
    let { password : formPass, username : newUsername } = req.body;
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (formPass != user.password) {
                res.send(`Password doesn't match`);
            } else {
                let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect('/users');
                });
            }
        });
    } catch (err) {
        console.log("Catch Error:", err);
        res.send(`Error: ${err}`);
    }
});

app.get('/users/:id/password', (req, res) => {
    let { id } = req.params;
    let q = `SELECT password FROM user WHERE id='${id}'`;
    connection.query(q, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(`Password: ${result[0].password}`);
        } else {
            res.send('User not found!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
