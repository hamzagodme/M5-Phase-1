import mongoose from "mongoose";
import AuctionItem from "./models/auctionItems.js";
import sampleAuctionItems from "./sampleAuctionItems.json" assert { type: "json" };
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB and seed data
export const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/trademe"
    );
    console.log("Connected to MongoDB");

    await AuctionItem.deleteMany({});
    console.log("Existing auction items deleted from  the database");

    await AuctionItem.insertMany(sampleAuctionItems);
    console.log("New auction items added to the database");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error);
    mongoose.connection.close();
  }
};
