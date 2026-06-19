import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const keyword = req.query.search || "";
  const category = req.query.category || "";

  const query = {
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } }
    ]
  };

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query).sort({ createdAt: -1 });

  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

export const addReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.reviews.push({
    user: req.user._id,
    rating,
    comment
  });

  await product.save();

  res.status(201).json({ message: "Review added successfully" });
};