import { ConfigModuleOptions } from '@nestjs/config';
import { JoiValidationSchema } from './joi.validation';

export const AppConfiguration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT || '3000',
  endpoints: {
    usersDb: process.env.USERS_DB_URL,
    randommerApi: process.env.RANDOMMER_CARD_API_ENDPOINT
  },
  keys: {
    xApi: process.env.X_API_KEY
  }
});

export const configModuleOptions: ConfigModuleOptions = {
  load: [AppConfiguration],
  validationSchema: JoiValidationSchema
}
