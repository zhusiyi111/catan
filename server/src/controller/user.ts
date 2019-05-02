import { BaseContext } from "koa";

export default class UserController {
  public static async getUsers(ctx: BaseContext) {}

  public static async getUser(ctx: BaseContext) {
    ctx.body = "get";
  }

  public static async createUser(ctx: BaseContext) {}

  public static async updateUser(ctx: BaseContext) {}

  public static async deleteUser(ctx: BaseContext) {}
}
