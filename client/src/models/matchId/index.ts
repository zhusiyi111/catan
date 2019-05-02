import { State } from "..";
import { getMatchId } from "./helper";

export type MatchId = number;
const initialState: MatchId = getMatchId() || -2;

export default {
  state: initialState,
  reducers: {
    updateMatchId(s: State, p: MatchId) {
      return p;
    }
  }
};
