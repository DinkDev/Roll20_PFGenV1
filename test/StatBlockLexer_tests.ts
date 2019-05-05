import { expect } from "chai";
import { StatBlockLexer } from "../src/StatBlockLexer";

describe("StatBlockLexer", () => {
  it("can find words and periods", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "The quick brown fox\r\njumped over the lazy dog.";
    lexer.reset(input);

    var tokens = [];
    var tok;

    while (tok = lexer.next()) {
      if (tok.type !== "WS") {
        tokens.push(tok);
      }
    }

    expect(10).to.equal(tokens.length);
  });
});