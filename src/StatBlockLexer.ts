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
  public forward_slash: string

  public size_value: RegExp;
  public dice_roll: RegExp;
  //public number_with_denominator: RegExp;
  public number_whole: RegExp;
  public number_with_sign: RegExp;

  //public alignment: RegExp;
  public alignment_list: string[];
  public attack_type_list: string[];
  public creature_size_list: string[];
  public creature_type_list: string[];

  public ac_flat_footed_key: string;
  public ac_key: RegExp;
  public ac_touch_key: string;
  public aura_key: string;
  public cr_key: RegExp;
  public damage_reduction_key: RegExp;
  public defense_key: string;
  public defensive_abilities_key: string;
  public fort_save_Key: RegExp;
  public hp_key: RegExp;
  public immune_key: string;
  public init_key: RegExp;
  public melee_key: string;
  public offense_key: string;
  public perception_key: string;
  public reach_key: string;
  public ref_save_key: RegExp;
  public resistances_key: RegExp;
  public senses_key: string;
  public space_key: string;
  public speed_key: string;
  public spell_resistance_key: RegExp;
  public weaknesses_key: string;    
  public will_save_key: RegExp;
  public xp_key: RegExp;

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
    this.forward_slash = "/";

    this.size_value = /(?:(?:\d+-\d\/)?\d+(?:(?: ft\.)|(?:[- ]foot)|(?:[- ]feet)))/;
    this.dice_roll = /\d+d\d+/;

    //this.number_with_denominator = /(?:\d\/\d+)/;
    this.number_whole = /(?:\d\d?\d?(?:,\d{3})*)/;
    this.number_with_sign = /(?:[\+\-\u2013]\d{1,3})/;

    this.alignment_list = ["LE", "LN", "LG", "NE", "N", "NG", "CE", "CN", "CG"];
    this.attack_type_list = ["Melee", "Ranged", "Special Attacks"]
    this.creature_size_list = ["Fine", "Diminutive", "Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan", "Colossal"];

    // creature types: https://www.d20pfsrd.com/bestiary/rules-for-monsters/creature-types/
    this.creature_type_list = ["aberration", "animal", "construct", "dragon", "fey", "humanoid", "magical beast",
      "monstrous humanoid", "ooze", "outsider", "plant", "undead", "vermin"];

    this.ac_key = /\bAC\b/;
    this.ac_flat_footed_key = "flat-footed";
    this.ac_touch_key = "touch";
    this.aura_key = "Aura";
    this.cr_key = /\b[cC][rR]\b/;
    this.damage_reduction_key = /\bDR\b/;
    this.defense_key = "DEFENSE";
    this.defensive_abilities_key = "Defensive Abilities";
    this.fort_save_Key = /\bFort\b/;
    this.hp_key = /\bhp\b/;
    this.immune_key = "Immune";
    this.init_key = /\bInit\b/;
    this.melee_key = "Melee";
    this.offense_key = "OFFENSE";
    this.perception_key = "Perception";
    this.reach_key = `Reach`;
    this.ref_save_key = /\bRef\b/;
    this.resistances_key = /\bResist\b/;
    this.senses_key = "Senses";
    this.space_key = `Space`;
    this.speed_key = "Speed";
    this.spell_resistance_key = /\bSR\b/;
    this.weaknesses_key = "Weaknesses";
    this.will_save_key = /\bWill\b/;
    this.xp_key = /\b[xX][pP]\b/;
    
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
      DefensiveAbilitiesKey: this.defensive_abilities_key,
      DrKey: this.damage_reduction_key,      
      FortSaveKey: this.fort_save_Key,
      HpKey: this.hp_key,      
      ImmuneKey: this.immune_key,
      InitKey: this.init_key,
      //MeleeKey: this.melee_key,
      OffenseKey: this.offense_key,
      PerceptionKey: this.perception_key,
      ReachKey: this.reach_key,
      RefSaveKey: this.ref_save_key,
      ResistKey: this.resistances_key,
      SensesKey: this.senses_key,
      SpaceKey: this.space_key,
      SpeedKey: this.speed_key,
      SrKey: this.spell_resistance_key,
      WeaknessesKey: this.weaknesses_key,
      WillSaveKey: this.will_save_key,
      XpKey: this.xp_key,

      Alignment: this.alignment_list,
      AttackType: this.attack_type_list,
      CreatureSize: this.creature_size_list,
      CreatureType: this.creature_type_list,

      DiceRoll: this.dice_roll,
      //NumberWithDenominator: this.number_with_denominator,
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
      NDash: this.n_dash,

      Asterisk: this.asterisk,

      LParen: this.l_paren,
      RParen: this.r_paren,

      ForwardSlash: this.forward_slash,

      // constructs
      Word: this.word,
      WordHyphenated: this.word_hyphenated,

      WS: { match: /[ \t\n\r]+/, lineBreaks: true },
    });
  }
}