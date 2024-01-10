import {body, check} from 'express-validator'

export enum Category {
    Thriller = "thriller",
    Horror = "horror",
    Action = "action",
    Romance = "romance",
    Adventure = "adventure",
    Drama = "drama",
    Western = "western",
    Animation = "animation",
    ScienceFiction = "science_fiction"
  }

  export type Movie = {
    id: number;
    title: string;
    description: string;
    category: Category,
    rating: number;
    releaseDate: Date;
}

export const movieValidator = [
  check("title")
    .exists()
    .withMessage("title is required")
    .isString()
    .withMessage("title should be string")
    .isLength({ min: 2 })
    .withMessage("title should be at least 2 characters"),

  check("description")
    .exists()
    .withMessage("description is required")
    .isString()
    .withMessage("description should be string")
    .isLength({ min: 15 })
    .withMessage("description should be at least 15 characters"),

  check("category")
    .exists()
    .withMessage("category is required")
    .isIn(Object.values(Category))
    .withMessage(`category should be one of the following categories: ${Object.values(Category)}`),

  check("rating")
    .exists()
    .withMessage("rating is required")
    .withMessage("rating should be a valid number"),

  check("releaseDate")
    .exists()
    .withMessage("releaseDate is required")
    .isISO8601()
    .withMessage("releaseDate should be valid ISO8601 date format")
]