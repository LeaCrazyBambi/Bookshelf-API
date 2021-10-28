import mongoose from "mongoose";

const { Schema } = mongoose;
const required = true;
const bookSchema = new Schema({
  title: { required, type: String },
  author: {
    required,
    type: String,
    minLength: 3,
  },
  summary: { type: String, minLength: 10 },
});

const Book = mongoose.model("books", bookSchema);
export default Book;
