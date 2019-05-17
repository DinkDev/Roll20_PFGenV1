import { expect } from "chai";

describe(`chai`, () => {
  it(`can use expect in a test`, () => {
    // tslint:disable-next-line:typedef
    const s = new Array<number>();
    expect(s.length).to.equal(0);
  });
});