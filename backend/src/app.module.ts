import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { configModuleOptions } from './config';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'public'),      
    }),
    CommonModule,
    CardsModule,
    UsersModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
