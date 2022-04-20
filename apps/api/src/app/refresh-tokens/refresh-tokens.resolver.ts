import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { RefreshTokensService } from "./refresh-tokens.service";
import { RefreshToken } from "./entities/refresh-token.entity";

@Resolver(() => RefreshToken)
export class RefreshTokensResolver {
  constructor(private readonly refreshTokensService: RefreshTokensService) {}

  @Mutation(() => RefreshToken)
  refresh(@Args("refreshToken", { type: () => String }) refreshToken: string) {
    return this.refreshTokensService.handleRefresh(refreshToken);
  }
}
