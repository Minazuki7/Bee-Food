import { Test, TestingModule } from '@nestjs/testing';
import { FranchisesResolver } from './franchises.resolver';
import { FranchisesService } from './franchises.service';

describe('FranchisesResolver', () => {
  let resolver: FranchisesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FranchisesResolver, FranchisesService],
    }).compile();

    resolver = module.get<FranchisesResolver>(FranchisesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
