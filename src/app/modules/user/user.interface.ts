import { Model } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  email: string;
};

export type UserModel = {
  // eslint-disable-next-line no-unused-vars
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'>>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
