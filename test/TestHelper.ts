import * as moo from "moo";

export class TestHelper {
  public static runLexer(lexer: moo.Lexer, input: string): Array<moo.Token>{
    lexer.reset(input);

    let tokens: Array<moo.Token> = [];
    let token: moo.Token;

    while (token = lexer.next()) {
      if (token.type !== "WS") {
        tokens.push(token);
      }
    }

    return tokens;
  };
};