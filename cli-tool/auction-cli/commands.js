#!/usr/bin/env node
import { program } from "commander";
import {
  addAuctionItems,
  deleteAuctionItems,
  searchAuctionItems,
} from "./index.js"; // Fixed import with .js extension
import { seedDatabase } from "./seed.js"; // Fixed import with .js extension
import { exec } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Get current file's directory
const __dirname = dirname(fileURLToPath(import.meta.url));

program.version("0.0.1").description("Managing Trade Me auction items");

program
  .command("add")
  .alias("a")
  .description("Add a new auction item")
  .action((title, description, start_price, reserve_price) => {
    addAuctionItems({
      title,
      description,
      start_price,
      reserve_price,
    });
  });

program
  .command("remove <_id>")
  .alias("r")
  .description("Remove an auction item by id")
  .action((_id) => {
    deleteAuctionItems(_id);
  });

program
  .command("seed")
  .description("Seed the database with sample auction items")
  .action(() => {
    seedDatabase();
    const seedPath = join(__dirname, "seed.js");
  });

program
  .command("find <searchTerm>")
  .description(
    "Search for auction items by title, description, start price, or reserve price"
  )
  .action(async (searchTerm) => {
    await searchAuctionItems(searchTerm); // Perform the search
  });

program.parse(process.argv);
