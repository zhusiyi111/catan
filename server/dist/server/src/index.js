"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
// import * as Process from "./utils/res";
const routes_1 = require("./routes");
const app = new Koa();
app.use(bodyParser());
// app.use(Process());
app.use(routes_1.router.routes()).use(routes_1.router.allowedMethods());
app.listen(9000);
console.log("listen:9000");
//# sourceMappingURL=index.js.map