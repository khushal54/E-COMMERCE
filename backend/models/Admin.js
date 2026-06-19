import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    banners: [
      {
        title: String,
        image: String
      }
    ],

    categories: [
      {
        title: String,
        image: String
      }
    ]
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;