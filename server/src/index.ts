import * as Koa from "koa";

import * as bodyParser from "koa-bodyparser";
// import * as Process from "./utils/res";

import { router } from "./routes";

const app = new Koa();

app.use(bodyParser());

// app.use(Process());

app.use(router.routes()).use(router.allowedMethods());

app.listen(9000);
console.log("listen:9000");
