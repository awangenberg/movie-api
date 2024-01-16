import {body, check} from 'express-validator'
import { Category } from './movie'


export const ratingValidator = [
    check("rating")
    .exists()
    .withMessage("rating is required")
    .isNumeric()
    .withMessage("rating should be a valid number")
    .isFloat({ min: 0, max: 5 })
      .withMessage("rating should be a number between 0 and 5 (inclusive)")
  ]
  
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
  
    check("releaseDate")
      .exists()
      .withMessage("releaseDate is required")
      .isISO8601()
      .withMessage("releaseDate should be valid ISO8601 date format")
  ]