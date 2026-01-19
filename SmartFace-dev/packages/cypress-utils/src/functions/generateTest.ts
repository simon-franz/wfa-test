type TestCallbackType = () => void;
type ItCallbackType = (what: string, expectedOutcome: string, cb: TestCallbackType) => void;

const commonDescribe = (what: string, expectedOutcome: string, cb: TestCallbackType, itCallback: ItCallbackType) => {
  describe(what, () => {
    it(`${expectedOutcome}`, () => {
      cb();
      itCallback(what, expectedOutcome, cb);
    });
  });
};

export const generateTest = (what: string, expectedOutcome: string, cb: TestCallbackType) => {
  commonDescribe(what, expectedOutcome, cb, () => {});
};
