import * as moo from "moo";

export class StatBlockLexer {
  public alpha: RegExp;
  public word: RegExp;
  public wordHyphenated: RegExp;

  public constructor() {
    this.alpha = /[a-zA-Z]+/i;
    this.word = /(?:[a-zA-Z]+(?:(?:'[tT])|(?:'[lL][lL])|(?:'[sS])|(?:[sS]'))?)/;
    this.wordHyphenated = /(?:[a-zA-Z]+[-][a-zA-Z]+)/;
  }

  public getLexer(): moo.Lexer {
    return moo.compile({
      WS: { match: /[ \t\n\r]+/, lineBreaks: true },

      // punctuation
      Period: ".",

      // constructs
      Word: this.word,
      WordHyphenated: this.wordHyphenated
    });
  }
}