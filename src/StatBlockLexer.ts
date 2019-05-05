import * as moo from "moo";

export class StatBlockLexer {
  public alpha: RegExp;
  public colon: string;
  public semi_colon: string;
  public period: string;
  public dash: string;
  public m_dash: string;
  public n_dash: string;

  public size_value: RegExp;
  public number_with_denominator: RegExp;
  public number_whole: RegExp;
  public word: RegExp;
  public wordHyphenated: RegExp;

  public cr_key: RegExp;

  public xp_key: RegExp;

  public constructor() {
    this.alpha = /[a-zA-Z]+/i;
    this.colon = ":";
    this.semi_colon = ";";
    this.period = ".";
    this.dash = "-";
    this.m_dash = "\u2014";
    this.n_dash = "\u2013";
    this.size_value = /(?:(?:\d+-\d\/)?\d+(?:(?: ft.)|(?:-foot)))/;

    this.number_with_denominator = /(?:\d\/\d+)/;
    this.number_whole = /\d\d?\d?(?:,\d{3})*/;    

    this.word = /(?:[a-zA-Z]+(?:(?:'[tT])|(?:'[lL][lL])|(?:'[sS])|(?:[sS]'))?)/;
    this.wordHyphenated = /(?:[a-zA-Z]+[-][a-zA-Z]+)/;

    this.cr_key = /[cC][rR]/;
    this.xp_key = /[xX][pP]/;
  }

  public getLexer(): moo.Lexer {
    return moo.compile({
      WS: { match: /[ \t\n\r]+/, lineBreaks: true },

      // specific string matches
      CrKey: this.cr_key,
      XpKey: this.xp_key,

      NumberWithDenominator: this.number_with_denominator,
      NumberWhole: this.number_whole,
      SizeValue: this.size_value,

      // punctuation
      Colon: this.colon,
      SemiColon: this.semi_colon,
      Period: this.period,

      Dash: this.dash,
      MDash: this.m_dash,
      MNash: this.n_dash,

      // constructs
      Word: this.word,
      WordHyphenated: this.wordHyphenated,
    });
  }
}