import * as moo from "moo";

export class TestHelper {
  public static runLexer(lexer: moo.Lexer, input: string): Array<moo.Token>{
    lexer.reset(input);

    let tokens: Array<moo.Token> = [];
    let token: moo.Token | undefined;

    while (token = lexer.next()) {
      if (token != undefined && token.type !== "WS") {
        tokens.push(token);
      }
    }

    return tokens;
  };

  public static buildExpectList(tokens: Array<moo.Token>): string{

    if (typeof tokens === undefined) {
      tokens = [];
    }

    let rv: string = `expect(actual.length).to.equal(${tokens.length});`;

    for (let index in tokens) {
      rv += `\nexpect(actual[${index}]).to.have.property("type", "${tokens[index].type}");
      expect(actual[${index}]).to.have.property("value", "${tokens[index]}");`;
    }

    return rv;
  };
};