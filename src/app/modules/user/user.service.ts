import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from './user.model';
import { ILoginUser, IUser, IUserLoginResponse } from './user.interface';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const isUserExist = await User.isUserExist(payload.email);

  if (isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User already exist Please sign in !!',
    );
  }

  const newUser = await User.create(payload);

  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  return newUser;
};

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { email, password } = payload;
  // creating instance of User
  // const user = new User();
  //  // access to our instance methods
  //   const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token

  const { email: userId } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
    email,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetUser = async (userData: JwtPayload | null): Promise<IUser | null> => {
  const result = await User.findOne({ email: userData?.userId });
  return result;
};

export const UserService = {
  loginUser,
  createUser,
  GetUser,
};
