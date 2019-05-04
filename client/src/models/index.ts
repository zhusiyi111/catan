import {
  init,
  RematchRootState,
  RematchStore,
  RematchDispatch
} from "@rematch/core";
import selectPlugin from "@rematch/select";

import * as models from "./models";

const config = { models, plugins: [selectPlugin()] };

const store = init(config);

export type TModel = typeof models;

export type Dispatch = RematchDispatch<TModel>;

export const { select } = store;

export type State = RematchRootState<TModel>;

export default store;
