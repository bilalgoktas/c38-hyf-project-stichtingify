import { Router } from "express";
import {
  getCategory,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.js";

const categoryRouter = Router();

// Get Category
categoryRouter.get("/:id", getCategory);
// Get Categories
categoryRouter.get("/", getCategories);
// Create Category
categoryRouter.post("/", createCategory);
// Delete Category
categoryRouter.delete("/:id", deleteCategory);
// Edit Category
categoryRouter.put("/:id", updateCategory);

export default categoryRouter;
