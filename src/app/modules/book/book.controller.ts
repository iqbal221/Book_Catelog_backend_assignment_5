import { NextFunction, Request, Response } from 'express';

import { BookService } from './book.service';
import pick from '../../../shared/pick';
import catchAsync from '../../../shared/catchAsync';
import { BookFilterableFields } from './book.constant';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { ...BookData } = req.body;
  const { userId }: any = req.user;
  BookData.email = userId;

  try {
    const result = await BookService.createBook(BookData);
    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBooks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, BookFilterableFields);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    try {
      const data = await BookService.getAllBooks(filters, options);

      res.status(200).json({
        success: true,
        message: 'All Book shows successfully',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },
);

const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.params.id;

  try {
    const result = await BookService.getSingleBook(id);
    res.status(200).json({
      success: true,
      message: 'Get Book Details successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const updateData = req.body;
  const { userId }: any = req.user;
  console.log(req.user);

  try {
    const result = await BookService.updateBook(id, userId, updateData);
    if (result === null) {
      return res.status(201).json({
        success: false,
        message: 'Update failed',
        data: result,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Update Book Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const result = await BookService.deleteBook(id, req.user);
    if (result === null) {
      return res.status(201).json({
        success: false,
        message: 'Delete failed',
        data: result,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Deleted Book Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
