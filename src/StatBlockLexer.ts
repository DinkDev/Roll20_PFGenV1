import * as moo from "moo";
import * as _ from "underscore";

export class StatBlockLexer {

  public versus: RegExp;

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
  public number_whole: RegExp;
  public number_with_sign: RegExp;

  public ability_list: object[];
  public alignment_list: object[];
  public attack_type_list: object[];
  public creature_size_list: object[];
  public creature_type_list: object[];
  public level_list: object[];
  public spells_known_prepared_psychic: object[];

  public ac_flat_footed_key: RegExp;
  public ac_key: RegExp;
  public ac_touch_key: RegExp;
  public aura_key: RegExp;
  public cl_key: RegExp;
  public cr_key: RegExp;
  public damage_reduction_key: RegExp;
  public dc_key: RegExp;
  public defense_key: RegExp;
  public defensive_abilities_key: RegExp;
  public fort_save_Key: RegExp;
  public hp_key: RegExp;
  public immune_key: RegExp;
  public init_key: RegExp;
  public melee_key: RegExp;
  public offense_key: RegExp;
  public perception_key: RegExp;
  public reach_key: RegExp;
  public ref_save_key: RegExp;
  public resistances_key: RegExp;
  public senses_key: RegExp;
  public space_key: RegExp;
  public speed_key: RegExp;
  public spell_like_ability_key: RegExp;
  public spell_resistance_key: RegExp;
  public statistics_key: RegExp;
  public tactics_key: RegExp;
  public weaknesses_key: RegExp;    
  public will_save_key: RegExp;
  public xp_key: RegExp;

  public multiplier: RegExp;
  public word: RegExp;
  public word_hyphenated: RegExp;

  public constructor() {

    this.versus = /\bvs\./;

    this.colon = `:`;
    this.semi_colon = `;`;
    this.comma = `,`;
    this.period = `.`;
    this.dash = `-`;
    this.m_dash = `\u2014`;
    this.n_dash = `\u2013`;
    this.asterisk = `\*`;
    this.l_paren = `(`;
    this.r_paren = `)`;
    this.forward_slash = `/`;

    this.size_value = /(?:(?:\d+-\d\/)?\d+(?:(?: ft\.)|(?:[- ]foot)|(?:[- ]feet)))/;
    this.dice_roll = /[+-\u2013]?\d+d\d+/;

    //this.number_with_denominator = /(?:\d\/\d+)/;
    this.number_whole = /(?:\d\d?\d?(?:,\d{3})*)/;
    this.number_with_sign = /(?:[\+\-\u2013]\d{1,3})/;

    this.ability_list = _.map<RegExp, object>([/\bStr\b/, /\bDex\b/, /\bCon\b/, /\bInt\b/, /\bWis\b/, /\bCha\b/], r => {
      return { match: r };
    } );

    this.alignment_list = this.creature_type_list = _.map<RegExp, object>([
      /\bLE\b/, /\bLN\b/, /\bLG\b/, /\bNE\b/,
      /\bN\b/, /\bNG\b/, /\bCE\b/, /\bCN\b/, /\bCG\b/], r => {
        return { match: r };
      });
    
    this.attack_type_list = _.map<RegExp, object>([/\bMelee\b/, /\bRanged\b/, /\bSpecial Attacks\b/], r => {
      return { match: r };
    });

    this.creature_size_list = _.map<RegExp, object>([/\bFine\b/, /\bDiminutive\b/, /\bTiny\b/, /\bSmall\b/,
      /\bMedium\b/, /\bLarge\b/, /\bHuge\b/, /\bGargantuan\b/, /\bColossal\b/], r => {
      return { match: r };
    });

    // creature types: https://www.d20pfsrd.com/bestiary/rules-for-monsters/creature-types/
    this.creature_type_list = _.map<RegExp, object>([
      /\baberration\b/, /\banimal\b/, /\bconstruct\b/, /\bdragon\b/, /\bfey\b/,
      /\bhumanoid\b/, /\bmagical beast\b/, /\bmonstrous humanoid\b/, /\booze\b/,
      /\boutsider\b/, /\bplant\b/, /\bundead\b/, /\bvermin\b/], r => {
        return { match: r };
      });

    this.level_list = _.map<RegExp, object>([
      /\b1st\b/, /\b1st\b/, /\b2nd\b/, /\b3rd\b/, /\b4th\b/, /\b5th\b/, /\b6th\b/, /\b7th\b/,
      /\b8th\b/, /\b9th\b/, /\b10th\b/, /\b11th\b/, /\b12th\b/, /\b13th\b/, /\b14th\b/,
      /\b15th\b/, /\b16th\b/, /\b17th\b/, /\b18th\b/, /\b19th\b/, /\b20th\b/], r => {
        return { match: r };
      });
    
    this.spells_known_prepared_psychic = _.map<RegExp, object>([
      /\bSpells Known\b/, /\bSpells Prepared\b/, /\bPsychic Magic\b/], r => {
      return { match: r };
    });

    this.ac_key = /\bAC\b/;
    this.ac_flat_footed_key = /\bflat-footed\b/
    this.ac_touch_key = /\btouch\b/
    this.aura_key = /\bAura\b/
    this.cl_key = /\b[cC][lL]\b/;
    this.cr_key = /\b[cC][rR]\b/;
    this.damage_reduction_key = /\bDR\b/;
    this.dc_key = /\bDC\b/;
    this.defense_key = /\bDEFENSE\b/
    this.defensive_abilities_key = /\bDefensive Abilities\b/
    this.fort_save_Key = /\bFort\b/;
    this.hp_key = /\bhp\b/;
    this.immune_key = /\bImmune\b/
    this.init_key = /\bInit\b/;
    this.melee_key = /\bMelee\b/
    this.offense_key = /\bOFFENSE\b/
    this.perception_key = /\bPerception\b/
    this.reach_key = /\bReach\b/
    this.ref_save_key = /\bRef\b/;
    this.resistances_key = /\bResist\b/;
    this.senses_key = /\bSenses\b/
    this.space_key = /\bSpace\b/
    this.speed_key = /\bSpeed\b/
    this.spell_like_ability_key = /\bSpell-Like Abilities\b/
    this.spell_resistance_key = /\bSR\b/;
    this.statistics_key = /\bSTATISTICS\b/
    this.tactics_key = /\bTACTICS\b/
    this.weaknesses_key = /\bWeaknesses\b/
    this.will_save_key = /\bWill\b/;
    this.xp_key = /\b[xX][pP]\b/;
    
    this.multiplier = /\b[x*]\d\b/;
    this.word = /(?:\b[a-zA-Z]+(?:(?:[’'][tT])|(?:[’'][lL][lL])|(?:[’'][sS])|(?:[sS][’']))?\b)/;
    this.word_hyphenated = /(?:[a-zA-Z]+[-][a-zA-Z]+)/;
  }

  public getLexer(): moo.Lexer {
    return moo.compile({
      // TODO: split into groups
      // specific string matches
      AcKey: this.ac_key,
      AcTouchKey: this.ac_touch_key,
      AcFlatFootedKey: this.ac_flat_footed_key,
      AuraKey: this.aura_key,
      ClKey: this.cl_key,
      CrKey: this.cr_key,
      DcKey: this.dc_key,
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
      SpellLikeAbilityKey: this.spell_like_ability_key,
      SrKey: this.spell_resistance_key,
      StatisticsKey: this.statistics_key,
      TacticsKey: this.tactics_key,
      WeaknessesKey: this.weaknesses_key,
      WillSaveKey: this.will_save_key,
      XpKey: this.xp_key,

      Ability: this.ability_list,
      Alignment: this.alignment_list,
      AttackType: this.attack_type_list,
      CreatureSize: this.creature_size_list,
      CreatureType: this.creature_type_list,
      Level: this.level_list,
      SpellsKnownPreparedPsychic: this.spells_known_prepared_psychic,

      DiceRoll: this.dice_roll,
      //NumberWithDenominator: this.number_with_denominator,
      Multiplier: this.multiplier,
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