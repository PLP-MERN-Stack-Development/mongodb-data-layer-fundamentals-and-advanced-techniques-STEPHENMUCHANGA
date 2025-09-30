// queries.js
// These are mongosh-style commands. Either run line-by-line in mongosh or save as queries.js and run `mongosh --file queries.js`
// Ensure you're using the plp_bookstore database:
use ("plp_bookstore");

// References:
// collection
const coll = db.getCollection("books");

/* ---------------------------
   Task 2: Basic CRUD
   --------------------------- */

// Find all books in a specific genre (e.g., "Programming")
db.books.find({ genre: "Programming" }).pretty();

// Find books published after a certain year (e.g., after 2015)
db.books.find({ published_year: { $gt: 2015 } }).pretty();

// Find books by a specific author (e.g., "Owen Brooks")
db.books.find({ author: "Owen Brooks" }).pretty();

// Update the price of a specific book (by title)
db.books.updateOne(
  { title: "Modern JavaScript" },
  { $set: { price: 31.0 } } // new price
);

// Delete a book by its title
db.books.deleteOne({ title: "Edge Cases & Other Lies" });

/* ---------------------------
   Task 3: Advanced Queries
   --------------------------- */

// Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } }).pretty();

// Use projection to return only title, author, and price
db.books.find({ genre: "Programming" }, { title: 1, author: 1, price: 1, _id: 0 }).pretty();

// Sorting by price ascending
db.books.find({}, { title: 1, price: 1, _id: 0 }).sort({ price: 1 }).pretty();

// Sorting by price descending
db.books.find({}, { title: 1, price: 1, _id: 0 }).sort({ price: -1 }).pretty();

// Pagination example: 5 books per page
// Page 1 (skip 0)
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 }).sort({ title: 1 }).skip(0).limit(5).pretty();

// Page 2 (skip 5)
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 }).sort({ title: 1 }).skip(5).limit(5).pretty();

/* ---------------------------
   Task 4: Aggregation Pipeline
   --------------------------- */

// 1) Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" }, count: { $sum: 1 } } },
  { $project: { genre: "$_id", averagePrice: { $round: ["$averagePrice", 2] }, count: 1, _id: 0 } },
  { $sort: { averagePrice: -1 } }
]).pretty();

// 2) Author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", booksCount: { $sum: 1 } } },
  { $sort: { booksCount: -1 } },
  { $limit: 1 },
  { $project: { author: "$_id", booksCount: 1, _id: 0 } }
]).pretty();

// 3) Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      title: 1,
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $project: { decade: "$_id", count: 1, _id: 0 } },
  { $sort: { decade: 1 } }
]).pretty();

/* ---------------------------
   Task 5: Indexing
   --------------------------- */

// Create an index on title for faster searches
db.books.createIndex({ title: 1 }, { name: "idx_title" });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 }, { name: "idx_author_year" });

// Demonstrate performance with explain()
// Example find before index (if you want to test, drop indexes first):
// db.books.dropIndex("idx_title"); // run only if you want to test no-index case

// 1) Explain for a title search (uses index after createIndex)
db.books.find({ title: "Modern JavaScript" }).explain("executionStats");

// 2) Explain for an author + year range query (should use compound index)
db.books.find({ author: "Owen Brooks", published_year: { $gte: 2015 } }).explain("executionStats");

// Notes for interpreting explain(): check 'executionStats.executionTimeMillis', and 'queryPlanner.winningPlan'.
// Look at whether 'IXSCAN' appears vs 'COLLSCAN' to confirm index usage.

/* ---------------------------
   Misc / Helpful commands
   --------------------------- */

// Show indexes on the collection
db.books.getIndexes();

// Show count
db.books.countDocuments();

// Sample some documents (limit)
db.books.find().limit(5).pretty();
