import { Schema, model, Document } from "mongoose";
import { IMaterial } from "./interfaces";

export interface IMaterialDocument extends IMaterial, Document {}

const MaterialSchema = new Schema<IMaterialDocument>(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, default: 0 },
    unit: {
      type: String,
      required: true,
      enum: ["unidad", "gramo", "litro", "hora"],
      default: "unidad",
    },
    costPerUnit: { type: Number, required: true, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export const Material = model<IMaterialDocument>("Material", MaterialSchema);
