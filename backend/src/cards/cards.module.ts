import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [CommonModule]
})
export class CardsModule {}
