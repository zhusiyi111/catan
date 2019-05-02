"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (ctx, next) => {
    ctx.success = (message) => {
        ctx.body = {
            success: false,
            message
        };
    };
    ctx.error = (ctx, data) => {
        ctx.body = {
            success: true,
            data
        };
    };
    await next();
};
//# sourceMappingURL=res.js.map