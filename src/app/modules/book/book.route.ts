import express from 'express';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';
import validateRequest from '../../../middleware/ValidateRequest';
import auth from '../../../middleware/auth';
// import { BookValidation } from './book.validation';
//

const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  auth(),
  BookController.createBook,
);

router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  validateRequest(BookValidation.updateBookZodSchema),
  auth(),
  BookController.updateBook,
);

router.delete('/:id', auth(), BookController.deleteBook);

router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
