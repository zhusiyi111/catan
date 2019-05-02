import { PlayerId } from "../player";

const initialState: PlayerId = 1;

export default {
  state: initialState,
  reducers: {
    changePlayer: (s: PlayerId, p: PlayerId) => {
      return p;
    }
  }
};
