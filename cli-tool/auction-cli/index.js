import mongoose from "mongoose";
import AuctionItem from "./models/auctionItems.js";

// Connect to db
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/trademe")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Add data
export const addAuctionItems = async (auctionItems) => {
  try {
    await AuctionItem.create(auctionItems);
    console.info("New auction items added");
  } catch (error) {
    console.error("Error adding auction items:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Delete data
export const deleteAuctionItems = async (_id) => {
  try {
    await AuctionItem.findByIdAndDelete(_id);
    console.info("Auction item deleted");
  } catch (error) {
    console.error("Error deleting auction item:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Search function to find auction items based on multiple fields
export const searchAuctionItems = async (searchTerm) => {
  try {
    const items = await AuctionItem.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { start_price: { $regex: searchTerm, $options: "i" } }, // Searching price as string
        { reserve_price: { $regex: searchTerm, $options: "i" } }, // Searching price as string
      ],
    });

    if (items.length === 0) {
      console.log("No auction items found matching the search term.");
    } else {
      console.log(`Found ${items.length} item(s):`);
      items.forEach((item) => {
        console.log(`Title: ${item.title}`);
        console.log(`Description: ${item.description}`);
        console.log(`Start Price: ${item.start_price}`);
        console.log(`Reserve Price: ${item.reserve_price}`);
        console.log("---");
      });
    }
  } catch (error) {
    console.error("Error during search:", error);
  } finally {
    mongoose.connection.close();
  }
};
