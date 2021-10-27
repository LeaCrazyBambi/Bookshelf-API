import express from "express";
import validationResult from "express-validator";

const server = express();
server.use(express.json());

const BookshelfDB = [];

server.use((request, response, next) => {
  next();
});

server.use((error, request, response, next) => {
  response.status(404);
  response.send("Resource not found");
  console.log(error);
});

server.post("/newbook", (req, res) => {
  BookshelfDB.push(req.body);
  res.send("Book has been added");
  console.log("Book has been added to the database");
});

server.get("/books", (req, res) => {
  res.send("Database of books is being shown");
  console.log(BookshelfDB);
});

server.listen(4008, () => {
  console.log("Listening to http://localhost:4008");
});
