import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  USERS_DB_URL: Joi.required(),
  RANDOMMER_CARD_API_ENDPOINT: Joi.required(),
  X_API_KEY: Joi.required(),
});