import { NextFunction, RequestHandler, Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from './user.service';

const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...userData } = req.body;
    const result = await UserService.createUser(userData);

    res.send({
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { ...loginData } = req.body;
  try {
    const result = await UserService.loginUser(loginData);

    res.json({
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User login successfully',
    });
  } catch (err) {
    next(err);
  }
};

const GetUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user);
  try {
    const result = await UserService.GetUser(req.user);
    console.log(result);
    res.json({
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'User fetch successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  loginUser,
  createUser,
  GetUser,
};
