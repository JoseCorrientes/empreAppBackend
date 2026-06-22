import { Request, Response } from "express";
import { Material } from "../models/Material";

export const createMaterial = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        success: false,
        message: "The Material Name is required",
      });
      return;
    }

    const existingMaterial = await Material.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingMaterial) {
      res.status(400).json({
        success: false,
        message: "This Material already exists in DB",
      });
      return;
    }

    const material = new Material(req.body);
    const savedMaterial = await material.save();
    res.status(200).json({
      success: true,
      message: "Material was created",
      data: savedMaterial,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating material",
      error: error.message || error,
    });
  }
};

export const getMaterials = async (req: Request, res: Response) => {
  try {
    const materials = await Material.find();

    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error reading materials",
    });
  }
};

export const getMaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const material = await Material.findById(id);

    if (!material) {
      res.status(404).json({
        success: false,
        message: "Material not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: material,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error reading Materials ",
      error: error.message || error,
    });
  }
};

export const updateMaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProduct = await Material.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });

    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Material not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Material has been updated",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating material",
    });
  }
};

export const toggleMaterialStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingMaterial = await Material.findById(id);

    if (!existingMaterial) {
      res.status(404).json({
        success: false,
        message: "Material not found",
      });
      return;
    }

    existingMaterial.active = !existingMaterial.active;

    const updatedMaterial = await existingMaterial.save();

    res.status(200).json({
      success: true,
      message: `Material was ${existingMaterial.active ? "activated" : "deactivated"}`,
      data: updatedMaterial,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Material status couldn't change",
      error: error.message || error,
    });
  }
};
