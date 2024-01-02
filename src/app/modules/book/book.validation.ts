import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    writer: z.string({
      required_error: 'Writer is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    date: z.string({
      required_error: 'Date is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    writer: z
      .string({
        required_error: 'Writer is required',
      })
      .optional(),
    genre: z
      .string({
        required_error: 'Genre is required',
      })
      .optional(),
    date: z
      .string({
        required_error: 'Date is required',
      })
      .optional(),
    image: z
      .string({
        required_error: 'Image is required',
      })
      .optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
