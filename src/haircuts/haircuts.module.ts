import { Module } from '@nestjs/common';
import { HaircutsService } from './haircuts.service';
import { HaircutsController } from './haircuts.controller';

@Module({
  controllers: [HaircutsController],
  providers: [HaircutsService],
})
export class HaircutsModule {}
