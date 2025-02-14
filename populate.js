import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";
import Product from "./models/Product.js";
import products from "./products.json" assert { type: "json" };

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected");
    await Product.deleteMany();
    await Product.create(products);
    console.log("Products added successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
