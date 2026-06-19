import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },

    title: String,
    mainImg: String,
    size: String,
    quantity: Number,
    price: Number,
    discount: Number
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    mobile: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    },

    items: [orderItemSchema],

    totalQuantity: {
      type: Number,
      required: true
    },

    totalPrice: {
      type: Number,
      required: true
    },

    totalDiscount: {
      type: Number,
      default: 0
    },

    finalAmount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CARD", "NET_BANKING"],
      default: "COD"
    },

    orderDate: {
      type: Date,
      default: Date.now
    },

    deliveryDate: {
      type: Date
    },

    status: {
      type: String,
      enum: ["PLACED", "PACKED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;