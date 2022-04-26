import { Test, TestingModule } from '@nestjs/testing';
import { CitesService } from './cites.service';

describe('CitesService', () => {
  let service: CitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitesService],
    }).compile();

    service = module.get<CitesService>(CitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
