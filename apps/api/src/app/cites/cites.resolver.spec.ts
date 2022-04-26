import { Test, TestingModule } from '@nestjs/testing';
import { CitesResolver } from './cites.resolver';
import { CitesService } from './cites.service';

describe('CitesResolver', () => {
  let resolver: CitesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitesResolver, CitesService],
    }).compile();

    resolver = module.get<CitesResolver>(CitesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
