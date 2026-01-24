import Joi from 'joi';

/* ======================
   Register Validation
====================== */
export const registerSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'First name must be at least 3 characters',
      'any.required': 'First name is required'
    }),

  lastname: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'Last name must be at least 3 characters',
      'any.required': 'Last name is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    })
});


/* ======================
   Login Validation
====================== */
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required()
});


/* ======================
   Project Validation
====================== */
export const projectSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .max(500)
    .optional().required()
});


/* ======================
   Task Validation
====================== */
export const taskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(200)
    .required(),

  description: Joi.string()
    .trim()
    .max(1000)
    .optional(),

  status: Joi.string()
    .valid('Todo', 'In Progress', 'Done')
    .optional()
});
