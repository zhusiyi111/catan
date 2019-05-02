export enum RollNumber {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6
}

export interface Roll {
  visible: boolean;
  rollA: RollNumber;
  rollB: RollNumber;
}

const initialState: Roll = {
  visible: false,
  rollA: 0,
  rollB: 0
};

export default {
  state: initialState,
  reducers: {
    showRollResult(s: Roll, p: RollNumber[]) {
      const [a, b] = p;
      return {
        rollA: a,
        rollB: b,
        visible: true
      };
    }
  },
  effects: (dispatch: any) => ({})
};
