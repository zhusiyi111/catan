import { BaseContext } from "koa";

export default async (ctx: BaseContext, next: Function) => {
  ctx.success = (message: string) => {
    ctx.body = {
      success: false,
      message
    };
  };

  ctx.error = <T = any>(ctx: BaseContext, data?: T) => {
    ctx.body = {
      success: true,
      data
    };
  };

  await next();
};
