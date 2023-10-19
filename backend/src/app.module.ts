import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { configModuleOptions } from './config';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    CommonModule,
    CardsModule,
    UsersModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
