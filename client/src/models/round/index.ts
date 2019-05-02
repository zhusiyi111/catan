import { State } from "..";

export type Round = number;

const initialState: Round = -2;

export default {
  state: initialState,
  reducers: {
    updateRound: (s: State, p: Round) => {
      return p;
    }
  }
};
