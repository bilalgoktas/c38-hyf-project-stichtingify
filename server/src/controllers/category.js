import Category from "../models/category.js";
import { RecordNotFoundError, NoFoundError } from "../../error/appErrors.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (categories.length == 0) throw new NoFoundError("Categories");
    res.status(200).json({ result: categories, success: true });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) throw new RecordNotFoundError(req.params.id, "Category");
    res.status(200).json({ result: category, success: true });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ result: category, success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) throw new RecordNotFoundError(req.params.id, "Category");
    res.status(200).json({ msg: "Deleted", success: true });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body);
    if (!category) throw new RecordNotFoundError(req.params.id, "Category");
    res.status(200).json({ result: category, success: true });
  } catch (error) {
    next(error);
  }
};
