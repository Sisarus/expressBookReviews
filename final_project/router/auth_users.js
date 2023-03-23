const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    //returns boolean
    //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
    let validusers = users.filter((user) => {
        return (
            user.username === username && user.password === password
        );
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign(
            {
                data: username,
            },
            "access",
            { expiresIn: 60 * 60 }
        );
        req.session.authorization = {
            accessToken,
            username,
        };
        return res
            .status(200)
            .send("Customer successfully logged in");
    } else {
        return res.status(208).json({
            message: "Invalid Login. Check username and password",
        });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    if (isbn) {
        const name = req.user.data;
        books[isbn].reviews[name] = { note: review };
        return res
            .status(300)
            .json(
                "The review for book with ISBN " +
                    isbn +
                    " has been added/updated"
            );
    }

    return res.status(300).json("No success");
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    if (isbn) {
        const name = req.user.data;
        delete books[isbn].reviews[name];
        return res
            .status(300)
            .json(
                "Review for the ISBN " +
                    isbn +
                    " posted by " +
                    name +
                    " deleted"
            );
    }

    return res.status(300).json("No success");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
