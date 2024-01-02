// import status from 'http-status';
// import { SortOrder } from 'mongoose';
// import ApiError from '../../../errors/ApiError';
// import { paginationHelpers } from '../../../helpers/paginationHelper';
// import { IGenericResponse } from '../../../interface/common';
// import { IPaginationOptions } from '../../../interface/pagination';

import { JwtPayload } from 'jsonwebtoken';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { IPaginationOptions } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

// CREATE
const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

// GET ALL
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  // searching
  const BookSearchableFields = ['title', 'writer', 'genre'];
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // filtering
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder as SortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// GET SINGLE
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

// // UPDATE
const updateBook = async (
  id: string,
  userId: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate(
    { _id: id, email: userId },
    payload,
    {
      new: true,
    },
  );
  return result;
};

// // DELETE
const deleteBook = async (
  id: string,
  userData: JwtPayload | null,
): Promise<IBook | null> => {
  const result = await Book.findOneAndDelete({
    _id: id,
    email: userData?.userId,
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
