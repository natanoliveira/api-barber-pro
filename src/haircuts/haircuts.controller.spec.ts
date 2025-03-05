import { Test, TestingModule } from '@nestjs/testing';
import { HaircutsController } from './haircuts.controller';
import { HaircutsService } from './haircuts.service';

describe('HaircutsController', () => {
  let controller: HaircutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HaircutsController],
      providers: [HaircutsService],
    }).compile();

    controller = module.get<HaircutsController>(HaircutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
