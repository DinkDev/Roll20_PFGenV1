import { expect } from "chai";
import * as moo from "moo";

describe("moo", () => {
  it("can find words and periods", () => {
// tslint:disable-next-line: typedef
    var mooLexer = moo.compile({
      WS: { match: /[ \t\n\r]+/, lineBreaks: true },
      Word: /(?:[a-zA-Z0-9'-])+/,
      Period: ".",
    });
// tslint:disable-next-line: typedef
    const input = "The quick brown fox\r\njumped over the lazy dog.";
    mooLexer.reset(input);

    var tokens = [];
    var tok;

    while (tok = mooLexer.next()) {
      if (tok.type !== "WS") {
        tokens.push(tok);
      }
    }

    expect(10).to.equal(tokens.length);
  });
});