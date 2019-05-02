import { init, RematchRootState, RematchDispatch } from "@rematch/core";
import * as models from "./models";

const store = init({ models });

type TModel = typeof models;

export type State = RematchRootState<TModel>;
export type Dispatch = RematchDispatch<TModel>;

export default store;
