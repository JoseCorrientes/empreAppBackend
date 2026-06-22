import { Router } from "express";
import { protect } from "../middewares/auth.middleware";
import {
  createMaterial,
  getMaterialById,
  getMaterials,
  toggleMaterialStatus,
  updateMaterialById,
} from "../controllers/material.controller";

const router = Router();

router.post("/", protect, createMaterial);
router.get("/", getMaterials);
router.get("/:id", getMaterialById);
router.put("/:id", protect, updateMaterialById);
router.put("/:id/toggle-status", protect, toggleMaterialStatus);

export default router;
