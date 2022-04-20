import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokensResolver } from './refresh-tokens.resolver';

@Module({
  providers: [RefreshTokensResolver, RefreshTokensService]
})
export class RefreshTokensModule {}
