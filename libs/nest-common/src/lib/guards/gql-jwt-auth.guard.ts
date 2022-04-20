import { AuthGuard } from "@nestjs/passport";
import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";

import { SKIP_AUTH } from "../decorators/skip-auth.decorator";

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  override canActivate(context: ExecutionContext) {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) {
      return true;
    }
    return super.canActivate(context);
  }
}
