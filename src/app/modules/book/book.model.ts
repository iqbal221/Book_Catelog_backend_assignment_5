import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

const bookSchema = new Schema<IBook>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Book = model<IBook, BookModel>('Book', bookSchema);
