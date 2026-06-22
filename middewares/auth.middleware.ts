import { Request, Response, NextFunction } from "express";
import jbt from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { env } from "node:process";
import dotenv from "dotenv";

//extendemos los tipos de Express para que reconozca nuestra propiedad "user"
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    dotenv.config();

    const jwt_secret = process.env.JWT_SERVER_SECRET_KEY;
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized. The token is missing",
      });
      return;
    }

    //decodifico el token y miro validez
    const decode = jwt.verify(token, jwt_secret as string) as {
      id: string;
      role: string;
    };

    //inyectamos los datos decodificados del usuario en el req.user para el siguiente controlador

    req.user = {
      id: decode.id,
      role: decode.role,
    };

    //pasamos al siguiente controlador
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "JWT modified, invalid or expired",
      error: error.message || error,
    });
  }
};
