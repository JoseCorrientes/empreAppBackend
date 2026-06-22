import { Request, Response } from "express";
import { Product } from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        success: false,
        message: "The Product name is required",
      });
      return;
    }

    const existingProduct = await Product.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingProduct) {
      res.status(400).json({
        success: false,
        messagge: "This Product already exists in DB",
      });
      return;
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product succesfuly created",
      data: savedProduct,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Error creating the product",
      error: error.message || error,
    });
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let filter: any = { active: true };

    if (req.query.admin === "true") {
      filter = {};
    }

    const products = await Product.find(filter);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error reading products",
      error: error.message || error,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retriving product",
      error: error.message || error,
    });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product has been updated",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message || error,
    });
  }
};

export const toggleProductStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        message: "Product not Found",
        success: false,
      });
      return;
    }

    product.active = !product.active;

    const updatedProduct = await product.save();
    res.status(200).json({
      success: true,
      message: `Product was ${updatedProduct.active ? "activated" : "deactivated"}`,
      data: updatedProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Product status couldn't change",
      error: error.message || error,
    });
  }
};
