import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User } from 'shared/types';

export const TenantId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;
    return user.tenantId;
  },
);
