import * as moo from "moo";

export class StatBlockLexer {

  public versus: string;

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
  public number_with_sign: RegExp;

  //public alignment: RegExp;
  public alignmentList: string[];
  public creatureSizeList: string[];
  public creatureTypeList: string[];

  public ac_key: RegExp;
  public ac_touch_key: string;
  public ac_flat_footed_key: string;
  public aura_key: string;
  public cr_key: RegExp;
  public defense_key: string;
  public fort_save_Key: RegExp;
  public hp_key: RegExp;
  public init_key: RegExp;
  public perception_key: string;
  public ref_save_key: RegExp;
  public senses_key: string;
  public will_save_key: RegExp;
  public xp_key: RegExp;
  public defensive_abilities_key: string;
  public damage_reduction_key: RegExp;
  public immune_key: string;
  public resistances_key: RegExp;
  public spell_resistance_key: RegExp;
  public weaknesses_key: string;    

  public word: RegExp;
  public word_hyphenated: RegExp;

  public constructor() {

    this.versus = "vs.";

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

    this.size_value = /(?:(?:\d+-\d\/)?\d+(?:(?: ft\.)|(?:[- ]foot)|(?:[- ]feet)))/;

    this.number_with_denominator = /(?:\d\/\d+)/;
    this.number_whole = /(?:\d\d?\d?(?:,\d{3})*)/;
    this.number_with_sign = /(?:[\+\-]\d{1,3})/;

    this.alignmentList = ["LE", "LN", "LG", "NE", "N", "NG", "CE", "CN", "CG"];
    this.creatureSizeList = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"];

    // creature types: https://www.d20pfsrd.com/bestiary/rules-for-monsters/creature-types/
    this.creatureTypeList = ["aberration", "animal", "construct", "dragon", "fey", "humanoid", "magical beast",
      "monstrous humanoid", "ooze", "outsider", "plant", "undead", "vermin"];

    this.ac_key = /\bAC\b/;
    this.ac_touch_key = "touch";
    this.ac_flat_footed_key = "flat-footed";
    this.aura_key = "Aura";
    this.cr_key = /\b[cC][rR]\b/;
    this.defense_key = "DEFENSE";
    this.fort_save_Key = /\bFort\b/;
    this.hp_key = /\bhp\b/;
    this.init_key = /\bInit\b/;
    this.perception_key = "Perception";
    this.ref_save_key = /\bRef\b/;
    this.senses_key = "Senses";
    this.will_save_key = /\bWill\b/;
    this.xp_key = /\b[xX][pP]\b/;
    this.defensive_abilities_key = "Defensive Abilities";
    this.damage_reduction_key = /\bDR\b/;
    this.immune_key = "Immune";
    this.resistances_key = /\bResist\b/;
    this.spell_resistance_key = /\bSR\b/;
    this.weaknesses_key = "Weaknesses";
    
    this.word = /(?:[a-zA-Z]+(?:(?:'[tT])|(?:'[lL][lL])|(?:'[sS])|(?:[sS]'))?)/;
    this.word_hyphenated = /(?:[a-zA-Z]+[-][a-zA-Z]+)/;
    //this.alpha = /[a-zA-Z]+/;
  }

  public getLexer(): moo.Lexer {
    return moo.compile({
      // specific string matches
      AcKey: this.ac_key,
      AcTouchKey: this.ac_touch_key,
      AcFlatFootedKey: this.ac_flat_footed_key,
      AuraKey: this.aura_key,
      CrKey: this.cr_key,
      DefenseKey: this.defense_key,
      FortSaveKey: this.fort_save_Key,
      HpKey: this.hp_key,
      InitKey: this.init_key,
      PerceptionKey: this.perception_key,
      RefSaveKey: this.ref_save_key,
      SensesKey: this.senses_key,
      WillSaveKey: this.will_save_key,
      XpKey: this.xp_key,
      DefensiveAbilitiesKey: this.defensive_abilities_key,
      DRKey: this.damage_reduction_key,
      ImmuneKey: this.immune_key,
      ResistKey: this.resistances_key,
      SRKey: this.spell_resistance_key,
      WeaknessesKey: this.weaknesses_key,

      Alignment: this.alignmentList,
      CreatureSize: this.creatureSizeList,
      CreatureType: this.creatureTypeList,

      NumberWithDenominator: this.number_with_denominator,
      NumberSigned: this.number_with_sign,
      SizeValue: this.size_value,
      NumberWhole: this.number_whole,

      Versus: this.versus,
       
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
      WordHyphenated: this.word_hyphenated,

      WS: { match: /[ \t\n\r]+/, lineBreaks: true },
    });
  }
}