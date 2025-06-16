import express from "express";

// Create an instance of an Express app
const app = express();

// Middleware to parse incoming JSON requests (important for POST/PUT APIs)
app.use(express.json());

// Define a sample test route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Start the server on port 5001
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
