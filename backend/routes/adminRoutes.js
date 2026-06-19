import express from "express";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  addBanner,
  addCategory,
  getHomeData,
  createManyProducts
} from "../controllers/adminController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/home-data", getHomeData);

router.post("/products", protect, adminOnly, createProduct);
router.put("/products/:id", protect, adminOnly, updateProduct);
router.delete("/products/:id", protect, adminOnly, deleteProduct);

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/orders", protect, adminOnly, getAllOrders);
router.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);

router.post("/banners", protect, adminOnly, addBanner);
router.post("/categories", protect, adminOnly, addCategory);
router.post("/products/bulk", protect, adminOnly, createManyProducts);

export default router;