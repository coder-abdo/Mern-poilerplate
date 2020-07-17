import { RequestHandler, Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
config();
export const auth: RequestHandler = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    let secret = process.env.JWT_SECRET as string;
    let token = req.cookies["x-auth-token"];
    let { id } = verify(token, secret) as { id: string };
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({
        isAuth: false,
        success: false,
      });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};
