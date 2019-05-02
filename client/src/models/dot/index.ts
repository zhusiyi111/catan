import { Location } from "../location";
import { getDotsFromAreas, isEffectedDot } from "../dot/helper";
import { VillageType, Villages } from "../village";
import { isEqualLocation } from "../location/helper";
import { Areas } from "../area";
import { State } from "..";

export interface DotLocation extends Location {}

export interface IDot {
  location: DotLocation;
  visible?: boolean;
  // village: IVillage;
}

export type Dots = IDot[];

const initialState: Dots = [];

export default {
  state: initialState,
  reducers: {
    updateDots(s: Dots, p: Dots) {
      return p;
    }
  },
  effects: (dispatch: any) => ({
    showLegalDots(_: any, s: State) {
      const { areas, villages }: { areas: Areas; villages: Villages } = s;
      const dots = getDotsFromAreas(areas);

      // const placedLocations = villages
      //   .filter(v => v.type !== VillageType.None)
      //   .map(v => v.location);

      const result = dots.map(dot => {
        // 每个点都是没有被放置过的
        if (isEffectedDot(dot, villages)) {
          dot.visible = false;
        } else {
          dot.visible = true;
        }
        return dot;
      });
      dispatch.dots.updateDots(result);
    }
  })
};
