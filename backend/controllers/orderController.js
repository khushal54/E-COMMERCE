import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  const { name, mobile, email, address, pincode, paymentMethod } = req.body;

  if (!name || !mobile || !email || !address || !pincode) {
    return res.status(400).json({ message: "All address details are required" });
  }

  const cartItems = await Cart.find({ userId: req.user._id });

  if (cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let totalQuantity = 0;
  let totalPrice = 0;
  let totalDiscount = 0;

  const items = cartItems.map((item) => {
    const itemPrice = item.price * item.quantity;
    const discountAmount = (item.price * item.discount * item.quantity) / 100;

    totalQuantity += item.quantity;
    totalPrice += itemPrice;
    totalDiscount += discountAmount;

    return {
      productId: item.productId,
      title: item.title,
      mainImg: item.mainImg,
      size: item.sizes,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount
    };
  });

  const finalAmount = totalPrice - totalDiscount;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const order = await Order.create({
    userId: req.user._id,
    name,
    mobile,
    email,
    address,
    pincode,
    items,
    totalQuantity,
    totalPrice,
    totalDiscount,
    finalAmount,
    paymentMethod: paymentMethod || "COD",
    deliveryDate
  });

  await Cart.deleteMany({ userId: req.user._id });

  res.status(201).json({
    message: "Order placed successfully",
    order
  });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({
    createdAt: -1
  });

  res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};

export const cancelOrder = async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status === "DELIVERED") {
    return res.status(400).json({ message: "Delivered order cannot be cancelled" });
  }

  order.status = "CANCELLED";
  await order.save();

  res.json({ message: "Order cancelled successfully", order });
};