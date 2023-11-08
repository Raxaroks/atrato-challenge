import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { AppConfiguration, configModuleOptions } from './config';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


const getStaticPath = (env: string): string => {
  if (env === 'dev') return join(__dirname, '..', 'public');
  return join(__dirname, '.', 'public');
};

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ServeStaticModule.forRoot({ 
      rootPath: getStaticPath( AppConfiguration().environment ),      
      exclude: ['/api/v1/(.*)']
    }),
    CommonModule,
    CardsModule,
    UsersModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
