import * as moo from "moo";
import * as _ from "underscore";

export class StatBlockLexer {

  public versus: RegExp;

  public asterisk: string;
  public colon: string;
  public comma: string;
  public dash: string;
  public m_dash: string;
  public n_dash: string;
  public double_quote_open: string;
  public double_quote_close: string;
  public period: string;
  public semi_colon: string;
  
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
  public ecology_type_list: object[];
  //public gear_key_list: object[];
  public level_list: object[];
  public special_abilities_type_list: object[];
  public spells_known_prepared_psychic: object[];

  public ac_flat_footed_key: RegExp;
  public ac_key: RegExp;
  public ac_touch_key: RegExp;
  public aura_key: RegExp;
  public base_atk_key: RegExp;
  public cl_key: RegExp;
  public cmb_key: RegExp;
  public cmd_key: RegExp;
  public cr_key: RegExp;
  public damage_reduction_key: RegExp;
  public dc_key: RegExp;
  //public defense_key: RegExp;
  public defensive_abilities_key: RegExp;
  //public ecology_key: RegExp;
  public feats_key: RegExp;
  public fort_save_Key: RegExp;
  public hp_key: RegExp;
  public immune_key: RegExp;
  public init_key: RegExp;
  public languages_key: RegExp;
  //public offense_key: RegExp;
  public perception_key: RegExp;
  public racial_modifiers_key: RegExp;
  public reach_key: RegExp;
  public ref_save_key: RegExp;
  public resistances_key: RegExp;
  public senses_key: RegExp;
  public skills_key: RegExp;
  public space_key: RegExp;
  // public special_abilities_key: RegExp;
  public speed_key: RegExp;
  public spell_like_ability_key: RegExp;
  public spell_resistance_key: RegExp;
  public sq_key: RegExp;
  // public statistics_key: RegExp;
  //public tactics_key: RegExp;
  public vulnerabile_to_key: RegExp;
  public weaknesses_key: RegExp;    
  public will_save_key: RegExp;
  public xp_key: RegExp;

  public multiplier: RegExp;
  //public word_hyphenated: RegExp;
  public word: RegExp;

  public sectionElements: {
    defense_key: RegExp;
    offense_key: RegExp;
    tactics_key: RegExp;
    statistics_key: RegExp;
    special_abilities_key: RegExp;
    gear_key_list: object[],
    ecology_key: RegExp,
  };

  // rules
  public sectionsRules: moo.Rules;


  public constructor() {

    this.versus = /\bvs\./;

    this.asterisk = `\*`;
    this.colon = `:`;
    this.comma = `,`;
    this.period = `.`;
    this.dash = `-`;
    this.m_dash = `\u2014`;
    this.n_dash = `\u2013`;
    this.double_quote_open = `“`;
    this.double_quote_close = '”';
    this.l_paren = `(`;
    this.r_paren = `)`;
    this.forward_slash = `/`;
    this.semi_colon = `;`;

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
      /\baberration(?:(?:s[’']?)|(?:[’']s))?/, /\banimal(?:(?:s[’']?)|(?:[’']s))?/, /\bconstruct(?:(?:s[’']?)|(?:[’']s))?/,
      /\bdragon(?:(?:s[’']?)|(?:[’']s))?/, /\bfey(?:(?:s[’']?)|(?:[’']s))?/, /\bhumanoid(?:(?:s[’']?)|(?:[’']s))?/,
      /\bmagical beast(?:(?:s[’']?)|(?:[’']s))?/, /\bmonstrous humanoid(?:(?:s[’']?)|(?:[’']s))?/, /\booze(?:(?:s[’']?)|(?:[’']s))?/,
      /\boutsider(?:(?:s[’']?)|(?:[’']s))?/, /\bplant(?:(?:s[’']?)|(?:[’']s))?/, /\bundead(?:(?:s[’']?)|(?:[’']s))?/,
      /\bvermin(?:(?:s[’']?)|(?:[’']s))?/], r => {
        return { match: r };
      });
    
    this.ecology_type_list = _.map<RegExp, object>([/\bEnvironment\b/, /\bOrganization\b/, /\bTreasure\b/], r => {
      return { match: r };
    });
        
    // this.gear_key_list = _.map<RegExp, object>([/\bGear\b/, /\bCombat Gear\b/, /\bOther Gear\b/], r => {
    //   return { match: r };
    // });

    this.level_list = _.map<RegExp, object>([
      /\b1st\b/, /\b1st\b/, /\b2nd\b/, /\b3rd\b/, /\b4th\b/, /\b5th\b/, /\b6th\b/, /\b7th\b/,
      /\b8th\b/, /\b9th\b/, /\b10th\b/, /\b11th\b/, /\b12th\b/, /\b13th\b/, /\b14th\b/,
      /\b15th\b/, /\b16th\b/, /\b17th\b/, /\b18th\b/, /\b19th\b/, /\b20th\b/], r => {
        return { match: r };
      });
    
    this.special_abilities_type_list = _.map<RegExp, object>([/\(Ex\)/, /\(Sp\)/, /\(Su\)/], r => {
        return { match: r };
      });
    
    this.spells_known_prepared_psychic = _.map<RegExp, object>([
      /\bSpells Known\b/, /\bSpells Prepared\b/, /\bPsychic Magic\b/], r => {
      return { match: r };
    });

    this.ac_key = /\bAC\b/;
    this.ac_flat_footed_key = /\bflat-footed\b/;
    this.ac_touch_key = /\btouch\b/;
    this.aura_key = /\bAura\b/;
    this.base_atk_key = /\bBase Atk\b/;
    this.cl_key = /\b[cC][lL]\b/;
    this.cmb_key = /\bCMB\b/;
    this.cmd_key = /\bCMD\b/;
    this.cr_key = /\b[cC][rR]\b/;
    this.damage_reduction_key = /\bDR\b/;
    this.dc_key = /\bDC\b/;
    this.defensive_abilities_key = /\bDefensive Abilities\b/;
    //this.ecology_key = /\bECOLOGY\b/;
    this.feats_key = /\bFeats\b/;
    this.fort_save_Key = /\bFort\b/;
    this.hp_key = /\bhp\b/;
    this.immune_key = /\bImmune\b/;
    this.init_key = /\bInit\b/;
    this.languages_key = /\bLanguages\b/;
    //this.offense_key = /\bOFFENSE\b/;
    this.perception_key = /\bPerception\b/;
    this.racial_modifiers_key = /\bRacial Modifiers\b/;
    this.reach_key = /\bReach\b/;
    this.ref_save_key = /\bRef\b/;
    this.resistances_key = /\bResist\b/;
    this.senses_key = /\bSenses\b/;
    this.skills_key = /\bSkills\b/;
    this.space_key = /\bSpace\b/;
    //this.special_abilities_key = /\bSPECIAL ABILITIES\b/;
    this.speed_key = /\bSpeed\b/;
    this.spell_like_ability_key = /\bSpell-Like Abilities\b/;
    this.spell_resistance_key = /\bSR\b/;
    this.sq_key = /\bSQ\b/;
    //this.statistics_key = /\bSTATISTICS\b/;
    //this.tactics_key = /\bTACTICS\b/;
    this.vulnerabile_to_key = /\bVulnerable to\b/;
    this.weaknesses_key = /\bWeaknesses\b/;
    this.will_save_key = /\bWill\b/;
    this.xp_key = /\b[xX][pP]\b/;
    
    this.multiplier = /\b[x*]\d\b/;
    //this.word_hyphenated = /(?:\b[a-zA-Z]+[-\u2013\u2014][a-zA-Z]+\b)/;

    // TODO: for Word, maybe add parsing out of trailing letter patterns (what's B? - Bestiary (implied1))!
    this.word = /(?:\b[a-zA-Z]+\b(?:[’']?(?:(?:[stST])?|(?:[lL][lL])?)?))/;

    this.sectionElements = {
      defense_key: /\bDEFENSE\b/,
      offense_key: /\bOFFENSE\b/,
      tactics_key: /\bTACTICS\b/,
      statistics_key: /\bSTATISTICS\b/,
      special_abilities_key: /\bSPECIAL ABILITIES\b/,
      gear_key_list: _.map<RegExp, object>([/\bGear\b/, /\bCombat Gear\b/, /\bOther Gear\b/], r => {
        return { match: r };
      }),
      ecology_key: /\bECOLOGY\b/,
    };

    this.sectionsRules = {
      DefenseKey: this.sectionElements.defense_key,
      OffenseKey: this.sectionElements.offense_key,
      TacticsKey: this.sectionElements.tactics_key,
      StatisticsKey: this.sectionElements.statistics_key,
      SpecialAbilitiesKey: this.sectionElements.special_abilities_key,
      GearKey: this.sectionElements.gear_key_list,
      EcologyKey: this.sectionElements.ecology_key,
    };
  }

  public getLexer(): moo.Lexer {
    return moo.compile({
      // TODO: split rules into groups
      // TODO: how to share rules in a few classes that each produce a lexer?
      // specific string matches
      ...this.sectionsRules,

      AcKey: this.ac_key,
      AcTouchKey: this.ac_touch_key,
      AcFlatFootedKey: this.ac_flat_footed_key,
      AuraKey: this.aura_key,
      BaseAtkKey: this.base_atk_key,
      ClKey: this.cl_key,
      CmbKey: this.cmb_key,
      CmdKey: this.cmd_key,
      CrKey: this.cr_key,
      DcKey: this.dc_key,
      
      DefensiveAbilitiesKey: this.defensive_abilities_key,
      DrKey: this.damage_reduction_key,
      FeatsKey: this.feats_key,
      FortSaveKey: this.fort_save_Key,
      HpKey: this.hp_key,      
      ImmuneKey: this.immune_key,
      InitKey: this.init_key,
      LanguagesKey: this.languages_key,
      PerceptionKey: this.perception_key,
      // TODO: Racial Modifers list of skills has name and value reversed WRT Skills section.
      RacialModifiersKey: this.racial_modifiers_key,
      ReachKey: this.reach_key,
      RefSaveKey: this.ref_save_key,
      ResistKey: this.resistances_key,
      SensesKey: this.senses_key,
      SkillsKey: this.skills_key,
      SpaceKey: this.space_key,
      SpeedKey: this.speed_key,
      SpellLikeAbilityKey: this.spell_like_ability_key,
      SqKey: this.sq_key,
      SrKey: this.spell_resistance_key,
      VulnerableToKey: this.vulnerabile_to_key,
      WeaknessesKey: this.weaknesses_key,
      WillSaveKey: this.will_save_key,
      XpKey: this.xp_key,

      Ability: this.ability_list,
      Alignment: this.alignment_list,
      AttackType: this.attack_type_list,
      CreatureSize: this.creature_size_list,
      CreatureType: this.creature_type_list,
      EcologyType: this.ecology_type_list,
      Level: this.level_list,
      SpecialAbilitiesType: this.special_abilities_type_list,
      SpellsKnownPreparedPsychic: this.spells_known_prepared_psychic,

      DiceRoll: this.dice_roll,
      //NumberWithDenominator: this.number_with_denominator,
      Multiplier: this.multiplier,
      NumberSigned: this.number_with_sign,
      SizeValue: this.size_value,
      NumberWhole: this.number_whole,

      Versus: this.versus,

      // constructs
      //WordHyphenated: this.word_hyphenated,
      Word: this.word,      

      // punctuation
      Colon: this.colon,
      SemiColon: this.semi_colon,
      Comma: this.comma,
      Period: this.period,

      Dash: this.dash,
      MDash: this.m_dash,
      NDash: this.n_dash,

      DoubleQuoteOpen: this.double_quote_open,
      DoubleQuoteClose: this.double_quote_close,

      Asterisk: this.asterisk,

      LParen: this.l_paren,
      RParen: this.r_paren,

      ForwardSlash: this.forward_slash,

      WS: { match: /[ \t\n\r]+/, lineBreaks: true },
    });
  }
}