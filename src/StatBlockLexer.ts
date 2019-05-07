import * as moo from "moo";

export class StatBlockLexer {
  //public alpha: RegExp;
  public colon: string;
  public semi_colon: string;
  public comma: string;
  public period: string;
  public dash: string;
  public m_dash: string;
  public n_dash: string;
  public asterisk: string;
  
  public l_paren: string;
  public r_paren: string;

  public size_value: RegExp;
  public number_with_denominator: RegExp;
  public number_whole: RegExp;

  //public alignment: RegExp;
  public alignmentList: string[];
  public creatureSizeList: string[];
  public creatureTypeList: string[];
  public word: RegExp;
  public wordHyphenated: RegExp;

  public cr_key: RegExp;

  public xp_key: RegExp;

  public constructor() {

    this.colon = ":";
    this.semi_colon = ";";
    this.comma = ",";
    this.period = ".";
    this.dash = "-";
    this.m_dash = "\u2014";
    this.n_dash = "\u2013";
    this.asterisk = "\*";
    this.l_paren = "(";
    this.r_paren = ")";

    this.size_value = /(?:(?:\d+-\d\/)?\d+(?:(?: ft.)|(?:-foot)))/;

    this.number_with_denominator = /(?:\d\/\d+)/;
    this.number_whole = /\d\d?\d?(?:,\d{3})*/;

    //this.alignment = /(?:(?:[LC][GNE])|(?:N[GE]?))/;
    this.alignmentList = ["LE", "LN", "LG", "NE", "N", "NG", "CE", "CN", "CG"];
    this.creatureSizeList = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"];

    // creature types: https://www.d20pfsrd.com/bestiary/rules-for-monsters/creature-types/
    this.creatureTypeList = ["aberration", "animal", "construct", "dragon", "fey", "humanoid", "magical beast",
      "monstrous humanoid", "ooze", "outsider", "plant", "undead", "vermin"];

    this.word = /(?:[a-zA-Z]+(?:(?:'[tT])|(?:'[lL][lL])|(?:'[sS])|(?:[sS]'))?)/;
    this.wordHyphenated = /(?:[a-zA-Z]+[-][a-zA-Z]+)/;
    //this.alpha = /[a-zA-Z]+/;

    this.cr_key = /[cC][rR]/;
    this.xp_key = /[xX][pP]/;
  }

  public getLexer(): moo.Lexer {
    return moo.compile({
      WS: { match: /[ \t\n\r]+/, lineBreaks: true },

      // specific string matches
      CrKey: this.cr_key,
      XpKey: this.xp_key,

      Alignment: this.alignmentList,
      CreatureSize: this.creatureSizeList,
      CreatureType: this.creatureTypeList,

      NumberWithDenominator: this.number_with_denominator,
      NumberWhole: this.number_whole,
      SizeValue: this.size_value,

      // punctuation
      Colon: this.colon,
      SemiColon: this.semi_colon,
      Comma: this.comma,
      Period: this.period,

      Dash: this.dash,
      MDash: this.m_dash,
      MNash: this.n_dash,

      Asterisk: this.asterisk,

      LParen: this.l_paren,
      RParen: this.r_paren,

      // constructs
      Word: this.word,
      WordHyphenated: this.wordHyphenated,
    });
  }
}