import { RequestHandler, Request, Response, NextFunction } from "express";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../models/User";
import { IUser } from "../customTypes";
const register: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).json({
        error: "Email is Already Exist",
      });
    }
    const user = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await user.save();
    res.json({
      success: true,
      message: "registerd successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// Login
const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check the user is existing or not
    const user = (await User.findOne({ email })) as IUser;
    if (!user) {
      return res.status(401).json({ error: "Email Not Registered Yet " });
    }
    // compare the password if it is matched
    let isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email / Password Not Correct " });
    }
    let secret = process.env.JWT_SECRET as string;
    let expired = ~~(Date.now() / 1000) + 60 * 60;
    let token = sign({ id: user._id }, secret, {
      expiresIn: expired,
    });
    res.cookie("x-auth-token", token).json({
      success: true,
      isAuth: true,
    });
  } catch (error) {
    next(error);
  }
};
// get auth
const getAuth: RequestHandler = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  let { user } = req;
  try {
    res.json({ isAuth: true, user, sucess: true });
  } catch (error) {
    next(error);
  }
};
const logout: RequestHandler = async (req: any, res, next) => {
  try {
    const { user } = req;
    let existUser = await User.findOne({ email: user.email });
    if (existUser) {
      req.token = null;
      req.user = null;
      return res.clearCookie("x-auth-token").json({
        sucess: true,
        isAuth: false,
      });
    }
  } catch (error) {
    next(error);
  }
};
export { register, login, getAuth, logout };
