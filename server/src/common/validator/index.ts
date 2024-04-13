import Joi, { ObjectSchema } from "joi";
import ErrorMessage from "./customMessage";
// import { RegisteredUser, RegisterProfile } from "../models";

interface ValidationResult {
  error?: {
    details: {
      [x: string]: any;
      message: string;
    }[];
  };
}

class Validator {
  private static validateSignupSchema: ObjectSchema = Joi.object({
    email: Joi.string().min(1).max(100).email().messages(ErrorMessage.email),
    username: Joi.string().min(3).max(100).messages(ErrorMessage.username),
  });

  private static validateLoginSchema: ObjectSchema = Joi.object({
    email: Joi.string().required().messages(ErrorMessage.email),
    password: Joi.string().required().messages(ErrorMessage.password),
  });

  private static validateUpdateInput: ObjectSchema = Joi.object({
    status: Joi.string().min(3).max(500).messages(ErrorMessage.status),
    email: Joi.string().min(1).max(100).email().messages(ErrorMessage.email),
    username: Joi.string().min(3).max(100).messages(ErrorMessage.username),
  });

  private static options: any = { language: { key: "{{key}}" } };

  static validateSignup(entry: object): ValidationResult {
    return this.validateSignupSchema.validate(entry, this.options);
  }

  static validateLogin(entry: object): ValidationResult {
    return this.validateLoginSchema.validate(entry, this.options);
  }

  static validateProfileInput(entry: object): ValidationResult {
    return this.validateUpdateInput.validate(entry, this.options);
  }
}

export default Validator;
