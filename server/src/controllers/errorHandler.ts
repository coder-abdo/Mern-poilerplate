import { RequestHandler, ErrorRequestHandler } from "express";

const errorMiddleWare: RequestHandler = (req, res, next) => {
  const err = new Error("Oopps!!...Page Is Not Found");
  err.status = 404;
  next(err);
};

const errorMiddleWareHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

export { errorMiddleWare, errorMiddleWareHandler };
