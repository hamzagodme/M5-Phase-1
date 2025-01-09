import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import AuctionItem from "../auction-cli/models/auctionItems.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Search endpoint to search auction items based on search criteria
app.get("/api/auction-items/search", async (req, res) => {
  console.log("search api hit");
  console.log(req.query);
  const { searchTerm, minPrice, maxPrice } = req.query;

  // Build the query object
  let query = {};

  // Search by title or description if searchTerm is provided
  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for title
      { description: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search for description
    ];
  }

  // Add price range filter if minPrice or maxPrice is provided
  if (minPrice || maxPrice) {
    query.start_price = {};
    if (minPrice) query.start_price.$gte = parseFloat(minPrice); // greater than or equal to minPrice
    if (maxPrice) query.start_price.$lte = parseFloat(maxPrice); // less than or equal to maxPrice
  }

  try {
    const items = await AuctionItem.find(query);
    if (items.length === 0) {
      return res
        .status(404)
        .json({ message: "No auction items found matching your search." });
    }
    res.status(200).json(items);
  } catch (error) {
    console.error("Error searching auction items:", error);
    res.status(500).json({ message: "Error searching auction items." });
  }
});

// Start the Express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
