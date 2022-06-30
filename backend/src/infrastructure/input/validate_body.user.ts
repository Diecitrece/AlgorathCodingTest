import Joi, { ObjectSchema } from 'joi';

export const schemaCreateUser: ObjectSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .trim()
    .strict()
    .pattern(new RegExp(/^[\w\-\sÀ-ÿ]+$/))
    .messages({
      'string.empty': 'Name can not be empty',
      'string.min': 'Name lenght must be at least 3 characters long',
      'string.max': 'Name can not contain more than 30 characters',
      'string.trim':
        'Name contains some whitespaces at the beginning and/or at the end of the field',
    }),
});
