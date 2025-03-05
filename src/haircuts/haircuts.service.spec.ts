import { Test, TestingModule } from '@nestjs/testing';
import { HaircutsService } from './haircuts.service';

describe('HaircutsService', () => {
  let service: HaircutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HaircutsService],
    }).compile();

    service = module.get<HaircutsService>(HaircutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
