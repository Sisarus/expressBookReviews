const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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
    return res
        .status(404)
        .json({
            message:
                "Unable to register user. " +
                username +
                " " +
                password,
        });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    //Write your code here
    return res.status(300).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    let book = "";
    if (req.params.isbn) {
        book = books[req.params.isbn];
    }
    //Write your code here
    return res.status(300).json(book);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    let book_author = req.params.author;
    if (req.params.author) {
        for (var book in books) {
            if (books[book].author === req.params.author) {
                book_author = books[book];
                break;
            }
        }
    }
    //Write your code here
    return res.status(300).json(book_author);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
    let book_title = req.params.title;
    if (req.params.title) {
        for (var book in books) {
            if (books[book].title === req.params.title) {
                book_title = books[book];
                break;
            }
        }
    }
    return res.status(300).json(book_title);
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
