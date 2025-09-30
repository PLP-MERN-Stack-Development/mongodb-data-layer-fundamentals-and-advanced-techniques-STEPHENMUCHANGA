// insert_books.js (named as insert_books_new.js to avoid conflict)
// Usage:
//   MONGO_URI="mongodb://localhost:27017" node insert_books.js (used this one)
// or for Atlas:
//   MONGO_URI="mongodb+srv://<user>:<pass>@cluster0.mongodb.net" node insert_books.js

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const dbName = "plp_bookstore";
const collName = "books";

const books = [
  {
    title: "The Silent Algorithm",
    author: "Ava Thompson",
    genre: "Science Fiction",
    published_year: 2018,
    price: 12.99,
    in_stock: true,
    pages: 320,
    publisher: "Orion Press"
  },
  {
    title: "Modern JavaScript",
    author: "Owen Brooks",
    genre: "Programming",
    published_year: 2021,
    price: 29.5,
    in_stock: true,
    pages: 480,
    publisher: "DevHouse"
  },
  {
    title: "A Brief History of Clouds",
    author: "Sofia Martinez",
    genre: "Non-Fiction",
    published_year: 2015,
    price: 15.0,
    in_stock: false,
    pages: 210,
    publisher: "Skyline"
  },
  {
    title: "Node & Express in Practice",
    author: "Owen Brooks",
    genre: "Programming",
    published_year: 2019,
    price: 27.0,
    in_stock: true,
    pages: 360,
    publisher: "DevHouse"
  },
  {
    title: "Gardens of Glass",
    author: "Liam Chen",
    genre: "Fantasy",
    published_year: 2009,
    price: 9.99,
    in_stock: true,
    pages: 520,
    publisher: "Greenway"
  },
  {
    title: "React Patterns",
    author: "Maya Patel",
    genre: "Programming",
    published_year: 2022,
    price: 34.95,
    in_stock: true,
    pages: 410,
    publisher: "Frontend Press"
  },
  {
    title: "The Old Mapmaker",
    author: "Ethan Ross",
    genre: "Historical Fiction",
    published_year: 2011,
    price: 11.5,
    in_stock: false,
    pages: 305,
    publisher: "Anchor Books"
  },
  {
    title: "Deep Learning from First Principles",
    author: "Ava Thompson",
    genre: "Programming",
    published_year: 2017,
    price: 45.0,
    in_stock: true,
    pages: 640,
    publisher: "Orion Press"
  },
  {
    title: "Summer of Starlight",
    author: "Liam Chen",
    genre: "Fantasy",
    published_year: 2014,
    price: 8.5,
    in_stock: true,
    pages: 298,
    publisher: "Greenway"
  },
  {
    title: "Minimal Systems Design",
    author: "Sofia Martinez",
    genre: "Non-Fiction",
    published_year: 2020,
    price: 22.0,
    in_stock: true,
    pages: 240,
    publisher: "Skyline"
  },
  {
    title: "Edge Cases & Other Lies",
    author: "Noah K.",
    genre: "Short Stories",
    published_year: 2013,
    price: 7.25,
    in_stock: false,
    pages: 160,
    publisher: "Small Press"
  }
];

async function main() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("Connected to MongoDB:", uri);
    const db = client.db(dbName);
    const coll = db.collection(collName);

    // Optional: clear existing collection for a fresh start
    await coll.deleteMany({});
    console.log("Cleared existing documents in", `${dbName}.${collName}`);

    const result = await coll.insertMany(books);
    console.log(`Inserted ${result.insertedCount} documents into ${dbName}.${collName}`);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();
// End of insert_books_new.js