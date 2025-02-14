import { Schema, model, Model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      lowercase: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
      min: 0.01,
    },
    description: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
    image: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      lowercase: true,
      enum: ["electronics", "clothing", "books", "sport", "fashion"],
    },
    featured: {
      type: Schema.Types.Boolean,
      default: true,
    },
    rating: { type: Schema.Types.Number, min: 0, max: 5, default: 4.5 },
  },
  {
    timestamps: true,
  }
);

/**
 * @type {Model}
 */
const Product = model("Product", ProductSchema);

export default Product;
