import express from "express";
import Database from "./connection.js";
import Book from "./models/books.js";
import Seed from "./seeders/seed.js";

const server = express();
server.use(express.json());

const db = new Database();
await db.connect();

if (process.env.ENVIRONMENT === "dev") {
  await seed();
}

server.use((request, response, next) => {
  next();
});

server.use((error, request, response, next) => {
  response.status(404);
  response.send("Resource not found");
  console.log(error);
});

server.post("/books", (req, res) => {
  Book.create(req.body);
  res.send("Book has been added");
  console.log("Book has been added to the database");
});

server.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Searching
server.post("/search", async (req, res) => {
  const result = await Book.find({ author: /Paulo/ });
  result.length;
  result.map((r) => r.author).sort();
  res.send(result);
});

// Delete one
server.delete("/delete", async (req, res) => {
  const deleteIt = await Book.findByIdAndRemove(req.body._id);
  console.log("Did we find it?", deleteIt);
  res.json("This might have been deleted");
});

// Search and edit
server.patch("/edit", async (req, res) => {
  const resultToEdit = await Book.findOneAndUpdate(
    { _id: req.body._id },
    { author: req.body.author }
  );
  if (resultToEdit) {
    return res.status(200).json(resultToEdit);
  }
  res.status(400).json({ message: "Cannot update" });
});

server.listen(4008, () => {
  console.log("Listening to http://localhost:4008");
});
