import { ConfigModuleOptions } from '@nestjs/config';
import { JoiValidationSchema } from './joi.validation';

export const AppConfiguration = () => ({
  environment: process.env.NODE_ENV,
  port: process.env.PORT || '3000',
});

export const configModuleOptions: ConfigModuleOptions = {
  load: [AppConfiguration],
  validationSchema: JoiValidationSchema
}
