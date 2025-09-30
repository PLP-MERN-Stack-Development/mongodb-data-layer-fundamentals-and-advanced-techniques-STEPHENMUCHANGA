# MongoDB Fundamentals - Week 1

## Setup Instructions

Before you begin this assignment, please make sure you have the following installed:

1. **MongoDB Community Edition** - [Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/)
2. **MongoDB Shell (mongosh)** - This is included with MongoDB Community Edition
3. **Node.js** - [Download here](https://nodejs.org/)

### Node.js Package Setup

Once you have Node.js installed, run the following commands in your assignment directory:

```bash
# Initialize a package.json file
npm init -y

# Install the MongoDB Node.js driver
npm install mongodb
```

## Assignment Overview

This week focuses on MongoDB fundamentals including:
- Creating and connecting to MongoDB databases
- CRUD operations (Create, Read, Update, Delete)
- MongoDB queries and filters
- Aggregation pipelines
- Indexing for performance

## Submission

Complete all the exercises in this assignment and push your code to GitHub using the provided GitHub Classroom link.

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 
# Week 1 — MongoDB: Data Layer Fundamentals and Advanced Techniques

## Overview
This repository contains:
- `insert_books.js` — Node script to insert sample book documents into the `plp_bookstore.books` collection.
- `queries.js` — mongosh-compatible queries for CRUD, advanced queries, aggregation pipelines, indexing and `explain()` usage.
- (You should add) a screenshot showing your MongoDB Compass or Atlas collection and sample data.

## Prerequisites
- Node.js (v14+ recommended)
- npm
- MongoDB: either a local MongoDB server (Community Edition) or a free MongoDB Atlas cluster.
- I used a local MongoDB server (MongoDB Compass)
- `mongosh` or MongoDB Compass (optional but recommended).

## Used this option: Setup (Local MongoDB)
1. Ensure MongoDB server is running locally (default on `mongodb://127.0.0.1:27017`).
2. Clone the GitHub Classroom repository provided by your instructor.

## Option 2: Setup (Atlas)
1. Create a free cluster on MongoDB Atlas.
2. Create a database user and whitelist your IP (or allow access from anywhere during development).
3. Copy the connection string.

## How to run the insert script
1. Install dependencies:
   ```bash
   npm init -y
   npm install mongodb
