import { omit } from "lodash";
import { Status } from "../status";
import { VillageLocation } from "../village";

export interface StatusData {
  [Status.SelectTargetVillage]?: VillageLocation[];
  [i: string]: any;
}

const initialState: StatusData = {};

export default {
  state: initialState,
  reducers: {
    updateStatusData<P>(
      s: StatusData,
      { status, payload }: { status: Status; payload: P }
    ) {
      return Object.assign({}, s, { [status]: payload });
    },
    resetStatusData(s: StatusData, status: Status) {
      return omit(s, [status]);
    }
  },
  effects: (dispatch: any) => ({})
};
