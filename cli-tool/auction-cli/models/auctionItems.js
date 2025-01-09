import mongoose from "mongoose";

// Define the schema for the auctionItems collection
const auctionItemSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  start_price: { type:String},
  reserve_price: { type: String },
});

// Export the model based on the auctionItemSchema
export default mongoose.model("AuctionItem", auctionItemSchema);
