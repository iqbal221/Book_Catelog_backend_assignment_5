import { Model } from 'mongoose';

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  date?: string;
};

export type IBook = {
  name: string;
  email: string;
  writer: string;
  genre: string;
  date: string;
  image: string;
};

export type BookModel = Model<IBook>;
