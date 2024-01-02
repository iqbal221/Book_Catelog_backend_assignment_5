import express from 'express';
import validateRequest from '../../../middleware/ValidateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginZodSchema),
  UserController.loginUser,
);

router.get('/', auth(), UserController.GetUser);

export const AuthRoutes = router;
