import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const existingCartItem = await Cart.findOne({
    userId: req.user._id,
    productId,
    sizes: size || ""
  });

  if (existingCartItem) {
    existingCartItem.quantity += quantity || 1;
    await existingCartItem.save();

    return res.json({
      message: "Cart updated successfully",
      cartItem: existingCartItem
    });
  }

  const cartItem = await Cart.create({
    userId: req.user._id,
    productId: product._id,
    title: product.title,
    description: product.description,
    mainImg: product.mainImg,
    sizes: size || "",
    quantity: quantity || 1,
    price: product.price,
    discount: product.discount
  });

  res.status(201).json({
    message: "Product added to cart",
    cartItem
  });
};

export const getCart = async (req, res) => {
  const cartItems = await Cart.find({ userId: req.user._id }).populate(
    "productId",
    "title mainImg price discount stock"
  );

  res.json(cartItems);
};

export const updateCartQuantity = async (req, res) => {
  const { quantity } = req.body;

  const cartItem = await Cart.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!cartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  cartItem.quantity = quantity;
  await cartItem.save();

  res.json({
    message: "Cart quantity updated",
    cartItem
  });
};

export const removeFromCart = async (req, res) => {
  const cartItem = await Cart.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!cartItem) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  res.json({ message: "Product removed from cart" });
};

export const clearCart = async (req, res) => {
  await Cart.deleteMany({ userId: req.user._id });

  res.json({ message: "Cart cleared successfully" });
};