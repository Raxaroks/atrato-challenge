import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CardsModule } from 'src/cards/cards.module';
import { CommonModule } from "../common/common.module";
import { CardsService } from 'src/cards/cards.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CardsService],
  imports: [CommonModule, CardsModule]
})
export class UsersModule {}
