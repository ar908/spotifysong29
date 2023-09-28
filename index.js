const express = require("express");

const app = express();
const port = 5000;

app.use(express.json());
const user = require("./model/Artists");

app.get("/api/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET a single  by ID
app.get("/api/books/:id", async (req, res) => {
    try {
        const book = await user.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST a new book
app.post("/api/books", async (req, res) => {
    try {
        const book = new user(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: "Bad request" });
    }
});

// PUT (update) a book by ID
app.put("/api/books/:id", async (req, res) => {
    try {
        const book = await user.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: "Bad request" });
    }
});

// DELETE a book by ID
app.delete("/api/books/:id", async (req, res) => {
    try {
        const book = await user.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`connection Succesful at ${port}`);
});
