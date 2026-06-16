import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`Server Node + Typescript de EmpreApp funcionando en ruta / `);
});

app.listen(port, () => {
  console.log(`Server escuchando en el port ${port}`);
});
