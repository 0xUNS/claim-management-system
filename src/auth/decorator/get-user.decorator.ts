import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRt } from '../types';

export const GetUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    if (data) return request.user[data];
    return request.user;
  },
);
