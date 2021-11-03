import faker from "faker";
import Books from "../models/books.js";

export default async function seed() {
  await Books.deleteMany({}).exec();

  const fakeBooks = [
    {
      title: "Emotional Intelligence: Why It Can Matter More Than IQ",
      author: "Daniel Goleman",
    },
  ];

  for (let i = 6; --i; ) {
    const book = new Books({
      title: faker.internet.title(),
      author: faker.internet.userName(),
      summary: faker.lorem.sentence(),
    });
    await post.save();
    fakeBooks.push(book);
  }
}
