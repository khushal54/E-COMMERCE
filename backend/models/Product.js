import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    mainImg: {
      type: String,
      required: true
    },

    carousel: [
      {
        type: String
      }
    ],

    category: {
      type: String,
      required: true
    },

    sizes: [
      {
        type: String
      }
    ],

    gender: {
      type: String,
      enum: ["MEN", "WOMEN", "KIDS", "UNISEX"],
      default: "UNISEX"
    },

    price: {
      type: Number,
      required: true
    },

    discount: {
      type: Number,
      default: 0
    },

    stock: {
      type: Number,
      default: 10
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        rating: {
          type: Number,
          min: 1,
          max: 5
        },
        comment: String
      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;