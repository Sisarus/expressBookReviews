const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require("axios");

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
};

// Register
public_users.post("/register", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!doesExist(username)) {
            users.push({ username: username, password: password });
            return res.status(200).json({
                message:
                    "Customer successfully registred. Now you can login",
            });
        } else {
            return res
                .status(404)
                .json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({
        message:
            "Unable to register user. " + username + " " + password,
    });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    //Write your code here
    return res.status(300).json(books);
});

// Using Promise
public_users.get("/books", function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({ books }, null, 4)));
    });

    get_books.then(() => console.log("ok"));
});

// Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//     let book = "";
//     if (req.params.isbn) {
//         book = books[req.params.isbn];
//     }
//     //Write your code here
//     return res.status(300).json(book);
// });

// Using Promise, Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    const get_book = new Promise((resolve, reject) => {
        const book = books[req.params.isbn];
        resolve(res.send(JSON.stringify({ book }, null, 4)));
    });

    get_book.then(() => console.log("ok"));
});

// Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//     let book_author = req.params.author;
//     if (req.params.author) {
//         for (var book in books) {
//             if (books[book].author === req.params.author) {
//                 book_author = books[book];
//                 break;
//             }
//         }
//     }
//     //Write your code here
//     return res.status(300).json(book_author);
// });

// Using Promise, Get book details based on author
public_users.get("/author/:author", function (req, res) {
    const get_book = new Promise((resolve, reject) => {
        let book = "";
        for (var book_look in books) {
            if (books[book_look].author === req.params.author) {
                book = books[book_look];
                break;
            }
        }
        resolve(res.send(JSON.stringify({ book }, null, 4)));
    });
    get_book.then(() => console.log("ok"));
});

// Get all books based on title
// public_users.get("/title/:title", function (req, res) {
//     let book_title = req.params.title;
//     if (req.params.title) {
//         for (var book in books) {
//             if (books[book].title === req.params.title) {
//                 book_title = books[book];
//                 break;
//             }
//         }
//     }
//     return res.status(300).json(book_title);
// });

// Using Promise, Get all books based on title
public_users.get("/title/:title", function (req, res) {
    const get_book = new Promise((resolve, reject) => {
        let book = "";
        for (var book_look in books) {
            if (books[book_look].title === req.params.title) {
                book = books[book_look];
                resolve(res.send(JSON.stringify({ book }, null, 4)));
                break;
            }
        }
        resolve(res.send(JSON.stringify({ book }, null, 4)));
    });
    get_book.then(() => console.log("ok"));
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
    let book_reviews = req.params.isbn;
    if (req.params.isbn) {
        book_reviews = books[req.params.isbn].reviews;
    }
    return res.status(300).json(book_reviews);
});

module.exports.general = public_users;
