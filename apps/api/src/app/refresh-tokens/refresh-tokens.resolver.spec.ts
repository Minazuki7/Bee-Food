import { Test, TestingModule } from '@nestjs/testing';
import { RefreshTokensResolver } from './refresh-tokens.resolver';
import { RefreshTokensService } from './refresh-tokens.service';

describe('RefreshTokensResolver', () => {
  let resolver: RefreshTokensResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshTokensResolver, RefreshTokensService],
    }).compile();

    resolver = module.get<RefreshTokensResolver>(RefreshTokensResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
