import { Global, Module, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Context } from '../../common/context/context';

const provider: Provider = {
  provide: Context,
  useFactory: (req: Request) => new Context(req),
  inject: [REQUEST],
  scope: Scope.REQUEST, // ! very important: dependency will be injected once a request is coming
};

@Global()
@Module({
  providers: [provider],
  exports: [provider],
})
export class ContextModule {}
