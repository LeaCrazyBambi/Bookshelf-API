import express from "express";
import Database from "./connection.js";
import books from "./models/books.js";
import Book from "./models/books.js";
import seed from "./seeders/seed.js";

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

// Will not show Paulo Rezzutti if we search only for Paulo
server.get("/search", async (req, res) => {
  const result = await Book.find(req.body);
  res.json(result);
});

// Search and edit
server.patch("/edit", (req, res) => {
  const resultToEdit = await Book.findOne({ _id: "617a65de49316592abd01164" });
  resultToEdit._id = "001";
  await resultToEdit.save();
  // (req.body[0]);
  // resultToEdit.create(req.body[1]);
  res.send("Might have been changed");
});

server.listen(4008, () => {
  console.log("Listening to http://localhost:4008");
});
