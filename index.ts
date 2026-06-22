import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes";
import materialRoutes from "./routes/material.routes";
import userRoutes from "./routes/auth.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/materials", materialRoutes);
app.use("/auth", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send(`Server Node + Typescript de EmpreApp funcionando en ruta / `);
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conectado Exitosamente a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`❌ Error al conectar a MongoDB: ${error}`);
  });
