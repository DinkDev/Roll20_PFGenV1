import * as approvals from "approvals";
import { expect } from "chai";
import { ITestCallbackContext } from "mocha";
import { StatBlockLexer } from "../src/StatBlockLexer";
import { TestHelper } from "./TestHelper";

// tslint:disable:max-line-length

describe(`StatBlockLexer `, () => {

  approvals.configure({
    normalizeLineEndingsTo: "\r\n",
    reporters: ["vscode"],
  });
  approvals.mocha("./test/approval_files");

  it(`all works on words and periods`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `The quick brown fox\r\njumped over the lazy dog.`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Name and CR line data 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `ZAZU CR —`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Name and CR line data 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `AATHERIEXA CR 7`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Name and CR line data 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `WRATH DRAGON CR 20`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Name and CR line data 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `BLACK ORC CR 1/3`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find XP line data 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `XP 3,200`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find XP line data 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `GNOME DRUID 1 XP 400`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Alignment, Size, and Type line data 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `NE Medium aberration`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Alignment, Size, and Type line data 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `NG* Huge dragon (extraplanar, good)`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Alignment, Size, and Type line data 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Small humanoid (gnome) N`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Alignment, Size, and Type line data 4`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `CG Large magical beast`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Init/Senses/Perception data 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Init +9; Senses all-around vision, darkvision 120 ft., low-light\r\nvision, see invisibility; Perception +28`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Init/Senses/Perception data 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Init +5; Senses darkvision 60 ft.; Perception +14`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Init/Senses/Perception data 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Init +0; Senses Perception +13`;
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Aura data 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Aura unnatural aura (30 ft.)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Aura data 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Aura mucus cloud (5 feet)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Aura data 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Aura magic circle against evil (10 ft. radius)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Aura data 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    // Note: this should probably fail (need a size to set the aura)
    const input = `Aura magic circle against evil`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Defense key`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DEFENSE`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `DefenseKey`);
  });

  it(`can find AC line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `AC 21, touch 15, flat-footed 16 (+5 Dex, +6 natural)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find AC line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `AC 14, touch 12, flat-footed 13 (+2 armor, +1 Dex, +1 size)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find AC line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `AC 16, touch 13, flat-footed 16 (+3 armor, +3 deflection)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find AC line 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    // Note: semicolon was common in Bestiary 1
    const input = `AC 15, touch 12, flat-footed 12; (+3 Dex, +3 natural, –1 size; +2\ndeflection vs. evil)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find hp line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `hp 84 (13d8+26)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find hp line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `hp 465 (30d12+270)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find hp line 3`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `hp 8 (1d10+2 plus 1)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find saving throws line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Fort +6, Ref +9, Will +8`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find saving throws line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Fort +26; Ref +19; Will +23`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find saving throws line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Fort +7, Ref +7, Will +6; +2 resistance vs. evil`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Defensive Abilities line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Defensive Abilities defensive training (+4 dodge bonus to AC vs. giants)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Defensive Abilities line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Defensive Abilities blessing of Orcus, ferocity; DR 1/—`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can fine DR/Immune/SR line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 5/magic; Immune cold, disease, poison`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find DR/Immune/SR line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 15/evil; Immune fire, poison, paralysis, sleep; SR 29`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Resist line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 5/cold iron; Resist acid 5, fire 5`
    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Resist line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 5/adamantine; Immune construct traits; Resist cold 10, fire 10`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Weaknesses line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Weaknesses vulnerable to electricity`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Weaknesses line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 10/adamantine and magic; Immune fire, mind-affecting
effects; Resist cold 20, electricity 20, sonic 20; SR 23
Weaknesses vulnerability to protection from evil`;

    const actual = TestHelper.runLexer(lexer, input);

    // TODO: what about common words like `mind-affecting`?
    // TODO: \n is like a ;, sometimes...

    this.verifyAsJSON(actual);
  });

  it(`can find Offense key`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `OFFENSE`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `OffenseKey`);
  });

  it(`can find Speed line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Speed 5 ft., fly 50 ft. (good)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Speed line 2`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Speed 40 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Speed line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Speed 10 ft., swim 60 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Speed line 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Speed 50 ft., fly 200 ft. (poor)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Melee line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Melee bite +37 (2d8+15), 2 claws +37 (2d6+10), 2 wings +34`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Melee line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Melee 4 tentacles +10 (1d6+5 plus slime)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Melee line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Melee mwk silver dagger +6/+1 (1d4–1/19–20)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Melee line 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Melee sickle –1 (1d4–2)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Ranged line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Ranged nasal spray +10 touch (3d6 fire, 3d6 acid, and nasal burn)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Ranged line 2`, function(this: ITestCallbackContext) {
  
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Ranged sling +2 (1d3–2)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Ranged line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Ranged light crossbow +2 (1d8, 19–20/x2)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Ranged line 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Ranged light crossbow +6 (1d8/19–20)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Space/Reach line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Space 5 ft.; Reach 5 ft. (15 ft. with tentacles)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Space/Reach line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Space 15 ft.; Reach 15 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Space/Reach line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Space 15 ft.; Reach 10 ft. (15 ft. with bite)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Space/Reach line 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Space 10 ft.; Reach 5 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Special Attacks line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Special Attacks constrict (3d6 plus withering), gnaw, pull`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Special Attacks line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Special Attacks breath weapon (50 ft. cone, DC 34, 20d6 fire)
channel positive energy 8/day (8d6, DC 22), crush, holy lance
2/day (7 rounds), might of the gods +15, 15 rounds/day)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Special Attacks line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Special Attacks body thief, sneak attack +3d6`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Special Attacks line 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Special Attacks channel positive energy 5/day (DC 18, 4d6)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Spell-Like Abilities line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Spell-Like Abilities (CL 16th)

    At will—hypnotic pattern (DC 15), illusory wall (DC 17), mirage arcana (DC 18), persistent image (DC 18), programmed image (DC 19), project image (DC 20), veil (DC 19)
    3/day—dominate monster (DC 22)

    STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Spell-Like Abilities line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Spell-Like Abilities (CL 13th; concentration +17)
    At will—calm emotions (DC 16), charm monster (DC 18),
    clairaudience/clairvoyance (clairvoyance only), daze
    monster (DC 16), feather fall
    3/day—dispel magic, lightning bolt (DC 17)
    1/day—dominate monster (DC 23)
    1/month—interplanetary teleportUM
    STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Spell-Like Abilities/Spells Prepared line 3`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Gnome Spell-Like Abilities (CL 1st; concentration +3)
    1/day—dancing lights, ghost sound (DC 13), prestidigitation,
    speak with animals
    Druid Spells Prepared (CL 1st; concentration +4)
    1st—entangle (DC 14), goodberry
    0 (at will)—detect magic, know direction, resistance
    TACTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Spell-Like Abilities/Spells Prepared line 4`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Domain Spell-Like Abilities (CL 8th; concentration +12)
    At will—lore keeper (27), remote viewing (8 rounds/day)
    Cleric Spells Prepared (CL 8th; concentration +12)
    4th—discern lies (DC 18), divinationD, greater magic
    weapon, sending
    3rd—prayer, remove curse, remove disease, searing light,
    speak with deadD (DC 17)
    2nd—gentle reposeD, hold person (DC 16), lesser restoration,
    remove paralysis, spiritual weapon
    1st—bless, comprehend languagesD, divine favor, hide from
    undead, sanctify corpseUM, shield of faith
    0 (at will)—detect magic, light, read magic, stabilize
    D domain spell; Domains Knowledge, Repose (Ancestors
    subdomainAPG)
    TACTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Spell-Like Abilities/Spells Known line 5`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Spell-like Abilities (CL 14th):
    At will—create water, obscuring mist, stinking cloud (DC 17)
    Sorcerer Spells Known (CL 5th)
    2nd (5/day)—invisibility, whispering wind
    1st (7/day)—feather fall, hypnotism (DC 15), shocking grasp,
    unseen servant
    0 (at will)—detect magic, daze (DC 14), mage hand,
    message, open/close, ray of frost`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Psychic Magic/Spells Known line 6`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Psychic Magic (CL 6th; concentration +9)
      3 PE—
      forbid actionUM (1 PE, DC 14), mending (0 PE)
      Psychic Spells Known (CL 1st; concentration +4)
      1st (4/day)—mage armor, sleep (DC 14)
      0 (at-will)—detect magic, detect psychic significanceOA,
      mage hand, read magic`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Psychic Magic/Spells Known line 7`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Psychic Magic (CL 11th, concentration +17)
        10 PE—ego whip IOA (3 PE, DC 19), id insinuation IOA
        (2 PE, DC 18), mental barrier IOA (1 PE), mind thrust IVOA
        (4 PE, DC 20)
        Spell-Like Abilities (CL 11th; concentration +17)
        Constant—mage armor`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Tactics line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `TACTICS
    Before Combat Lini casts goodberry at the start of each day.
    During Combat Lini attempts to stay out of melee, sending her
    animal companion to fight while she uses her magic to heal,
    summon allies, and control the environment.
    STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Tactics line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `TACTICS
    Before Combat If he’s able, Ptemenib casts shield of faith before combat.
    During Combat Ptemenib prefers a supporting role in combat, using his spells to heal and bolster his allies. If he has no other options, however, Ptemenib joins combat with his few offensive spells.
    Morale Ptemenib is good-hearted and dedicated, but not foolish. If a battle seems lost, he’s not above fleeing to heal himself, though he will return to rescue any comrades who are captured.
    STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Statistics key`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `StatisticsKey`);
  });

  it(`can find Ability scores line 1`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Str 11, Dex 21, Con 14, Int 18, Wis 10, Cha 19`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Ability scores line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Str 31, Dex 14, Con 28, Int 16, Wis 18, Cha 20`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Ability scores line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Str 14, Dex 10, Con —, Int —, Wis 1, Cha 1`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Base Atk/CMB/CMD line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Base Atk +6; CMB +5; CMD 18`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Base Atk/CMB/CMD line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Base Atk +0; CMB –3; CMD 8`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Base Atk/CMB/CMD line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Base Atk +14; CMB +24; CMD 35 (39 vs. trip)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Base Atk/CMB/CMD line 4`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Base Atk +9; CMB +9 (+21 grapple); CMD 24 (32 vs.
grapple, can’t be tripped)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Feats line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Feats Self-Sufficient`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Feats line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Feats Combat Reflexes, Critical Focus, Flyby Attack,
    HoverB, Improved Initiative, Skill Focus (Perception),
    Weapon Finesse, Weapon Focus (tentacle), WingoverB`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Feats line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Feats Alertness, Improved Channel, Lightning Reflexes,
    Toughness, Turn Undead`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Skills line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Skills Bluff +21, Diplomacy +21, Fly +16, Intimidate +21,
    Knowledge (arcana) +20, Knowledge (nature) +20,
    Perception +25, Sense Motive +25, Spellcraft +20`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Skills line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Skills Acrobatics +21, Diplomacy +17, Fly +20,
    Knowledge (arcana) +14, Perception +28, Sense
    Motive +13, Spellcraft +15, Stealth +21, Use Magic
    Device +17; Racial Modifiers +6 Perception`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Skills line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Skills Acrobatics +8, Perception +10, Stealth +8,
    Survival +7 (+10 in forests); Racial Modifiers
    +3 Survival in forests, +4 Stealth`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Languages line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Languages Ancient Osiriani, Celestial, Common, Osiriani`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Languages line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Languages Undercommon (cannot speak); telepathy 100 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Languages line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Languages Aklo, Common, Draconic, Undercommon;
    telepathy 100 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find SQ line 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SQ amphibious`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find SQ line 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SQ nature bond (animal companion, snow leopard named Droogami*),
    nature sense, wild empathy +3`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find SQ line 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SQ speak with dead (8/day)`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Gear lines 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Combat Gear goodberries (5), scroll of cure light wounds, acid;
    Other Gear leather armor, sickle, sling with 10 bullets, belt pouch,
    mistletoe, spell component pouch, stick collection, sunrods (2),
    trail rations (2), 8 gp`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Gear lines 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Gear scale mail, longspear, light crossbow, 10 bolts`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Gear lines 3`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Combat Gear potion of cure moderate wounds, scroll of
    resist energy, scroll of sound burst, wand of sanctuary (29
    charges), cold iron bolts (5), holy water (2), silver bolts (5);
    Other Gear +1 leather armor, light crossbow with 10 bolts,
    mwk silver dagger, cloak of elvenkind, eyes of the eagle,
    cleric’s vestments, mwk thieves’ tools, silver holy symbol of
    Pharasma, spell component pouch, incense and offerings for
    divination (worth 50 gp), 13 gp`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find ECOLOGY/Environment/Organization/Treasure lines 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `ECOLOGY
    Environment any land
    Organization solitary, pair, pod (3–5), or invasion (6–36)
    Treasure standard`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find ECOLOGY/Environment/Organization/Treasure lines 2`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `ECOLOGY
    Environment any
    Organization solitary
    Treasure none`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find ECOLOGY/Environment/Organization/Treasure lines 3`,  function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `ECOLOGY
    Environment temperate forests
    Organization solitary, mated pair,
    or blessing (3–6)
    Treasure none`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Special Abilities/Vulerable lines 1`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SPECIAL ABILITIES
Mucus Cloud (Ex)

While underwater, an aboleth exudes a cloud of transparent slime. All
creatures adjacent to an aboleth must succeed on a DC 20 Fortitude save
each round or lose the ability to breathe air (but gain the ability to
breathe water) for 3 hours. Renewed contact with an aboleth’s mucus
cloud and failing another save extends the effect for another 3 hours.
The save DC is Constitution-based.
Slime (Ex)

A creature hit by an aboleth’s tentacle must succeed on a DC 20 Fortitude
save or his skin and flesh transform into a clear, slimy membrane over the
course of 1d4 rounds. The creature’s new “flesh” is soft and tender, reducing
its Constitution score by 4 as long as it persists. If the creature’s flesh
isn’t kept moist, it dries quickly and the victim takes 1d12 points of damage
every 10 minutes. Remove disease and similar effects can restore an afflicted
creature to normal, but immunity to disease offers no protection from this
attack. The save DC is Constitution-based.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Special Abilities/Vulerable lines 2`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SPECIAL ABILITIES
Body Thief (Su) As a full-round action that provokes
an attack of opportunity, an intellect devourer can
reduce its size, crawl into the mouth of a helpless
or dead creature, and burrow into the victim’s
skull to devour its brain. This is a coup de grace
attempt that inflicts 8d4+3d6+8 points of damage.
If the victim is slain (or already dead), the intellect
devourer usurps control of the body and may use it
as its own, as if it controlled the target via a dominate
monster spell. The intellect devourer has full access to
all of the host’s defensive and offensive abilities save
for spellcasting and spell-like abilities (although the
intellect devourer can still use its own
spell-like abilities). A host body may not
have been dead for longer than 1 day for this ability to
function, and even successfully inhabited bodies decay
to uselessness in 7 days (unless this time is extended via
gentle repose). As long as the intellect devourer occupies
the body, it knows (and can speak) the languages known
by the victim and basic information about the victim’s
identity and personality, yet has none of the victim’s
specific memories or knowledge. Damage done to a host
body does not harm the intellect devourer, and if the host
body is slain, the intellect devourer emerges and is dazed
for 1 round. Raise dead cannot restore a victim of body
theft, but resurrection or more powerful magic can.
Vulnerable to Protection from Evil (Ex) An intellect devourer
is treated as a summoned creature for the purpose of
determining how it is affected by a protection from evil spell.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });

  it(`can find Special Abilities/Vulerable lines 3`, function(this: ITestCallbackContext) {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SPECIAL ABILITIES
Advice (Ex) Clockwork familiars have an innate
understanding of how things work, granting their masters
a +2 bonus on all Craft and Use Magic Device checks.
Item Installation (Ex) Each clockwork familiar possesses the
ability to carry a magic item in its body. This specific item
type is chosen at the time of the construct’s creation, and
cannot be changed. While the creature cannot activate or use
the item, it gains certain constant abilities from the resonant
magic fields, and can drain the item’s magic as a free action
in order to gain additional magical effects. In addition, any
clockwork construct can drain a single charge or
spell level from its installed item to heal itself
for 1d6 hit points as a standard action.
Removing a spent item and installing a
new one is a full-round action.
Potion: The clockwork familiar gains
a constant protection from good/evil/law/chaos
effect (one type only, chosen each time a new
potion is installed). In addition, a clockwork familiar can
drain the magic from the potion in order to grant this ability
to a creature sharing its space. This ability to
include others in the protection effect lasts for 1 minute per
spell level of the potion drained.
Scroll: The clockwork familiar gains a constant detect magic
effect as a spell-like ability. Draining magic from a scroll allows
the familiar to cast a single identify spell on behalf of its
master for each spell level of the spell inscribed on the scroll—
these castings may be stored and saved, though a scroll used
in this manner becomes instantly useless, even if not all spell
levels have been drained.
Wand: The clockwork familiar gains the ability to spit a glob
of acid up to 30 feet as a ranged touch attack, dealing 1d4
points of damage. Draining a charge increases the damage
to 2d4 points for a single attack. This charge is spent before
the attack is rolled.`;

    const actual = TestHelper.runLexer(lexer, input);

    this.verifyAsJSON(actual);
  });
});
