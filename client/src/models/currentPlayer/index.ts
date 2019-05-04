import { PlayerId } from "../player";
import { getPlayerId } from "../player/helper";

const initialState: PlayerId = 1;

export default {
  state: initialState,
  reducers: {
    changePlayer: (s: PlayerId, p: PlayerId) => {
      return p;
    }
  },
  selectors: (slice: any) => ({
    isMyRound() {
      return slice((currentPlayer: PlayerId) => {
        return currentPlayer === getPlayerId();
      });
    },
    items() {
      return slice;
    }
  })
};
