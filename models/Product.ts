import { Schema, Document, model } from "mongoose";
import { IProduct } from "./interfaces";

export interface IProductDocument extends IProduct, Document {}

const ImageSchema = new Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  isFrontPage: { type: Boolean, default: false },
  alt: { type: String },
});

const ComponentSchema = new Schema({
  materialId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const ProductSchema = new Schema<IProductDocument>(
  {
    sku: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    // Tamaños
    vSize: { type: Number, required: true },
    hSize: { type: Number, required: true },
    thicknessSize: { type: Number, required: true },

    images: [ImageSchema],
    components: [ComponentSchema],

    stock: { type: Number, required: true, default: 0 },
    active: { type: Boolean, default: true },

    //promociones
    isPromotion: { type: Boolean, default: false },
    quantityPromotion: { type: Number, default: 0 },
    quantityDiscount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const Product = model<IProductDocument>("Product", ProductSchema);
