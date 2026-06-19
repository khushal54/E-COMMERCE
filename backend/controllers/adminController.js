import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Admin from "../models/Admin.js";

export const createProduct = async (req, res) => {
  const {
    title,
    description,
    mainImg,
    carousel,
    category,
    sizes,
    gender,
    price,
    discount,
    stock
  } = req.body;

  if (!title || !description || !mainImg || !category || !price) {
    return res.status(400).json({ message: "Required product fields missing" });
  }

  const product = await Product.create({
    title,
    description,
    mainImg,
    carousel,
    category,
    sizes,
    gender,
    price,
    discount,
    stock
  });

  res.status(201).json({
    message: "Product created successfully",
    product
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);

  const updatedProduct = await product.save();

  res.json({
    message: "Product updated successfully",
    product: updatedProduct
  });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "username email mobile")
    .sort({ createdAt: -1 });

  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json({
    message: "Order status updated",
    order
  });
};

export const addBanner = async (req, res) => {
  const { title, image } = req.body;

  let adminData = await Admin.findOne();

  if (!adminData) {
    adminData = await Admin.create({ banners: [], categories: [] });
  }

  adminData.banners.push({ title, image });
  await adminData.save();

  res.status(201).json({
    message: "Banner added successfully",
    banners: adminData.banners
  });
};

export const addCategory = async (req, res) => {
  const { title, image } = req.body;

  let adminData = await Admin.findOne();

  if (!adminData) {
    adminData = await Admin.create({ banners: [], categories: [] });
  }

  adminData.categories.push({ title, image });
  await adminData.save();

  res.status(201).json({
    message: "Category added successfully",
    categories: adminData.categories
  });
};

export const getHomeData = async (req, res) => {
  const adminData = await Admin.findOne();

  res.json({
    banners: adminData?.banners || [],
    categories: adminData?.categories || []
  });
};