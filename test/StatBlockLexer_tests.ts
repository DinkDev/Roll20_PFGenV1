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

  it(`all works on words and periods`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `The quick brown fox\r\njumped over the lazy dog.`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(10);
  });
  it(`can find Name and CR line data 1`, function(this: ITestCallbackContext) {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `ZAZU CR —`;
    const actual = TestHelper.runLexer(lexer, input);

    // expect(actual.length).to.equal(3);
    // expect(actual[0]).to.have.property(`type`, `Word`);
    // expect(actual[0]).to.have.property(`value`, `ZAZU`);
    // expect(actual[1]).to.have.property(`type`, `CrKey`);
    // expect(actual[1]).to.have.property(`value`, `CR`);
    // expect(actual[2]).to.have.property(`type`, `MDash`);
    // expect(actual[2]).to.have.property(`value`, `\u2014`);
    this.verifyAsJSON(actual);
  });
  it(`can find Name and CR line data 2`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `AATHERIEXA CR 7`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(3);
    expect(actual[0]).to.have.property(`type`, `Word`);
    expect(actual[0]).to.have.property(`value`, `AATHERIEXA`);
    expect(actual[1]).to.have.property(`type`, `CrKey`);
    expect(actual[1]).to.have.property(`value`, `CR`);
    expect(actual[2]).to.have.property(`type`, `NumberWhole`);
    expect(actual[2]).to.have.property(`value`, `7`);
  });
  it(`can find Name and CR line data 3`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `WRATH DRAGON CR 20`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(4);
    expect(actual[0]).to.have.property(`type`, `Word`);
    expect(actual[0]).to.have.property(`value`, `WRATH`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `DRAGON`);
    expect(actual[2]).to.have.property(`type`, `CrKey`);
    expect(actual[2]).to.have.property(`value`, `CR`);
    expect(actual[3]).to.have.property(`type`, `NumberWhole`);
    expect(actual[3]).to.have.property(`value`, `20`);
  });
  it(`can find Name and CR line data 4`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `BLACK ORC CR 1/3`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(6).to.equal(actual.length);
    expect(actual[0]).to.have.property(`type`, `Word`);
    expect(actual[0]).to.have.property(`value`, `BLACK`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `ORC`);
    expect(actual[2]).to.have.property(`type`, `CrKey`);
    expect(actual[2]).to.have.property(`value`, `CR`);
    expect(actual[3]).to.have.property(`type`, `NumberWhole`);
    expect(actual[3]).to.have.property(`value`, `1`);
    expect(actual[4]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[4]).to.have.property(`value`, `/`);
    expect(actual[5]).to.have.property(`type`, `NumberWhole`);
    expect(actual[5]).to.have.property(`value`, `3`);
  });

  it(`can find XP line data 1`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `XP 3,200`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(2);
    expect(actual[0]).to.have.property(`type`, `XpKey`);
    expect(actual[0]).to.have.property(`value`, `XP`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `3,200`);
  });
  it(`can find XP line data 2`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `GNOME DRUID 1 XP 400`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(5);
    expect(actual[0]).to.have.property(`type`, `Word`);
    expect(actual[0]).to.have.property(`value`, `GNOME`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `DRUID`);
    expect(actual[2]).to.have.property(`type`, `NumberWhole`);
    expect(actual[2]).to.have.property(`value`, `1`);
    expect(actual[3]).to.have.property(`type`, `XpKey`);
    expect(actual[3]).to.have.property(`value`, `XP`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `400`);
  });
  it(`can find Alignment, Size, and Type line data 1`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `NE Medium aberration`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(3);
    expect(actual[0]).to.have.property(`type`, `Alignment`);
    expect(actual[0]).to.have.property(`value`, `NE`);
    expect(actual[1]).to.have.property(`type`, `CreatureSize`);
    expect(actual[1]).to.have.property(`value`, `Medium`);
    expect(actual[2]).to.have.property(`type`, `CreatureType`);
    expect(actual[2]).to.have.property(`value`, `aberration`);
  });
  it(`can find Alignment, Size, and Type line data 2`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `NG* Huge dragon (extraplanar, good)`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(9);
    expect(actual[0]).to.have.property(`type`, `Alignment`);
    expect(actual[0]).to.have.property(`value`, `NG`);
    expect(actual[1]).to.have.property(`type`, `Asterisk`);
    expect(actual[2]).to.have.property(`type`, `CreatureSize`);
    expect(actual[2]).to.have.property(`value`, `Huge`);
    expect(actual[3]).to.have.property(`type`, `CreatureType`);
    expect(actual[3]).to.have.property(`value`, `dragon`);
    expect(actual[4]).to.have.property(`type`, `LParen`);
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `extraplanar`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `good`);
    expect(actual[8]).to.have.property(`type`, `RParen`);
  });
  it(`can find Alignment, Size, and Type line data 3`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Small humanoid (gnome) N`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);
    expect(actual[0]).to.have.property(`type`, `CreatureSize`);
    expect(actual[0]).to.have.property(`value`, `Small`);
    expect(actual[1]).to.have.property(`type`, `CreatureType`);
    expect(actual[1]).to.have.property(`value`, `humanoid`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `gnome`);
    expect(actual[4]).to.have.property(`type`, `RParen`);
    expect(actual[5]).to.have.property(`type`, `Alignment`);
    expect(actual[5]).to.have.property(`value`, `N`);
  });
  it(`can find Alignment, Size, and Type line data 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `CG Large magical beast`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(3);
    expect(actual[0]).to.have.property(`type`, `Alignment`);
    expect(actual[0]).to.have.property(`value`, `CG`);
    expect(actual[1]).to.have.property(`type`, `CreatureSize`);
    expect(actual[1]).to.have.property(`value`, `Large`);
    expect(actual[2]).to.have.property(`type`, `CreatureType`);
    expect(actual[2]).to.have.property(`value`, `magical beast`);
  });

  it(`can find Init/Senses/Perception data 1`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Init +9; Senses all-around vision, darkvision 120 ft., low-light\r\nvision, see invisibility; Perception +28`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(22);
    expect(actual[0]).to.have.property(`type`, `InitKey`);
    expect(actual[0]).to.have.property(`value`, `Init`);

    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+9`);

    expect(actual[2]).to.have.property(`type`, `SemiColon`);

    expect(actual[3]).to.have.property(`type`, `SensesKey`);
    expect(actual[3]).to.have.property(`value`, `Senses`);

    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `all`);

    expect(actual[5]).to.have.property(`type`, `Dash`);
    expect(actual[5]).to.have.property(`value`, `-`);

    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `around`);

    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `vision`);

    expect(actual[8]).to.have.property(`type`, `Comma`);

    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `darkvision`);

    expect(actual[10]).to.have.property(`type`, `SizeValue`);
    expect(actual[10]).to.have.property(`value`, `120 ft.`);

    expect(actual[11]).to.have.property(`type`, `Comma`);

    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `low`);

    expect(actual[13]).to.have.property(`type`, `Dash`);
    expect(actual[13]).to.have.property(`value`, `-`);

    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `light`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `vision`);

    expect(actual[16]).to.have.property(`type`, `Comma`);

    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `see`);

    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `invisibility`);

    expect(actual[19]).to.have.property(`type`, `SemiColon`);

    expect(actual[20]).to.have.property(`type`, `PerceptionKey`);
    expect(actual[20]).to.have.property(`value`, `Perception`);

    expect(actual[21]).to.have.property(`type`, `NumberSigned`);
    expect(actual[21]).to.have.property(`value`, `+28`);
  });

  it(`can find Init/Senses/Perception data 2`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Init +5; Senses darkvision 60 ft.; Perception +14`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(9);
    expect(actual[0]).to.have.property(`type`, `InitKey`);
    expect(actual[0]).to.have.property(`value`, `Init`);

    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+5`);

    expect(actual[2]).to.have.property(`type`, `SemiColon`);

    expect(actual[3]).to.have.property(`type`, `SensesKey`);
    expect(actual[3]).to.have.property(`value`, `Senses`);

    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `darkvision`);

    expect(actual[5]).to.have.property(`type`, `SizeValue`);
    expect(actual[5]).to.have.property(`value`, `60 ft.`);

    expect(actual[6]).to.have.property(`type`, `SemiColon`);

    expect(actual[7]).to.have.property(`type`, `PerceptionKey`);
    expect(actual[7]).to.have.property(`value`, `Perception`);

    expect(actual[8]).to.have.property(`type`, `NumberSigned`);
    expect(actual[8]).to.have.property(`value`, `+14`);
  });
  it(`can find Init/Senses/Perception data 3`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Init +0; Senses Perception +13`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);
    expect(actual[0]).to.have.property(`type`, `InitKey`);
    expect(actual[0]).to.have.property(`value`, `Init`);

    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+0`);

    expect(actual[2]).to.have.property(`type`, `SemiColon`);

    expect(actual[3]).to.have.property(`type`, `SensesKey`);
    expect(actual[3]).to.have.property(`value`, `Senses`);

    expect(actual[4]).to.have.property(`type`, `PerceptionKey`);
    expect(actual[4]).to.have.property(`value`, `Perception`);

    expect(actual[5]).to.have.property(`type`, `NumberSigned`);
    expect(actual[5]).to.have.property(`value`, `+13`);
  });
  it(`can find Aura data 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Aura unnatural aura (30 ft.)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);
    expect(actual[0]).to.have.property(`type`, `AuraKey`);
    expect(actual[0]).to.have.property(`value`, `Aura`);

    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `unnatural`);

    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `aura`);

    expect(actual[3]).to.have.property(`type`, `LParen`);

    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `30 ft.`);

    expect(actual[5]).to.have.property(`type`, `RParen`);
  });
  it(`can find Aura data 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Aura mucus cloud (5 feet)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);
    expect(actual[0]).to.have.property(`type`, `AuraKey`);
    expect(actual[0]).to.have.property(`value`, `Aura`);

    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `mucus`);

    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `cloud`);

    expect(actual[3]).to.have.property(`type`, `LParen`);

    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `5 feet`);

    expect(actual[5]).to.have.property(`type`, `RParen`);
  });
  it(`can find Aura data 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Aura magic circle against evil (10 ft. radius)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(9);
    expect(actual[0]).to.have.property(`type`, `AuraKey`);
    expect(actual[0]).to.have.property(`value`, `Aura`);

    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `magic`);

    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `circle`);

    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `against`);

    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `evil`);

    expect(actual[5]).to.have.property(`type`, `LParen`);

    expect(actual[6]).to.have.property(`type`, `SizeValue`);
    expect(actual[6]).to.have.property(`value`, `10 ft.`);
    
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `radius`);

    expect(actual[8]).to.have.property(`type`, `RParen`);
  });
  it(`can find Aura data 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    // Note: this should probably fail (need a size to set the aura)
    const input = `Aura magic circle against evil`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(5);
    expect(actual[0]).to.have.property(`type`, `AuraKey`);
    expect(actual[0]).to.have.property(`value`, `Aura`);
    
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `magic`);
    
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `circle`);
    
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `against`);
    
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `evil`);
  });

  it(`can find Defense key`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DEFENSE`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `DefenseKey`);
  });

  it(`can find AC line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `AC 21, touch 15, flat-footed 16 (+5 Dex, +6 natural)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(15);

    expect(actual[0]).to.have.property(`type`, `AcKey`);
    expect(actual[0]).to.have.property(`value`, `AC`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `21`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `AcTouchKey`);
    expect(actual[3]).to.have.property(`value`, `touch`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `15`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `AcFlatFootedKey`);
    expect(actual[6]).to.have.property(`value`, `flat-footed`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `16`);
    expect(actual[8]).to.have.property(`type`, `LParen`);
    expect(actual[8]).to.have.property(`value`, `(`);
    expect(actual[9]).to.have.property(`type`, `NumberSigned`);
    expect(actual[9]).to.have.property(`value`, `+5`);
    expect(actual[10]).to.have.property(`type`, `Ability`);
    expect(actual[10]).to.have.property(`value`, `Dex`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);
    expect(actual[12]).to.have.property(`type`, `NumberSigned`);
    expect(actual[12]).to.have.property(`value`, `+6`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `natural`);
    expect(actual[14]).to.have.property(`type`, `RParen`);
    expect(actual[14]).to.have.property(`value`, `)`);
  });
  it(`can find AC line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `AC 14, touch 12, flat-footed 13 (+2 armor, +1 Dex, +1 size)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(18);

    expect(actual[0]).to.have.property(`type`, `AcKey`);
    expect(actual[0]).to.have.property(`value`, `AC`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `14`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `AcTouchKey`);
    expect(actual[3]).to.have.property(`value`, `touch`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `12`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `AcFlatFootedKey`);
    expect(actual[6]).to.have.property(`value`, `flat-footed`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `13`);
    expect(actual[8]).to.have.property(`type`, `LParen`);
    expect(actual[8]).to.have.property(`value`, `(`);
    expect(actual[9]).to.have.property(`type`, `NumberSigned`);
    expect(actual[9]).to.have.property(`value`, `+2`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `armor`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);
    expect(actual[12]).to.have.property(`type`, `NumberSigned`);
    expect(actual[12]).to.have.property(`value`, `+1`);
    expect(actual[13]).to.have.property(`type`, `Ability`);
    expect(actual[13]).to.have.property(`value`, `Dex`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);
    expect(actual[15]).to.have.property(`type`, `NumberSigned`);
    expect(actual[15]).to.have.property(`value`, `+1`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `size`);
    expect(actual[17]).to.have.property(`type`, `RParen`);
    expect(actual[17]).to.have.property(`value`, `)`);
  });
  it(`can find AC line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `AC 16, touch 13, flat-footed 16 (+3 armor, +3 deflection)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(15);

    expect(actual[0]).to.have.property(`type`, `AcKey`);
    expect(actual[0]).to.have.property(`value`, `AC`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `16`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `AcTouchKey`);
    expect(actual[3]).to.have.property(`value`, `touch`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `13`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `AcFlatFootedKey`);
    expect(actual[6]).to.have.property(`value`, `flat-footed`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `16`);
    expect(actual[8]).to.have.property(`type`, `LParen`);
    expect(actual[8]).to.have.property(`value`, `(`);
    expect(actual[9]).to.have.property(`type`, `NumberSigned`);
    expect(actual[9]).to.have.property(`value`, `+3`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `armor`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);
    expect(actual[12]).to.have.property(`type`, `NumberSigned`);
    expect(actual[12]).to.have.property(`value`, `+3`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `deflection`);
    expect(actual[14]).to.have.property(`type`, `RParen`);
    expect(actual[14]).to.have.property(`value`, `)`);
  });
  it(`can find AC line 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    // Note: semicolon was common in Bestiary 1
    const input = `AC 15, touch 12, flat-footed 12; (+3 Dex, +3 natural, –1 size; +2\ndeflection vs. evil)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(24);
    expect(actual[0]).to.have.property(`type`, `AcKey`);
    expect(actual[0]).to.have.property(`value`, `AC`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `15`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `AcTouchKey`);
    expect(actual[3]).to.have.property(`value`, `touch`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `12`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `AcFlatFootedKey`);
    expect(actual[6]).to.have.property(`value`, `flat-footed`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `12`);
    expect(actual[8]).to.have.property(`type`, `SemiColon`);
    expect(actual[8]).to.have.property(`value`, `;`);
    expect(actual[9]).to.have.property(`type`, `LParen`);
    expect(actual[9]).to.have.property(`value`, `(`);
    expect(actual[10]).to.have.property(`type`, `NumberSigned`);
    expect(actual[10]).to.have.property(`value`, `+3`);
    expect(actual[11]).to.have.property(`type`, `Ability`);
    expect(actual[11]).to.have.property(`value`, `Dex`);
    expect(actual[12]).to.have.property(`type`, `Comma`);
    expect(actual[12]).to.have.property(`value`, `,`);
    expect(actual[13]).to.have.property(`type`, `NumberSigned`);
    expect(actual[13]).to.have.property(`value`, `+3`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `natural`);
    expect(actual[15]).to.have.property(`type`, `Comma`);
    expect(actual[15]).to.have.property(`value`, `,`);
    expect(actual[16]).to.have.property(`type`, `NumberSigned`);
    expect(actual[16]).to.have.property(`value`, `\u2013` + `1`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `size`);
    expect(actual[18]).to.have.property(`type`, `SemiColon`);
    expect(actual[18]).to.have.property(`value`, `;`);
    expect(actual[19]).to.have.property(`type`, `NumberSigned`);
    expect(actual[19]).to.have.property(`value`, `+2`);
    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `deflection`);
    expect(actual[21]).to.have.property(`type`, `Versus`);
    expect(actual[21]).to.have.property(`value`, `vs.`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `evil`);
    expect(actual[23]).to.have.property(`type`, `RParen`);
    expect(actual[23]).to.have.property(`value`, `)`);
  });

  it(`can find hp line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `hp 84 (13d8+26)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);

    expect(actual[0]).to.have.property(`type`, `HpKey`);
    expect(actual[0]).to.have.property(`value`, `hp`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `84`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[2]).to.have.property(`value`, `(`);
    expect(actual[3]).to.have.property(`type`, `DiceRoll`);
    expect(actual[3]).to.have.property(`value`, `13d8`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+26`);
    expect(actual[5]).to.have.property(`type`, `RParen`);
    expect(actual[5]).to.have.property(`value`, `)`);
  });
  it(`can find hp line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `hp 465 (30d12+270)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);

    expect(actual[0]).to.have.property(`type`, `HpKey`);
    expect(actual[0]).to.have.property(`value`, `hp`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `465`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[2]).to.have.property(`value`, `(`);
    expect(actual[3]).to.have.property(`type`, `DiceRoll`);
    expect(actual[3]).to.have.property(`value`, `30d12`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+270`);
    expect(actual[5]).to.have.property(`type`, `RParen`);
    expect(actual[5]).to.have.property(`value`, `)`);
  });

  it(`can find hp line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `hp 8 (1d10+2 plus 1)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property(`type`, `HpKey`);
    expect(actual[0]).to.have.property(`value`, `hp`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `8`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[2]).to.have.property(`value`, `(`);
    expect(actual[3]).to.have.property(`type`, `DiceRoll`);
    expect(actual[3]).to.have.property(`value`, `1d10`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+2`);
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `plus`);
    expect(actual[6]).to.have.property(`type`, `NumberWhole`);
    expect(actual[6]).to.have.property(`value`, `1`);
    expect(actual[7]).to.have.property(`type`, `RParen`);
    expect(actual[7]).to.have.property(`value`, `)`);
  });
  it(`can find saving throws line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Fort +6, Ref +9, Will +8`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property(`type`, `FortSaveKey`);
    expect(actual[0]).to.have.property(`value`, `Fort`);
    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+6`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `RefSaveKey`);
    expect(actual[3]).to.have.property(`value`, `Ref`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+9`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `WillSaveKey`);
    expect(actual[6]).to.have.property(`value`, `Will`);
    expect(actual[7]).to.have.property(`type`, `NumberSigned`);
    expect(actual[7]).to.have.property(`value`, `+8`);
  });

  it(`can find saving throws line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Fort +26; Ref +19; Will +23`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property(`type`, `FortSaveKey`);
    expect(actual[0]).to.have.property(`value`, `Fort`);
    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+26`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `RefSaveKey`);
    expect(actual[3]).to.have.property(`value`, `Ref`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+19`);
    expect(actual[5]).to.have.property(`type`, `SemiColon`);
    expect(actual[5]).to.have.property(`value`, `;`);
    expect(actual[6]).to.have.property(`type`, `WillSaveKey`);
    expect(actual[6]).to.have.property(`value`, `Will`);
    expect(actual[7]).to.have.property(`type`, `NumberSigned`);
    expect(actual[7]).to.have.property(`value`, `+23`);
  });

  it(`can find saving throws line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Fort +7, Ref +7, Will +6; +2 resistance vs. evil`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(13);
    expect(actual[0]).to.have.property(`type`, `FortSaveKey`);
    expect(actual[0]).to.have.property(`value`, `Fort`);
    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+7`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `RefSaveKey`);
    expect(actual[3]).to.have.property(`value`, `Ref`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+7`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `WillSaveKey`);
    expect(actual[6]).to.have.property(`value`, `Will`);
    expect(actual[7]).to.have.property(`type`, `NumberSigned`);
    expect(actual[7]).to.have.property(`value`, `+6`);
    expect(actual[8]).to.have.property(`type`, `SemiColon`);
    expect(actual[8]).to.have.property(`value`, `;`);
    expect(actual[9]).to.have.property(`type`, `NumberSigned`);
    expect(actual[9]).to.have.property(`value`, `+2`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `resistance`);
    expect(actual[11]).to.have.property(`type`, `Versus`);
    expect(actual[11]).to.have.property(`value`, `vs.`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `evil`);
  });

  it(`can find Defensive Abilities line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Defensive Abilities defensive training (+4 dodge bonus to AC vs. giants)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(12);
    expect(actual[0]).to.have.property(`type`, `DefensiveAbilitiesKey`);
    expect(actual[0]).to.have.property(`value`, `Defensive Abilities`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `defensive`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `training`);
    expect(actual[3]).to.have.property(`type`, `LParen`);
    expect(actual[3]).to.have.property(`value`, `(`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+4`);
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `dodge`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `bonus`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `to`);
    expect(actual[8]).to.have.property(`type`, `AcKey`);
    expect(actual[8]).to.have.property(`value`, `AC`);
    expect(actual[9]).to.have.property(`type`, `Versus`);
    expect(actual[9]).to.have.property(`value`, `vs.`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `giants`);
    expect(actual[11]).to.have.property(`type`, `RParen`);
    expect(actual[11]).to.have.property(`value`, `)`);

  });

  it(`can find Defensive Abilities line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Defensive Abilities blessing of Orcus, ferocity; DR 1/—`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(11);
    expect(actual[0]).to.have.property(`type`, `DefensiveAbilitiesKey`);
    expect(actual[0]).to.have.property(`value`, `Defensive Abilities`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `blessing`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `of`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `Orcus`);
    expect(actual[4]).to.have.property(`type`, `Comma`);
    expect(actual[4]).to.have.property(`value`, `,`);
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `ferocity`);
    expect(actual[6]).to.have.property(`type`, `SemiColon`);
    expect(actual[6]).to.have.property(`value`, `;`);
    expect(actual[7]).to.have.property(`type`, `DrKey`);
    expect(actual[7]).to.have.property(`value`, `DR`);
    expect(actual[8]).to.have.property(`type`, `NumberWhole`);
    expect(actual[8]).to.have.property(`value`, `1`);
    expect(actual[9]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[9]).to.have.property(`value`, `/`);
    expect(actual[10]).to.have.property(`type`, `MDash`);
    expect(actual[10]).to.have.property(`value`, `\u2014`);
  });

  it(`can fine DR/Immune/SR line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 5/magic; Immune cold, disease, poison`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(11);
    expect(actual[0]).to.have.property(`type`, `DrKey`);
    expect(actual[0]).to.have.property(`value`, `DR`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `5`);
    expect(actual[2]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[2]).to.have.property(`value`, `/`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `magic`);
    expect(actual[4]).to.have.property(`type`, `SemiColon`);
    expect(actual[4]).to.have.property(`value`, `;`);
    expect(actual[5]).to.have.property(`type`, `ImmuneKey`);
    expect(actual[5]).to.have.property(`value`, `Immune`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `cold`);
    expect(actual[7]).to.have.property(`type`, `Comma`);
    expect(actual[7]).to.have.property(`value`, `,`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `disease`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `poison`);
  });
    
  it(`can find DR/Immune/SR line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 15/evil; Immune fire, poison, paralysis, sleep; SR 29`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(16);
    expect(actual[0]).to.have.property(`type`, `DrKey`);
    expect(actual[0]).to.have.property(`value`, `DR`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `15`);
    expect(actual[2]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[2]).to.have.property(`value`, `/`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `evil`);
    expect(actual[4]).to.have.property(`type`, `SemiColon`);
    expect(actual[4]).to.have.property(`value`, `;`);
    expect(actual[5]).to.have.property(`type`, `ImmuneKey`);
    expect(actual[5]).to.have.property(`value`, `Immune`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `fire`);
    expect(actual[7]).to.have.property(`type`, `Comma`);
    expect(actual[7]).to.have.property(`value`, `,`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `poison`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `paralysis`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `sleep`);
    expect(actual[13]).to.have.property(`type`, `SemiColon`);
    expect(actual[13]).to.have.property(`value`, `;`);
    expect(actual[14]).to.have.property(`type`, `SrKey`);
    expect(actual[14]).to.have.property(`value`, `SR`);
    expect(actual[15]).to.have.property(`type`, `NumberWhole`);
    expect(actual[15]).to.have.property(`value`, `29`);
  });

  it(`can find Resist line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 5/cold iron; Resist acid 5, fire 5`
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(12);
    expect(actual[0]).to.have.property(`type`, `DrKey`);
    expect(actual[0]).to.have.property(`value`, `DR`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `5`);
    expect(actual[2]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[2]).to.have.property(`value`, `/`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `cold`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `iron`);
    expect(actual[5]).to.have.property(`type`, `SemiColon`);
    expect(actual[5]).to.have.property(`value`, `;`);
    expect(actual[6]).to.have.property(`type`, `ResistKey`);
    expect(actual[6]).to.have.property(`value`, `Resist`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `acid`);
    expect(actual[8]).to.have.property(`type`, `NumberWhole`);
    expect(actual[8]).to.have.property(`value`, `5`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `fire`);
    expect(actual[11]).to.have.property(`type`, `NumberWhole`);
    expect(actual[11]).to.have.property(`value`, `5`);
  });

  it(`can find Resist line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 5/adamantine; Immune construct traits; Resist cold 10, fire 10`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(15);
    expect(actual[0]).to.have.property(`type`, `DrKey`);
    expect(actual[0]).to.have.property(`value`, `DR`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `5`);
    expect(actual[2]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[2]).to.have.property(`value`, `/`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `adamantine`);
    expect(actual[4]).to.have.property(`type`, `SemiColon`);
    expect(actual[4]).to.have.property(`value`, `;`);
    expect(actual[5]).to.have.property(`type`, `ImmuneKey`);
    expect(actual[5]).to.have.property(`value`, `Immune`);
    expect(actual[6]).to.have.property(`type`, `CreatureType`);
    expect(actual[6]).to.have.property(`value`, `construct`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `traits`);
    expect(actual[8]).to.have.property(`type`, `SemiColon`);
    expect(actual[8]).to.have.property(`value`, `;`);
    expect(actual[9]).to.have.property(`type`, `ResistKey`);
    expect(actual[9]).to.have.property(`value`, `Resist`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `cold`);
    expect(actual[11]).to.have.property(`type`, `NumberWhole`);
    expect(actual[11]).to.have.property(`value`, `10`);
    expect(actual[12]).to.have.property(`type`, `Comma`);
    expect(actual[12]).to.have.property(`value`, `,`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `fire`);
    expect(actual[14]).to.have.property(`type`, `NumberWhole`);
    expect(actual[14]).to.have.property(`value`, `10`);
  });

  it(`can find Weaknesses line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Weaknesses vulnerable to electricity`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(4);
    expect(actual[0]).to.have.property(`type`, `WeaknessesKey`);
    expect(actual[0]).to.have.property(`value`, `Weaknesses`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `vulnerable`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `to`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `electricity`);
  });

  it(`can find Weaknesses line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `DR 10/adamantine and magic; Immune fire, mind-affecting
effects; Resist cold 20, electricity 20, sonic 20; SR 23
Weaknesses vulnerability to protection from evil`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(33);
    expect(actual[0]).to.have.property(`type`, `DrKey`);
    expect(actual[0]).to.have.property(`value`, `DR`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `10`);
    expect(actual[2]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[2]).to.have.property(`value`, `/`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `adamantine`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `and`);
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `magic`);
    expect(actual[6]).to.have.property(`type`, `SemiColon`);
    expect(actual[6]).to.have.property(`value`, `;`);
    expect(actual[7]).to.have.property(`type`, `ImmuneKey`);
    expect(actual[7]).to.have.property(`value`, `Immune`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `fire`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);
    // TODO: what about common words like `mind-affecting`?
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `mind`);
    expect(actual[11]).to.have.property(`type`, `Dash`);
    expect(actual[11]).to.have.property(`value`, `-`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `affecting`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `effects`);
    expect(actual[14]).to.have.property(`type`, `SemiColon`);
    expect(actual[14]).to.have.property(`value`, `;`);
    expect(actual[15]).to.have.property(`type`, `ResistKey`);
    expect(actual[15]).to.have.property(`value`, `Resist`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `cold`);
    expect(actual[17]).to.have.property(`type`, `NumberWhole`);
    expect(actual[17]).to.have.property(`value`, `20`);
    expect(actual[18]).to.have.property(`type`, `Comma`);
    expect(actual[18]).to.have.property(`value`, `,`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `electricity`);
    expect(actual[20]).to.have.property(`type`, `NumberWhole`);
    expect(actual[20]).to.have.property(`value`, `20`);
    expect(actual[21]).to.have.property(`type`, `Comma`);
    expect(actual[21]).to.have.property(`value`, `,`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `sonic`);
    expect(actual[23]).to.have.property(`type`, `NumberWhole`);
    expect(actual[23]).to.have.property(`value`, `20`);
    expect(actual[24]).to.have.property(`type`, `SemiColon`);
    expect(actual[24]).to.have.property(`value`, `;`);
    expect(actual[25]).to.have.property(`type`, `SrKey`);
    expect(actual[25]).to.have.property(`value`, `SR`);
    expect(actual[26]).to.have.property(`type`, `NumberWhole`);
    expect(actual[26]).to.have.property(`value`, `23`);
    // TODO: \n is like a ;, sometimes...
    expect(actual[27]).to.have.property(`type`, `WeaknessesKey`);
    expect(actual[27]).to.have.property(`value`, `Weaknesses`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `vulnerability`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `to`);
    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `protection`);
    expect(actual[31]).to.have.property(`type`, `Word`);
    expect(actual[31]).to.have.property(`value`, `from`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `evil`);
  });
    
  it(`can find Offense key`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `OFFENSE`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `OffenseKey`);
  });

  it(`can find Speed line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Speed 5 ft., fly 50 ft. (good)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property(`type`, `SpeedKey`);
    expect(actual[0]).to.have.property(`value`, `Speed`);
    expect(actual[1]).to.have.property(`type`, `SizeValue`);
    expect(actual[1]).to.have.property(`value`, `5 ft.`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `fly`);
    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `50 ft.`);
    expect(actual[5]).to.have.property(`type`, `LParen`);
    expect(actual[5]).to.have.property(`value`, `(`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `good`);
    expect(actual[7]).to.have.property(`type`, `RParen`);
    expect(actual[7]).to.have.property(`value`, `)`);
  });
  
  it(`can find Speed line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Speed 40 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(2);
    expect(actual[0]).to.have.property(`type`, `SpeedKey`);
    expect(actual[0]).to.have.property(`value`, `Speed`);
    expect(actual[1]).to.have.property(`type`, `SizeValue`);
    expect(actual[1]).to.have.property(`value`, `40 ft.`);
  });
  
  it(`can find Speed line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Speed 10 ft., swim 60 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(5);
    expect(actual[0]).to.have.property(`type`, `SpeedKey`);
    expect(actual[0]).to.have.property(`value`, `Speed`);
    expect(actual[1]).to.have.property(`type`, `SizeValue`);
    expect(actual[1]).to.have.property(`value`, `10 ft.`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `swim`);
    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `60 ft.`);
  });
  
  it(`can find Speed line 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Speed 50 ft., fly 200 ft. (poor)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property(`type`, `SpeedKey`);
    expect(actual[0]).to.have.property(`value`, `Speed`);
    expect(actual[1]).to.have.property(`type`, `SizeValue`);
    expect(actual[1]).to.have.property(`value`, `50 ft.`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `fly`);
    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `200 ft.`);
    expect(actual[5]).to.have.property(`type`, `LParen`);
    expect(actual[5]).to.have.property(`value`, `(`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `poor`);
    expect(actual[7]).to.have.property(`type`, `RParen`);
    expect(actual[7]).to.have.property(`value`, `)`);
  });

  it(`can find Melee line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Melee bite +37 (2d8+15), 2 claws +37 (2d6+10), 2 wings +34`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(19);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Melee`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `bite`);
    expect(actual[2]).to.have.property(`type`, `NumberSigned`);
    expect(actual[2]).to.have.property(`value`, `+37`);
    expect(actual[3]).to.have.property(`type`, `LParen`);
    expect(actual[3]).to.have.property(`value`, `(`);
    expect(actual[4]).to.have.property(`type`, `DiceRoll`);
    expect(actual[4]).to.have.property(`value`, `2d8`);
    expect(actual[5]).to.have.property(`type`, `NumberSigned`);
    expect(actual[5]).to.have.property(`value`, `+15`);
    expect(actual[6]).to.have.property(`type`, `RParen`);
    expect(actual[6]).to.have.property(`value`, `)`);
    expect(actual[7]).to.have.property(`type`, `Comma`);
    expect(actual[7]).to.have.property(`value`, `,`);
    expect(actual[8]).to.have.property(`type`, `NumberWhole`);
    expect(actual[8]).to.have.property(`value`, `2`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `claws`);
    expect(actual[10]).to.have.property(`type`, `NumberSigned`);
    expect(actual[10]).to.have.property(`value`, `+37`);
    expect(actual[11]).to.have.property(`type`, `LParen`);
    expect(actual[11]).to.have.property(`value`, `(`);
    expect(actual[12]).to.have.property(`type`, `DiceRoll`);
    expect(actual[12]).to.have.property(`value`, `2d6`);
    expect(actual[13]).to.have.property(`type`, `NumberSigned`);
    expect(actual[13]).to.have.property(`value`, `+10`);
    expect(actual[14]).to.have.property(`type`, `RParen`);
    expect(actual[14]).to.have.property(`value`, `)`);
    expect(actual[15]).to.have.property(`type`, `Comma`);
    expect(actual[15]).to.have.property(`value`, `,`);
    expect(actual[16]).to.have.property(`type`, `NumberWhole`);
    expect(actual[16]).to.have.property(`value`, `2`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `wings`);
    expect(actual[18]).to.have.property(`type`, `NumberSigned`);
    expect(actual[18]).to.have.property(`value`, `+34`);
  });

  it(`can find Melee line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Melee 4 tentacles +10 (1d6+5 plus slime)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(10);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Melee`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `4`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `tentacles`);
    expect(actual[3]).to.have.property(`type`, `NumberSigned`);
    expect(actual[3]).to.have.property(`value`, `+10`);
    expect(actual[4]).to.have.property(`type`, `LParen`);
    expect(actual[4]).to.have.property(`value`, `(`);
    expect(actual[5]).to.have.property(`type`, `DiceRoll`);
    expect(actual[5]).to.have.property(`value`, `1d6`);
    expect(actual[6]).to.have.property(`type`, `NumberSigned`);
    expect(actual[6]).to.have.property(`value`, `+5`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `plus`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `slime`);
    expect(actual[9]).to.have.property(`type`, `RParen`);
    expect(actual[9]).to.have.property(`value`, `)`);
  });

  it(`can find Melee line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Melee mwk silver dagger +6/+1 (1d4–1/19–20)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(14);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Melee`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `mwk`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `silver`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `dagger`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+6`);
    expect(actual[5]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[5]).to.have.property(`value`, `/`);
    expect(actual[6]).to.have.property(`type`, `NumberSigned`);
    expect(actual[6]).to.have.property(`value`, `+1`);
    expect(actual[7]).to.have.property(`type`, `LParen`);
    expect(actual[7]).to.have.property(`value`, `(`);
    expect(actual[8]).to.have.property(`type`, `DiceRoll`);
    expect(actual[8]).to.have.property(`value`, `1d4`);
    expect(actual[9]).to.have.property(`type`, `NumberSigned`);
    expect(actual[9]).to.have.property(`value`, `\u{2013}1`);
    expect(actual[10]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[10]).to.have.property(`value`, `/`);
    expect(actual[11]).to.have.property(`type`, `NumberWhole`);
    expect(actual[11]).to.have.property(`value`, `19`);
    expect(actual[12]).to.have.property(`type`, `NumberSigned`);
    expect(actual[12]).to.have.property(`value`, `\u{2013}20`);
    expect(actual[13]).to.have.property(`type`, `RParen`);
    expect(actual[13]).to.have.property(`value`, `)`);
  });

  it(`can find Melee line 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Melee sickle –1 (1d4–2)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(7);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Melee`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `sickle`);
    expect(actual[2]).to.have.property(`type`, `NumberSigned`);
    expect(actual[2]).to.have.property(`value`, `\u{2013}1`);
    expect(actual[3]).to.have.property(`type`, `LParen`);
    expect(actual[3]).to.have.property(`value`, `(`);
    expect(actual[4]).to.have.property(`type`, `DiceRoll`);
    expect(actual[4]).to.have.property(`value`, `1d4`);
    expect(actual[5]).to.have.property(`type`, `NumberSigned`);
    expect(actual[5]).to.have.property(`value`, `\u{2013}2`);
    expect(actual[6]).to.have.property(`type`, `RParen`);
    expect(actual[6]).to.have.property(`value`, `)`);
  });

  it(`can find Ranged line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Ranged nasal spray +10 touch (3d6 fire, 3d6 acid, and nasal burn)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(16);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Ranged`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `nasal`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `spray`);
    expect(actual[3]).to.have.property(`type`, `NumberSigned`);
    expect(actual[3]).to.have.property(`value`, `+10`);
    expect(actual[4]).to.have.property(`type`, `AcTouchKey`);
    expect(actual[4]).to.have.property(`value`, `touch`);
    expect(actual[5]).to.have.property(`type`, `LParen`);
    expect(actual[5]).to.have.property(`value`, `(`);
    expect(actual[6]).to.have.property(`type`, `DiceRoll`);
    expect(actual[6]).to.have.property(`value`, `3d6`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `fire`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);
    expect(actual[9]).to.have.property(`type`, `DiceRoll`);
    expect(actual[9]).to.have.property(`value`, `3d6`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `acid`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `and`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `nasal`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `burn`);
    expect(actual[15]).to.have.property(`type`, `RParen`);
    expect(actual[15]).to.have.property(`value`, `)`);
  });

  it(`can find Ranged line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Ranged sling +2 (1d3–2)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(7);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Ranged`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `sling`);
    expect(actual[2]).to.have.property(`type`, `NumberSigned`);
    expect(actual[2]).to.have.property(`value`, `+2`);
    expect(actual[3]).to.have.property(`type`, `LParen`);
    expect(actual[3]).to.have.property(`value`, `(`);
    expect(actual[4]).to.have.property(`type`, `DiceRoll`);
    expect(actual[4]).to.have.property(`value`, `1d3`);
    expect(actual[5]).to.have.property(`type`, `NumberSigned`);
    expect(actual[5]).to.have.property(`value`, `\u{2013}2`);
    expect(actual[6]).to.have.property(`type`, `RParen`);
    expect(actual[6]).to.have.property(`value`, `)`);
  });

  it(`can find Ranged line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Ranged light crossbow +2 (1d8, 19–20/x2)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(12);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Ranged`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `light`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `crossbow`);
    expect(actual[3]).to.have.property(`type`, `NumberSigned`);
    expect(actual[3]).to.have.property(`value`, `+2`);
    expect(actual[4]).to.have.property(`type`, `LParen`);
    expect(actual[4]).to.have.property(`value`, `(`);
    expect(actual[5]).to.have.property(`type`, `DiceRoll`);
    expect(actual[5]).to.have.property(`value`, `1d8`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `19`);
    expect(actual[8]).to.have.property(`type`, `NumberSigned`);
    expect(actual[8]).to.have.property(`value`, `\u{2013}20`);
    expect(actual[9]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[9]).to.have.property(`value`, `/`);
    expect(actual[10]).to.have.property(`type`, `Multiplier`);
    expect(actual[10]).to.have.property(`value`, `x2`);
    expect(actual[11]).to.have.property(`type`, `RParen`);
    expect(actual[11]).to.have.property(`value`, `)`);
  });

  it(`can find Ranged line 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Ranged light crossbow +6 (1d8/19–20)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(10);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Ranged`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `light`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `crossbow`);
    expect(actual[3]).to.have.property(`type`, `NumberSigned`);
    expect(actual[3]).to.have.property(`value`, `+6`);
    expect(actual[4]).to.have.property(`type`, `LParen`);
    expect(actual[4]).to.have.property(`value`, `(`);
    expect(actual[5]).to.have.property(`type`, `DiceRoll`);
    expect(actual[5]).to.have.property(`value`, `1d8`);
    expect(actual[6]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[6]).to.have.property(`value`, `/`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `19`);
    expect(actual[8]).to.have.property(`type`, `NumberSigned`);
    expect(actual[8]).to.have.property(`value`, `\u{2013}20`);
    expect(actual[9]).to.have.property(`type`, `RParen`);
    expect(actual[9]).to.have.property(`value`, `)`);
  });

  it(`can find Space/Reach line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Space 5 ft.; Reach 5 ft. (15 ft. with tentacles)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(10);
    expect(actual[0]).to.have.property(`type`, `SpaceKey`);
    expect(actual[0]).to.have.property(`value`, `Space`);
    expect(actual[1]).to.have.property(`type`, `SizeValue`);
    expect(actual[1]).to.have.property(`value`, `5 ft.`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `ReachKey`);
    expect(actual[3]).to.have.property(`value`, `Reach`);
    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `5 ft.`);
    expect(actual[5]).to.have.property(`type`, `LParen`);
    expect(actual[5]).to.have.property(`value`, `(`);
    expect(actual[6]).to.have.property(`type`, `SizeValue`);
    expect(actual[6]).to.have.property(`value`, `15 ft.`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `with`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `tentacles`);
    expect(actual[9]).to.have.property(`type`, `RParen`);
    expect(actual[9]).to.have.property(`value`, `)`);
  });

  it(`can find Space/Reach line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Space 15 ft.; Reach 15 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(5);
    expect(actual[0]).to.have.property(`type`, `SpaceKey`);
    expect(actual[0]).to.have.property(`value`, `Space`);
    expect(actual[1]).to.have.property(`type`, `SizeValue`);
    expect(actual[1]).to.have.property(`value`, `15 ft.`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `ReachKey`);
    expect(actual[3]).to.have.property(`value`, `Reach`);
    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `15 ft.`);
  });

  it(`can find Space/Reach line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Space 15 ft.; Reach 10 ft. (15 ft. with bite)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(10);
    expect(actual[0]).to.have.property(`type`, `SpaceKey`);
    expect(actual[0]).to.have.property(`value`, `Space`);
    expect(actual[1]).to.have.property(`type`, `SizeValue`);
    expect(actual[1]).to.have.property(`value`, `15 ft.`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `ReachKey`);
    expect(actual[3]).to.have.property(`value`, `Reach`);
    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `10 ft.`);
    expect(actual[5]).to.have.property(`type`, `LParen`);
    expect(actual[5]).to.have.property(`value`, `(`);
    expect(actual[6]).to.have.property(`type`, `SizeValue`);
    expect(actual[6]).to.have.property(`value`, `15 ft.`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `with`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `bite`);
    expect(actual[9]).to.have.property(`type`, `RParen`);
    expect(actual[9]).to.have.property(`value`, `)`);
  });

  it(`can find Space/Reach line 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Space 10 ft.; Reach 5 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(5);
    expect(actual[0]).to.have.property(`type`, `SpaceKey`);
    expect(actual[0]).to.have.property(`value`, `Space`);
    expect(actual[1]).to.have.property(`type`, `SizeValue`);
    expect(actual[1]).to.have.property(`value`, `10 ft.`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `ReachKey`);
    expect(actual[3]).to.have.property(`value`, `Reach`);
    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `5 ft.`);
  });

  it(`can find Special Attacks line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Special Attacks constrict (3d6 plus withering), gnaw, pull`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(11);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Special Attacks`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `constrict`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[2]).to.have.property(`value`, `(`);
    expect(actual[3]).to.have.property(`type`, `DiceRoll`);
    expect(actual[3]).to.have.property(`value`, `3d6`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `plus`);
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `withering`);
    expect(actual[6]).to.have.property(`type`, `RParen`);
    expect(actual[6]).to.have.property(`value`, `)`);
    expect(actual[7]).to.have.property(`type`, `Comma`);
    expect(actual[7]).to.have.property(`value`, `,`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `gnaw`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `pull`);
  });

  it(`can find Special Attacks line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Special Attacks breath weapon (50 ft. cone, DC 34, 20d6 fire)
channel positive energy 8/day (8d6, DC 22), crush, holy lance
2/day (7 rounds), might of the gods +15, 15 rounds/day)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(49);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Special Attacks`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `breath`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `weapon`);
    expect(actual[3]).to.have.property(`type`, `LParen`);
    expect(actual[3]).to.have.property(`value`, `(`);
    expect(actual[4]).to.have.property(`type`, `SizeValue`);
    expect(actual[4]).to.have.property(`value`, `50 ft.`);
  
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `cone`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `DcKey`);
    expect(actual[7]).to.have.property(`value`, `DC`);
    expect(actual[8]).to.have.property(`type`, `NumberWhole`);
    expect(actual[8]).to.have.property(`value`, `34`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);
  
    expect(actual[10]).to.have.property(`type`, `DiceRoll`);
    expect(actual[10]).to.have.property(`value`, `20d6`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `fire`);
    expect(actual[12]).to.have.property(`type`, `RParen`);
    expect(actual[12]).to.have.property(`value`, `)`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `channel`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `positive`);
  
    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `energy`);
    expect(actual[16]).to.have.property(`type`, `NumberWhole`);
    expect(actual[16]).to.have.property(`value`, `8`);
    expect(actual[17]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[17]).to.have.property(`value`, `/`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `day`);
    expect(actual[19]).to.have.property(`type`, `LParen`);
    expect(actual[19]).to.have.property(`value`, `(`);
  
    expect(actual[20]).to.have.property(`type`, `DiceRoll`);
    expect(actual[20]).to.have.property(`value`, `8d6`);
    expect(actual[21]).to.have.property(`type`, `Comma`);
    expect(actual[21]).to.have.property(`value`, `,`);
    expect(actual[22]).to.have.property(`type`, `DcKey`);
    expect(actual[22]).to.have.property(`value`, `DC`);
    expect(actual[23]).to.have.property(`type`, `NumberWhole`);
    expect(actual[23]).to.have.property(`value`, `22`);
    expect(actual[24]).to.have.property(`type`, `RParen`);
    expect(actual[24]).to.have.property(`value`, `)`);

    expect(actual[25]).to.have.property(`type`, `Comma`);
    expect(actual[25]).to.have.property(`value`, `,`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `crush`);
    expect(actual[27]).to.have.property(`type`, `Comma`);
    expect(actual[27]).to.have.property(`value`, `,`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `holy`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `lance`);

    expect(actual[30]).to.have.property(`type`, `NumberWhole`);
    expect(actual[30]).to.have.property(`value`, `2`);
    expect(actual[31]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[31]).to.have.property(`value`, `/`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `day`);
    expect(actual[33]).to.have.property(`type`, `LParen`);
    expect(actual[33]).to.have.property(`value`, `(`);
    expect(actual[34]).to.have.property(`type`, `NumberWhole`);
    expect(actual[34]).to.have.property(`value`, `7`);

    expect(actual[35]).to.have.property(`type`, `Word`);
    expect(actual[35]).to.have.property(`value`, `rounds`);
    expect(actual[36]).to.have.property(`type`, `RParen`);
    expect(actual[36]).to.have.property(`value`, `)`);
    expect(actual[37]).to.have.property(`type`, `Comma`);
    expect(actual[37]).to.have.property(`value`, `,`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `might`);
    expect(actual[39]).to.have.property(`type`, `Word`);
    expect(actual[39]).to.have.property(`value`, `of`);

    expect(actual[40]).to.have.property(`type`, `Word`);
    expect(actual[40]).to.have.property(`value`, `the`);
    expect(actual[41]).to.have.property(`type`, `Word`);
    expect(actual[41]).to.have.property(`value`, `gods`);
    expect(actual[42]).to.have.property(`type`, `NumberSigned`);
    expect(actual[42]).to.have.property(`value`, `+15`);
    expect(actual[43]).to.have.property(`type`, `Comma`);
    expect(actual[43]).to.have.property(`value`, `,`);
    expect(actual[44]).to.have.property(`type`, `NumberWhole`);
    expect(actual[44]).to.have.property(`value`, `15`);

    expect(actual[45]).to.have.property(`type`, `Word`);
    expect(actual[45]).to.have.property(`value`, `rounds`);
    expect(actual[46]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[46]).to.have.property(`value`, `/`);
    expect(actual[47]).to.have.property(`type`, `Word`);
    expect(actual[47]).to.have.property(`value`, `day`);
    expect(actual[48]).to.have.property(`type`, `RParen`);
    expect(actual[48]).to.have.property(`value`, `)`);
  });

  it(`can find Special Attacks line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Special Attacks body thief, sneak attack +3d6`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(7);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Special Attacks`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `body`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `thief`);
    expect(actual[3]).to.have.property(`type`, `Comma`);
    expect(actual[3]).to.have.property(`value`, `,`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `sneak`);
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `attack`);
    expect(actual[6]).to.have.property(`type`, `DiceRoll`);
    expect(actual[6]).to.have.property(`value`, `+3d6`);
  });

  it(`can find Special Attacks line 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Special Attacks channel positive energy 5/day (DC 18, 4d6)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(13);
    expect(actual[0]).to.have.property(`type`, `AttackType`);
    expect(actual[0]).to.have.property(`value`, `Special Attacks`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `channel`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `positive`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `energy`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `5`);

    expect(actual[5]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[5]).to.have.property(`value`, `/`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `day`);
    expect(actual[7]).to.have.property(`type`, `LParen`);
    expect(actual[7]).to.have.property(`value`, `(`);
    expect(actual[8]).to.have.property(`type`, `DcKey`);
    expect(actual[8]).to.have.property(`value`, `DC`);
    expect(actual[9]).to.have.property(`type`, `NumberWhole`);
    expect(actual[9]).to.have.property(`value`, `18`);
  
    expect(actual[10]).to.have.property(`type`, `Comma`);
    expect(actual[10]).to.have.property(`value`, `,`);
    expect(actual[11]).to.have.property(`type`, `DiceRoll`);
    expect(actual[11]).to.have.property(`value`, `4d6`);
    expect(actual[12]).to.have.property(`type`, `RParen`);
    expect(actual[12]).to.have.property(`value`, `)`);
  });

  it(`can find Spell-Like Abilities line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Spell-Like Abilities (CL 16th)

    At will—hypnotic pattern (DC 15), illusory wall (DC 17), mirage arcana (DC 18), persistent image (DC 18), programmed image (DC 19), project image (DC 20), veil (DC 19)
    3/day—dominate monster (DC 22)
    
    STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(66);

    expect(actual[0]).to.have.property(`type`, `SpellLikeAbilityKey`);
    expect(actual[0]).to.have.property(`value`, `Spell-Like Abilities`);
    expect(actual[1]).to.have.property(`type`, `LParen`);
    expect(actual[1]).to.have.property(`value`, `(`);
    expect(actual[2]).to.have.property(`type`, `ClKey`);
    expect(actual[2]).to.have.property(`value`, `CL`);
    expect(actual[3]).to.have.property(`type`, `Level`);
    expect(actual[3]).to.have.property(`value`, `16th`);
    expect(actual[4]).to.have.property(`type`, `RParen`);
    expect(actual[4]).to.have.property(`value`, `)`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `At`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `will`);
    expect(actual[7]).to.have.property(`type`, `MDash`);
    expect(actual[7]).to.have.property(`value`, `—`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `hypnotic`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `pattern`);

    expect(actual[10]).to.have.property(`type`, `LParen`);
    expect(actual[10]).to.have.property(`value`, `(`);
    expect(actual[11]).to.have.property(`type`, `DcKey`);
    expect(actual[11]).to.have.property(`value`, `DC`);
    expect(actual[12]).to.have.property(`type`, `NumberWhole`);
    expect(actual[12]).to.have.property(`value`, `15`);
    expect(actual[13]).to.have.property(`type`, `RParen`);
    expect(actual[13]).to.have.property(`value`, `)`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `illusory`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `wall`);
    expect(actual[17]).to.have.property(`type`, `LParen`);
    expect(actual[17]).to.have.property(`value`, `(`);
    expect(actual[18]).to.have.property(`type`, `DcKey`);
    expect(actual[18]).to.have.property(`value`, `DC`);
    expect(actual[19]).to.have.property(`type`, `NumberWhole`);
    expect(actual[19]).to.have.property(`value`, `17`);

    expect(actual[20]).to.have.property(`type`, `RParen`);
    expect(actual[20]).to.have.property(`value`, `)`);
    expect(actual[21]).to.have.property(`type`, `Comma`);
    expect(actual[21]).to.have.property(`value`, `,`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `mirage`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `arcana`);
    expect(actual[24]).to.have.property(`type`, `LParen`);
    expect(actual[24]).to.have.property(`value`, `(`);

    expect(actual[25]).to.have.property(`type`, `DcKey`);
    expect(actual[25]).to.have.property(`value`, `DC`);
    expect(actual[26]).to.have.property(`type`, `NumberWhole`);
    expect(actual[26]).to.have.property(`value`, `18`);
    expect(actual[27]).to.have.property(`type`, `RParen`);
    expect(actual[27]).to.have.property(`value`, `)`);
    expect(actual[28]).to.have.property(`type`, `Comma`);
    expect(actual[28]).to.have.property(`value`, `,`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `persistent`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `image`);
    expect(actual[31]).to.have.property(`type`, `LParen`);
    expect(actual[31]).to.have.property(`value`, `(`);
    expect(actual[32]).to.have.property(`type`, `DcKey`);
    expect(actual[32]).to.have.property(`value`, `DC`);
    expect(actual[33]).to.have.property(`type`, `NumberWhole`);
    expect(actual[33]).to.have.property(`value`, `18`);
    expect(actual[34]).to.have.property(`type`, `RParen`);
    expect(actual[34]).to.have.property(`value`, `)`);

    expect(actual[35]).to.have.property(`type`, `Comma`);
    expect(actual[35]).to.have.property(`value`, `,`);
    expect(actual[36]).to.have.property(`type`, `Word`);
    expect(actual[36]).to.have.property(`value`, `programmed`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `image`);
    expect(actual[38]).to.have.property(`type`, `LParen`);
    expect(actual[38]).to.have.property(`value`, `(`);
    expect(actual[39]).to.have.property(`type`, `DcKey`);
    expect(actual[39]).to.have.property(`value`, `DC`);

    expect(actual[40]).to.have.property(`type`, `NumberWhole`);
    expect(actual[40]).to.have.property(`value`, `19`);
    expect(actual[41]).to.have.property(`type`, `RParen`);
    expect(actual[41]).to.have.property(`value`, `)`);
    expect(actual[42]).to.have.property(`type`, `Comma`);
    expect(actual[42]).to.have.property(`value`, `,`);
    expect(actual[43]).to.have.property(`type`, `Word`);
    expect(actual[43]).to.have.property(`value`, `project`);
    expect(actual[44]).to.have.property(`type`, `Word`);
    expect(actual[44]).to.have.property(`value`, `image`);

    expect(actual[45]).to.have.property(`type`, `LParen`);
    expect(actual[45]).to.have.property(`value`, `(`);
    expect(actual[46]).to.have.property(`type`, `DcKey`);
    expect(actual[46]).to.have.property(`value`, `DC`);
    expect(actual[47]).to.have.property(`type`, `NumberWhole`);
    expect(actual[47]).to.have.property(`value`, `20`);
    expect(actual[48]).to.have.property(`type`, `RParen`);
    expect(actual[48]).to.have.property(`value`, `)`);
    expect(actual[49]).to.have.property(`type`, `Comma`);
    expect(actual[49]).to.have.property(`value`, `,`);

    expect(actual[50]).to.have.property(`type`, `Word`);
    expect(actual[50]).to.have.property(`value`, `veil`);
    expect(actual[51]).to.have.property(`type`, `LParen`);
    expect(actual[51]).to.have.property(`value`, `(`);
    expect(actual[52]).to.have.property(`type`, `DcKey`);
    expect(actual[52]).to.have.property(`value`, `DC`);
    expect(actual[53]).to.have.property(`type`, `NumberWhole`);
    expect(actual[53]).to.have.property(`value`, `19`);
    expect(actual[54]).to.have.property(`type`, `RParen`);
    expect(actual[54]).to.have.property(`value`, `)`);

    expect(actual[55]).to.have.property(`type`, `NumberWhole`);
    expect(actual[55]).to.have.property(`value`, `3`);
    expect(actual[56]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[56]).to.have.property(`value`, `/`);
    expect(actual[57]).to.have.property(`type`, `Word`);
    expect(actual[57]).to.have.property(`value`, `day`);
    expect(actual[58]).to.have.property(`type`, `MDash`);
    expect(actual[58]).to.have.property(`value`, `—`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `dominate`);

    expect(actual[60]).to.have.property(`type`, `Word`);
    expect(actual[60]).to.have.property(`value`, `monster`);
    expect(actual[61]).to.have.property(`type`, `LParen`);
    expect(actual[61]).to.have.property(`value`, `(`);
    expect(actual[62]).to.have.property(`type`, `DcKey`);
    expect(actual[62]).to.have.property(`value`, `DC`);
    expect(actual[63]).to.have.property(`type`, `NumberWhole`);
    expect(actual[63]).to.have.property(`value`, `22`);
    expect(actual[64]).to.have.property(`type`, `RParen`);
    expect(actual[64]).to.have.property(`value`, `)`);
    
    expect(actual[65]).to.have.property(`type`, `StatisticsKey`);
    expect(actual[65]).to.have.property(`value`, `STATISTICS`);
  });

  it(`can find Spell-Like Abilities line 2`, () => {
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
    
    expect(actual.length).to.equal(72);
    
    expect(actual[0]).to.have.property(`type`, `SpellLikeAbilityKey`);
    expect(actual[0]).to.have.property(`value`, `Spell-Like Abilities`);
    expect(actual[1]).to.have.property(`type`, `LParen`);
    expect(actual[1]).to.have.property(`value`, `(`);
    expect(actual[2]).to.have.property(`type`, `ClKey`);
    expect(actual[2]).to.have.property(`value`, `CL`);
    expect(actual[3]).to.have.property(`type`, `Level`);
    expect(actual[3]).to.have.property(`value`, `13th`);
    expect(actual[4]).to.have.property(`type`, `SemiColon`);
    expect(actual[4]).to.have.property(`value`, `;`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `concentration`);
    expect(actual[6]).to.have.property(`type`, `NumberSigned`);
    expect(actual[6]).to.have.property(`value`, `+17`);
    expect(actual[7]).to.have.property(`type`, `RParen`);
    expect(actual[7]).to.have.property(`value`, `)`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `At`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `will`);

    expect(actual[10]).to.have.property(`type`, `MDash`);
    expect(actual[10]).to.have.property(`value`, `—`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `calm`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `emotions`);
    expect(actual[13]).to.have.property(`type`, `LParen`);
    expect(actual[13]).to.have.property(`value`, `(`);
    expect(actual[14]).to.have.property(`type`, `DcKey`);
    expect(actual[14]).to.have.property(`value`, `DC`);

    expect(actual[15]).to.have.property(`type`, `NumberWhole`);
    expect(actual[15]).to.have.property(`value`, `16`);
    expect(actual[16]).to.have.property(`type`, `RParen`);
    expect(actual[16]).to.have.property(`value`, `)`);
    expect(actual[17]).to.have.property(`type`, `Comma`);
    expect(actual[17]).to.have.property(`value`, `,`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `charm`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `monster`);

    expect(actual[20]).to.have.property(`type`, `LParen`);
    expect(actual[20]).to.have.property(`value`, `(`);
    expect(actual[21]).to.have.property(`type`, `DcKey`);
    expect(actual[21]).to.have.property(`value`, `DC`);
    expect(actual[22]).to.have.property(`type`, `NumberWhole`);
    expect(actual[22]).to.have.property(`value`, `18`);
    expect(actual[23]).to.have.property(`type`, `RParen`);
    expect(actual[23]).to.have.property(`value`, `)`);
    expect(actual[24]).to.have.property(`type`, `Comma`);
    expect(actual[24]).to.have.property(`value`, `,`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `clairaudience`);
    expect(actual[26]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[26]).to.have.property(`value`, `/`);
    expect(actual[27]).to.have.property(`type`, `Word`);
    expect(actual[27]).to.have.property(`value`, `clairvoyance`);
    expect(actual[28]).to.have.property(`type`, `LParen`);
    expect(actual[28]).to.have.property(`value`, `(`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `clairvoyance`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `only`);
    expect(actual[31]).to.have.property(`type`, `RParen`);
    expect(actual[31]).to.have.property(`value`, `)`);
    expect(actual[32]).to.have.property(`type`, `Comma`);
    expect(actual[32]).to.have.property(`value`, `,`);
    expect(actual[33]).to.have.property(`type`, `Word`);
    expect(actual[33]).to.have.property(`value`, `daze`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `monster`);

    expect(actual[35]).to.have.property(`type`, `LParen`);
    expect(actual[35]).to.have.property(`value`, `(`);
    expect(actual[36]).to.have.property(`type`, `DcKey`);
    expect(actual[36]).to.have.property(`value`, `DC`);
    expect(actual[37]).to.have.property(`type`, `NumberWhole`);
    expect(actual[37]).to.have.property(`value`, `16`);
    expect(actual[38]).to.have.property(`type`, `RParen`);
    expect(actual[38]).to.have.property(`value`, `)`);
    expect(actual[39]).to.have.property(`type`, `Comma`);
    expect(actual[39]).to.have.property(`value`, `,`);

    expect(actual[40]).to.have.property(`type`, `Word`);
    expect(actual[40]).to.have.property(`value`, `feather`);
    expect(actual[41]).to.have.property(`type`, `Word`);
    expect(actual[41]).to.have.property(`value`, `fall`);
    expect(actual[42]).to.have.property(`type`, `NumberWhole`);
    expect(actual[42]).to.have.property(`value`, `3`);
    expect(actual[43]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[43]).to.have.property(`value`, `/`);
    expect(actual[44]).to.have.property(`type`, `Word`);
    expect(actual[44]).to.have.property(`value`, `day`);

    expect(actual[45]).to.have.property(`type`, `MDash`);
    expect(actual[45]).to.have.property(`value`, `—`);
    expect(actual[46]).to.have.property(`type`, `Word`);
    expect(actual[46]).to.have.property(`value`, `dispel`);
    expect(actual[47]).to.have.property(`type`, `Word`);
    expect(actual[47]).to.have.property(`value`, `magic`);
    expect(actual[48]).to.have.property(`type`, `Comma`);
    expect(actual[48]).to.have.property(`value`, `,`);
    expect(actual[49]).to.have.property(`type`, `Word`);
    expect(actual[49]).to.have.property(`value`, `lightning`);

    expect(actual[50]).to.have.property(`type`, `Word`);
    expect(actual[50]).to.have.property(`value`, `bolt`);
    expect(actual[51]).to.have.property(`type`, `LParen`);
    expect(actual[51]).to.have.property(`value`, `(`);
    expect(actual[52]).to.have.property(`type`, `DcKey`);
    expect(actual[52]).to.have.property(`value`, `DC`);
    expect(actual[53]).to.have.property(`type`, `NumberWhole`);
    expect(actual[53]).to.have.property(`value`, `17`);
    expect(actual[54]).to.have.property(`type`, `RParen`);
    expect(actual[54]).to.have.property(`value`, `)`);

    expect(actual[55]).to.have.property(`type`, `NumberWhole`);
    expect(actual[55]).to.have.property(`value`, `1`);
    expect(actual[56]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[56]).to.have.property(`value`, `/`);
    expect(actual[57]).to.have.property(`type`, `Word`);
    expect(actual[57]).to.have.property(`value`, `day`);
    expect(actual[58]).to.have.property(`type`, `MDash`);
    expect(actual[58]).to.have.property(`value`, `—`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `dominate`);

    expect(actual[60]).to.have.property(`type`, `Word`);
    expect(actual[60]).to.have.property(`value`, `monster`);
    expect(actual[61]).to.have.property(`type`, `LParen`);
    expect(actual[61]).to.have.property(`value`, `(`);
    expect(actual[62]).to.have.property(`type`, `DcKey`);
    expect(actual[62]).to.have.property(`value`, `DC`);
    expect(actual[63]).to.have.property(`type`, `NumberWhole`);
    expect(actual[63]).to.have.property(`value`, `23`);
    expect(actual[64]).to.have.property(`type`, `RParen`);
    expect(actual[64]).to.have.property(`value`, `)`);

    expect(actual[65]).to.have.property(`type`, `NumberWhole`);
    expect(actual[65]).to.have.property(`value`, `1`);
    expect(actual[66]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[66]).to.have.property(`value`, `/`);
    expect(actual[67]).to.have.property(`type`, `Word`);
    expect(actual[67]).to.have.property(`value`, `month`);
    expect(actual[68]).to.have.property(`type`, `MDash`);
    expect(actual[68]).to.have.property(`value`, `—`);
    expect(actual[69]).to.have.property(`type`, `Word`);
    expect(actual[69]).to.have.property(`value`, `interplanetary`);

    expect(actual[70]).to.have.property(`type`, `Word`);
    expect(actual[70]).to.have.property(`value`, `teleportUM`);
    expect(actual[71]).to.have.property(`type`, `StatisticsKey`);
    expect(actual[71]).to.have.property(`value`, `STATISTICS`);

  });

  it(`can find Spell-Like Abilities/Spells Prepared line 3`, () => {
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

    expect(actual.length).to.equal(60);
    
    expect(actual[0]).to.have.property(`type`, `Word`);
    expect(actual[0]).to.have.property(`value`, `Gnome`);
    expect(actual[1]).to.have.property(`type`, `SpellLikeAbilityKey`);
    expect(actual[1]).to.have.property(`value`, `Spell-Like Abilities`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[2]).to.have.property(`value`, `(`);
    expect(actual[3]).to.have.property(`type`, `ClKey`);
    expect(actual[3]).to.have.property(`value`, `CL`);
    expect(actual[4]).to.have.property(`type`, `Level`);
    expect(actual[4]).to.have.property(`value`, `1st`);

    expect(actual[5]).to.have.property(`type`, `SemiColon`);
    expect(actual[5]).to.have.property(`value`, `;`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `concentration`);
    expect(actual[7]).to.have.property(`type`, `NumberSigned`);
    expect(actual[7]).to.have.property(`value`, `+3`);
    expect(actual[8]).to.have.property(`type`, `RParen`);
    expect(actual[8]).to.have.property(`value`, `)`);
    expect(actual[9]).to.have.property(`type`, `NumberWhole`);
    expect(actual[9]).to.have.property(`value`, `1`);

    expect(actual[10]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[10]).to.have.property(`value`, `/`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `day`);
    expect(actual[12]).to.have.property(`type`, `MDash`);
    expect(actual[12]).to.have.property(`value`, `—`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `dancing`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `lights`);

    expect(actual[15]).to.have.property(`type`, `Comma`);
    expect(actual[15]).to.have.property(`value`, `,`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `ghost`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `sound`);
    expect(actual[18]).to.have.property(`type`, `LParen`);
    expect(actual[18]).to.have.property(`value`, `(`);
    expect(actual[19]).to.have.property(`type`, `DcKey`);
    expect(actual[19]).to.have.property(`value`, `DC`);

    expect(actual[20]).to.have.property(`type`, `NumberWhole`);
    expect(actual[20]).to.have.property(`value`, `13`);
    expect(actual[21]).to.have.property(`type`, `RParen`);
    expect(actual[21]).to.have.property(`value`, `)`);
    expect(actual[22]).to.have.property(`type`, `Comma`);
    expect(actual[22]).to.have.property(`value`, `,`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `prestidigitation`);
    expect(actual[24]).to.have.property(`type`, `Comma`);
    expect(actual[24]).to.have.property(`value`, `,`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `speak`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `with`);
    expect(actual[27]).to.have.property(`type`, `CreatureType`);
    expect(actual[27]).to.have.property(`value`, `animals`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `Druid`);
    expect(actual[29]).to.have.property(`type`, `SpellsKnownPreparedPsychic`);
    expect(actual[29]).to.have.property(`value`, `Spells Prepared`);

    expect(actual[30]).to.have.property(`type`, `LParen`);
    expect(actual[30]).to.have.property(`value`, `(`);
    expect(actual[31]).to.have.property(`type`, `ClKey`);
    expect(actual[31]).to.have.property(`value`, `CL`);
    expect(actual[32]).to.have.property(`type`, `Level`);
    expect(actual[32]).to.have.property(`value`, `1st`);
    expect(actual[33]).to.have.property(`type`, `SemiColon`);
    expect(actual[33]).to.have.property(`value`, `;`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `concentration`);

    expect(actual[35]).to.have.property(`type`, `NumberSigned`);
    expect(actual[35]).to.have.property(`value`, `+4`);
    expect(actual[36]).to.have.property(`type`, `RParen`);
    expect(actual[36]).to.have.property(`value`, `)`);
    expect(actual[37]).to.have.property(`type`, `Level`);
    expect(actual[37]).to.have.property(`value`, `1st`);
    expect(actual[38]).to.have.property(`type`, `MDash`);
    expect(actual[38]).to.have.property(`value`, `—`);
    expect(actual[39]).to.have.property(`type`, `Word`);
    expect(actual[39]).to.have.property(`value`, `entangle`);

    expect(actual[40]).to.have.property(`type`, `LParen`);
    expect(actual[40]).to.have.property(`value`, `(`);
    expect(actual[41]).to.have.property(`type`, `DcKey`);
    expect(actual[41]).to.have.property(`value`, `DC`);
    expect(actual[42]).to.have.property(`type`, `NumberWhole`);
    expect(actual[42]).to.have.property(`value`, `14`);
    expect(actual[43]).to.have.property(`type`, `RParen`);
    expect(actual[43]).to.have.property(`value`, `)`);
    expect(actual[44]).to.have.property(`type`, `Comma`);
    expect(actual[44]).to.have.property(`value`, `,`);

    expect(actual[45]).to.have.property(`type`, `Word`);
    expect(actual[45]).to.have.property(`value`, `goodberry`);
    expect(actual[46]).to.have.property(`type`, `NumberWhole`);
    expect(actual[46]).to.have.property(`value`, `0`);
    expect(actual[47]).to.have.property(`type`, `LParen`);
    expect(actual[47]).to.have.property(`value`, `(`);
    expect(actual[48]).to.have.property(`type`, `Word`);
    expect(actual[48]).to.have.property(`value`, `at`);
    expect(actual[49]).to.have.property(`type`, `Word`);
    expect(actual[49]).to.have.property(`value`, `will`);

    expect(actual[50]).to.have.property(`type`, `RParen`);
    expect(actual[50]).to.have.property(`value`, `)`);
    expect(actual[51]).to.have.property(`type`, `MDash`);
    expect(actual[51]).to.have.property(`value`, `—`);
    expect(actual[52]).to.have.property(`type`, `Word`);
    expect(actual[52]).to.have.property(`value`, `detect`);
    expect(actual[53]).to.have.property(`type`, `Word`);
    expect(actual[53]).to.have.property(`value`, `magic`);
    expect(actual[54]).to.have.property(`type`, `Comma`);
    expect(actual[54]).to.have.property(`value`, `,`);

    expect(actual[55]).to.have.property(`type`, `Word`);
    expect(actual[55]).to.have.property(`value`, `know`);
    expect(actual[56]).to.have.property(`type`, `Word`);
    expect(actual[56]).to.have.property(`value`, `direction`);
    expect(actual[57]).to.have.property(`type`, `Comma`);
    expect(actual[57]).to.have.property(`value`, `,`);
    expect(actual[58]).to.have.property(`type`, `Word`);
    expect(actual[58]).to.have.property(`value`, `resistance`);
    expect(actual[59]).to.have.property(`type`, `TacticsKey`);
    expect(actual[59]).to.have.property(`value`, `TACTICS`);
  });

  it(`can find Spell-Like Abilities/Spells Prepared line 4`, () => {
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

    expect(actual.length).to.equal(139);
    
    expect(actual[0]).to.have.property(`type`, `Word`);
    expect(actual[0]).to.have.property(`value`, `Domain`);
    expect(actual[1]).to.have.property(`type`, `SpellLikeAbilityKey`);
    expect(actual[1]).to.have.property(`value`, `Spell-Like Abilities`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[2]).to.have.property(`value`, `(`);
    expect(actual[3]).to.have.property(`type`, `ClKey`);
    expect(actual[3]).to.have.property(`value`, `CL`);
    expect(actual[4]).to.have.property(`type`, `Level`);
    expect(actual[4]).to.have.property(`value`, `8th`);

    expect(actual[5]).to.have.property(`type`, `SemiColon`);
    expect(actual[5]).to.have.property(`value`, `;`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `concentration`);
    expect(actual[7]).to.have.property(`type`, `NumberSigned`);
    expect(actual[7]).to.have.property(`value`, `+12`);
    expect(actual[8]).to.have.property(`type`, `RParen`);
    expect(actual[8]).to.have.property(`value`, `)`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `At`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `will`);
    expect(actual[11]).to.have.property(`type`, `MDash`);
    expect(actual[11]).to.have.property(`value`, `—`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `lore`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `keeper`);
    expect(actual[14]).to.have.property(`type`, `LParen`);
    expect(actual[14]).to.have.property(`value`, `(`);

    expect(actual[15]).to.have.property(`type`, `NumberWhole`);
    expect(actual[15]).to.have.property(`value`, `27`);
    expect(actual[16]).to.have.property(`type`, `RParen`);
    expect(actual[16]).to.have.property(`value`, `)`);
    expect(actual[17]).to.have.property(`type`, `Comma`);
    expect(actual[17]).to.have.property(`value`, `,`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `remote`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `viewing`);

    expect(actual[20]).to.have.property(`type`, `LParen`);
    expect(actual[20]).to.have.property(`value`, `(`);
    expect(actual[21]).to.have.property(`type`, `NumberWhole`);
    expect(actual[21]).to.have.property(`value`, `8`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `rounds`);
    expect(actual[23]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[23]).to.have.property(`value`, `/`);
    expect(actual[24]).to.have.property(`type`, `Word`);
    expect(actual[24]).to.have.property(`value`, `day`);

    expect(actual[25]).to.have.property(`type`, `RParen`);
    expect(actual[25]).to.have.property(`value`, `)`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `Cleric`);
    expect(actual[27]).to.have.property(`type`, `SpellsKnownPreparedPsychic`);
    expect(actual[27]).to.have.property(`value`, `Spells Prepared`);
    expect(actual[28]).to.have.property(`type`, `LParen`);
    expect(actual[28]).to.have.property(`value`, `(`);
    expect(actual[29]).to.have.property(`type`, `ClKey`);
    expect(actual[29]).to.have.property(`value`, `CL`);

    expect(actual[30]).to.have.property(`type`, `Level`);
    expect(actual[30]).to.have.property(`value`, `8th`);
    expect(actual[31]).to.have.property(`type`, `SemiColon`);
    expect(actual[31]).to.have.property(`value`, `;`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `concentration`);
    expect(actual[33]).to.have.property(`type`, `NumberSigned`);
    expect(actual[33]).to.have.property(`value`, `+12`);
    expect(actual[34]).to.have.property(`type`, `RParen`);
    expect(actual[34]).to.have.property(`value`, `)`);

    expect(actual[35]).to.have.property(`type`, `Level`);
    expect(actual[35]).to.have.property(`value`, `4th`);
    expect(actual[36]).to.have.property(`type`, `MDash`);
    expect(actual[36]).to.have.property(`value`, `—`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `discern`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `lies`);
    expect(actual[39]).to.have.property(`type`, `LParen`);
    expect(actual[39]).to.have.property(`value`, `(`);

    expect(actual[40]).to.have.property(`type`, `DcKey`);
    expect(actual[40]).to.have.property(`value`, `DC`);
    expect(actual[41]).to.have.property(`type`, `NumberWhole`);
    expect(actual[41]).to.have.property(`value`, `18`);
    expect(actual[42]).to.have.property(`type`, `RParen`);
    expect(actual[42]).to.have.property(`value`, `)`);
    expect(actual[43]).to.have.property(`type`, `Comma`);
    expect(actual[43]).to.have.property(`value`, `,`);
    expect(actual[44]).to.have.property(`type`, `Word`);
    expect(actual[44]).to.have.property(`value`, `divinationD`);

    expect(actual[45]).to.have.property(`type`, `Comma`);
    expect(actual[45]).to.have.property(`value`, `,`);
    expect(actual[46]).to.have.property(`type`, `Word`);
    expect(actual[46]).to.have.property(`value`, `greater`);
    expect(actual[47]).to.have.property(`type`, `Word`);
    expect(actual[47]).to.have.property(`value`, `magic`);
    expect(actual[48]).to.have.property(`type`, `Word`);
    expect(actual[48]).to.have.property(`value`, `weapon`);
    expect(actual[49]).to.have.property(`type`, `Comma`);
    expect(actual[49]).to.have.property(`value`, `,`);

    expect(actual[50]).to.have.property(`type`, `Word`);
    expect(actual[50]).to.have.property(`value`, `sending`);
    expect(actual[51]).to.have.property(`type`, `Level`);
    expect(actual[51]).to.have.property(`value`, `3rd`);
    expect(actual[52]).to.have.property(`type`, `MDash`);
    expect(actual[52]).to.have.property(`value`, `—`);
    expect(actual[53]).to.have.property(`type`, `Word`);
    expect(actual[53]).to.have.property(`value`, `prayer`);
    expect(actual[54]).to.have.property(`type`, `Comma`);
    expect(actual[54]).to.have.property(`value`, `,`);

    expect(actual[55]).to.have.property(`type`, `Word`);
    expect(actual[55]).to.have.property(`value`, `remove`);
    expect(actual[56]).to.have.property(`type`, `Word`);
    expect(actual[56]).to.have.property(`value`, `curse`);
    expect(actual[57]).to.have.property(`type`, `Comma`);
    expect(actual[57]).to.have.property(`value`, `,`);
    expect(actual[58]).to.have.property(`type`, `Word`);
    expect(actual[58]).to.have.property(`value`, `remove`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `disease`);

    expect(actual[60]).to.have.property(`type`, `Comma`);
    expect(actual[60]).to.have.property(`value`, `,`);
    expect(actual[61]).to.have.property(`type`, `Word`);
    expect(actual[61]).to.have.property(`value`, `searing`);
    expect(actual[62]).to.have.property(`type`, `Word`);
    expect(actual[62]).to.have.property(`value`, `light`);
    expect(actual[63]).to.have.property(`type`, `Comma`);
    expect(actual[63]).to.have.property(`value`, `,`);
    expect(actual[64]).to.have.property(`type`, `Word`);
    expect(actual[64]).to.have.property(`value`, `speak`);

    expect(actual[65]).to.have.property(`type`, `Word`);
    expect(actual[65]).to.have.property(`value`, `with`);
    expect(actual[66]).to.have.property(`type`, `Word`);
    expect(actual[66]).to.have.property(`value`, `deadD`);
    expect(actual[67]).to.have.property(`type`, `LParen`);
    expect(actual[67]).to.have.property(`value`, `(`);
    expect(actual[68]).to.have.property(`type`, `DcKey`);
    expect(actual[68]).to.have.property(`value`, `DC`);
    expect(actual[69]).to.have.property(`type`, `NumberWhole`);
    expect(actual[69]).to.have.property(`value`, `17`);

    expect(actual[70]).to.have.property(`type`, `RParen`);
    expect(actual[70]).to.have.property(`value`, `)`);
    expect(actual[71]).to.have.property(`type`, `Level`);
    expect(actual[71]).to.have.property(`value`, `2nd`);
    expect(actual[72]).to.have.property(`type`, `MDash`);
    expect(actual[72]).to.have.property(`value`, `—`);
    expect(actual[73]).to.have.property(`type`, `Word`);
    expect(actual[73]).to.have.property(`value`, `gentle`);
    expect(actual[74]).to.have.property(`type`, `Word`);
    expect(actual[74]).to.have.property(`value`, `reposeD`);

    expect(actual[75]).to.have.property(`type`, `Comma`);
    expect(actual[75]).to.have.property(`value`, `,`);
    expect(actual[76]).to.have.property(`type`, `Word`);
    expect(actual[76]).to.have.property(`value`, `hold`);
    expect(actual[77]).to.have.property(`type`, `Word`);
    expect(actual[77]).to.have.property(`value`, `person`);
    expect(actual[78]).to.have.property(`type`, `LParen`);
    expect(actual[78]).to.have.property(`value`, `(`);
    expect(actual[79]).to.have.property(`type`, `DcKey`);
    expect(actual[79]).to.have.property(`value`, `DC`);

    expect(actual[80]).to.have.property(`type`, `NumberWhole`);
    expect(actual[80]).to.have.property(`value`, `16`);
    expect(actual[81]).to.have.property(`type`, `RParen`);
    expect(actual[81]).to.have.property(`value`, `)`);
    expect(actual[82]).to.have.property(`type`, `Comma`);
    expect(actual[82]).to.have.property(`value`, `,`);
    expect(actual[83]).to.have.property(`type`, `Word`);
    expect(actual[83]).to.have.property(`value`, `lesser`);
    expect(actual[84]).to.have.property(`type`, `Word`);
    expect(actual[84]).to.have.property(`value`, `restoration`);

    expect(actual[85]).to.have.property(`type`, `Comma`);
    expect(actual[85]).to.have.property(`value`, `,`);
    expect(actual[86]).to.have.property(`type`, `Word`);
    expect(actual[86]).to.have.property(`value`, `remove`);
    expect(actual[87]).to.have.property(`type`, `Word`);
    expect(actual[87]).to.have.property(`value`, `paralysis`);
    expect(actual[88]).to.have.property(`type`, `Comma`);
    expect(actual[88]).to.have.property(`value`, `,`);
    expect(actual[89]).to.have.property(`type`, `Word`);
    expect(actual[89]).to.have.property(`value`, `spiritual`);

    expect(actual[90]).to.have.property(`type`, `Word`);
    expect(actual[90]).to.have.property(`value`, `weapon`);
    expect(actual[91]).to.have.property(`type`, `Level`);
    expect(actual[91]).to.have.property(`value`, `1st`);
    expect(actual[92]).to.have.property(`type`, `MDash`);
    expect(actual[92]).to.have.property(`value`, `—`);
    expect(actual[93]).to.have.property(`type`, `Word`);
    expect(actual[93]).to.have.property(`value`, `bless`);
    expect(actual[94]).to.have.property(`type`, `Comma`);
    expect(actual[94]).to.have.property(`value`, `,`);

    expect(actual[95]).to.have.property(`type`, `Word`);
    expect(actual[95]).to.have.property(`value`, `comprehend`);
    expect(actual[96]).to.have.property(`type`, `Word`);
    expect(actual[96]).to.have.property(`value`, `languagesD`);
    expect(actual[97]).to.have.property(`type`, `Comma`);
    expect(actual[97]).to.have.property(`value`, `,`);
    expect(actual[98]).to.have.property(`type`, `Word`);
    expect(actual[98]).to.have.property(`value`, `divine`);
    expect(actual[99]).to.have.property(`type`, `Word`);
    expect(actual[99]).to.have.property(`value`, `favor`);

    expect(actual[100]).to.have.property(`type`, `Comma`);
    expect(actual[100]).to.have.property(`value`, `,`);
    expect(actual[101]).to.have.property(`type`, `Word`);
    expect(actual[101]).to.have.property(`value`, `hide`);
    expect(actual[102]).to.have.property(`type`, `Word`);
    expect(actual[102]).to.have.property(`value`, `from`);
    expect(actual[103]).to.have.property(`type`, `CreatureType`);
    expect(actual[103]).to.have.property(`value`, `undead`);
    expect(actual[104]).to.have.property(`type`, `Comma`);
    expect(actual[104]).to.have.property(`value`, `,`);

    expect(actual[105]).to.have.property(`type`, `Word`);
    expect(actual[105]).to.have.property(`value`, `sanctify`);
    expect(actual[106]).to.have.property(`type`, `Word`);
    expect(actual[106]).to.have.property(`value`, `corpseUM`);
    expect(actual[107]).to.have.property(`type`, `Comma`);
    expect(actual[107]).to.have.property(`value`, `,`);
    expect(actual[108]).to.have.property(`type`, `Word`);
    expect(actual[108]).to.have.property(`value`, `shield`);
    expect(actual[109]).to.have.property(`type`, `Word`);
    expect(actual[109]).to.have.property(`value`, `of`);

    expect(actual[110]).to.have.property(`type`, `Word`);
    expect(actual[110]).to.have.property(`value`, `faith`);
    expect(actual[111]).to.have.property(`type`, `NumberWhole`);
    expect(actual[111]).to.have.property(`value`, `0`);
    expect(actual[112]).to.have.property(`type`, `LParen`);
    expect(actual[112]).to.have.property(`value`, `(`);
    expect(actual[113]).to.have.property(`type`, `Word`);
    expect(actual[113]).to.have.property(`value`, `at`);
    expect(actual[114]).to.have.property(`type`, `Word`);
    expect(actual[114]).to.have.property(`value`, `will`);

    expect(actual[115]).to.have.property(`type`, `RParen`);
    expect(actual[115]).to.have.property(`value`, `)`);
    expect(actual[116]).to.have.property(`type`, `MDash`);
    expect(actual[116]).to.have.property(`value`, `—`);
    expect(actual[117]).to.have.property(`type`, `Word`);
    expect(actual[117]).to.have.property(`value`, `detect`);
    expect(actual[118]).to.have.property(`type`, `Word`);
    expect(actual[118]).to.have.property(`value`, `magic`);
    expect(actual[119]).to.have.property(`type`, `Comma`);
    expect(actual[119]).to.have.property(`value`, `,`);

    expect(actual[120]).to.have.property(`type`, `Word`);
    expect(actual[120]).to.have.property(`value`, `light`);
    expect(actual[121]).to.have.property(`type`, `Comma`);
    expect(actual[121]).to.have.property(`value`, `,`);
    expect(actual[122]).to.have.property(`type`, `Word`);
    expect(actual[122]).to.have.property(`value`, `read`);
    expect(actual[123]).to.have.property(`type`, `Word`);
    expect(actual[123]).to.have.property(`value`, `magic`);
    expect(actual[124]).to.have.property(`type`, `Comma`);
    expect(actual[124]).to.have.property(`value`, `,`);

    expect(actual[125]).to.have.property(`type`, `Word`);
    expect(actual[125]).to.have.property(`value`, `stabilize`);
    expect(actual[126]).to.have.property(`type`, `Word`);
    expect(actual[126]).to.have.property(`value`, `D`);
    expect(actual[127]).to.have.property(`type`, `Word`);
    expect(actual[127]).to.have.property(`value`, `domain`);
    expect(actual[128]).to.have.property(`type`, `Word`);
    expect(actual[128]).to.have.property(`value`, `spell`);
    expect(actual[129]).to.have.property(`type`, `SemiColon`);
    expect(actual[129]).to.have.property(`value`, `;`);

    expect(actual[130]).to.have.property(`type`, `Word`);
    expect(actual[130]).to.have.property(`value`, `Domains`);
    expect(actual[131]).to.have.property(`type`, `Word`);
    expect(actual[131]).to.have.property(`value`, `Knowledge`);
    expect(actual[132]).to.have.property(`type`, `Comma`);
    expect(actual[132]).to.have.property(`value`, `,`);
    expect(actual[133]).to.have.property(`type`, `Word`);
    expect(actual[133]).to.have.property(`value`, `Repose`);
    expect(actual[134]).to.have.property(`type`, `LParen`);
    expect(actual[134]).to.have.property(`value`, `(`);

    expect(actual[135]).to.have.property(`type`, `Word`);
    expect(actual[135]).to.have.property(`value`, `Ancestors`);
    expect(actual[136]).to.have.property(`type`, `Word`);
    expect(actual[136]).to.have.property(`value`, `subdomainAPG`);
    expect(actual[137]).to.have.property(`type`, `RParen`);
    expect(actual[137]).to.have.property(`value`, `)`);
    expect(actual[138]).to.have.property(`type`, `TacticsKey`);
    expect(actual[138]).to.have.property(`value`, `TACTICS`);

  });

  it(`can find Spell-Like Abilities/Spells Known line 5`, () => {
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
    
    expect(actual.length).to.equal(89);
    
    expect(actual[0]).to.have.property(`type`, `Word`);
    expect(actual[0]).to.have.property(`value`, `Spell`);
    expect(actual[1]).to.have.property(`type`, `Dash`);
    expect(actual[1]).to.have.property(`value`, `-`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `like`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `Abilities`);
    expect(actual[4]).to.have.property(`type`, `LParen`);
    expect(actual[4]).to.have.property(`value`, `(`);

    expect(actual[5]).to.have.property(`type`, `ClKey`);
    expect(actual[5]).to.have.property(`value`, `CL`);
    expect(actual[6]).to.have.property(`type`, `Level`);
    expect(actual[6]).to.have.property(`value`, `14th`);
    expect(actual[7]).to.have.property(`type`, `RParen`);
    expect(actual[7]).to.have.property(`value`, `)`);
    expect(actual[8]).to.have.property(`type`, `Colon`);
    expect(actual[8]).to.have.property(`value`, `:`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `At`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `will`);
    expect(actual[11]).to.have.property(`type`, `MDash`);
    expect(actual[11]).to.have.property(`value`, `—`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `create`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `water`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `obscuring`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `mist`);
    expect(actual[17]).to.have.property(`type`, `Comma`);
    expect(actual[17]).to.have.property(`value`, `,`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `stinking`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `cloud`);

    expect(actual[20]).to.have.property(`type`, `LParen`);
    expect(actual[20]).to.have.property(`value`, `(`);
    expect(actual[21]).to.have.property(`type`, `DcKey`);
    expect(actual[21]).to.have.property(`value`, `DC`);
    expect(actual[22]).to.have.property(`type`, `NumberWhole`);
    expect(actual[22]).to.have.property(`value`, `17`);
    expect(actual[23]).to.have.property(`type`, `RParen`);
    expect(actual[23]).to.have.property(`value`, `)`);
    expect(actual[24]).to.have.property(`type`, `Word`);
    expect(actual[24]).to.have.property(`value`, `Sorcerer`);

    expect(actual[25]).to.have.property(`type`, `SpellsKnownPreparedPsychic`);
    expect(actual[25]).to.have.property(`value`, `Spells Known`);
    expect(actual[26]).to.have.property(`type`, `LParen`);
    expect(actual[26]).to.have.property(`value`, `(`);
    expect(actual[27]).to.have.property(`type`, `ClKey`);
    expect(actual[27]).to.have.property(`value`, `CL`);
    expect(actual[28]).to.have.property(`type`, `Level`);
    expect(actual[28]).to.have.property(`value`, `5th`);
    expect(actual[29]).to.have.property(`type`, `RParen`);
    expect(actual[29]).to.have.property(`value`, `)`);

    expect(actual[30]).to.have.property(`type`, `Level`);
    expect(actual[30]).to.have.property(`value`, `2nd`);
    expect(actual[31]).to.have.property(`type`, `LParen`);
    expect(actual[31]).to.have.property(`value`, `(`);
    expect(actual[32]).to.have.property(`type`, `NumberWhole`);
    expect(actual[32]).to.have.property(`value`, `5`);
    expect(actual[33]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[33]).to.have.property(`value`, `/`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `day`);

    expect(actual[35]).to.have.property(`type`, `RParen`);
    expect(actual[35]).to.have.property(`value`, `)`);
    expect(actual[36]).to.have.property(`type`, `MDash`);
    expect(actual[36]).to.have.property(`value`, `—`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `invisibility`);
    expect(actual[38]).to.have.property(`type`, `Comma`);
    expect(actual[38]).to.have.property(`value`, `,`);
    expect(actual[39]).to.have.property(`type`, `Word`);
    expect(actual[39]).to.have.property(`value`, `whispering`);

    expect(actual[40]).to.have.property(`type`, `Word`);
    expect(actual[40]).to.have.property(`value`, `wind`);
    expect(actual[41]).to.have.property(`type`, `Level`);
    expect(actual[41]).to.have.property(`value`, `1st`);
    expect(actual[42]).to.have.property(`type`, `LParen`);
    expect(actual[42]).to.have.property(`value`, `(`);
    expect(actual[43]).to.have.property(`type`, `NumberWhole`);
    expect(actual[43]).to.have.property(`value`, `7`);
    expect(actual[44]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[44]).to.have.property(`value`, `/`);

    expect(actual[45]).to.have.property(`type`, `Word`);
    expect(actual[45]).to.have.property(`value`, `day`);
    expect(actual[46]).to.have.property(`type`, `RParen`);
    expect(actual[46]).to.have.property(`value`, `)`);
    expect(actual[47]).to.have.property(`type`, `MDash`);
    expect(actual[47]).to.have.property(`value`, `—`);
    expect(actual[48]).to.have.property(`type`, `Word`);
    expect(actual[48]).to.have.property(`value`, `feather`);
    expect(actual[49]).to.have.property(`type`, `Word`);
    expect(actual[49]).to.have.property(`value`, `fall`);

    expect(actual[50]).to.have.property(`type`, `Comma`);
    expect(actual[50]).to.have.property(`value`, `,`);
    expect(actual[51]).to.have.property(`type`, `Word`);
    expect(actual[51]).to.have.property(`value`, `hypnotism`);
    expect(actual[52]).to.have.property(`type`, `LParen`);
    expect(actual[52]).to.have.property(`value`, `(`);
    expect(actual[53]).to.have.property(`type`, `DcKey`);
    expect(actual[53]).to.have.property(`value`, `DC`);
    expect(actual[54]).to.have.property(`type`, `NumberWhole`);
    expect(actual[54]).to.have.property(`value`, `15`);

    expect(actual[55]).to.have.property(`type`, `RParen`);
    expect(actual[55]).to.have.property(`value`, `)`);
    expect(actual[56]).to.have.property(`type`, `Comma`);
    expect(actual[56]).to.have.property(`value`, `,`);
    expect(actual[57]).to.have.property(`type`, `Word`);
    expect(actual[57]).to.have.property(`value`, `shocking`);
    expect(actual[58]).to.have.property(`type`, `Word`);
    expect(actual[58]).to.have.property(`value`, `grasp`);
    expect(actual[59]).to.have.property(`type`, `Comma`);
    expect(actual[59]).to.have.property(`value`, `,`);

    expect(actual[60]).to.have.property(`type`, `Word`);
    expect(actual[60]).to.have.property(`value`, `unseen`);
    expect(actual[61]).to.have.property(`type`, `Word`);
    expect(actual[61]).to.have.property(`value`, `servant`);
    expect(actual[62]).to.have.property(`type`, `NumberWhole`);
    expect(actual[62]).to.have.property(`value`, `0`);
    expect(actual[63]).to.have.property(`type`, `LParen`);
    expect(actual[63]).to.have.property(`value`, `(`);
    expect(actual[64]).to.have.property(`type`, `Word`);
    expect(actual[64]).to.have.property(`value`, `at`);

    expect(actual[65]).to.have.property(`type`, `Word`);
    expect(actual[65]).to.have.property(`value`, `will`);
    expect(actual[66]).to.have.property(`type`, `RParen`);
    expect(actual[66]).to.have.property(`value`, `)`);
    expect(actual[67]).to.have.property(`type`, `MDash`);
    expect(actual[67]).to.have.property(`value`, `—`);
    expect(actual[68]).to.have.property(`type`, `Word`);
    expect(actual[68]).to.have.property(`value`, `detect`);
    expect(actual[69]).to.have.property(`type`, `Word`);
    expect(actual[69]).to.have.property(`value`, `magic`);

    expect(actual[70]).to.have.property(`type`, `Comma`);
    expect(actual[70]).to.have.property(`value`, `,`);
    expect(actual[71]).to.have.property(`type`, `Word`);
    expect(actual[71]).to.have.property(`value`, `daze`);
    expect(actual[72]).to.have.property(`type`, `LParen`);
    expect(actual[72]).to.have.property(`value`, `(`);
    expect(actual[73]).to.have.property(`type`, `DcKey`);
    expect(actual[73]).to.have.property(`value`, `DC`);
    expect(actual[74]).to.have.property(`type`, `NumberWhole`);
    expect(actual[74]).to.have.property(`value`, `14`);

    expect(actual[75]).to.have.property(`type`, `RParen`);
    expect(actual[75]).to.have.property(`value`, `)`);
    expect(actual[76]).to.have.property(`type`, `Comma`);
    expect(actual[76]).to.have.property(`value`, `,`);
    expect(actual[77]).to.have.property(`type`, `Word`);
    expect(actual[77]).to.have.property(`value`, `mage`);
    expect(actual[78]).to.have.property(`type`, `Word`);
    expect(actual[78]).to.have.property(`value`, `hand`);
    expect(actual[79]).to.have.property(`type`, `Comma`);
    expect(actual[79]).to.have.property(`value`, `,`);

    expect(actual[80]).to.have.property(`type`, `Word`);
    expect(actual[80]).to.have.property(`value`, `message`);
    expect(actual[81]).to.have.property(`type`, `Comma`);
    expect(actual[81]).to.have.property(`value`, `,`);
    expect(actual[82]).to.have.property(`type`, `Word`);
    expect(actual[82]).to.have.property(`value`, `open`);
    expect(actual[83]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[83]).to.have.property(`value`, `/`);
    expect(actual[84]).to.have.property(`type`, `Word`);
    expect(actual[84]).to.have.property(`value`, `close`);

    expect(actual[85]).to.have.property(`type`, `Comma`);
    expect(actual[85]).to.have.property(`value`, `,`);
    expect(actual[86]).to.have.property(`type`, `Word`);
    expect(actual[86]).to.have.property(`value`, `ray`);
    expect(actual[87]).to.have.property(`type`, `Word`);
    expect(actual[87]).to.have.property(`value`, `of`);
    expect(actual[88]).to.have.property(`type`, `Word`);
    expect(actual[88]).to.have.property(`value`, `frost`);

  });

  it(`can find Psychic Magic/Spells Known line 6`, () => {
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
      
    expect(actual.length).to.equal(69);
    
    expect(actual[0]).to.have.property(`type`, `SpellsKnownPreparedPsychic`);
    expect(actual[0]).to.have.property(`value`, `Psychic Magic`);
    expect(actual[1]).to.have.property(`type`, `LParen`);
    expect(actual[1]).to.have.property(`value`, `(`);
    expect(actual[2]).to.have.property(`type`, `ClKey`);
    expect(actual[2]).to.have.property(`value`, `CL`);
    expect(actual[3]).to.have.property(`type`, `Level`);
    expect(actual[3]).to.have.property(`value`, `6th`);
    expect(actual[4]).to.have.property(`type`, `SemiColon`);
    expect(actual[4]).to.have.property(`value`, `;`);
  
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `concentration`);
    expect(actual[6]).to.have.property(`type`, `NumberSigned`);
    expect(actual[6]).to.have.property(`value`, `+9`);
    expect(actual[7]).to.have.property(`type`, `RParen`);
    expect(actual[7]).to.have.property(`value`, `)`);
    expect(actual[8]).to.have.property(`type`, `NumberWhole`);
    expect(actual[8]).to.have.property(`value`, `3`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `PE`);
  
    expect(actual[10]).to.have.property(`type`, `MDash`);
    expect(actual[10]).to.have.property(`value`, `—`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `forbid`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `actionUM`);
    expect(actual[13]).to.have.property(`type`, `LParen`);
    expect(actual[13]).to.have.property(`value`, `(`);
    expect(actual[14]).to.have.property(`type`, `NumberWhole`);
    expect(actual[14]).to.have.property(`value`, `1`);
  
    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `PE`);
    expect(actual[16]).to.have.property(`type`, `Comma`);
    expect(actual[16]).to.have.property(`value`, `,`);
    expect(actual[17]).to.have.property(`type`, `DcKey`);
    expect(actual[17]).to.have.property(`value`, `DC`);
    expect(actual[18]).to.have.property(`type`, `NumberWhole`);
    expect(actual[18]).to.have.property(`value`, `14`);
    expect(actual[19]).to.have.property(`type`, `RParen`);
    expect(actual[19]).to.have.property(`value`, `)`);
  
    expect(actual[20]).to.have.property(`type`, `Comma`);
    expect(actual[20]).to.have.property(`value`, `,`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `mending`);
    expect(actual[22]).to.have.property(`type`, `LParen`);
    expect(actual[22]).to.have.property(`value`, `(`);
    expect(actual[23]).to.have.property(`type`, `NumberWhole`);
    expect(actual[23]).to.have.property(`value`, `0`);
    expect(actual[24]).to.have.property(`type`, `Word`);
    expect(actual[24]).to.have.property(`value`, `PE`);
  
    expect(actual[25]).to.have.property(`type`, `RParen`);
    expect(actual[25]).to.have.property(`value`, `)`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `Psychic`);
    expect(actual[27]).to.have.property(`type`, `SpellsKnownPreparedPsychic`);
    expect(actual[27]).to.have.property(`value`, `Spells Known`);
    expect(actual[28]).to.have.property(`type`, `LParen`);
    expect(actual[28]).to.have.property(`value`, `(`);
    expect(actual[29]).to.have.property(`type`, `ClKey`);
    expect(actual[29]).to.have.property(`value`, `CL`);
  
    expect(actual[30]).to.have.property(`type`, `Level`);
    expect(actual[30]).to.have.property(`value`, `1st`);
    expect(actual[31]).to.have.property(`type`, `SemiColon`);
    expect(actual[31]).to.have.property(`value`, `;`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `concentration`);
    expect(actual[33]).to.have.property(`type`, `NumberSigned`);
    expect(actual[33]).to.have.property(`value`, `+4`);
    expect(actual[34]).to.have.property(`type`, `RParen`);
    expect(actual[34]).to.have.property(`value`, `)`);
  
    expect(actual[35]).to.have.property(`type`, `Level`);
    expect(actual[35]).to.have.property(`value`, `1st`);
    expect(actual[36]).to.have.property(`type`, `LParen`);
    expect(actual[36]).to.have.property(`value`, `(`);
    expect(actual[37]).to.have.property(`type`, `NumberWhole`);
    expect(actual[37]).to.have.property(`value`, `4`);
    expect(actual[38]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[38]).to.have.property(`value`, `/`);
    expect(actual[39]).to.have.property(`type`, `Word`);
    expect(actual[39]).to.have.property(`value`, `day`);
  
    expect(actual[40]).to.have.property(`type`, `RParen`);
    expect(actual[40]).to.have.property(`value`, `)`);
    expect(actual[41]).to.have.property(`type`, `MDash`);
    expect(actual[41]).to.have.property(`value`, `—`);
    expect(actual[42]).to.have.property(`type`, `Word`);
    expect(actual[42]).to.have.property(`value`, `mage`);
    expect(actual[43]).to.have.property(`type`, `Word`);
    expect(actual[43]).to.have.property(`value`, `armor`);
    expect(actual[44]).to.have.property(`type`, `Comma`);
    expect(actual[44]).to.have.property(`value`, `,`);
  
    expect(actual[45]).to.have.property(`type`, `Word`);
    expect(actual[45]).to.have.property(`value`, `sleep`);
    expect(actual[46]).to.have.property(`type`, `LParen`);
    expect(actual[46]).to.have.property(`value`, `(`);
    expect(actual[47]).to.have.property(`type`, `DcKey`);
    expect(actual[47]).to.have.property(`value`, `DC`);
    expect(actual[48]).to.have.property(`type`, `NumberWhole`);
    expect(actual[48]).to.have.property(`value`, `14`);
    expect(actual[49]).to.have.property(`type`, `RParen`);
    expect(actual[49]).to.have.property(`value`, `)`);
  
    expect(actual[50]).to.have.property(`type`, `NumberWhole`);
    expect(actual[50]).to.have.property(`value`, `0`);
    expect(actual[51]).to.have.property(`type`, `LParen`);
    expect(actual[51]).to.have.property(`value`, `(`);
    expect(actual[52]).to.have.property(`type`, `Word`);
    expect(actual[52]).to.have.property(`value`, `at`);
    expect(actual[53]).to.have.property(`type`, `Dash`);
    expect(actual[53]).to.have.property(`value`, `-`);
    expect(actual[54]).to.have.property(`type`, `Word`);
    expect(actual[54]).to.have.property(`value`, `will`);
  
    expect(actual[55]).to.have.property(`type`, `RParen`);
    expect(actual[55]).to.have.property(`value`, `)`);
    expect(actual[56]).to.have.property(`type`, `MDash`);
    expect(actual[56]).to.have.property(`value`, `—`);
    expect(actual[57]).to.have.property(`type`, `Word`);
    expect(actual[57]).to.have.property(`value`, `detect`);
    expect(actual[58]).to.have.property(`type`, `Word`);
    expect(actual[58]).to.have.property(`value`, `magic`);
    expect(actual[59]).to.have.property(`type`, `Comma`);
    expect(actual[59]).to.have.property(`value`, `,`);
  
    expect(actual[60]).to.have.property(`type`, `Word`);
    expect(actual[60]).to.have.property(`value`, `detect`);
    expect(actual[61]).to.have.property(`type`, `Word`);
    expect(actual[61]).to.have.property(`value`, `psychic`);
    expect(actual[62]).to.have.property(`type`, `Word`);
    expect(actual[62]).to.have.property(`value`, `significanceOA`);
    expect(actual[63]).to.have.property(`type`, `Comma`);
    expect(actual[63]).to.have.property(`value`, `,`);
    expect(actual[64]).to.have.property(`type`, `Word`);
    expect(actual[64]).to.have.property(`value`, `mage`);
  
    expect(actual[65]).to.have.property(`type`, `Word`);
    expect(actual[65]).to.have.property(`value`, `hand`);
    expect(actual[66]).to.have.property(`type`, `Comma`);
    expect(actual[66]).to.have.property(`value`, `,`);
    expect(actual[67]).to.have.property(`type`, `Word`);
    expect(actual[67]).to.have.property(`value`, `read`);
    expect(actual[68]).to.have.property(`type`, `Word`);
    expect(actual[68]).to.have.property(`value`, `magic`);
  
  });
  
  it(`can find Psychic Magic/Spells Known line 7`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();
    
    const input = `Psychic Magic (CL 11th, concentration +17)
        10 PE—ego whip IOA (3 PE, DC 19), id insinuation IOA
        (2 PE, DC 18), mental barrier IOA (1 PE), mind thrust IVOA
        (4 PE, DC 20)
        Spell-Like Abilities (CL 11th; concentration +17)
        Constant—mage armor`;
    
    const actual = TestHelper.runLexer(lexer, input);
        
    expect(actual.length).to.equal(63);
    
    expect(actual[0]).to.have.property(`type`, `SpellsKnownPreparedPsychic`);
    expect(actual[0]).to.have.property(`value`, `Psychic Magic`);
    expect(actual[1]).to.have.property(`type`, `LParen`);
    expect(actual[1]).to.have.property(`value`, `(`);
    expect(actual[2]).to.have.property(`type`, `ClKey`);
    expect(actual[2]).to.have.property(`value`, `CL`);
    expect(actual[3]).to.have.property(`type`, `Level`);
    expect(actual[3]).to.have.property(`value`, `11th`);
    expect(actual[4]).to.have.property(`type`, `Comma`);
    expect(actual[4]).to.have.property(`value`, `,`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `concentration`);
    expect(actual[6]).to.have.property(`type`, `NumberSigned`);
    expect(actual[6]).to.have.property(`value`, `+17`);
    expect(actual[7]).to.have.property(`type`, `RParen`);
    expect(actual[7]).to.have.property(`value`, `)`);
    expect(actual[8]).to.have.property(`type`, `NumberWhole`);
    expect(actual[8]).to.have.property(`value`, `10`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `PE`);

    expect(actual[10]).to.have.property(`type`, `MDash`);
    expect(actual[10]).to.have.property(`value`, `—`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `ego`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `whip`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `IOA`);
    expect(actual[14]).to.have.property(`type`, `LParen`);
    expect(actual[14]).to.have.property(`value`, `(`);

    expect(actual[15]).to.have.property(`type`, `NumberWhole`);
    expect(actual[15]).to.have.property(`value`, `3`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `PE`);
    expect(actual[17]).to.have.property(`type`, `Comma`);
    expect(actual[17]).to.have.property(`value`, `,`);
    expect(actual[18]).to.have.property(`type`, `DcKey`);
    expect(actual[18]).to.have.property(`value`, `DC`);
    expect(actual[19]).to.have.property(`type`, `NumberWhole`);
    expect(actual[19]).to.have.property(`value`, `19`);

    expect(actual[20]).to.have.property(`type`, `RParen`);
    expect(actual[20]).to.have.property(`value`, `)`);
    expect(actual[21]).to.have.property(`type`, `Comma`);
    expect(actual[21]).to.have.property(`value`, `,`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `id`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `insinuation`);
    expect(actual[24]).to.have.property(`type`, `Word`);
    expect(actual[24]).to.have.property(`value`, `IOA`);

    expect(actual[25]).to.have.property(`type`, `LParen`);
    expect(actual[25]).to.have.property(`value`, `(`);
    expect(actual[26]).to.have.property(`type`, `NumberWhole`);
    expect(actual[26]).to.have.property(`value`, `2`);
    expect(actual[27]).to.have.property(`type`, `Word`);
    expect(actual[27]).to.have.property(`value`, `PE`);
    expect(actual[28]).to.have.property(`type`, `Comma`);
    expect(actual[28]).to.have.property(`value`, `,`);
    expect(actual[29]).to.have.property(`type`, `DcKey`);
    expect(actual[29]).to.have.property(`value`, `DC`);

    expect(actual[30]).to.have.property(`type`, `NumberWhole`);
    expect(actual[30]).to.have.property(`value`, `18`);
    expect(actual[31]).to.have.property(`type`, `RParen`);
    expect(actual[31]).to.have.property(`value`, `)`);
    expect(actual[32]).to.have.property(`type`, `Comma`);
    expect(actual[32]).to.have.property(`value`, `,`);
    expect(actual[33]).to.have.property(`type`, `Word`);
    expect(actual[33]).to.have.property(`value`, `mental`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `barrier`);

    expect(actual[35]).to.have.property(`type`, `Word`);
    expect(actual[35]).to.have.property(`value`, `IOA`);
    expect(actual[36]).to.have.property(`type`, `LParen`);
    expect(actual[36]).to.have.property(`value`, `(`);
    expect(actual[37]).to.have.property(`type`, `NumberWhole`);
    expect(actual[37]).to.have.property(`value`, `1`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `PE`);
    expect(actual[39]).to.have.property(`type`, `RParen`);
    expect(actual[39]).to.have.property(`value`, `)`);

    expect(actual[40]).to.have.property(`type`, `Comma`);
    expect(actual[40]).to.have.property(`value`, `,`);
    expect(actual[41]).to.have.property(`type`, `Word`);
    expect(actual[41]).to.have.property(`value`, `mind`);
    expect(actual[42]).to.have.property(`type`, `Word`);
    expect(actual[42]).to.have.property(`value`, `thrust`);
    expect(actual[43]).to.have.property(`type`, `Word`);
    expect(actual[43]).to.have.property(`value`, `IVOA`);
    expect(actual[44]).to.have.property(`type`, `LParen`);
    expect(actual[44]).to.have.property(`value`, `(`);

    expect(actual[45]).to.have.property(`type`, `NumberWhole`);
    expect(actual[45]).to.have.property(`value`, `4`);
    expect(actual[46]).to.have.property(`type`, `Word`);
    expect(actual[46]).to.have.property(`value`, `PE`);
    expect(actual[47]).to.have.property(`type`, `Comma`);
    expect(actual[47]).to.have.property(`value`, `,`);
    expect(actual[48]).to.have.property(`type`, `DcKey`);
    expect(actual[48]).to.have.property(`value`, `DC`);
    expect(actual[49]).to.have.property(`type`, `NumberWhole`);    
    expect(actual[49]).to.have.property(`value`, `20`);

    expect(actual[50]).to.have.property(`type`, `RParen`);
    expect(actual[50]).to.have.property(`value`, `)`);
    expect(actual[51]).to.have.property(`type`, `SpellLikeAbilityKey`);
    expect(actual[51]).to.have.property(`value`, `Spell-Like Abilities`);
    expect(actual[52]).to.have.property(`type`, `LParen`);
    expect(actual[52]).to.have.property(`value`, `(`);
    expect(actual[53]).to.have.property(`type`, `ClKey`);
    expect(actual[53]).to.have.property(`value`, `CL`);
    expect(actual[54]).to.have.property(`type`, `Level`);
    expect(actual[54]).to.have.property(`value`, `11th`);

    expect(actual[55]).to.have.property(`type`, `SemiColon`);
    expect(actual[55]).to.have.property(`value`, `;`);
    expect(actual[56]).to.have.property(`type`, `Word`);
    expect(actual[56]).to.have.property(`value`, `concentration`);
    expect(actual[57]).to.have.property(`type`, `NumberSigned`);
    expect(actual[57]).to.have.property(`value`, `+17`);
    expect(actual[58]).to.have.property(`type`, `RParen`);
    expect(actual[58]).to.have.property(`value`, `)`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `Constant`);

    expect(actual[60]).to.have.property(`type`, `MDash`);
    expect(actual[60]).to.have.property(`value`, `—`);
    expect(actual[61]).to.have.property(`type`, `Word`);
    expect(actual[61]).to.have.property(`value`, `mage`);
    expect(actual[62]).to.have.property(`type`, `Word`);
    expect(actual[62]).to.have.property(`value`, `armor`);    
  });

  it(`can find Tactics line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `TACTICS
    Before Combat Lini casts goodberry at the start of each day.
    During Combat Lini attempts to stay out of melee, sending her
    animal companion to fight while she uses her magic to heal,
    summon allies, and control the environment.
    STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);
    
    expect(actual.length).to.equal(46);
    
    expect(actual[0]).to.have.property(`type`, `TacticsKey`);
    expect(actual[0]).to.have.property(`value`, `TACTICS`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Before`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `Combat`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `Lini`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `casts`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `goodberry`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `at`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `the`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `start`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `of`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `each`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `day`);
    expect(actual[12]).to.have.property(`type`, `Period`);
    expect(actual[12]).to.have.property(`value`, `.`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `During`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `Combat`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `Lini`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `attempts`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `to`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `stay`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `out`);

    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `of`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `melee`);
    expect(actual[22]).to.have.property(`type`, `Comma`);
    expect(actual[22]).to.have.property(`value`, `,`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `sending`);
    expect(actual[24]).to.have.property(`type`, `Word`);
    expect(actual[24]).to.have.property(`value`, `her`);

    expect(actual[25]).to.have.property(`type`, `CreatureType`);
    expect(actual[25]).to.have.property(`value`, `animal`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `companion`);
    expect(actual[27]).to.have.property(`type`, `Word`);
    expect(actual[27]).to.have.property(`value`, `to`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `fight`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `while`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `she`);
    expect(actual[31]).to.have.property(`type`, `Word`);
    expect(actual[31]).to.have.property(`value`, `uses`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `her`);
    expect(actual[33]).to.have.property(`type`, `Word`);
    expect(actual[33]).to.have.property(`value`, `magic`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `to`);

    expect(actual[35]).to.have.property(`type`, `Word`);
    expect(actual[35]).to.have.property(`value`, `heal`);
    expect(actual[36]).to.have.property(`type`, `Comma`);
    expect(actual[36]).to.have.property(`value`, `,`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `summon`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `allies`);
    expect(actual[39]).to.have.property(`type`, `Comma`);
    expect(actual[39]).to.have.property(`value`, `,`);

    expect(actual[40]).to.have.property(`type`, `Word`);
    expect(actual[40]).to.have.property(`value`, `and`);
    expect(actual[41]).to.have.property(`type`, `Word`);
    expect(actual[41]).to.have.property(`value`, `control`);
    expect(actual[42]).to.have.property(`type`, `Word`);
    expect(actual[42]).to.have.property(`value`, `the`);
    expect(actual[43]).to.have.property(`type`, `Word`);
    expect(actual[43]).to.have.property(`value`, `environment`);
    expect(actual[44]).to.have.property(`type`, `Period`);
    expect(actual[44]).to.have.property(`value`, `.`);

    expect(actual[45]).to.have.property(`type`, `StatisticsKey`);
    expect(actual[45]).to.have.property(`value`, `STATISTICS`);
  });
  
  it(`can find Tactics line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `TACTICS
    Before Combat If he’s able, Ptemenib casts shield of faith before combat.
    During Combat Ptemenib prefers a supporting role in combat, using his spells to heal and bolster his allies. If he has no other options, however, Ptemenib joins combat with his few offensive spells.
    Morale Ptemenib is good-hearted and dedicated, but not foolish. If a battle seems lost, he’s not above fleeing to heal himself, though he will return to rescue any comrades who are captured.
    STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);
    
    expect(actual.length).to.equal(93);
  
    expect(actual[0]).to.have.property(`type`, `TacticsKey`);
    expect(actual[0]).to.have.property(`value`, `TACTICS`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Before`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `Combat`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `If`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `he’s`);
  
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `able`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `Ptemenib`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `casts`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `shield`);
  
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `of`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `faith`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `before`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `combat`);
    expect(actual[14]).to.have.property(`type`, `Period`);
    expect(actual[14]).to.have.property(`value`, `.`);
  
    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `During`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `Combat`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `Ptemenib`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `prefers`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `a`);
  
    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `supporting`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `role`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `in`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `combat`);
    expect(actual[24]).to.have.property(`type`, `Comma`);
    expect(actual[24]).to.have.property(`value`, `,`);
  
    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `using`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `his`);
    expect(actual[27]).to.have.property(`type`, `Word`);
    expect(actual[27]).to.have.property(`value`, `spells`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `to`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `heal`);
  
    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `and`);
    expect(actual[31]).to.have.property(`type`, `Word`);
    expect(actual[31]).to.have.property(`value`, `bolster`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `his`);
    expect(actual[33]).to.have.property(`type`, `Word`);
    expect(actual[33]).to.have.property(`value`, `allies`);
    expect(actual[34]).to.have.property(`type`, `Period`);
    expect(actual[34]).to.have.property(`value`, `.`);
  
    expect(actual[35]).to.have.property(`type`, `Word`);
    expect(actual[35]).to.have.property(`value`, `If`);
    expect(actual[36]).to.have.property(`type`, `Word`);
    expect(actual[36]).to.have.property(`value`, `he`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `has`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `no`);
    expect(actual[39]).to.have.property(`type`, `Word`);
    expect(actual[39]).to.have.property(`value`, `other`);
  
    expect(actual[40]).to.have.property(`type`, `Word`);
    expect(actual[40]).to.have.property(`value`, `options`);
    expect(actual[41]).to.have.property(`type`, `Comma`);
    expect(actual[41]).to.have.property(`value`, `,`);
    expect(actual[42]).to.have.property(`type`, `Word`);
    expect(actual[42]).to.have.property(`value`, `however`);
    expect(actual[43]).to.have.property(`type`, `Comma`);
    expect(actual[43]).to.have.property(`value`, `,`);
    expect(actual[44]).to.have.property(`type`, `Word`);
    expect(actual[44]).to.have.property(`value`, `Ptemenib`);
  
    expect(actual[45]).to.have.property(`type`, `Word`);
    expect(actual[45]).to.have.property(`value`, `joins`);
    expect(actual[46]).to.have.property(`type`, `Word`);
    expect(actual[46]).to.have.property(`value`, `combat`);
    expect(actual[47]).to.have.property(`type`, `Word`);
    expect(actual[47]).to.have.property(`value`, `with`);
    expect(actual[48]).to.have.property(`type`, `Word`);
    expect(actual[48]).to.have.property(`value`, `his`);
    expect(actual[49]).to.have.property(`type`, `Word`);
    expect(actual[49]).to.have.property(`value`, `few`);
  
    expect(actual[50]).to.have.property(`type`, `Word`);
    expect(actual[50]).to.have.property(`value`, `offensive`);
    expect(actual[51]).to.have.property(`type`, `Word`);
    expect(actual[51]).to.have.property(`value`, `spells`);
    expect(actual[52]).to.have.property(`type`, `Period`);
    expect(actual[52]).to.have.property(`value`, `.`);
    expect(actual[53]).to.have.property(`type`, `Word`);
    expect(actual[53]).to.have.property(`value`, `Morale`);
    expect(actual[54]).to.have.property(`type`, `Word`);
    expect(actual[54]).to.have.property(`value`, `Ptemenib`);
  
    expect(actual[55]).to.have.property(`type`, `Word`);
    expect(actual[55]).to.have.property(`value`, `is`);
    expect(actual[56]).to.have.property(`type`, `Word`);
    expect(actual[56]).to.have.property(`value`, `good`);
    expect(actual[57]).to.have.property(`type`, `Dash`);
    expect(actual[57]).to.have.property(`value`, `-`);
    expect(actual[58]).to.have.property(`type`, `Word`);
    expect(actual[58]).to.have.property(`value`, `hearted`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `and`);
  
    expect(actual[60]).to.have.property(`type`, `Word`);
    expect(actual[60]).to.have.property(`value`, `dedicated`);
    expect(actual[61]).to.have.property(`type`, `Comma`);
    expect(actual[61]).to.have.property(`value`, `,`);
    expect(actual[62]).to.have.property(`type`, `Word`);
    expect(actual[62]).to.have.property(`value`, `but`);
    expect(actual[63]).to.have.property(`type`, `Word`);
    expect(actual[63]).to.have.property(`value`, `not`);
    expect(actual[64]).to.have.property(`type`, `Word`);
    expect(actual[64]).to.have.property(`value`, `foolish`);
  
    expect(actual[65]).to.have.property(`type`, `Period`);
    expect(actual[65]).to.have.property(`value`, `.`);
    expect(actual[66]).to.have.property(`type`, `Word`);
    expect(actual[66]).to.have.property(`value`, `If`);
    expect(actual[67]).to.have.property(`type`, `Word`);
    expect(actual[67]).to.have.property(`value`, `a`);
    expect(actual[68]).to.have.property(`type`, `Word`);
    expect(actual[68]).to.have.property(`value`, `battle`);
    expect(actual[69]).to.have.property(`type`, `Word`);
    expect(actual[69]).to.have.property(`value`, `seems`);
  
    expect(actual[70]).to.have.property(`type`, `Word`);
    expect(actual[70]).to.have.property(`value`, `lost`);
    expect(actual[71]).to.have.property(`type`, `Comma`);
    expect(actual[71]).to.have.property(`value`, `,`);
    expect(actual[72]).to.have.property(`type`, `Word`);
    expect(actual[72]).to.have.property(`value`, `he’s`);
    expect(actual[73]).to.have.property(`type`, `Word`);
    expect(actual[73]).to.have.property(`value`, `not`);
    expect(actual[74]).to.have.property(`type`, `Word`);
    expect(actual[74]).to.have.property(`value`, `above`);
  
    expect(actual[75]).to.have.property(`type`, `Word`);
    expect(actual[75]).to.have.property(`value`, `fleeing`);
    expect(actual[76]).to.have.property(`type`, `Word`);
    expect(actual[76]).to.have.property(`value`, `to`);
    expect(actual[77]).to.have.property(`type`, `Word`);
    expect(actual[77]).to.have.property(`value`, `heal`);
    expect(actual[78]).to.have.property(`type`, `Word`);
    expect(actual[78]).to.have.property(`value`, `himself`);
    expect(actual[79]).to.have.property(`type`, `Comma`);
    expect(actual[79]).to.have.property(`value`, `,`);
  
    expect(actual[80]).to.have.property(`type`, `Word`);
    expect(actual[80]).to.have.property(`value`, `though`);
    expect(actual[81]).to.have.property(`type`, `Word`);
    expect(actual[81]).to.have.property(`value`, `he`);
    expect(actual[82]).to.have.property(`type`, `Word`);
    expect(actual[82]).to.have.property(`value`, `will`);
    expect(actual[83]).to.have.property(`type`, `Word`);
    expect(actual[83]).to.have.property(`value`, `return`);
    expect(actual[84]).to.have.property(`type`, `Word`);
    expect(actual[84]).to.have.property(`value`, `to`);
  
    expect(actual[85]).to.have.property(`type`, `Word`);
    expect(actual[85]).to.have.property(`value`, `rescue`);
    expect(actual[86]).to.have.property(`type`, `Word`);
    expect(actual[86]).to.have.property(`value`, `any`);
    expect(actual[87]).to.have.property(`type`, `Word`);
    expect(actual[87]).to.have.property(`value`, `comrades`);
    expect(actual[88]).to.have.property(`type`, `Word`);
    expect(actual[88]).to.have.property(`value`, `who`);
    expect(actual[89]).to.have.property(`type`, `Word`);
    expect(actual[89]).to.have.property(`value`, `are`);
  
    expect(actual[90]).to.have.property(`type`, `Word`);
    expect(actual[90]).to.have.property(`value`, `captured`);
    expect(actual[91]).to.have.property(`type`, `Period`);
    expect(actual[91]).to.have.property(`value`, `.`);
    expect(actual[92]).to.have.property(`type`, `StatisticsKey`);
    expect(actual[92]).to.have.property(`value`, `STATISTICS`);
  });

  it(`can find Statistics key`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `StatisticsKey`);
  });

  it(`can find Ability scores line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Str 11, Dex 21, Con 14, Int 18, Wis 10, Cha 19`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(17);

    expect(actual[0]).to.have.property(`type`, `Ability`);
    expect(actual[0]).to.have.property(`value`, `Str`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `11`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);

    expect(actual[3]).to.have.property(`type`, `Ability`);
    expect(actual[3]).to.have.property(`value`, `Dex`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `21`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);

    expect(actual[6]).to.have.property(`type`, `Ability`);
    expect(actual[6]).to.have.property(`value`, `Con`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `14`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);

    expect(actual[9]).to.have.property(`type`, `Ability`);
    expect(actual[9]).to.have.property(`value`, `Int`);
    expect(actual[10]).to.have.property(`type`, `NumberWhole`);
    expect(actual[10]).to.have.property(`value`, `18`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);

    expect(actual[12]).to.have.property(`type`, `Ability`);
    expect(actual[12]).to.have.property(`value`, `Wis`);
    expect(actual[13]).to.have.property(`type`, `NumberWhole`);
    expect(actual[13]).to.have.property(`value`, `10`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Ability`);
    expect(actual[15]).to.have.property(`value`, `Cha`);
    expect(actual[16]).to.have.property(`type`, `NumberWhole`);
    expect(actual[16]).to.have.property(`value`, `19`);
  });

  it(`can find Ability scores line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Str 31, Dex 14, Con 28, Int 16, Wis 18, Cha 20`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(17);

    expect(actual[0]).to.have.property(`type`, `Ability`);
    expect(actual[0]).to.have.property(`value`, `Str`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `31`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);

    expect(actual[3]).to.have.property(`type`, `Ability`);
    expect(actual[3]).to.have.property(`value`, `Dex`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `14`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);

    expect(actual[6]).to.have.property(`type`, `Ability`);
    expect(actual[6]).to.have.property(`value`, `Con`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `28`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);

    expect(actual[9]).to.have.property(`type`, `Ability`);
    expect(actual[9]).to.have.property(`value`, `Int`);
    expect(actual[10]).to.have.property(`type`, `NumberWhole`);
    expect(actual[10]).to.have.property(`value`, `16`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);

    expect(actual[12]).to.have.property(`type`, `Ability`);
    expect(actual[12]).to.have.property(`value`, `Wis`);
    expect(actual[13]).to.have.property(`type`, `NumberWhole`);
    expect(actual[13]).to.have.property(`value`, `18`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Ability`);
    expect(actual[15]).to.have.property(`value`, `Cha`);
    expect(actual[16]).to.have.property(`type`, `NumberWhole`);
    expect(actual[16]).to.have.property(`value`, `20`);
  });

  it(`can find Ability scores line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Str 14, Dex 10, Con —, Int —, Wis 1, Cha 1`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(17);

    expect(actual[0]).to.have.property(`type`, `Ability`);
    expect(actual[0]).to.have.property(`value`, `Str`);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `14`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);

    expect(actual[3]).to.have.property(`type`, `Ability`);
    expect(actual[3]).to.have.property(`value`, `Dex`);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `10`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);

    expect(actual[6]).to.have.property(`type`, `Ability`);
    expect(actual[6]).to.have.property(`value`, `Con`);
    expect(actual[7]).to.have.property(`type`, `MDash`);
    expect(actual[7]).to.have.property(`value`, `\u{2014}`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);

    expect(actual[9]).to.have.property(`type`, `Ability`);
    expect(actual[9]).to.have.property(`value`, `Int`);
    expect(actual[10]).to.have.property(`type`, `MDash`);
    expect(actual[10]).to.have.property(`value`, `\u{2014}`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);

    expect(actual[12]).to.have.property(`type`, `Ability`);
    expect(actual[12]).to.have.property(`value`, `Wis`);
    expect(actual[13]).to.have.property(`type`, `NumberWhole`);
    expect(actual[13]).to.have.property(`value`, `1`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Ability`);
    expect(actual[15]).to.have.property(`value`, `Cha`);
    expect(actual[16]).to.have.property(`type`, `NumberWhole`);
    expect(actual[16]).to.have.property(`value`, `1`);
  });

  it(`can find Base Atk/CMB/CMD line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Base Atk +6; CMB +5; CMD 18`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);

    expect(actual[0]).to.have.property(`type`, `BaseAtkKey`);
    expect(actual[0]).to.have.property(`value`, `Base Atk`);
    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+6`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `CmbKey`);
    expect(actual[3]).to.have.property(`value`, `CMB`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+5`);

    expect(actual[5]).to.have.property(`type`, `SemiColon`);
    expect(actual[5]).to.have.property(`value`, `;`);
    expect(actual[6]).to.have.property(`type`, `CmdKey`);
    expect(actual[6]).to.have.property(`value`, `CMD`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `18`);
  });

  it(`can find Base Atk/CMB/CMD line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Base Atk +0; CMB –3; CMD 8`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);

    expect(actual[0]).to.have.property(`type`, `BaseAtkKey`);
    expect(actual[0]).to.have.property(`value`, `Base Atk`);
    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+0`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `CmbKey`);
    expect(actual[3]).to.have.property(`value`, `CMB`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `–3`);

    expect(actual[5]).to.have.property(`type`, `SemiColon`);
    expect(actual[5]).to.have.property(`value`, `;`);
    expect(actual[6]).to.have.property(`type`, `CmdKey`);
    expect(actual[6]).to.have.property(`value`, `CMD`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `8`);
  });

  it(`can find Base Atk/CMB/CMD line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Base Atk +14; CMB +24; CMD 35 (39 vs. trip)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(13);

    expect(actual[0]).to.have.property(`type`, `BaseAtkKey`);
    expect(actual[0]).to.have.property(`value`, `Base Atk`);
    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+14`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `CmbKey`);
    expect(actual[3]).to.have.property(`value`, `CMB`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+24`);

    expect(actual[5]).to.have.property(`type`, `SemiColon`);
    expect(actual[5]).to.have.property(`value`, `;`);
    expect(actual[6]).to.have.property(`type`, `CmdKey`);
    expect(actual[6]).to.have.property(`value`, `CMD`);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `35`);
    expect(actual[8]).to.have.property(`type`, `LParen`);
    expect(actual[8]).to.have.property(`value`, `(`);
    expect(actual[9]).to.have.property(`type`, `NumberWhole`);
    expect(actual[9]).to.have.property(`value`, `39`);

    expect(actual[10]).to.have.property(`type`, `Versus`);
    expect(actual[10]).to.have.property(`value`, `vs.`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `trip`);
    expect(actual[12]).to.have.property(`type`, `RParen`);
    expect(actual[12]).to.have.property(`value`, `)`);
  });

  it(`can find Base Atk/CMB/CMD line 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Base Atk +9; CMB +9 (+21 grapple); CMD 24 (32 vs.
grapple, can’t be tripped)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(21);

    expect(actual[0]).to.have.property(`type`, `BaseAtkKey`);
    expect(actual[0]).to.have.property(`value`, `Base Atk`);
    expect(actual[1]).to.have.property(`type`, `NumberSigned`);
    expect(actual[1]).to.have.property(`value`, `+9`);
    expect(actual[2]).to.have.property(`type`, `SemiColon`);
    expect(actual[2]).to.have.property(`value`, `;`);
    expect(actual[3]).to.have.property(`type`, `CmbKey`);
    expect(actual[3]).to.have.property(`value`, `CMB`);
    expect(actual[4]).to.have.property(`type`, `NumberSigned`);
    expect(actual[4]).to.have.property(`value`, `+9`);

    expect(actual[5]).to.have.property(`type`, `LParen`);
    expect(actual[5]).to.have.property(`value`, `(`);
    expect(actual[6]).to.have.property(`type`, `NumberSigned`);
    expect(actual[6]).to.have.property(`value`, `+21`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `grapple`);
    expect(actual[8]).to.have.property(`type`, `RParen`);
    expect(actual[8]).to.have.property(`value`, `)`);
    expect(actual[9]).to.have.property(`type`, `SemiColon`);
    expect(actual[9]).to.have.property(`value`, `;`);

    expect(actual[10]).to.have.property(`type`, `CmdKey`);
    expect(actual[10]).to.have.property(`value`, `CMD`);
    expect(actual[11]).to.have.property(`type`, `NumberWhole`);
    expect(actual[11]).to.have.property(`value`, `24`);
    expect(actual[12]).to.have.property(`type`, `LParen`);
    expect(actual[12]).to.have.property(`value`, `(`);
    expect(actual[13]).to.have.property(`type`, `NumberWhole`);
    expect(actual[13]).to.have.property(`value`, `32`);
    expect(actual[14]).to.have.property(`type`, `Versus`);
    expect(actual[14]).to.have.property(`value`, `vs.`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `grapple`);
    expect(actual[16]).to.have.property(`type`, `Comma`);
    expect(actual[16]).to.have.property(`value`, `,`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `can’t`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `be`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `tripped`);

    expect(actual[20]).to.have.property(`type`, `RParen`);
    expect(actual[20]).to.have.property(`value`, `)`);
  });

  it(`can find Feats line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Feats Self-Sufficient`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(4);
    expect(actual[0]).to.have.property(`type`, `FeatsKey`);
    expect(actual[0]).to.have.property(`value`, `Feats`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Self`);
    expect(actual[2]).to.have.property(`type`, `Dash`);
    expect(actual[2]).to.have.property(`value`, `-`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `Sufficient`);
  });

  it(`can find Feats line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Feats Combat Reflexes, Critical Focus, Flyby Attack,
    HoverB, Improved Initiative, Skill Focus (Perception),
    Weapon Finesse, Weapon Focus (tentacle), WingoverB`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(31);

    expect(actual[0]).to.have.property(`type`, `FeatsKey`);
    expect(actual[0]).to.have.property(`value`, `Feats`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Combat`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `Reflexes`);
    expect(actual[3]).to.have.property(`type`, `Comma`);
    expect(actual[3]).to.have.property(`value`, `,`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `Critical`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `Focus`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `Flyby`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `Attack`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `HoverB`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `Improved`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `Initiative`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `Skill`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `Focus`);
    expect(actual[17]).to.have.property(`type`, `LParen`);
    expect(actual[17]).to.have.property(`value`, `(`);
    expect(actual[18]).to.have.property(`type`, `PerceptionKey`);
    expect(actual[18]).to.have.property(`value`, `Perception`);
    expect(actual[19]).to.have.property(`type`, `RParen`);
    expect(actual[19]).to.have.property(`value`, `)`);

    expect(actual[20]).to.have.property(`type`, `Comma`);
    expect(actual[20]).to.have.property(`value`, `,`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `Weapon`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `Finesse`);
    expect(actual[23]).to.have.property(`type`, `Comma`);
    expect(actual[23]).to.have.property(`value`, `,`);
    expect(actual[24]).to.have.property(`type`, `Word`);
    expect(actual[24]).to.have.property(`value`, `Weapon`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `Focus`);
    expect(actual[26]).to.have.property(`type`, `LParen`);
    expect(actual[26]).to.have.property(`value`, `(`);
    expect(actual[27]).to.have.property(`type`, `Word`);
    expect(actual[27]).to.have.property(`value`, `tentacle`);
    expect(actual[28]).to.have.property(`type`, `RParen`);
    expect(actual[28]).to.have.property(`value`, `)`);
    expect(actual[29]).to.have.property(`type`, `Comma`);
    expect(actual[29]).to.have.property(`value`, `,`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `WingoverB`);
  });

  it(`can find Feats line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Feats Alertness, Improved Channel, Lightning Reflexes,
    Toughness, Turn Undead`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(13);

    expect(actual[0]).to.have.property(`type`, `FeatsKey`);
    expect(actual[0]).to.have.property(`value`, `Feats`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Alertness`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `Improved`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `Channel`);

    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `Lightning`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `Reflexes`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `Toughness`);

    expect(actual[10]).to.have.property(`type`, `Comma`);
    expect(actual[10]).to.have.property(`value`, `,`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `Turn`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `Undead`);
  });

  it(`can find Skills line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Feats Alertness, Improved Channel, Lightning Reflexes,
    Toughness, Turn Undead`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(13);

    expect(actual[0]).to.have.property(`type`, `FeatsKey`);
    expect(actual[0]).to.have.property(`value`, `Feats`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Alertness`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `Improved`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `Channel`);

    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `Lightning`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `Reflexes`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `Toughness`);

    expect(actual[10]).to.have.property(`type`, `Comma`);
    expect(actual[10]).to.have.property(`value`, `,`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `Turn`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `Undead`);
  });

  it(`can find Skills line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Skills Bluff +21, Diplomacy +21, Fly +16, Intimidate +21,
    Knowledge (arcana) +20, Knowledge (nature) +20,
    Perception +25, Sense Motive +25, Spellcraft +20`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(34);

    expect(actual[0]).to.have.property(`type`, `SkillsKey`);
    expect(actual[0]).to.have.property(`value`, `Skills`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Bluff`);
    expect(actual[2]).to.have.property(`type`, `NumberSigned`);
    expect(actual[2]).to.have.property(`value`, `+21`);
    expect(actual[3]).to.have.property(`type`, `Comma`);
    expect(actual[3]).to.have.property(`value`, `,`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `Diplomacy`);

    expect(actual[5]).to.have.property(`type`, `NumberSigned`);
    expect(actual[5]).to.have.property(`value`, `+21`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `Fly`);
    expect(actual[8]).to.have.property(`type`, `NumberSigned`);
    expect(actual[8]).to.have.property(`value`, `+16`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `Intimidate`);
    expect(actual[11]).to.have.property(`type`, `NumberSigned`);
    expect(actual[11]).to.have.property(`value`, `+21`);
    expect(actual[12]).to.have.property(`type`, `Comma`);
    expect(actual[12]).to.have.property(`value`, `,`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `Knowledge`);
    expect(actual[14]).to.have.property(`type`, `LParen`);
    expect(actual[14]).to.have.property(`value`, `(`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `arcana`);
    expect(actual[16]).to.have.property(`type`, `RParen`);
    expect(actual[16]).to.have.property(`value`, `)`);
    expect(actual[17]).to.have.property(`type`, `NumberSigned`);
    expect(actual[17]).to.have.property(`value`, `+20`);
    expect(actual[18]).to.have.property(`type`, `Comma`);
    expect(actual[18]).to.have.property(`value`, `,`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `Knowledge`);

    expect(actual[20]).to.have.property(`type`, `LParen`);
    expect(actual[20]).to.have.property(`value`, `(`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `nature`);
    expect(actual[22]).to.have.property(`type`, `RParen`);
    expect(actual[22]).to.have.property(`value`, `)`);
    expect(actual[23]).to.have.property(`type`, `NumberSigned`);
    expect(actual[23]).to.have.property(`value`, `+20`);
    expect(actual[24]).to.have.property(`type`, `Comma`);
    expect(actual[24]).to.have.property(`value`, `,`);

    expect(actual[25]).to.have.property(`type`, `PerceptionKey`);
    expect(actual[25]).to.have.property(`value`, `Perception`);
    expect(actual[26]).to.have.property(`type`, `NumberSigned`);
    expect(actual[26]).to.have.property(`value`, `+25`);
    expect(actual[27]).to.have.property(`type`, `Comma`);
    expect(actual[27]).to.have.property(`value`, `,`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `Sense`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `Motive`);

    expect(actual[30]).to.have.property(`type`, `NumberSigned`);
    expect(actual[30]).to.have.property(`value`, `+25`);
    expect(actual[31]).to.have.property(`type`, `Comma`);
    expect(actual[31]).to.have.property(`value`, `,`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `Spellcraft`);
    expect(actual[33]).to.have.property(`type`, `NumberSigned`);
    expect(actual[33]).to.have.property(`value`, `+20`);
  });

  it(`can find Skills line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Skills Acrobatics +21, Diplomacy +17, Fly +20,
    Knowledge (arcana) +14, Perception +28, Sense
    Motive +13, Spellcraft +15, Stealth +21, Use Magic
    Device +17; Racial Modifiers +6 Perception`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(37);

    expect(actual[0]).to.have.property(`type`, `SkillsKey`);
    expect(actual[0]).to.have.property(`value`, `Skills`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Acrobatics`);
    expect(actual[2]).to.have.property(`type`, `NumberSigned`);
    expect(actual[2]).to.have.property(`value`, `+21`);
    expect(actual[3]).to.have.property(`type`, `Comma`);
    expect(actual[3]).to.have.property(`value`, `,`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `Diplomacy`);

    expect(actual[5]).to.have.property(`type`, `NumberSigned`);
    expect(actual[5]).to.have.property(`value`, `+17`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `Fly`);
    expect(actual[8]).to.have.property(`type`, `NumberSigned`);
    expect(actual[8]).to.have.property(`value`, `+20`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `Knowledge`);
    expect(actual[11]).to.have.property(`type`, `LParen`);
    expect(actual[11]).to.have.property(`value`, `(`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `arcana`);
    expect(actual[13]).to.have.property(`type`, `RParen`);
    expect(actual[13]).to.have.property(`value`, `)`);
    expect(actual[14]).to.have.property(`type`, `NumberSigned`);
    expect(actual[14]).to.have.property(`value`, `+14`);

    expect(actual[15]).to.have.property(`type`, `Comma`);
    expect(actual[15]).to.have.property(`value`, `,`);
    expect(actual[16]).to.have.property(`type`, `PerceptionKey`);
    expect(actual[16]).to.have.property(`value`, `Perception`);
    expect(actual[17]).to.have.property(`type`, `NumberSigned`);
    expect(actual[17]).to.have.property(`value`, `+28`);
    expect(actual[18]).to.have.property(`type`, `Comma`);
    expect(actual[18]).to.have.property(`value`, `,`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `Sense`);

    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `Motive`);
    expect(actual[21]).to.have.property(`type`, `NumberSigned`);
    expect(actual[21]).to.have.property(`value`, `+13`);
    expect(actual[22]).to.have.property(`type`, `Comma`);
    expect(actual[22]).to.have.property(`value`, `,`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `Spellcraft`);
    expect(actual[24]).to.have.property(`type`, `NumberSigned`);
    expect(actual[24]).to.have.property(`value`, `+15`);

    expect(actual[25]).to.have.property(`type`, `Comma`);
    expect(actual[25]).to.have.property(`value`, `,`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `Stealth`);
    expect(actual[27]).to.have.property(`type`, `NumberSigned`);
    expect(actual[27]).to.have.property(`value`, `+21`);
    expect(actual[28]).to.have.property(`type`, `Comma`);
    expect(actual[28]).to.have.property(`value`, `,`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `Use`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `Magic`);
    expect(actual[31]).to.have.property(`type`, `Word`);
    expect(actual[31]).to.have.property(`value`, `Device`);
    expect(actual[32]).to.have.property(`type`, `NumberSigned`);
    expect(actual[32]).to.have.property(`value`, `+17`);
    expect(actual[33]).to.have.property(`type`, `SemiColon`);
    expect(actual[33]).to.have.property(`value`, `;`);
    expect(actual[34]).to.have.property(`type`, `RacialModifiersKey`);
    expect(actual[34]).to.have.property(`value`, `Racial Modifiers`);

    expect(actual[35]).to.have.property(`type`, `NumberSigned`);
    expect(actual[35]).to.have.property(`value`, `+6`);
    expect(actual[36]).to.have.property(`type`, `PerceptionKey`);
    expect(actual[36]).to.have.property(`value`, `Perception`);
  });

  it(`can find Skills line 4`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Skills Acrobatics +8, Perception +10, Stealth +8,
    Survival +7 (+10 in forests); Racial Modifiers
    +3 Survival in forests, +4 Stealth`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(26);

    expect(actual[0]).to.have.property(`type`, `SkillsKey`);
    expect(actual[0]).to.have.property(`value`, `Skills`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Acrobatics`);
    expect(actual[2]).to.have.property(`type`, `NumberSigned`);
    expect(actual[2]).to.have.property(`value`, `+8`);
    expect(actual[3]).to.have.property(`type`, `Comma`);
    expect(actual[3]).to.have.property(`value`, `,`);
    expect(actual[4]).to.have.property(`type`, `PerceptionKey`);
    expect(actual[4]).to.have.property(`value`, `Perception`);

    expect(actual[5]).to.have.property(`type`, `NumberSigned`);
    expect(actual[5]).to.have.property(`value`, `+10`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `Stealth`);
    expect(actual[8]).to.have.property(`type`, `NumberSigned`);
    expect(actual[8]).to.have.property(`value`, `+8`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `Survival`);
    expect(actual[11]).to.have.property(`type`, `NumberSigned`);
    expect(actual[11]).to.have.property(`value`, `+7`);
    expect(actual[12]).to.have.property(`type`, `LParen`);
    expect(actual[12]).to.have.property(`value`, `(`);
    expect(actual[13]).to.have.property(`type`, `NumberSigned`);
    expect(actual[13]).to.have.property(`value`, `+10`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `in`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `forests`);
    expect(actual[16]).to.have.property(`type`, `RParen`);
    expect(actual[16]).to.have.property(`value`, `)`);
    expect(actual[17]).to.have.property(`type`, `SemiColon`);
    expect(actual[17]).to.have.property(`value`, `;`);
    expect(actual[18]).to.have.property(`type`, `RacialModifiersKey`);
    expect(actual[18]).to.have.property(`value`, `Racial Modifiers`);
    expect(actual[19]).to.have.property(`type`, `NumberSigned`);
    expect(actual[19]).to.have.property(`value`, `+3`);

    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `Survival`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `in`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `forests`);
    expect(actual[23]).to.have.property(`type`, `Comma`);
    expect(actual[23]).to.have.property(`value`, `,`);
    expect(actual[24]).to.have.property(`type`, `NumberSigned`);
    expect(actual[24]).to.have.property(`value`, `+4`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `Stealth`);
  });

  it(`can find Languages line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Languages Ancient Osiriani, Celestial, Common, Osiriani`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(9);

    expect(actual[0]).to.have.property(`type`, `LanguagesKey`);
    expect(actual[0]).to.have.property(`value`, `Languages`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Ancient`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `Osiriani`);
    expect(actual[3]).to.have.property(`type`, `Comma`);
    expect(actual[3]).to.have.property(`value`, `,`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `Celestial`);

    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `Common`);
    expect(actual[7]).to.have.property(`type`, `Comma`);
    expect(actual[7]).to.have.property(`value`, `,`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `Osiriani`);
  });

  it(`can find Languages line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Languages Undercommon (cannot speak); telepathy 100 ft.`;

    const actual = TestHelper.runLexer(lexer, input);
  
    expect(actual.length).to.equal(9);

    expect(actual[0]).to.have.property(`type`, `LanguagesKey`);
    expect(actual[0]).to.have.property(`value`, `Languages`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Undercommon`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[2]).to.have.property(`value`, `(`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `cannot`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `speak`);

    expect(actual[5]).to.have.property(`type`, `RParen`);
    expect(actual[5]).to.have.property(`value`, `)`);
    expect(actual[6]).to.have.property(`type`, `SemiColon`);
    expect(actual[6]).to.have.property(`value`, `;`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `telepathy`);
    expect(actual[8]).to.have.property(`type`, `SizeValue`);
    expect(actual[8]).to.have.property(`value`, `100 ft.`);
  });

  it(`can find Languages line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Languages Aklo, Common, Draconic, Undercommon;
    telepathy 100 ft.`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(11);

    expect(actual[0]).to.have.property(`type`, `LanguagesKey`);
    expect(actual[0]).to.have.property(`value`, `Languages`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Aklo`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `Common`);
    expect(actual[4]).to.have.property(`type`, `Comma`);
    expect(actual[4]).to.have.property(`value`, `,`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `Draconic`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `Undercommon`);
    expect(actual[8]).to.have.property(`type`, `SemiColon`);
    expect(actual[8]).to.have.property(`value`, `;`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `telepathy`);

    expect(actual[10]).to.have.property(`type`, `SizeValue`);
    expect(actual[10]).to.have.property(`value`, `100 ft.`);
  });

  it(`can find SQ line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SQ amphibious`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(2);

    expect(actual[0]).to.have.property(`type`, `SqKey`);
    expect(actual[0]).to.have.property(`value`, `SQ`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `amphibious`);

  });

  it(`can find SQ line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SQ nature bond (animal companion, snow leopard named Droogami*),
    nature sense, wild empathy +3`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(20);

    expect(actual[0]).to.have.property(`type`, `SqKey`);
    expect(actual[0]).to.have.property(`value`, `SQ`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `nature`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `bond`);
    expect(actual[3]).to.have.property(`type`, `LParen`);
    expect(actual[3]).to.have.property(`value`, `(`);
    expect(actual[4]).to.have.property(`type`, `CreatureType`);
    expect(actual[4]).to.have.property(`value`, `animal`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `companion`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `snow`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `leopard`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `named`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `Droogami`);
    expect(actual[11]).to.have.property(`type`, `Asterisk`);
    expect(actual[11]).to.have.property(`value`, `*`);
    expect(actual[12]).to.have.property(`type`, `RParen`);
    expect(actual[12]).to.have.property(`value`, `)`);
    expect(actual[13]).to.have.property(`type`, `Comma`);
    expect(actual[13]).to.have.property(`value`, `,`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `nature`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `sense`);
    expect(actual[16]).to.have.property(`type`, `Comma`);
    expect(actual[16]).to.have.property(`value`, `,`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `wild`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `empathy`);
    expect(actual[19]).to.have.property(`type`, `NumberSigned`);
    expect(actual[19]).to.have.property(`value`, `+3`);
  });

  it(`can find SQ line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `SQ speak with dead (8/day)`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(9);

    expect(actual[0]).to.have.property(`type`, `SqKey`);
    expect(actual[0]).to.have.property(`value`, `SQ`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `speak`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `with`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `dead`);
    expect(actual[4]).to.have.property(`type`, `LParen`);
    expect(actual[4]).to.have.property(`value`, `(`);

    expect(actual[5]).to.have.property(`type`, `NumberWhole`);
    expect(actual[5]).to.have.property(`value`, `8`);
    expect(actual[6]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[6]).to.have.property(`value`, `/`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `day`);
    expect(actual[8]).to.have.property(`type`, `RParen`);
    expect(actual[8]).to.have.property(`value`, `)`);
  });

  it(`can find Gear lines 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Combat Gear goodberries (5), scroll of cure light wounds, acid;
    Other Gear leather armor, sickle, sling with 10 bullets, belt pouch,
    mistletoe, spell component pouch, stick collection, sunrods (2),
    trail rations (2), 8 gp`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(50);

    expect(actual[0]).to.have.property(`type`, `GearKey`);
    expect(actual[0]).to.have.property(`value`, `Combat Gear`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `goodberries`);
    expect(actual[2]).to.have.property(`type`, `LParen`);
    expect(actual[2]).to.have.property(`value`, `(`);
    expect(actual[3]).to.have.property(`type`, `NumberWhole`);
    expect(actual[3]).to.have.property(`value`, `5`);
    expect(actual[4]).to.have.property(`type`, `RParen`);
    expect(actual[4]).to.have.property(`value`, `)`);

    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `scroll`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `of`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `cure`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `light`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `wounds`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `acid`);
    expect(actual[13]).to.have.property(`type`, `SemiColon`);
    expect(actual[13]).to.have.property(`value`, `;`);
    expect(actual[14]).to.have.property(`type`, `GearKey`);
    expect(actual[14]).to.have.property(`value`, `Other Gear`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `leather`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `armor`);
    expect(actual[17]).to.have.property(`type`, `Comma`);
    expect(actual[17]).to.have.property(`value`, `,`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `sickle`);
    expect(actual[19]).to.have.property(`type`, `Comma`);
    expect(actual[19]).to.have.property(`value`, `,`);

    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `sling`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `with`);
    expect(actual[22]).to.have.property(`type`, `NumberWhole`);
    expect(actual[22]).to.have.property(`value`, `10`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `bullets`);
    expect(actual[24]).to.have.property(`type`, `Comma`);
    expect(actual[24]).to.have.property(`value`, `,`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `belt`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `pouch`);
    expect(actual[27]).to.have.property(`type`, `Comma`);
    expect(actual[27]).to.have.property(`value`, `,`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `mistletoe`);
    expect(actual[29]).to.have.property(`type`, `Comma`);
    expect(actual[29]).to.have.property(`value`, `,`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `spell`);
    expect(actual[31]).to.have.property(`type`, `Word`);
    expect(actual[31]).to.have.property(`value`, `component`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `pouch`);
    expect(actual[33]).to.have.property(`type`, `Comma`);
    expect(actual[33]).to.have.property(`value`, `,`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `stick`);

    expect(actual[35]).to.have.property(`type`, `Word`);
    expect(actual[35]).to.have.property(`value`, `collection`);
    expect(actual[36]).to.have.property(`type`, `Comma`);
    expect(actual[36]).to.have.property(`value`, `,`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `sunrods`);
    expect(actual[38]).to.have.property(`type`, `LParen`);
    expect(actual[38]).to.have.property(`value`, `(`);
    expect(actual[39]).to.have.property(`type`, `NumberWhole`);
    expect(actual[39]).to.have.property(`value`, `2`);

    expect(actual[40]).to.have.property(`type`, `RParen`);
    expect(actual[40]).to.have.property(`value`, `)`);
    expect(actual[41]).to.have.property(`type`, `Comma`);
    expect(actual[41]).to.have.property(`value`, `,`);
    expect(actual[42]).to.have.property(`type`, `Word`);
    expect(actual[42]).to.have.property(`value`, `trail`);
    expect(actual[43]).to.have.property(`type`, `Word`);
    expect(actual[43]).to.have.property(`value`, `rations`);
    expect(actual[44]).to.have.property(`type`, `LParen`);
    expect(actual[44]).to.have.property(`value`, `(`);

    expect(actual[45]).to.have.property(`type`, `NumberWhole`);
    expect(actual[45]).to.have.property(`value`, `2`);
    expect(actual[46]).to.have.property(`type`, `RParen`);
    expect(actual[46]).to.have.property(`value`, `)`);
    expect(actual[47]).to.have.property(`type`, `Comma`);
    expect(actual[47]).to.have.property(`value`, `,`);
    expect(actual[48]).to.have.property(`type`, `NumberWhole`);
    expect(actual[48]).to.have.property(`value`, `8`);
    expect(actual[49]).to.have.property(`type`, `Word`);
    expect(actual[49]).to.have.property(`value`, `gp`);
  });
  
  it(`can find Gear lines 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `Gear scale mail, longspear, light crossbow, 10 bolts`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(11);

    expect(actual[0]).to.have.property(`type`, `GearKey`);
    expect(actual[0]).to.have.property(`value`, `Gear`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `scale`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `mail`);
    expect(actual[3]).to.have.property(`type`, `Comma`);
    expect(actual[3]).to.have.property(`value`, `,`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `longspear`);

    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `light`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `crossbow`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);
    expect(actual[9]).to.have.property(`type`, `NumberWhole`);
    expect(actual[9]).to.have.property(`value`, `10`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `bolts`);
  });
  
  it(`can find Gear lines 3`, () => {
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

    expect(actual.length).to.equal(98);

    expect(actual[0]).to.have.property(`type`, `GearKey`);
    expect(actual[0]).to.have.property(`value`, `Combat Gear`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `potion`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `of`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `cure`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `moderate`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `wounds`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `scroll`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `of`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `resist`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `energy`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `scroll`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `of`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `sound`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `burst`);
    expect(actual[16]).to.have.property(`type`, `Comma`);
    expect(actual[16]).to.have.property(`value`, `,`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `wand`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `of`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `sanctuary`);

    expect(actual[20]).to.have.property(`type`, `LParen`);
    expect(actual[20]).to.have.property(`value`, `(`);
    expect(actual[21]).to.have.property(`type`, `NumberWhole`);
    expect(actual[21]).to.have.property(`value`, `29`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `charges`);
    expect(actual[23]).to.have.property(`type`, `RParen`);
    expect(actual[23]).to.have.property(`value`, `)`);
    expect(actual[24]).to.have.property(`type`, `Comma`);
    expect(actual[24]).to.have.property(`value`, `,`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `cold`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `iron`);
    expect(actual[27]).to.have.property(`type`, `Word`);
    expect(actual[27]).to.have.property(`value`, `bolts`);
    expect(actual[28]).to.have.property(`type`, `LParen`);
    expect(actual[28]).to.have.property(`value`, `(`);
    expect(actual[29]).to.have.property(`type`, `NumberWhole`);
    expect(actual[29]).to.have.property(`value`, `5`);

    expect(actual[30]).to.have.property(`type`, `RParen`);
    expect(actual[30]).to.have.property(`value`, `)`);
    expect(actual[31]).to.have.property(`type`, `Comma`);
    expect(actual[31]).to.have.property(`value`, `,`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `holy`);
    expect(actual[33]).to.have.property(`type`, `Word`);
    expect(actual[33]).to.have.property(`value`, `water`);
    expect(actual[34]).to.have.property(`type`, `LParen`);
    expect(actual[34]).to.have.property(`value`, `(`);

    expect(actual[35]).to.have.property(`type`, `NumberWhole`);
    expect(actual[35]).to.have.property(`value`, `2`);
    expect(actual[36]).to.have.property(`type`, `RParen`);
    expect(actual[36]).to.have.property(`value`, `)`);
    expect(actual[37]).to.have.property(`type`, `Comma`);
    expect(actual[37]).to.have.property(`value`, `,`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `silver`);
    expect(actual[39]).to.have.property(`type`, `Word`);
    expect(actual[39]).to.have.property(`value`, `bolts`);

    expect(actual[40]).to.have.property(`type`, `LParen`);
    expect(actual[40]).to.have.property(`value`, `(`);
    expect(actual[41]).to.have.property(`type`, `NumberWhole`);
    expect(actual[41]).to.have.property(`value`, `5`);
    expect(actual[42]).to.have.property(`type`, `RParen`);
    expect(actual[42]).to.have.property(`value`, `)`);
    expect(actual[43]).to.have.property(`type`, `SemiColon`);
    expect(actual[43]).to.have.property(`value`, `;`);
    expect(actual[44]).to.have.property(`type`, `GearKey`);
    expect(actual[44]).to.have.property(`value`, `Other Gear`);

    expect(actual[45]).to.have.property(`type`, `NumberSigned`);
    expect(actual[45]).to.have.property(`value`, `+1`);
    expect(actual[46]).to.have.property(`type`, `Word`);
    expect(actual[46]).to.have.property(`value`, `leather`);
    expect(actual[47]).to.have.property(`type`, `Word`);
    expect(actual[47]).to.have.property(`value`, `armor`);
    expect(actual[48]).to.have.property(`type`, `Comma`);
    expect(actual[48]).to.have.property(`value`, `,`);
    expect(actual[49]).to.have.property(`type`, `Word`);
    expect(actual[49]).to.have.property(`value`, `light`);

    expect(actual[50]).to.have.property(`type`, `Word`);
    expect(actual[50]).to.have.property(`value`, `crossbow`);
    expect(actual[51]).to.have.property(`type`, `Word`);
    expect(actual[51]).to.have.property(`value`, `with`);
    expect(actual[52]).to.have.property(`type`, `NumberWhole`);
    expect(actual[52]).to.have.property(`value`, `10`);
    expect(actual[53]).to.have.property(`type`, `Word`);
    expect(actual[53]).to.have.property(`value`, `bolts`);
    expect(actual[54]).to.have.property(`type`, `Comma`);
    expect(actual[54]).to.have.property(`value`, `,`);

    expect(actual[55]).to.have.property(`type`, `Word`);
    expect(actual[55]).to.have.property(`value`, `mwk`);
    expect(actual[56]).to.have.property(`type`, `Word`);
    expect(actual[56]).to.have.property(`value`, `silver`);
    expect(actual[57]).to.have.property(`type`, `Word`);
    expect(actual[57]).to.have.property(`value`, `dagger`);
    expect(actual[58]).to.have.property(`type`, `Comma`);
    expect(actual[58]).to.have.property(`value`, `,`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `cloak`);

    expect(actual[60]).to.have.property(`type`, `Word`);
    expect(actual[60]).to.have.property(`value`, `of`);
    expect(actual[61]).to.have.property(`type`, `Word`);
    expect(actual[61]).to.have.property(`value`, `elvenkind`);
    expect(actual[62]).to.have.property(`type`, `Comma`);
    expect(actual[62]).to.have.property(`value`, `,`);
    expect(actual[63]).to.have.property(`type`, `Word`);
    expect(actual[63]).to.have.property(`value`, `eyes`);
    expect(actual[64]).to.have.property(`type`, `Word`);
    expect(actual[64]).to.have.property(`value`, `of`);

    expect(actual[65]).to.have.property(`type`, `Word`);
    expect(actual[65]).to.have.property(`value`, `the`);
    expect(actual[66]).to.have.property(`type`, `Word`);
    expect(actual[66]).to.have.property(`value`, `eagle`);
    expect(actual[67]).to.have.property(`type`, `Comma`);
    expect(actual[67]).to.have.property(`value`, `,`);
    expect(actual[68]).to.have.property(`type`, `Word`);
    expect(actual[68]).to.have.property(`value`, `cleric’s`);
    expect(actual[69]).to.have.property(`type`, `Word`);
    expect(actual[69]).to.have.property(`value`, `vestments`);

    expect(actual[70]).to.have.property(`type`, `Comma`);
    expect(actual[70]).to.have.property(`value`, `,`);
    expect(actual[71]).to.have.property(`type`, `Word`);
    expect(actual[71]).to.have.property(`value`, `mwk`);
    expect(actual[72]).to.have.property(`type`, `Word`);
    expect(actual[72]).to.have.property(`value`, `thieves’`);
    expect(actual[73]).to.have.property(`type`, `Word`);
    expect(actual[73]).to.have.property(`value`, `tools`);
    expect(actual[74]).to.have.property(`type`, `Comma`);
    expect(actual[74]).to.have.property(`value`, `,`);

    expect(actual[75]).to.have.property(`type`, `Word`);
    expect(actual[75]).to.have.property(`value`, `silver`);
    expect(actual[76]).to.have.property(`type`, `Word`);
    expect(actual[76]).to.have.property(`value`, `holy`);
    expect(actual[77]).to.have.property(`type`, `Word`);
    expect(actual[77]).to.have.property(`value`, `symbol`);
    expect(actual[78]).to.have.property(`type`, `Word`);
    expect(actual[78]).to.have.property(`value`, `of`);
    expect(actual[79]).to.have.property(`type`, `Word`);
    expect(actual[79]).to.have.property(`value`, `Pharasma`);

    expect(actual[80]).to.have.property(`type`, `Comma`);
    expect(actual[80]).to.have.property(`value`, `,`);
    expect(actual[81]).to.have.property(`type`, `Word`);
    expect(actual[81]).to.have.property(`value`, `spell`);
    expect(actual[82]).to.have.property(`type`, `Word`);
    expect(actual[82]).to.have.property(`value`, `component`);
    expect(actual[83]).to.have.property(`type`, `Word`);
    expect(actual[83]).to.have.property(`value`, `pouch`);
    expect(actual[84]).to.have.property(`type`, `Comma`);
    expect(actual[84]).to.have.property(`value`, `,`);

    expect(actual[85]).to.have.property(`type`, `Word`);
    expect(actual[85]).to.have.property(`value`, `incense`);
    expect(actual[86]).to.have.property(`type`, `Word`);
    expect(actual[86]).to.have.property(`value`, `and`);
    expect(actual[87]).to.have.property(`type`, `Word`);
    expect(actual[87]).to.have.property(`value`, `offerings`);
    expect(actual[88]).to.have.property(`type`, `Word`);
    expect(actual[88]).to.have.property(`value`, `for`);
    expect(actual[89]).to.have.property(`type`, `Word`);
    expect(actual[89]).to.have.property(`value`, `divination`);

    expect(actual[90]).to.have.property(`type`, `LParen`);
    expect(actual[90]).to.have.property(`value`, `(`);
    expect(actual[91]).to.have.property(`type`, `Word`);
    expect(actual[91]).to.have.property(`value`, `worth`);
    expect(actual[92]).to.have.property(`type`, `NumberWhole`);
    expect(actual[92]).to.have.property(`value`, `50`);
    expect(actual[93]).to.have.property(`type`, `Word`);
    expect(actual[93]).to.have.property(`value`, `gp`);
    expect(actual[94]).to.have.property(`type`, `RParen`);
    expect(actual[94]).to.have.property(`value`, `)`);

    expect(actual[95]).to.have.property(`type`, `Comma`);
    expect(actual[95]).to.have.property(`value`, `,`);
    expect(actual[96]).to.have.property(`type`, `NumberWhole`);
    expect(actual[96]).to.have.property(`value`, `13`);
    expect(actual[97]).to.have.property(`type`, `Word`);
    expect(actual[97]).to.have.property(`value`, `gp`);
  });

  it(`can find ECOLOGY/Environment/Organization/Treasure lines 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `ECOLOGY
    Environment any land
    Organization solitary, pair, pod (3–5), or invasion (6–36)
    Treasure standard`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(23);
    
    expect(actual[0]).to.have.property(`type`, `EcologyKey`);
    expect(actual[0]).to.have.property(`value`, `ECOLOGY`);
    expect(actual[1]).to.have.property(`type`, `EcologyType`);
    expect(actual[1]).to.have.property(`value`, `Environment`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `any`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `land`);
    expect(actual[4]).to.have.property(`type`, `EcologyType`);
    expect(actual[4]).to.have.property(`value`, `Organization`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `solitary`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `pair`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `pod`);

    expect(actual[10]).to.have.property(`type`, `LParen`);
    expect(actual[10]).to.have.property(`value`, `(`);
    expect(actual[11]).to.have.property(`type`, `NumberWhole`);
    expect(actual[11]).to.have.property(`value`, `3`);
    expect(actual[12]).to.have.property(`type`, `NumberSigned`);
    expect(actual[12]).to.have.property(`value`, `–5`);
    expect(actual[13]).to.have.property(`type`, `RParen`);
    expect(actual[13]).to.have.property(`value`, `)`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `or`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `invasion`);
    expect(actual[17]).to.have.property(`type`, `LParen`);
    expect(actual[17]).to.have.property(`value`, `(`);
    expect(actual[18]).to.have.property(`type`, `NumberWhole`);
    expect(actual[18]).to.have.property(`value`, `6`);
    expect(actual[19]).to.have.property(`type`, `NumberSigned`);
    expect(actual[19]).to.have.property(`value`, `–36`);

    expect(actual[20]).to.have.property(`type`, `RParen`);
    expect(actual[20]).to.have.property(`value`, `)`);
    expect(actual[21]).to.have.property(`type`, `EcologyType`);
    expect(actual[21]).to.have.property(`value`, `Treasure`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `standard`);
  });

  it(`can find ECOLOGY/Environment/Organization/Treasure lines 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `ECOLOGY
    Environment any
    Organization solitary
    Treasure none`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(7);

    expect(actual[0]).to.have.property(`type`, `EcologyKey`);
    expect(actual[0]).to.have.property(`value`, `ECOLOGY`);
    expect(actual[1]).to.have.property(`type`, `EcologyType`);
    expect(actual[1]).to.have.property(`value`, `Environment`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `any`);
    expect(actual[3]).to.have.property(`type`, `EcologyType`);
    expect(actual[3]).to.have.property(`value`, `Organization`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `solitary`);

    expect(actual[5]).to.have.property(`type`, `EcologyType`);
    expect(actual[5]).to.have.property(`value`, `Treasure`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `none`);
  });

  it(`can find ECOLOGY/Environment/Organization/Treasure lines 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getStatBlockLexer();

    const input = `ECOLOGY
    Environment temperate forests
    Organization solitary, mated pair,
    or blessing (3–6)
    Treasure none`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(18);

    expect(actual[0]).to.have.property(`type`, `EcologyKey`);
    expect(actual[0]).to.have.property(`value`, `ECOLOGY`);
    expect(actual[1]).to.have.property(`type`, `EcologyType`);
    expect(actual[1]).to.have.property(`value`, `Environment`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `temperate`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `forests`);
    expect(actual[4]).to.have.property(`type`, `EcologyType`);
    expect(actual[4]).to.have.property(`value`, `Organization`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `solitary`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `mated`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `pair`);
    expect(actual[9]).to.have.property(`type`, `Comma`);
    expect(actual[9]).to.have.property(`value`, `,`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `or`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `blessing`);
    expect(actual[12]).to.have.property(`type`, `LParen`);
    expect(actual[12]).to.have.property(`value`, `(`);
    expect(actual[13]).to.have.property(`type`, `NumberWhole`);
    expect(actual[13]).to.have.property(`value`, `3`);
    expect(actual[14]).to.have.property(`type`, `NumberSigned`);
    expect(actual[14]).to.have.property(`value`, `–6`);

    expect(actual[15]).to.have.property(`type`, `RParen`);
    expect(actual[15]).to.have.property(`value`, `)`);
    expect(actual[16]).to.have.property(`type`, `EcologyType`);
    expect(actual[16]).to.have.property(`value`, `Treasure`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `none`);
  });

  it(`can find Special Abilities/Vulerable lines 1`, () => {
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

    expect(actual.length).to.equal(193);

    expect(actual[0]).to.have.property(`type`, `SpecialAbilitiesKey`);
    expect(actual[0]).to.have.property(`value`, `SPECIAL ABILITIES`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Mucus`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `Cloud`);
    expect(actual[3]).to.have.property(`type`, `SpecialAbilitiesType`);
    expect(actual[3]).to.have.property(`value`, `(Ex)`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `While`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `underwater`);
    expect(actual[6]).to.have.property(`type`, `Comma`);
    expect(actual[6]).to.have.property(`value`, `,`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `an`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `aboleth`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `exudes`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `a`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `cloud`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `of`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `transparent`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `slime`);

    expect(actual[15]).to.have.property(`type`, `Period`);
    expect(actual[15]).to.have.property(`value`, `.`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `All`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `creatures`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `adjacent`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `to`);

    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `an`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `aboleth`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `must`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `succeed`);
    expect(actual[24]).to.have.property(`type`, `Word`);
    expect(actual[24]).to.have.property(`value`, `on`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `a`);
    expect(actual[26]).to.have.property(`type`, `DcKey`);
    expect(actual[26]).to.have.property(`value`, `DC`);
    expect(actual[27]).to.have.property(`type`, `NumberWhole`);
    expect(actual[27]).to.have.property(`value`, `20`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `Fortitude`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `save`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `each`);
    expect(actual[31]).to.have.property(`type`, `Word`);
    expect(actual[31]).to.have.property(`value`, `round`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `or`);
    expect(actual[33]).to.have.property(`type`, `Word`);
    expect(actual[33]).to.have.property(`value`, `lose`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `the`);

    expect(actual[35]).to.have.property(`type`, `Word`);
    expect(actual[35]).to.have.property(`value`, `ability`);
    expect(actual[36]).to.have.property(`type`, `Word`);
    expect(actual[36]).to.have.property(`value`, `to`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `breathe`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `air`);
    expect(actual[39]).to.have.property(`type`, `LParen`);
    expect(actual[39]).to.have.property(`value`, `(`);

    expect(actual[40]).to.have.property(`type`, `Word`);
    expect(actual[40]).to.have.property(`value`, `but`);
    expect(actual[41]).to.have.property(`type`, `Word`);
    expect(actual[41]).to.have.property(`value`, `gain`);
    expect(actual[42]).to.have.property(`type`, `Word`);
    expect(actual[42]).to.have.property(`value`, `the`);
    expect(actual[43]).to.have.property(`type`, `Word`);
    expect(actual[43]).to.have.property(`value`, `ability`);
    expect(actual[44]).to.have.property(`type`, `Word`);
    expect(actual[44]).to.have.property(`value`, `to`);

    expect(actual[45]).to.have.property(`type`, `Word`);
    expect(actual[45]).to.have.property(`value`, `breathe`);
    expect(actual[46]).to.have.property(`type`, `Word`);
    expect(actual[46]).to.have.property(`value`, `water`);
    expect(actual[47]).to.have.property(`type`, `RParen`);
    expect(actual[47]).to.have.property(`value`, `)`);
    expect(actual[48]).to.have.property(`type`, `Word`);
    expect(actual[48]).to.have.property(`value`, `for`);
    expect(actual[49]).to.have.property(`type`, `NumberWhole`);
    expect(actual[49]).to.have.property(`value`, `3`);

    expect(actual[50]).to.have.property(`type`, `Word`);
    expect(actual[50]).to.have.property(`value`, `hours`);
    expect(actual[51]).to.have.property(`type`, `Period`);
    expect(actual[51]).to.have.property(`value`, `.`);
    expect(actual[52]).to.have.property(`type`, `Word`);
    expect(actual[52]).to.have.property(`value`, `Renewed`);
    expect(actual[53]).to.have.property(`type`, `Word`);
    expect(actual[53]).to.have.property(`value`, `contact`);
    expect(actual[54]).to.have.property(`type`, `Word`);
    expect(actual[54]).to.have.property(`value`, `with`);

    expect(actual[55]).to.have.property(`type`, `Word`);
    expect(actual[55]).to.have.property(`value`, `an`);
    expect(actual[56]).to.have.property(`type`, `Word`);
    expect(actual[56]).to.have.property(`value`, `aboleth’s`);
    expect(actual[57]).to.have.property(`type`, `Word`);
    expect(actual[57]).to.have.property(`value`, `mucus`);
    expect(actual[58]).to.have.property(`type`, `Word`);
    expect(actual[58]).to.have.property(`value`, `cloud`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `and`);

    expect(actual[60]).to.have.property(`type`, `Word`);
    expect(actual[60]).to.have.property(`value`, `failing`);
    expect(actual[61]).to.have.property(`type`, `Word`);
    expect(actual[61]).to.have.property(`value`, `another`);
    expect(actual[62]).to.have.property(`type`, `Word`);
    expect(actual[62]).to.have.property(`value`, `save`);
    expect(actual[63]).to.have.property(`type`, `Word`);
    expect(actual[63]).to.have.property(`value`, `extends`);
    expect(actual[64]).to.have.property(`type`, `Word`);
    expect(actual[64]).to.have.property(`value`, `the`);

    expect(actual[65]).to.have.property(`type`, `Word`);
    expect(actual[65]).to.have.property(`value`, `effect`);
    expect(actual[66]).to.have.property(`type`, `Word`);
    expect(actual[66]).to.have.property(`value`, `for`);
    expect(actual[67]).to.have.property(`type`, `Word`);
    expect(actual[67]).to.have.property(`value`, `another`);
    expect(actual[68]).to.have.property(`type`, `NumberWhole`);
    expect(actual[68]).to.have.property(`value`, `3`);
    expect(actual[69]).to.have.property(`type`, `Word`);
    expect(actual[69]).to.have.property(`value`, `hours`);

    expect(actual[70]).to.have.property(`type`, `Period`);
    expect(actual[70]).to.have.property(`value`, `.`);
    expect(actual[71]).to.have.property(`type`, `Word`);
    expect(actual[71]).to.have.property(`value`, `The`);
    expect(actual[72]).to.have.property(`type`, `Word`);
    expect(actual[72]).to.have.property(`value`, `save`);
    expect(actual[73]).to.have.property(`type`, `DcKey`);
    expect(actual[73]).to.have.property(`value`, `DC`);
    expect(actual[74]).to.have.property(`type`, `Word`);
    expect(actual[74]).to.have.property(`value`, `is`);

    expect(actual[75]).to.have.property(`type`, `Word`);
    expect(actual[75]).to.have.property(`value`, `Constitution`);
    expect(actual[76]).to.have.property(`type`, `Dash`);
    expect(actual[76]).to.have.property(`value`, `-`);
    expect(actual[77]).to.have.property(`type`, `Word`);
    expect(actual[77]).to.have.property(`value`, `based`);
    expect(actual[78]).to.have.property(`type`, `Period`);
    expect(actual[78]).to.have.property(`value`, `.`);
    expect(actual[79]).to.have.property(`type`, `Word`);
    expect(actual[79]).to.have.property(`value`, `Slime`);

    expect(actual[80]).to.have.property(`type`, `SpecialAbilitiesType`);
    expect(actual[80]).to.have.property(`value`, `(Ex)`);
    expect(actual[81]).to.have.property(`type`, `Word`);
    expect(actual[81]).to.have.property(`value`, `A`);
    expect(actual[82]).to.have.property(`type`, `Word`);
    expect(actual[82]).to.have.property(`value`, `creature`);
    expect(actual[83]).to.have.property(`type`, `Word`);
    expect(actual[83]).to.have.property(`value`, `hit`);
    expect(actual[84]).to.have.property(`type`, `Word`);
    expect(actual[84]).to.have.property(`value`, `by`);

    expect(actual[85]).to.have.property(`type`, `Word`);
    expect(actual[85]).to.have.property(`value`, `an`);
    expect(actual[86]).to.have.property(`type`, `Word`);
    expect(actual[86]).to.have.property(`value`, `aboleth’s`);
    expect(actual[87]).to.have.property(`type`, `Word`);
    expect(actual[87]).to.have.property(`value`, `tentacle`);
    expect(actual[88]).to.have.property(`type`, `Word`);
    expect(actual[88]).to.have.property(`value`, `must`);
    expect(actual[89]).to.have.property(`type`, `Word`);
    expect(actual[89]).to.have.property(`value`, `succeed`);

    expect(actual[90]).to.have.property(`type`, `Word`);
    expect(actual[90]).to.have.property(`value`, `on`);
    expect(actual[91]).to.have.property(`type`, `Word`);
    expect(actual[91]).to.have.property(`value`, `a`);
    expect(actual[92]).to.have.property(`type`, `DcKey`);
    expect(actual[92]).to.have.property(`value`, `DC`);
    expect(actual[93]).to.have.property(`type`, `NumberWhole`);
    expect(actual[93]).to.have.property(`value`, `20`);
    expect(actual[94]).to.have.property(`type`, `Word`);
    expect(actual[94]).to.have.property(`value`, `Fortitude`);

    expect(actual[95]).to.have.property(`type`, `Word`);
    expect(actual[95]).to.have.property(`value`, `save`);
    expect(actual[96]).to.have.property(`type`, `Word`);
    expect(actual[96]).to.have.property(`value`, `or`);
    expect(actual[97]).to.have.property(`type`, `Word`);
    expect(actual[97]).to.have.property(`value`, `his`);
    expect(actual[98]).to.have.property(`type`, `Word`);
    expect(actual[98]).to.have.property(`value`, `skin`);
    expect(actual[99]).to.have.property(`type`, `Word`);
    expect(actual[99]).to.have.property(`value`, `and`);

    expect(actual[100]).to.have.property(`type`, `Word`);
    expect(actual[100]).to.have.property(`value`, `flesh`);
    expect(actual[101]).to.have.property(`type`, `Word`);
    expect(actual[101]).to.have.property(`value`, `transform`);
    expect(actual[102]).to.have.property(`type`, `Word`);
    expect(actual[102]).to.have.property(`value`, `into`);
    expect(actual[103]).to.have.property(`type`, `Word`);
    expect(actual[103]).to.have.property(`value`, `a`);
    expect(actual[104]).to.have.property(`type`, `Word`);
    expect(actual[104]).to.have.property(`value`, `clear`);

    expect(actual[105]).to.have.property(`type`, `Comma`);
    expect(actual[105]).to.have.property(`value`, `,`);
    expect(actual[106]).to.have.property(`type`, `Word`);
    expect(actual[106]).to.have.property(`value`, `slimy`);
    expect(actual[107]).to.have.property(`type`, `Word`);
    expect(actual[107]).to.have.property(`value`, `membrane`);
    expect(actual[108]).to.have.property(`type`, `Word`);
    expect(actual[108]).to.have.property(`value`, `over`);
    expect(actual[109]).to.have.property(`type`, `Word`);
    expect(actual[109]).to.have.property(`value`, `the`);

    expect(actual[110]).to.have.property(`type`, `Word`);
    expect(actual[110]).to.have.property(`value`, `course`);
    expect(actual[111]).to.have.property(`type`, `Word`);
    expect(actual[111]).to.have.property(`value`, `of`);
    expect(actual[112]).to.have.property(`type`, `DiceRoll`);
    expect(actual[112]).to.have.property(`value`, `1d4`);
    expect(actual[113]).to.have.property(`type`, `Word`);
    expect(actual[113]).to.have.property(`value`, `rounds`);
    expect(actual[114]).to.have.property(`type`, `Period`);
    expect(actual[114]).to.have.property(`value`, `.`);

    expect(actual[115]).to.have.property(`type`, `Word`);
    expect(actual[115]).to.have.property(`value`, `The`);
    expect(actual[116]).to.have.property(`type`, `Word`);
    expect(actual[116]).to.have.property(`value`, `creature’s`);
    expect(actual[117]).to.have.property(`type`, `Word`);
    expect(actual[117]).to.have.property(`value`, `new`);
    expect(actual[118]).to.have.property(`type`, `DoubleQuoteOpen`);
    expect(actual[118]).to.have.property(`value`, `“`);
    expect(actual[119]).to.have.property(`type`, `Word`);
    expect(actual[119]).to.have.property(`value`, `flesh`);

    expect(actual[120]).to.have.property(`type`, `DoubleQuoteClose`);
    expect(actual[120]).to.have.property(`value`, `”`);
    expect(actual[121]).to.have.property(`type`, `Word`);
    expect(actual[121]).to.have.property(`value`, `is`);
    expect(actual[122]).to.have.property(`type`, `Word`);
    expect(actual[122]).to.have.property(`value`, `soft`);
    expect(actual[123]).to.have.property(`type`, `Word`);
    expect(actual[123]).to.have.property(`value`, `and`);
    expect(actual[124]).to.have.property(`type`, `Word`);
    expect(actual[124]).to.have.property(`value`, `tender`);

    expect(actual[125]).to.have.property(`type`, `Comma`);
    expect(actual[125]).to.have.property(`value`, `,`);
    expect(actual[126]).to.have.property(`type`, `Word`);
    expect(actual[126]).to.have.property(`value`, `reducing`);
    expect(actual[127]).to.have.property(`type`, `Word`);
    expect(actual[127]).to.have.property(`value`, `its`);
    expect(actual[128]).to.have.property(`type`, `Word`);
    expect(actual[128]).to.have.property(`value`, `Constitution`);
    expect(actual[129]).to.have.property(`type`, `Word`);
    expect(actual[129]).to.have.property(`value`, `score`);

    expect(actual[130]).to.have.property(`type`, `Word`);
    expect(actual[130]).to.have.property(`value`, `by`);
    expect(actual[131]).to.have.property(`type`, `NumberWhole`);
    expect(actual[131]).to.have.property(`value`, `4`);
    expect(actual[132]).to.have.property(`type`, `Word`);
    expect(actual[132]).to.have.property(`value`, `as`);
    expect(actual[133]).to.have.property(`type`, `Word`);
    expect(actual[133]).to.have.property(`value`, `long`);
    expect(actual[134]).to.have.property(`type`, `Word`);
    expect(actual[134]).to.have.property(`value`, `as`);

    expect(actual[135]).to.have.property(`type`, `Word`);
    expect(actual[135]).to.have.property(`value`, `it`);
    expect(actual[136]).to.have.property(`type`, `Word`);
    expect(actual[136]).to.have.property(`value`, `persists`);
    expect(actual[137]).to.have.property(`type`, `Period`);
    expect(actual[137]).to.have.property(`value`, `.`);
    expect(actual[138]).to.have.property(`type`, `Word`);
    expect(actual[138]).to.have.property(`value`, `If`);
    expect(actual[139]).to.have.property(`type`, `Word`);
    expect(actual[139]).to.have.property(`value`, `the`);

    expect(actual[140]).to.have.property(`type`, `Word`);
    expect(actual[140]).to.have.property(`value`, `creature’s`);
    expect(actual[141]).to.have.property(`type`, `Word`);
    expect(actual[141]).to.have.property(`value`, `flesh`);
    expect(actual[142]).to.have.property(`type`, `Word`);
    expect(actual[142]).to.have.property(`value`, `isn’t`);
    expect(actual[143]).to.have.property(`type`, `Word`);
    expect(actual[143]).to.have.property(`value`, `kept`);
    expect(actual[144]).to.have.property(`type`, `Word`);
    expect(actual[144]).to.have.property(`value`, `moist`);

    expect(actual[145]).to.have.property(`type`, `Comma`);
    expect(actual[145]).to.have.property(`value`, `,`);
    expect(actual[146]).to.have.property(`type`, `Word`);
    expect(actual[146]).to.have.property(`value`, `it`);
    expect(actual[147]).to.have.property(`type`, `Word`);
    expect(actual[147]).to.have.property(`value`, `dries`);
    expect(actual[148]).to.have.property(`type`, `Word`);
    expect(actual[148]).to.have.property(`value`, `quickly`);
    expect(actual[149]).to.have.property(`type`, `Word`);
    expect(actual[149]).to.have.property(`value`, `and`);

    expect(actual[150]).to.have.property(`type`, `Word`);
    expect(actual[150]).to.have.property(`value`, `the`);
    expect(actual[151]).to.have.property(`type`, `Word`);
    expect(actual[151]).to.have.property(`value`, `victim`);
    expect(actual[152]).to.have.property(`type`, `Word`);
    expect(actual[152]).to.have.property(`value`, `takes`);
    expect(actual[153]).to.have.property(`type`, `DiceRoll`);
    expect(actual[153]).to.have.property(`value`, `1d12`);
    expect(actual[154]).to.have.property(`type`, `Word`);
    expect(actual[154]).to.have.property(`value`, `points`);

    expect(actual[155]).to.have.property(`type`, `Word`);
    expect(actual[155]).to.have.property(`value`, `of`);
    expect(actual[156]).to.have.property(`type`, `Word`);
    expect(actual[156]).to.have.property(`value`, `damage`);
    expect(actual[157]).to.have.property(`type`, `Word`);
    expect(actual[157]).to.have.property(`value`, `every`);
    expect(actual[158]).to.have.property(`type`, `NumberWhole`);
    expect(actual[158]).to.have.property(`value`, `10`);
    expect(actual[159]).to.have.property(`type`, `Word`);
    expect(actual[159]).to.have.property(`value`, `minutes`);

    expect(actual[160]).to.have.property(`type`, `Period`);
    expect(actual[160]).to.have.property(`value`, `.`);
    expect(actual[161]).to.have.property(`type`, `Word`);
    expect(actual[161]).to.have.property(`value`, `Remove`);
    expect(actual[162]).to.have.property(`type`, `Word`);
    expect(actual[162]).to.have.property(`value`, `disease`);
    expect(actual[163]).to.have.property(`type`, `Word`);
    expect(actual[163]).to.have.property(`value`, `and`);
    expect(actual[164]).to.have.property(`type`, `Word`);
    expect(actual[164]).to.have.property(`value`, `similar`);

    expect(actual[165]).to.have.property(`type`, `Word`);
    expect(actual[165]).to.have.property(`value`, `effects`);
    expect(actual[166]).to.have.property(`type`, `Word`);
    expect(actual[166]).to.have.property(`value`, `can`);
    expect(actual[167]).to.have.property(`type`, `Word`);
    expect(actual[167]).to.have.property(`value`, `restore`);
    expect(actual[168]).to.have.property(`type`, `Word`);
    expect(actual[168]).to.have.property(`value`, `an`);
    expect(actual[169]).to.have.property(`type`, `Word`);
    expect(actual[169]).to.have.property(`value`, `afflicted`);
    expect(actual[170]).to.have.property(`type`, `Word`);
    expect(actual[170]).to.have.property(`value`, `creature`);
    expect(actual[171]).to.have.property(`type`, `Word`);
    expect(actual[171]).to.have.property(`value`, `to`);
    expect(actual[172]).to.have.property(`type`, `Word`);
    expect(actual[172]).to.have.property(`value`, `normal`);
    expect(actual[173]).to.have.property(`type`, `Comma`);
    expect(actual[173]).to.have.property(`value`, `,`);
    expect(actual[174]).to.have.property(`type`, `Word`);
    expect(actual[174]).to.have.property(`value`, `but`);

    expect(actual[175]).to.have.property(`type`, `Word`);
    expect(actual[175]).to.have.property(`value`, `immunity`);
    expect(actual[176]).to.have.property(`type`, `Word`);
    expect(actual[176]).to.have.property(`value`, `to`);
    expect(actual[177]).to.have.property(`type`, `Word`);
    expect(actual[177]).to.have.property(`value`, `disease`);
    expect(actual[178]).to.have.property(`type`, `Word`);
    expect(actual[178]).to.have.property(`value`, `offers`);
    expect(actual[179]).to.have.property(`type`, `Word`);
    expect(actual[179]).to.have.property(`value`, `no`);

    expect(actual[180]).to.have.property(`type`, `Word`);
    expect(actual[180]).to.have.property(`value`, `protection`);
    expect(actual[181]).to.have.property(`type`, `Word`);
    expect(actual[181]).to.have.property(`value`, `from`);
    expect(actual[182]).to.have.property(`type`, `Word`);
    expect(actual[182]).to.have.property(`value`, `this`);
    expect(actual[183]).to.have.property(`type`, `Word`);
    expect(actual[183]).to.have.property(`value`, `attack`);
    expect(actual[184]).to.have.property(`type`, `Period`);
    expect(actual[184]).to.have.property(`value`, `.`);

    expect(actual[185]).to.have.property(`type`, `Word`);
    expect(actual[185]).to.have.property(`value`, `The`);
    expect(actual[186]).to.have.property(`type`, `Word`);
    expect(actual[186]).to.have.property(`value`, `save`);
    expect(actual[187]).to.have.property(`type`, `DcKey`);
    expect(actual[187]).to.have.property(`value`, `DC`);
    expect(actual[188]).to.have.property(`type`, `Word`);
    expect(actual[188]).to.have.property(`value`, `is`);
    expect(actual[189]).to.have.property(`type`, `Word`);
    expect(actual[189]).to.have.property(`value`, `Constitution`);

    expect(actual[190]).to.have.property(`type`, `Dash`);
    expect(actual[190]).to.have.property(`value`, `-`);
    expect(actual[191]).to.have.property(`type`, `Word`);
    expect(actual[191]).to.have.property(`value`, `based`);
    expect(actual[192]).to.have.property(`type`, `Period`);
    expect(actual[192]).to.have.property(`value`, `.`);
  });

  it(`can find Special Abilities/Vulerable lines 2`, () => {
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

    expect(actual.length).to.equal(306);
 
    expect(actual[0]).to.have.property(`type`, `SpecialAbilitiesKey`);
    expect(actual[0]).to.have.property(`value`, `SPECIAL ABILITIES`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Body`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `Thief`);
    expect(actual[3]).to.have.property(`type`, `SpecialAbilitiesType`);
    expect(actual[3]).to.have.property(`value`, `(Su)`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `As`);
 
    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `a`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `full`);
    expect(actual[7]).to.have.property(`type`, `Dash`);
    expect(actual[7]).to.have.property(`value`, `-`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `round`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `action`);
 
    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `that`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `provokes`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `an`);
    expect(actual[13]).to.have.property(`type`, `Word`);
    expect(actual[13]).to.have.property(`value`, `attack`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `of`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `opportunity`);
    expect(actual[16]).to.have.property(`type`, `Comma`);
    expect(actual[16]).to.have.property(`value`, `,`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `an`);
    expect(actual[18]).to.have.property(`type`, `Word`);
    expect(actual[18]).to.have.property(`value`, `intellect`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `devourer`);
 
    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `can`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `reduce`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `its`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `size`);
    expect(actual[24]).to.have.property(`type`, `Comma`);
    expect(actual[24]).to.have.property(`value`, `,`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `crawl`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `into`);
    expect(actual[27]).to.have.property(`type`, `Word`);
    expect(actual[27]).to.have.property(`value`, `the`);
    expect(actual[28]).to.have.property(`type`, `Word`);
    expect(actual[28]).to.have.property(`value`, `mouth`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `of`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `a`);
    expect(actual[31]).to.have.property(`type`, `Word`);
    expect(actual[31]).to.have.property(`value`, `helpless`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `or`);
    expect(actual[33]).to.have.property(`type`, `Word`);
    expect(actual[33]).to.have.property(`value`, `dead`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `creature`);
 
    expect(actual[35]).to.have.property(`type`, `Comma`);
    expect(actual[35]).to.have.property(`value`, `,`);
    expect(actual[36]).to.have.property(`type`, `Word`);
    expect(actual[36]).to.have.property(`value`, `and`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `burrow`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `into`);
    expect(actual[39]).to.have.property(`type`, `Word`);
    expect(actual[39]).to.have.property(`value`, `the`);
 
    expect(actual[40]).to.have.property(`type`, `Word`);
    expect(actual[40]).to.have.property(`value`, `victim’s`);
    expect(actual[41]).to.have.property(`type`, `Word`);
    expect(actual[41]).to.have.property(`value`, `skull`);
    expect(actual[42]).to.have.property(`type`, `Word`);
    expect(actual[42]).to.have.property(`value`, `to`);
    expect(actual[43]).to.have.property(`type`, `Word`);
    expect(actual[43]).to.have.property(`value`, `devour`);
    expect(actual[44]).to.have.property(`type`, `Word`);
    expect(actual[44]).to.have.property(`value`, `its`);
 
    expect(actual[45]).to.have.property(`type`, `Word`);
    expect(actual[45]).to.have.property(`value`, `brain`);
    expect(actual[46]).to.have.property(`type`, `Period`);
    expect(actual[46]).to.have.property(`value`, `.`);
    expect(actual[47]).to.have.property(`type`, `Word`);
    expect(actual[47]).to.have.property(`value`, `This`);
    expect(actual[48]).to.have.property(`type`, `Word`);
    expect(actual[48]).to.have.property(`value`, `is`);
    expect(actual[49]).to.have.property(`type`, `Word`);
    expect(actual[49]).to.have.property(`value`, `a`);
 
    expect(actual[50]).to.have.property(`type`, `Word`);
    expect(actual[50]).to.have.property(`value`, `coup`);
    expect(actual[51]).to.have.property(`type`, `Word`);
    expect(actual[51]).to.have.property(`value`, `de`);
    expect(actual[52]).to.have.property(`type`, `Word`);
    expect(actual[52]).to.have.property(`value`, `grace`);
    expect(actual[53]).to.have.property(`type`, `Word`);
    expect(actual[53]).to.have.property(`value`, `attempt`);
    expect(actual[54]).to.have.property(`type`, `Word`);
    expect(actual[54]).to.have.property(`value`, `that`);
 
    expect(actual[55]).to.have.property(`type`, `Word`);
    expect(actual[55]).to.have.property(`value`, `inflicts`);
    expect(actual[56]).to.have.property(`type`, `DiceRoll`);
    expect(actual[56]).to.have.property(`value`, `8d4`);
    expect(actual[57]).to.have.property(`type`, `DiceRoll`);
    expect(actual[57]).to.have.property(`value`, `+3d6`);
    expect(actual[58]).to.have.property(`type`, `NumberSigned`);
    expect(actual[58]).to.have.property(`value`, `+8`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `points`);
 
    expect(actual[60]).to.have.property(`type`, `Word`);
    expect(actual[60]).to.have.property(`value`, `of`);
    expect(actual[61]).to.have.property(`type`, `Word`);
    expect(actual[61]).to.have.property(`value`, `damage`);
    expect(actual[62]).to.have.property(`type`, `Period`);
    expect(actual[62]).to.have.property(`value`, `.`);
    expect(actual[63]).to.have.property(`type`, `Word`);
    expect(actual[63]).to.have.property(`value`, `If`);
    expect(actual[64]).to.have.property(`type`, `Word`);
    expect(actual[64]).to.have.property(`value`, `the`);
  
    expect(actual[65]).to.have.property(`type`, `Word`);
    expect(actual[65]).to.have.property(`value`, `victim`);
    expect(actual[66]).to.have.property(`type`, `Word`);
    expect(actual[66]).to.have.property(`value`, `is`);
    expect(actual[67]).to.have.property(`type`, `Word`);
    expect(actual[67]).to.have.property(`value`, `slain`);
    expect(actual[68]).to.have.property(`type`, `LParen`);
    expect(actual[68]).to.have.property(`value`, `(`);
    expect(actual[69]).to.have.property(`type`, `Word`);
    expect(actual[69]).to.have.property(`value`, `or`);
    
    expect(actual[70]).to.have.property(`type`, `Word`);
    expect(actual[70]).to.have.property(`value`, `already`);
    expect(actual[71]).to.have.property(`type`, `Word`);
    expect(actual[71]).to.have.property(`value`, `dead`);
    expect(actual[72]).to.have.property(`type`, `RParen`);
    expect(actual[72]).to.have.property(`value`, `)`);
    expect(actual[73]).to.have.property(`type`, `Comma`);
    expect(actual[73]).to.have.property(`value`, `,`);
    expect(actual[74]).to.have.property(`type`, `Word`);
    expect(actual[74]).to.have.property(`value`, `the`);
 
    expect(actual[75]).to.have.property(`type`, `Word`);
    expect(actual[75]).to.have.property(`value`, `intellect`);
    expect(actual[76]).to.have.property(`type`, `Word`);
    expect(actual[76]).to.have.property(`value`, `devourer`);
    expect(actual[77]).to.have.property(`type`, `Word`);
    expect(actual[77]).to.have.property(`value`, `usurps`);
    expect(actual[78]).to.have.property(`type`, `Word`);
    expect(actual[78]).to.have.property(`value`, `control`);
    expect(actual[79]).to.have.property(`type`, `Word`);
    expect(actual[79]).to.have.property(`value`, `of`);
  
    expect(actual[80]).to.have.property(`type`, `Word`);
    expect(actual[80]).to.have.property(`value`, `the`);
    expect(actual[81]).to.have.property(`type`, `Word`);
    expect(actual[81]).to.have.property(`value`, `body`);
    expect(actual[82]).to.have.property(`type`, `Word`);
    expect(actual[82]).to.have.property(`value`, `and`);
    expect(actual[83]).to.have.property(`type`, `Word`);
    expect(actual[83]).to.have.property(`value`, `may`);
    expect(actual[84]).to.have.property(`type`, `Word`);
    expect(actual[84]).to.have.property(`value`, `use`);
  
    expect(actual[85]).to.have.property(`type`, `Word`);
    expect(actual[85]).to.have.property(`value`, `it`);
    expect(actual[86]).to.have.property(`type`, `Word`);
    expect(actual[86]).to.have.property(`value`, `as`);
    expect(actual[87]).to.have.property(`type`, `Word`);
    expect(actual[87]).to.have.property(`value`, `its`);
    expect(actual[88]).to.have.property(`type`, `Word`);
    expect(actual[88]).to.have.property(`value`, `own`);
    expect(actual[89]).to.have.property(`type`, `Comma`);
    expect(actual[89]).to.have.property(`value`, `,`);

    expect(actual[90]).to.have.property(`type`, `Word`);
    expect(actual[90]).to.have.property(`value`, `as`);
    expect(actual[91]).to.have.property(`type`, `Word`);
    expect(actual[91]).to.have.property(`value`, `if`);
    expect(actual[92]).to.have.property(`type`, `Word`);
    expect(actual[92]).to.have.property(`value`, `it`);
    expect(actual[93]).to.have.property(`type`, `Word`);
    expect(actual[93]).to.have.property(`value`, `controlled`);
    expect(actual[94]).to.have.property(`type`, `Word`);
    expect(actual[94]).to.have.property(`value`, `the`);

    expect(actual[95]).to.have.property(`type`, `Word`);
    expect(actual[95]).to.have.property(`value`, `target`);
    expect(actual[96]).to.have.property(`type`, `Word`);
    expect(actual[96]).to.have.property(`value`, `via`);
    expect(actual[97]).to.have.property(`type`, `Word`);
    expect(actual[97]).to.have.property(`value`, `a`);
    expect(actual[98]).to.have.property(`type`, `Word`);
    expect(actual[98]).to.have.property(`value`, `dominate`);
    expect(actual[99]).to.have.property(`type`, `Word`);
    expect(actual[99]).to.have.property(`value`, `monster`);

    expect(actual[100]).to.have.property(`type`, `Word`);
    expect(actual[100]).to.have.property(`value`, `spell`);
    expect(actual[101]).to.have.property(`type`, `Period`);
    expect(actual[101]).to.have.property(`value`, `.`);
    expect(actual[102]).to.have.property(`type`, `Word`);
    expect(actual[102]).to.have.property(`value`, `The`);
    expect(actual[103]).to.have.property(`type`, `Word`);
    expect(actual[103]).to.have.property(`value`, `intellect`);
    expect(actual[104]).to.have.property(`type`, `Word`);
    expect(actual[104]).to.have.property(`value`, `devourer`);

    expect(actual[105]).to.have.property(`type`, `Word`);
    expect(actual[105]).to.have.property(`value`, `has`);
    expect(actual[106]).to.have.property(`type`, `Word`);
    expect(actual[106]).to.have.property(`value`, `full`);
    expect(actual[107]).to.have.property(`type`, `Word`);
    expect(actual[107]).to.have.property(`value`, `access`);
    expect(actual[108]).to.have.property(`type`, `Word`);
    expect(actual[108]).to.have.property(`value`, `to`);
    expect(actual[109]).to.have.property(`type`, `Word`);
    expect(actual[109]).to.have.property(`value`, `all`);

    expect(actual[110]).to.have.property(`type`, `Word`);
    expect(actual[110]).to.have.property(`value`, `of`);
    expect(actual[111]).to.have.property(`type`, `Word`);
    expect(actual[111]).to.have.property(`value`, `the`);
    expect(actual[112]).to.have.property(`type`, `Word`);
    expect(actual[112]).to.have.property(`value`, `host’s`);
    expect(actual[113]).to.have.property(`type`, `Word`);
    expect(actual[113]).to.have.property(`value`, `defensive`);
    expect(actual[114]).to.have.property(`type`, `Word`);
    expect(actual[114]).to.have.property(`value`, `and`);

    expect(actual[115]).to.have.property(`type`, `Word`);
    expect(actual[115]).to.have.property(`value`, `offensive`);
    expect(actual[116]).to.have.property(`type`, `Word`);
    expect(actual[116]).to.have.property(`value`, `abilities`);
    expect(actual[117]).to.have.property(`type`, `Word`);
    expect(actual[117]).to.have.property(`value`, `save`);
    expect(actual[118]).to.have.property(`type`, `Word`);
    expect(actual[118]).to.have.property(`value`, `for`);
    expect(actual[119]).to.have.property(`type`, `Word`);
    expect(actual[119]).to.have.property(`value`, `spellcasting`);

    expect(actual[120]).to.have.property(`type`, `Word`);
    expect(actual[120]).to.have.property(`value`, `and`);
    expect(actual[121]).to.have.property(`type`, `Word`);
    expect(actual[121]).to.have.property(`value`, `spell`);
    expect(actual[122]).to.have.property(`type`, `Dash`);
    expect(actual[122]).to.have.property(`value`, `-`);
    expect(actual[123]).to.have.property(`type`, `Word`);
    expect(actual[123]).to.have.property(`value`, `like`);
    expect(actual[124]).to.have.property(`type`, `Word`);
    expect(actual[124]).to.have.property(`value`, `abilities`);

    expect(actual[125]).to.have.property(`type`, `LParen`);
    expect(actual[125]).to.have.property(`value`, `(`);
    expect(actual[126]).to.have.property(`type`, `Word`);
    expect(actual[126]).to.have.property(`value`, `although`);
    expect(actual[127]).to.have.property(`type`, `Word`);
    expect(actual[127]).to.have.property(`value`, `the`);
    expect(actual[128]).to.have.property(`type`, `Word`);
    expect(actual[128]).to.have.property(`value`, `intellect`);
    expect(actual[129]).to.have.property(`type`, `Word`);
    expect(actual[129]).to.have.property(`value`, `devourer`);

    expect(actual[130]).to.have.property(`type`, `Word`);
    expect(actual[130]).to.have.property(`value`, `can`);
    expect(actual[131]).to.have.property(`type`, `Word`);
    expect(actual[131]).to.have.property(`value`, `still`);
    expect(actual[132]).to.have.property(`type`, `Word`);
    expect(actual[132]).to.have.property(`value`, `use`);
    expect(actual[133]).to.have.property(`type`, `Word`);
    expect(actual[133]).to.have.property(`value`, `its`);
    expect(actual[134]).to.have.property(`type`, `Word`);
    expect(actual[134]).to.have.property(`value`, `own`);

    expect(actual[135]).to.have.property(`type`, `Word`);
    expect(actual[135]).to.have.property(`value`, `spell`);
    expect(actual[136]).to.have.property(`type`, `Dash`);
    expect(actual[136]).to.have.property(`value`, `-`);
    expect(actual[137]).to.have.property(`type`, `Word`);
    expect(actual[137]).to.have.property(`value`, `like`);
    expect(actual[138]).to.have.property(`type`, `Word`);
    expect(actual[138]).to.have.property(`value`, `abilities`);
    expect(actual[139]).to.have.property(`type`, `RParen`);
    expect(actual[139]).to.have.property(`value`, `)`);

    expect(actual[140]).to.have.property(`type`, `Period`);
    expect(actual[140]).to.have.property(`value`, `.`);
    expect(actual[141]).to.have.property(`type`, `Word`);
    expect(actual[141]).to.have.property(`value`, `A`);
    expect(actual[142]).to.have.property(`type`, `Word`);
    expect(actual[142]).to.have.property(`value`, `host`);
    expect(actual[143]).to.have.property(`type`, `Word`);
    expect(actual[143]).to.have.property(`value`, `body`);
    expect(actual[144]).to.have.property(`type`, `Word`);
    expect(actual[144]).to.have.property(`value`, `may`);

    expect(actual[145]).to.have.property(`type`, `Word`);
    expect(actual[145]).to.have.property(`value`, `not`);
    expect(actual[146]).to.have.property(`type`, `Word`);
    expect(actual[146]).to.have.property(`value`, `have`);
    expect(actual[147]).to.have.property(`type`, `Word`);
    expect(actual[147]).to.have.property(`value`, `been`);
    expect(actual[148]).to.have.property(`type`, `Word`);
    expect(actual[148]).to.have.property(`value`, `dead`);
    expect(actual[149]).to.have.property(`type`, `Word`);
    expect(actual[149]).to.have.property(`value`, `for`);

    expect(actual[150]).to.have.property(`type`, `Word`);
    expect(actual[150]).to.have.property(`value`, `longer`);
    expect(actual[151]).to.have.property(`type`, `Word`);
    expect(actual[151]).to.have.property(`value`, `than`);
    expect(actual[152]).to.have.property(`type`, `NumberWhole`);
    expect(actual[152]).to.have.property(`value`, `1`);
    expect(actual[153]).to.have.property(`type`, `Word`);
    expect(actual[153]).to.have.property(`value`, `day`);
    expect(actual[154]).to.have.property(`type`, `Word`);
    expect(actual[154]).to.have.property(`value`, `for`);

    expect(actual[155]).to.have.property(`type`, `Word`);
    expect(actual[155]).to.have.property(`value`, `this`);
    expect(actual[156]).to.have.property(`type`, `Word`);
    expect(actual[156]).to.have.property(`value`, `ability`);
    expect(actual[157]).to.have.property(`type`, `Word`);
    expect(actual[157]).to.have.property(`value`, `to`);
    expect(actual[158]).to.have.property(`type`, `Word`);
    expect(actual[158]).to.have.property(`value`, `function`);
    expect(actual[159]).to.have.property(`type`, `Comma`);
    expect(actual[159]).to.have.property(`value`, `,`);

    expect(actual[160]).to.have.property(`type`, `Word`);
    expect(actual[160]).to.have.property(`value`, `and`);
    expect(actual[161]).to.have.property(`type`, `Word`);
    expect(actual[161]).to.have.property(`value`, `even`);
    expect(actual[162]).to.have.property(`type`, `Word`);
    expect(actual[162]).to.have.property(`value`, `successfully`);
    expect(actual[163]).to.have.property(`type`, `Word`);
    expect(actual[163]).to.have.property(`value`, `inhabited`);
    expect(actual[164]).to.have.property(`type`, `Word`);
    expect(actual[164]).to.have.property(`value`, `bodies`);

    expect(actual[165]).to.have.property(`type`, `Word`);
    expect(actual[165]).to.have.property(`value`, `decay`);
    expect(actual[166]).to.have.property(`type`, `Word`);
    expect(actual[166]).to.have.property(`value`, `to`);
    expect(actual[167]).to.have.property(`type`, `Word`);
    expect(actual[167]).to.have.property(`value`, `uselessness`);
    expect(actual[168]).to.have.property(`type`, `Word`);
    expect(actual[168]).to.have.property(`value`, `in`);
    expect(actual[169]).to.have.property(`type`, `NumberWhole`);
    expect(actual[169]).to.have.property(`value`, `7`);

    expect(actual[170]).to.have.property(`type`, `Word`);
    expect(actual[170]).to.have.property(`value`, `days`);
    expect(actual[171]).to.have.property(`type`, `LParen`);
    expect(actual[171]).to.have.property(`value`, `(`);
    expect(actual[172]).to.have.property(`type`, `Word`);
    expect(actual[172]).to.have.property(`value`, `unless`);
    expect(actual[173]).to.have.property(`type`, `Word`);
    expect(actual[173]).to.have.property(`value`, `this`);
    expect(actual[174]).to.have.property(`type`, `Word`);
    expect(actual[174]).to.have.property(`value`, `time`);

    expect(actual[175]).to.have.property(`type`, `Word`);
    expect(actual[175]).to.have.property(`value`, `is`);
    expect(actual[176]).to.have.property(`type`, `Word`);
    expect(actual[176]).to.have.property(`value`, `extended`);
    expect(actual[177]).to.have.property(`type`, `Word`);
    expect(actual[177]).to.have.property(`value`, `via`);
    expect(actual[178]).to.have.property(`type`, `Word`);
    expect(actual[178]).to.have.property(`value`, `gentle`);
    expect(actual[179]).to.have.property(`type`, `Word`);
    expect(actual[179]).to.have.property(`value`, `repose`);
    
    expect(actual[180]).to.have.property(`type`, `RParen`);
    expect(actual[180]).to.have.property(`value`, `)`);
    expect(actual[181]).to.have.property(`type`, `Period`);
    expect(actual[181]).to.have.property(`value`, `.`);
    expect(actual[182]).to.have.property(`type`, `Word`);
    expect(actual[182]).to.have.property(`value`, `As`);
    expect(actual[183]).to.have.property(`type`, `Word`);
    expect(actual[183]).to.have.property(`value`, `long`);
    expect(actual[184]).to.have.property(`type`, `Word`);
    expect(actual[184]).to.have.property(`value`, `as`);
    
    expect(actual[185]).to.have.property(`type`, `Word`);
    expect(actual[185]).to.have.property(`value`, `the`);
    expect(actual[186]).to.have.property(`type`, `Word`);
    expect(actual[186]).to.have.property(`value`, `intellect`);
    expect(actual[187]).to.have.property(`type`, `Word`);
    expect(actual[187]).to.have.property(`value`, `devourer`);
    expect(actual[188]).to.have.property(`type`, `Word`);
    expect(actual[188]).to.have.property(`value`, `occupies`);
    expect(actual[189]).to.have.property(`type`, `Word`);
    expect(actual[189]).to.have.property(`value`, `the`);
    
    expect(actual[190]).to.have.property(`type`, `Word`);
    expect(actual[190]).to.have.property(`value`, `body`);
    expect(actual[191]).to.have.property(`type`, `Comma`);
    expect(actual[191]).to.have.property(`value`, `,`);
    expect(actual[192]).to.have.property(`type`, `Word`);
    expect(actual[192]).to.have.property(`value`, `it`);
    expect(actual[193]).to.have.property(`type`, `Word`);
    expect(actual[193]).to.have.property(`value`, `knows`);
    expect(actual[194]).to.have.property(`type`, `LParen`);
    expect(actual[194]).to.have.property(`value`, `(`);
    
    expect(actual[195]).to.have.property(`type`, `Word`);
    expect(actual[195]).to.have.property(`value`, `and`);
    expect(actual[196]).to.have.property(`type`, `Word`);
    expect(actual[196]).to.have.property(`value`, `can`);
    expect(actual[197]).to.have.property(`type`, `Word`);
    expect(actual[197]).to.have.property(`value`, `speak`);
    expect(actual[198]).to.have.property(`type`, `RParen`);
    expect(actual[198]).to.have.property(`value`, `)`);
    expect(actual[199]).to.have.property(`type`, `Word`);
    expect(actual[199]).to.have.property(`value`, `the`);
    
    expect(actual[200]).to.have.property(`type`, `Word`);
    expect(actual[200]).to.have.property(`value`, `languages`);
    expect(actual[201]).to.have.property(`type`, `Word`);
    expect(actual[201]).to.have.property(`value`, `known`);
    expect(actual[202]).to.have.property(`type`, `Word`);
    expect(actual[202]).to.have.property(`value`, `by`);
    expect(actual[203]).to.have.property(`type`, `Word`);
    expect(actual[203]).to.have.property(`value`, `the`);
    expect(actual[204]).to.have.property(`type`, `Word`);
    expect(actual[204]).to.have.property(`value`, `victim`);
    
    expect(actual[205]).to.have.property(`type`, `Word`);
    expect(actual[205]).to.have.property(`value`, `and`);
    expect(actual[206]).to.have.property(`type`, `Word`);
    expect(actual[206]).to.have.property(`value`, `basic`);
    expect(actual[207]).to.have.property(`type`, `Word`);
    expect(actual[207]).to.have.property(`value`, `information`);
    expect(actual[208]).to.have.property(`type`, `Word`);
    expect(actual[208]).to.have.property(`value`, `about`);
    expect(actual[209]).to.have.property(`type`, `Word`);
    expect(actual[209]).to.have.property(`value`, `the`);
    
    expect(actual[210]).to.have.property(`type`, `Word`);
    expect(actual[210]).to.have.property(`value`, `victim’s`);
    expect(actual[211]).to.have.property(`type`, `Word`);
    expect(actual[211]).to.have.property(`value`, `identity`);
    expect(actual[212]).to.have.property(`type`, `Word`);
    expect(actual[212]).to.have.property(`value`, `and`);
    expect(actual[213]).to.have.property(`type`, `Word`);
    expect(actual[213]).to.have.property(`value`, `personality`);
    expect(actual[214]).to.have.property(`type`, `Comma`);
    expect(actual[214]).to.have.property(`value`, `,`);
    
    expect(actual[215]).to.have.property(`type`, `Word`);
    expect(actual[215]).to.have.property(`value`, `yet`);
    expect(actual[216]).to.have.property(`type`, `Word`);
    expect(actual[216]).to.have.property(`value`, `has`);
    expect(actual[217]).to.have.property(`type`, `Word`);
    expect(actual[217]).to.have.property(`value`, `none`);
    expect(actual[218]).to.have.property(`type`, `Word`);
    expect(actual[218]).to.have.property(`value`, `of`);
    expect(actual[219]).to.have.property(`type`, `Word`);
    expect(actual[219]).to.have.property(`value`, `the`);
    
    expect(actual[220]).to.have.property(`type`, `Word`);
    expect(actual[220]).to.have.property(`value`, `victim’s`);
    expect(actual[221]).to.have.property(`type`, `Word`);
    expect(actual[221]).to.have.property(`value`, `specific`);
    expect(actual[222]).to.have.property(`type`, `Word`);
    expect(actual[222]).to.have.property(`value`, `memories`);
    expect(actual[223]).to.have.property(`type`, `Word`);
    expect(actual[223]).to.have.property(`value`, `or`);
    expect(actual[224]).to.have.property(`type`, `Word`);
    expect(actual[224]).to.have.property(`value`, `knowledge`);
    
    expect(actual[225]).to.have.property(`type`, `Period`);
    expect(actual[225]).to.have.property(`value`, `.`);
    expect(actual[226]).to.have.property(`type`, `Word`);
    expect(actual[226]).to.have.property(`value`, `Damage`);
    expect(actual[227]).to.have.property(`type`, `Word`);
    expect(actual[227]).to.have.property(`value`, `done`);
    expect(actual[228]).to.have.property(`type`, `Word`);
    expect(actual[228]).to.have.property(`value`, `to`);
    expect(actual[229]).to.have.property(`type`, `Word`);
    expect(actual[229]).to.have.property(`value`, `a`);
    
    expect(actual[230]).to.have.property(`type`, `Word`);
    expect(actual[230]).to.have.property(`value`, `host`);
    expect(actual[231]).to.have.property(`type`, `Word`);
    expect(actual[231]).to.have.property(`value`, `body`);
    expect(actual[232]).to.have.property(`type`, `Word`);
    expect(actual[232]).to.have.property(`value`, `does`);
    expect(actual[233]).to.have.property(`type`, `Word`);
    expect(actual[233]).to.have.property(`value`, `not`);
    expect(actual[234]).to.have.property(`type`, `Word`);
    expect(actual[234]).to.have.property(`value`, `harm`);
    
    expect(actual[235]).to.have.property(`type`, `Word`);
    expect(actual[235]).to.have.property(`value`, `the`);
    expect(actual[236]).to.have.property(`type`, `Word`);
    expect(actual[236]).to.have.property(`value`, `intellect`);
    expect(actual[237]).to.have.property(`type`, `Word`);
    expect(actual[237]).to.have.property(`value`, `devourer`);
    expect(actual[238]).to.have.property(`type`, `Comma`);
    expect(actual[238]).to.have.property(`value`, `,`);
    expect(actual[239]).to.have.property(`type`, `Word`);
    expect(actual[239]).to.have.property(`value`, `and`);
    
    expect(actual[240]).to.have.property(`type`, `Word`);
    expect(actual[240]).to.have.property(`value`, `if`);
    expect(actual[241]).to.have.property(`type`, `Word`);
    expect(actual[241]).to.have.property(`value`, `the`);
    expect(actual[242]).to.have.property(`type`, `Word`);
    expect(actual[242]).to.have.property(`value`, `host`);
    expect(actual[243]).to.have.property(`type`, `Word`);
    expect(actual[243]).to.have.property(`value`, `body`);
    expect(actual[244]).to.have.property(`type`, `Word`);
    expect(actual[244]).to.have.property(`value`, `is`);
    
    expect(actual[245]).to.have.property(`type`, `Word`);
    expect(actual[245]).to.have.property(`value`, `slain`);
    expect(actual[246]).to.have.property(`type`, `Comma`);
    expect(actual[246]).to.have.property(`value`, `,`);
    expect(actual[247]).to.have.property(`type`, `Word`);
    expect(actual[247]).to.have.property(`value`, `the`);
    expect(actual[248]).to.have.property(`type`, `Word`);
    expect(actual[248]).to.have.property(`value`, `intellect`);
    expect(actual[249]).to.have.property(`type`, `Word`);
    expect(actual[249]).to.have.property(`value`, `devourer`);
    
    expect(actual[250]).to.have.property(`type`, `Word`);
    expect(actual[250]).to.have.property(`value`, `emerges`);
    expect(actual[251]).to.have.property(`type`, `Word`);
    expect(actual[251]).to.have.property(`value`, `and`);
    expect(actual[252]).to.have.property(`type`, `Word`);
    expect(actual[252]).to.have.property(`value`, `is`);
    expect(actual[253]).to.have.property(`type`, `Word`);
    expect(actual[253]).to.have.property(`value`, `dazed`);
    expect(actual[254]).to.have.property(`type`, `Word`);
    expect(actual[254]).to.have.property(`value`, `for`);
    
    expect(actual[255]).to.have.property(`type`, `NumberWhole`);
    expect(actual[255]).to.have.property(`value`, `1`);
    expect(actual[256]).to.have.property(`type`, `Word`);
    expect(actual[256]).to.have.property(`value`, `round`);
    expect(actual[257]).to.have.property(`type`, `Period`);
    expect(actual[257]).to.have.property(`value`, `.`);
    expect(actual[258]).to.have.property(`type`, `Word`);
    expect(actual[258]).to.have.property(`value`, `Raise`);
    expect(actual[259]).to.have.property(`type`, `Word`);
    expect(actual[259]).to.have.property(`value`, `dead`);
    
    expect(actual[260]).to.have.property(`type`, `Word`);
    expect(actual[260]).to.have.property(`value`, `cannot`);
    expect(actual[261]).to.have.property(`type`, `Word`);
    expect(actual[261]).to.have.property(`value`, `restore`);
    expect(actual[262]).to.have.property(`type`, `Word`);
    expect(actual[262]).to.have.property(`value`, `a`);
    expect(actual[263]).to.have.property(`type`, `Word`);
    expect(actual[263]).to.have.property(`value`, `victim`);
    expect(actual[264]).to.have.property(`type`, `Word`);
    expect(actual[264]).to.have.property(`value`, `of`);
    
    expect(actual[265]).to.have.property(`type`, `Word`);
    expect(actual[265]).to.have.property(`value`, `body`);
    expect(actual[266]).to.have.property(`type`, `Word`);
    expect(actual[266]).to.have.property(`value`, `theft`);
    expect(actual[267]).to.have.property(`type`, `Comma`);
    expect(actual[267]).to.have.property(`value`, `,`);
    expect(actual[268]).to.have.property(`type`, `Word`);
    expect(actual[268]).to.have.property(`value`, `but`);
    expect(actual[269]).to.have.property(`type`, `Word`);
    expect(actual[269]).to.have.property(`value`, `resurrection`);

    expect(actual[270]).to.have.property(`type`, `Word`);
    expect(actual[270]).to.have.property(`value`, `or`);
    expect(actual[271]).to.have.property(`type`, `Word`);
    expect(actual[271]).to.have.property(`value`, `more`);
    expect(actual[272]).to.have.property(`type`, `Word`);
    expect(actual[272]).to.have.property(`value`, `powerful`);
    expect(actual[273]).to.have.property(`type`, `Word`);
    expect(actual[273]).to.have.property(`value`, `magic`);
    expect(actual[274]).to.have.property(`type`, `Word`);
    expect(actual[274]).to.have.property(`value`, `can`);

    expect(actual[275]).to.have.property(`type`, `Period`);
    expect(actual[275]).to.have.property(`value`, `.`);
    expect(actual[276]).to.have.property(`type`, `VulnerableToKey`);
    expect(actual[276]).to.have.property(`value`, `Vulnerable to`);
    expect(actual[277]).to.have.property(`type`, `Word`);
    expect(actual[277]).to.have.property(`value`, `Protection`);
    expect(actual[278]).to.have.property(`type`, `Word`);
    expect(actual[278]).to.have.property(`value`, `from`);
    expect(actual[279]).to.have.property(`type`, `Word`);

    expect(actual[279]).to.have.property(`value`, `Evil`);
    expect(actual[280]).to.have.property(`type`, `SpecialAbilitiesType`);
    expect(actual[280]).to.have.property(`value`, `(Ex)`);
    expect(actual[281]).to.have.property(`type`, `Word`);
    expect(actual[281]).to.have.property(`value`, `An`);
    expect(actual[282]).to.have.property(`type`, `Word`);
    expect(actual[282]).to.have.property(`value`, `intellect`);
    expect(actual[283]).to.have.property(`type`, `Word`);
    expect(actual[283]).to.have.property(`value`, `devourer`);
    expect(actual[284]).to.have.property(`type`, `Word`);
    expect(actual[284]).to.have.property(`value`, `is`);

    expect(actual[285]).to.have.property(`type`, `Word`);
    expect(actual[285]).to.have.property(`value`, `treated`);
    expect(actual[286]).to.have.property(`type`, `Word`);
    expect(actual[286]).to.have.property(`value`, `as`);
    expect(actual[287]).to.have.property(`type`, `Word`);
    expect(actual[287]).to.have.property(`value`, `a`);
    expect(actual[288]).to.have.property(`type`, `Word`);
    expect(actual[288]).to.have.property(`value`, `summoned`);
    expect(actual[289]).to.have.property(`type`, `Word`);
    expect(actual[289]).to.have.property(`value`, `creature`);

    expect(actual[290]).to.have.property(`type`, `Word`);
    expect(actual[290]).to.have.property(`value`, `for`);
    expect(actual[291]).to.have.property(`type`, `Word`);
    expect(actual[291]).to.have.property(`value`, `the`);
    expect(actual[292]).to.have.property(`type`, `Word`);
    expect(actual[292]).to.have.property(`value`, `purpose`);
    expect(actual[293]).to.have.property(`type`, `Word`);
    expect(actual[293]).to.have.property(`value`, `of`);
    expect(actual[294]).to.have.property(`type`, `Word`);
    expect(actual[294]).to.have.property(`value`, `determining`);

    expect(actual[295]).to.have.property(`type`, `Word`);
    expect(actual[295]).to.have.property(`value`, `how`);
    expect(actual[296]).to.have.property(`type`, `Word`);
    expect(actual[296]).to.have.property(`value`, `it`);
    expect(actual[297]).to.have.property(`type`, `Word`);
    expect(actual[297]).to.have.property(`value`, `is`);
    expect(actual[298]).to.have.property(`type`, `Word`);
    expect(actual[298]).to.have.property(`value`, `affected`);
    expect(actual[299]).to.have.property(`type`, `Word`);
    expect(actual[299]).to.have.property(`value`, `by`);

    expect(actual[300]).to.have.property(`type`, `Word`);
    expect(actual[300]).to.have.property(`value`, `a`);
    expect(actual[301]).to.have.property(`type`, `Word`);
    expect(actual[301]).to.have.property(`value`, `protection`);
    expect(actual[302]).to.have.property(`type`, `Word`);
    expect(actual[302]).to.have.property(`value`, `from`);
    expect(actual[303]).to.have.property(`type`, `Word`);
    expect(actual[303]).to.have.property(`value`, `evil`);
    expect(actual[304]).to.have.property(`type`, `Word`);
    expect(actual[304]).to.have.property(`value`, `spell`);

    expect(actual[305]).to.have.property(`type`, `Period`);
    expect(actual[305]).to.have.property(`value`, `.`);
  });

  it(`can find Special Abilities/Vulerable lines 3`, () => {
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

    expect(actual.length).to.equal(362);

    expect(actual[0]).to.have.property(`type`, `SpecialAbilitiesKey`);
    expect(actual[0]).to.have.property(`value`, `SPECIAL ABILITIES`);
    expect(actual[1]).to.have.property(`type`, `Word`);
    expect(actual[1]).to.have.property(`value`, `Advice`);
    expect(actual[2]).to.have.property(`type`, `SpecialAbilitiesType`);
    expect(actual[2]).to.have.property(`value`, `(Ex)`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `Clockwork`);
    expect(actual[4]).to.have.property(`type`, `Word`);
    expect(actual[4]).to.have.property(`value`, `familiars`);

    expect(actual[5]).to.have.property(`type`, `Word`);
    expect(actual[5]).to.have.property(`value`, `have`);
    expect(actual[6]).to.have.property(`type`, `Word`);
    expect(actual[6]).to.have.property(`value`, `an`);
    expect(actual[7]).to.have.property(`type`, `Word`);
    expect(actual[7]).to.have.property(`value`, `innate`);
    expect(actual[8]).to.have.property(`type`, `Word`);
    expect(actual[8]).to.have.property(`value`, `understanding`);
    expect(actual[9]).to.have.property(`type`, `Word`);
    expect(actual[9]).to.have.property(`value`, `of`);

    expect(actual[10]).to.have.property(`type`, `Word`);
    expect(actual[10]).to.have.property(`value`, `how`);
    expect(actual[11]).to.have.property(`type`, `Word`);
    expect(actual[11]).to.have.property(`value`, `things`);
    expect(actual[12]).to.have.property(`type`, `Word`);
    expect(actual[12]).to.have.property(`value`, `work`);
    expect(actual[13]).to.have.property(`type`, `Comma`);
    expect(actual[13]).to.have.property(`value`, `,`);
    expect(actual[14]).to.have.property(`type`, `Word`);
    expect(actual[14]).to.have.property(`value`, `granting`);

    expect(actual[15]).to.have.property(`type`, `Word`);
    expect(actual[15]).to.have.property(`value`, `their`);
    expect(actual[16]).to.have.property(`type`, `Word`);
    expect(actual[16]).to.have.property(`value`, `masters`);
    expect(actual[17]).to.have.property(`type`, `Word`);
    expect(actual[17]).to.have.property(`value`, `a`);
    expect(actual[18]).to.have.property(`type`, `NumberSigned`);
    expect(actual[18]).to.have.property(`value`, `+2`);
    expect(actual[19]).to.have.property(`type`, `Word`);
    expect(actual[19]).to.have.property(`value`, `bonus`);

    expect(actual[20]).to.have.property(`type`, `Word`);
    expect(actual[20]).to.have.property(`value`, `on`);
    expect(actual[21]).to.have.property(`type`, `Word`);
    expect(actual[21]).to.have.property(`value`, `all`);
    expect(actual[22]).to.have.property(`type`, `Word`);
    expect(actual[22]).to.have.property(`value`, `Craft`);
    expect(actual[23]).to.have.property(`type`, `Word`);
    expect(actual[23]).to.have.property(`value`, `and`);
    expect(actual[24]).to.have.property(`type`, `Word`);
    expect(actual[24]).to.have.property(`value`, `Use`);

    expect(actual[25]).to.have.property(`type`, `Word`);
    expect(actual[25]).to.have.property(`value`, `Magic`);
    expect(actual[26]).to.have.property(`type`, `Word`);
    expect(actual[26]).to.have.property(`value`, `Device`);
    expect(actual[27]).to.have.property(`type`, `Word`);
    expect(actual[27]).to.have.property(`value`, `checks`);
    expect(actual[28]).to.have.property(`type`, `Period`);
    expect(actual[28]).to.have.property(`value`, `.`);
    expect(actual[29]).to.have.property(`type`, `Word`);
    expect(actual[29]).to.have.property(`value`, `Item`);

    expect(actual[30]).to.have.property(`type`, `Word`);
    expect(actual[30]).to.have.property(`value`, `Installation`);
    expect(actual[31]).to.have.property(`type`, `SpecialAbilitiesType`);
    expect(actual[31]).to.have.property(`value`, `(Ex)`);
    expect(actual[32]).to.have.property(`type`, `Word`);
    expect(actual[32]).to.have.property(`value`, `Each`);
    expect(actual[33]).to.have.property(`type`, `Word`);
    expect(actual[33]).to.have.property(`value`, `clockwork`);
    expect(actual[34]).to.have.property(`type`, `Word`);
    expect(actual[34]).to.have.property(`value`, `familiar`);

    expect(actual[35]).to.have.property(`type`, `Word`);
    expect(actual[35]).to.have.property(`value`, `possesses`);
    expect(actual[36]).to.have.property(`type`, `Word`);
    expect(actual[36]).to.have.property(`value`, `the`);
    expect(actual[37]).to.have.property(`type`, `Word`);
    expect(actual[37]).to.have.property(`value`, `ability`);
    expect(actual[38]).to.have.property(`type`, `Word`);
    expect(actual[38]).to.have.property(`value`, `to`);
    expect(actual[39]).to.have.property(`type`, `Word`);
    expect(actual[39]).to.have.property(`value`, `carry`);

    expect(actual[40]).to.have.property(`type`, `Word`);
    expect(actual[40]).to.have.property(`value`, `a`);
    expect(actual[41]).to.have.property(`type`, `Word`);
    expect(actual[41]).to.have.property(`value`, `magic`);
    expect(actual[42]).to.have.property(`type`, `Word`);
    expect(actual[42]).to.have.property(`value`, `item`);
    expect(actual[43]).to.have.property(`type`, `Word`);
    expect(actual[43]).to.have.property(`value`, `in`);
    expect(actual[44]).to.have.property(`type`, `Word`);
    expect(actual[44]).to.have.property(`value`, `its`);

    expect(actual[45]).to.have.property(`type`, `Word`);
    expect(actual[45]).to.have.property(`value`, `body`);
    expect(actual[46]).to.have.property(`type`, `Period`);
    expect(actual[46]).to.have.property(`value`, `.`);
    expect(actual[47]).to.have.property(`type`, `Word`);
    expect(actual[47]).to.have.property(`value`, `This`);
    expect(actual[48]).to.have.property(`type`, `Word`);
    expect(actual[48]).to.have.property(`value`, `specific`);
    expect(actual[49]).to.have.property(`type`, `Word`);
    expect(actual[49]).to.have.property(`value`, `item`);

    expect(actual[50]).to.have.property(`type`, `Word`);
    expect(actual[50]).to.have.property(`value`, `type`);
    expect(actual[51]).to.have.property(`type`, `Word`);
    expect(actual[51]).to.have.property(`value`, `is`);
    expect(actual[52]).to.have.property(`type`, `Word`);
    expect(actual[52]).to.have.property(`value`, `chosen`);
    expect(actual[53]).to.have.property(`type`, `Word`);
    expect(actual[53]).to.have.property(`value`, `at`);
    expect(actual[54]).to.have.property(`type`, `Word`);
    expect(actual[54]).to.have.property(`value`, `the`);

    expect(actual[55]).to.have.property(`type`, `Word`);
    expect(actual[55]).to.have.property(`value`, `time`);
    expect(actual[56]).to.have.property(`type`, `Word`);
    expect(actual[56]).to.have.property(`value`, `of`);
    expect(actual[57]).to.have.property(`type`, `Word`);
    expect(actual[57]).to.have.property(`value`, `the`);
    expect(actual[58]).to.have.property(`type`, `CreatureType`);
    expect(actual[58]).to.have.property(`value`, `construct’s`);
    expect(actual[59]).to.have.property(`type`, `Word`);
    expect(actual[59]).to.have.property(`value`, `creation`);

    expect(actual[60]).to.have.property(`type`, `Comma`);
    expect(actual[60]).to.have.property(`value`, `,`);
    expect(actual[61]).to.have.property(`type`, `Word`);
    expect(actual[61]).to.have.property(`value`, `and`);
    expect(actual[62]).to.have.property(`type`, `Word`);
    expect(actual[62]).to.have.property(`value`, `cannot`);
    expect(actual[63]).to.have.property(`type`, `Word`);
    expect(actual[63]).to.have.property(`value`, `be`);
    expect(actual[64]).to.have.property(`type`, `Word`);
    expect(actual[64]).to.have.property(`value`, `changed`);

    expect(actual[65]).to.have.property(`type`, `Period`);
    expect(actual[65]).to.have.property(`value`, `.`);
    expect(actual[66]).to.have.property(`type`, `Word`);
    expect(actual[66]).to.have.property(`value`, `While`);
    expect(actual[67]).to.have.property(`type`, `Word`);
    expect(actual[67]).to.have.property(`value`, `the`);
    expect(actual[68]).to.have.property(`type`, `Word`);
    expect(actual[68]).to.have.property(`value`, `creature`);
    expect(actual[69]).to.have.property(`type`, `Word`);
    expect(actual[69]).to.have.property(`value`, `cannot`);

    expect(actual[70]).to.have.property(`type`, `Word`);
    expect(actual[70]).to.have.property(`value`, `activate`);
    expect(actual[71]).to.have.property(`type`, `Word`);
    expect(actual[71]).to.have.property(`value`, `or`);
    expect(actual[72]).to.have.property(`type`, `Word`);
    expect(actual[72]).to.have.property(`value`, `use`);
    expect(actual[73]).to.have.property(`type`, `Word`);
    expect(actual[73]).to.have.property(`value`, `the`);
    expect(actual[74]).to.have.property(`type`, `Word`);
    expect(actual[74]).to.have.property(`value`, `item`);

    expect(actual[75]).to.have.property(`type`, `Comma`);
    expect(actual[75]).to.have.property(`value`, `,`);
    expect(actual[76]).to.have.property(`type`, `Word`);
    expect(actual[76]).to.have.property(`value`, `it`);
    expect(actual[77]).to.have.property(`type`, `Word`);
    expect(actual[77]).to.have.property(`value`, `gains`);
    expect(actual[78]).to.have.property(`type`, `Word`);
    expect(actual[78]).to.have.property(`value`, `certain`);
    expect(actual[79]).to.have.property(`type`, `Word`);
    expect(actual[79]).to.have.property(`value`, `constant`);

    expect(actual[80]).to.have.property(`type`, `Word`);
    expect(actual[80]).to.have.property(`value`, `abilities`);
    expect(actual[81]).to.have.property(`type`, `Word`);
    expect(actual[81]).to.have.property(`value`, `from`);
    expect(actual[82]).to.have.property(`type`, `Word`);
    expect(actual[82]).to.have.property(`value`, `the`);
    expect(actual[83]).to.have.property(`type`, `Word`);
    expect(actual[83]).to.have.property(`value`, `resonant`);
    expect(actual[84]).to.have.property(`type`, `Word`);
    expect(actual[84]).to.have.property(`value`, `magic`);

    expect(actual[85]).to.have.property(`type`, `Word`);
    expect(actual[85]).to.have.property(`value`, `fields`);
    expect(actual[86]).to.have.property(`type`, `Comma`);
    expect(actual[86]).to.have.property(`value`, `,`);
    expect(actual[87]).to.have.property(`type`, `Word`);
    expect(actual[87]).to.have.property(`value`, `and`);
    expect(actual[88]).to.have.property(`type`, `Word`);
    expect(actual[88]).to.have.property(`value`, `can`);
    expect(actual[89]).to.have.property(`type`, `Word`);
    expect(actual[89]).to.have.property(`value`, `drain`);

    expect(actual[90]).to.have.property(`type`, `Word`);
    expect(actual[90]).to.have.property(`value`, `the`);
    expect(actual[91]).to.have.property(`type`, `Word`);
    expect(actual[91]).to.have.property(`value`, `item’s`);
    expect(actual[92]).to.have.property(`type`, `Word`);
    expect(actual[92]).to.have.property(`value`, `magic`);
    expect(actual[93]).to.have.property(`type`, `Word`);
    expect(actual[93]).to.have.property(`value`, `as`);
    expect(actual[94]).to.have.property(`type`, `Word`);
    expect(actual[94]).to.have.property(`value`, `a`);

    expect(actual[95]).to.have.property(`type`, `Word`);
    expect(actual[95]).to.have.property(`value`, `free`);
    expect(actual[96]).to.have.property(`type`, `Word`);
    expect(actual[96]).to.have.property(`value`, `action`);
    expect(actual[97]).to.have.property(`type`, `Word`);
    expect(actual[97]).to.have.property(`value`, `in`);
    expect(actual[98]).to.have.property(`type`, `Word`);
    expect(actual[98]).to.have.property(`value`, `order`);
    expect(actual[99]).to.have.property(`type`, `Word`);
    expect(actual[99]).to.have.property(`value`, `to`);

    expect(actual[100]).to.have.property(`type`, `Word`);
    expect(actual[100]).to.have.property(`value`, `gain`);
    expect(actual[101]).to.have.property(`type`, `Word`);
    expect(actual[101]).to.have.property(`value`, `additional`);
    expect(actual[102]).to.have.property(`type`, `Word`);
    expect(actual[102]).to.have.property(`value`, `magical`);
    expect(actual[103]).to.have.property(`type`, `Word`);
    expect(actual[103]).to.have.property(`value`, `effects`);
    expect(actual[104]).to.have.property(`type`, `Period`);
    expect(actual[104]).to.have.property(`value`, `.`);

    expect(actual[105]).to.have.property(`type`, `Word`);
    expect(actual[105]).to.have.property(`value`, `In`);
    expect(actual[106]).to.have.property(`type`, `Word`);
    expect(actual[106]).to.have.property(`value`, `addition`);
    expect(actual[107]).to.have.property(`type`, `Comma`);
    expect(actual[107]).to.have.property(`value`, `,`);
    expect(actual[108]).to.have.property(`type`, `Word`);
    expect(actual[108]).to.have.property(`value`, `any`);
    expect(actual[109]).to.have.property(`type`, `Word`);
    expect(actual[109]).to.have.property(`value`, `clockwork`);

    expect(actual[110]).to.have.property(`type`, `CreatureType`);
    expect(actual[110]).to.have.property(`value`, `construct`);
    expect(actual[111]).to.have.property(`type`, `Word`);
    expect(actual[111]).to.have.property(`value`, `can`);
    expect(actual[112]).to.have.property(`type`, `Word`);
    expect(actual[112]).to.have.property(`value`, `drain`);
    expect(actual[113]).to.have.property(`type`, `Word`);
    expect(actual[113]).to.have.property(`value`, `a`);
    expect(actual[114]).to.have.property(`type`, `Word`);
    expect(actual[114]).to.have.property(`value`, `single`);

    expect(actual[115]).to.have.property(`type`, `Word`);
    expect(actual[115]).to.have.property(`value`, `charge`);
    expect(actual[116]).to.have.property(`type`, `Word`);
    expect(actual[116]).to.have.property(`value`, `or`);
    expect(actual[117]).to.have.property(`type`, `Word`);
    expect(actual[117]).to.have.property(`value`, `spell`);
    expect(actual[118]).to.have.property(`type`, `Word`);
    expect(actual[118]).to.have.property(`value`, `level`);
    expect(actual[119]).to.have.property(`type`, `Word`);
    expect(actual[119]).to.have.property(`value`, `from`);

    expect(actual[120]).to.have.property(`type`, `Word`);
    expect(actual[120]).to.have.property(`value`, `its`);
    expect(actual[121]).to.have.property(`type`, `Word`);
    expect(actual[121]).to.have.property(`value`, `installed`);
    expect(actual[122]).to.have.property(`type`, `Word`);
    expect(actual[122]).to.have.property(`value`, `item`);
    expect(actual[123]).to.have.property(`type`, `Word`);
    expect(actual[123]).to.have.property(`value`, `to`);
    expect(actual[124]).to.have.property(`type`, `Word`);
    expect(actual[124]).to.have.property(`value`, `heal`);

    expect(actual[125]).to.have.property(`type`, `Word`);
    expect(actual[125]).to.have.property(`value`, `itself`);
    expect(actual[126]).to.have.property(`type`, `Word`);
    expect(actual[126]).to.have.property(`value`, `for`);
    expect(actual[127]).to.have.property(`type`, `DiceRoll`);
    expect(actual[127]).to.have.property(`value`, `1d6`);
    expect(actual[128]).to.have.property(`type`, `Word`);
    expect(actual[128]).to.have.property(`value`, `hit`);
    expect(actual[129]).to.have.property(`type`, `Word`);
    expect(actual[129]).to.have.property(`value`, `points`);

    expect(actual[130]).to.have.property(`type`, `Word`);
    expect(actual[130]).to.have.property(`value`, `as`);
    expect(actual[131]).to.have.property(`type`, `Word`);
    expect(actual[131]).to.have.property(`value`, `a`);
    expect(actual[132]).to.have.property(`type`, `Word`);
    expect(actual[132]).to.have.property(`value`, `standard`);
    expect(actual[133]).to.have.property(`type`, `Word`);
    expect(actual[133]).to.have.property(`value`, `action`);
    expect(actual[134]).to.have.property(`type`, `Period`);
    expect(actual[134]).to.have.property(`value`, `.`);

    expect(actual[135]).to.have.property(`type`, `Word`);
    expect(actual[135]).to.have.property(`value`, `Removing`);
    expect(actual[136]).to.have.property(`type`, `Word`);
    expect(actual[136]).to.have.property(`value`, `a`);
    expect(actual[137]).to.have.property(`type`, `Word`);
    expect(actual[137]).to.have.property(`value`, `spent`);
    expect(actual[138]).to.have.property(`type`, `Word`);
    expect(actual[138]).to.have.property(`value`, `item`);
    expect(actual[139]).to.have.property(`type`, `Word`);
    expect(actual[139]).to.have.property(`value`, `and`);

    expect(actual[140]).to.have.property(`type`, `Word`);
    expect(actual[140]).to.have.property(`value`, `installing`);
    expect(actual[141]).to.have.property(`type`, `Word`);
    expect(actual[141]).to.have.property(`value`, `a`);
    expect(actual[142]).to.have.property(`type`, `Word`);
    expect(actual[142]).to.have.property(`value`, `new`);
    expect(actual[143]).to.have.property(`type`, `Word`);
    expect(actual[143]).to.have.property(`value`, `one`);
    expect(actual[144]).to.have.property(`type`, `Word`);
    expect(actual[144]).to.have.property(`value`, `is`);

    expect(actual[145]).to.have.property(`type`, `Word`);
    expect(actual[145]).to.have.property(`value`, `a`);
    expect(actual[146]).to.have.property(`type`, `Word`);
    expect(actual[146]).to.have.property(`value`, `full`);
    expect(actual[147]).to.have.property(`type`, `Dash`);
    expect(actual[147]).to.have.property(`value`, `-`);
    expect(actual[148]).to.have.property(`type`, `Word`);
    expect(actual[148]).to.have.property(`value`, `round`);
    expect(actual[149]).to.have.property(`type`, `Word`);
    expect(actual[149]).to.have.property(`value`, `action`);

    expect(actual[150]).to.have.property(`type`, `Period`);
    expect(actual[150]).to.have.property(`value`, `.`);
    expect(actual[151]).to.have.property(`type`, `Word`);
    expect(actual[151]).to.have.property(`value`, `Potion`);
    expect(actual[152]).to.have.property(`type`, `Colon`);
    expect(actual[152]).to.have.property(`value`, `:`);
    expect(actual[153]).to.have.property(`type`, `Word`);
    expect(actual[153]).to.have.property(`value`, `The`);
    expect(actual[154]).to.have.property(`type`, `Word`);
    expect(actual[154]).to.have.property(`value`, `clockwork`);

    expect(actual[155]).to.have.property(`type`, `Word`);
    expect(actual[155]).to.have.property(`value`, `familiar`);
    expect(actual[156]).to.have.property(`type`, `Word`);
    expect(actual[156]).to.have.property(`value`, `gains`);
    expect(actual[157]).to.have.property(`type`, `Word`);
    expect(actual[157]).to.have.property(`value`, `a`);
    expect(actual[158]).to.have.property(`type`, `Word`);
    expect(actual[158]).to.have.property(`value`, `constant`);
    expect(actual[159]).to.have.property(`type`, `Word`);
    expect(actual[159]).to.have.property(`value`, `protection`);

    expect(actual[160]).to.have.property(`type`, `Word`);
    expect(actual[160]).to.have.property(`value`, `from`);
    expect(actual[161]).to.have.property(`type`, `Word`);
    expect(actual[161]).to.have.property(`value`, `good`);
    expect(actual[162]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[162]).to.have.property(`value`, `/`);
    expect(actual[163]).to.have.property(`type`, `Word`);
    expect(actual[163]).to.have.property(`value`, `evil`);
    expect(actual[164]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[164]).to.have.property(`value`, `/`);

    expect(actual[165]).to.have.property(`type`, `Word`);
    expect(actual[165]).to.have.property(`value`, `law`);
    expect(actual[166]).to.have.property(`type`, `ForwardSlash`);
    expect(actual[166]).to.have.property(`value`, `/`);
    expect(actual[167]).to.have.property(`type`, `Word`);
    expect(actual[167]).to.have.property(`value`, `chaos`);
    expect(actual[168]).to.have.property(`type`, `Word`);
    expect(actual[168]).to.have.property(`value`, `effect`);
    expect(actual[169]).to.have.property(`type`, `LParen`);
    expect(actual[169]).to.have.property(`value`, `(`);

    expect(actual[170]).to.have.property(`type`, `Word`);
    expect(actual[170]).to.have.property(`value`, `one`);
    expect(actual[171]).to.have.property(`type`, `Word`);
    expect(actual[171]).to.have.property(`value`, `type`);
    expect(actual[172]).to.have.property(`type`, `Word`);
    expect(actual[172]).to.have.property(`value`, `only`);
    expect(actual[173]).to.have.property(`type`, `Comma`);
    expect(actual[173]).to.have.property(`value`, `,`);
    expect(actual[174]).to.have.property(`type`, `Word`);
    expect(actual[174]).to.have.property(`value`, `chosen`);

    expect(actual[175]).to.have.property(`type`, `Word`);
    expect(actual[175]).to.have.property(`value`, `each`);
    expect(actual[176]).to.have.property(`type`, `Word`);
    expect(actual[176]).to.have.property(`value`, `time`);
    expect(actual[177]).to.have.property(`type`, `Word`);
    expect(actual[177]).to.have.property(`value`, `a`);
    expect(actual[178]).to.have.property(`type`, `Word`);
    expect(actual[178]).to.have.property(`value`, `new`);
    expect(actual[179]).to.have.property(`type`, `Word`);
    expect(actual[179]).to.have.property(`value`, `potion`);

    expect(actual[180]).to.have.property(`type`, `Word`);
    expect(actual[180]).to.have.property(`value`, `is`);
    expect(actual[181]).to.have.property(`type`, `Word`);
    expect(actual[181]).to.have.property(`value`, `installed`);
    expect(actual[182]).to.have.property(`type`, `RParen`);
    expect(actual[182]).to.have.property(`value`, `)`);
    expect(actual[183]).to.have.property(`type`, `Period`);
    expect(actual[183]).to.have.property(`value`, `.`);
    expect(actual[184]).to.have.property(`type`, `Word`);
    expect(actual[184]).to.have.property(`value`, `In`);

    expect(actual[185]).to.have.property(`type`, `Word`);
    expect(actual[185]).to.have.property(`value`, `addition`);
    expect(actual[186]).to.have.property(`type`, `Comma`);
    expect(actual[186]).to.have.property(`value`, `,`);
    expect(actual[187]).to.have.property(`type`, `Word`);
    expect(actual[187]).to.have.property(`value`, `a`);
    expect(actual[188]).to.have.property(`type`, `Word`);
    expect(actual[188]).to.have.property(`value`, `clockwork`);
    expect(actual[189]).to.have.property(`type`, `Word`);
    expect(actual[189]).to.have.property(`value`, `familiar`);

    expect(actual[190]).to.have.property(`type`, `Word`);
    expect(actual[190]).to.have.property(`value`, `can`);
    expect(actual[191]).to.have.property(`type`, `Word`);
    expect(actual[191]).to.have.property(`value`, `drain`);
    expect(actual[192]).to.have.property(`type`, `Word`);
    expect(actual[192]).to.have.property(`value`, `the`);
    expect(actual[193]).to.have.property(`type`, `Word`);
    expect(actual[193]).to.have.property(`value`, `magic`);
    expect(actual[194]).to.have.property(`type`, `Word`);
    expect(actual[194]).to.have.property(`value`, `from`);

    expect(actual[195]).to.have.property(`type`, `Word`);
    expect(actual[195]).to.have.property(`value`, `the`);
    expect(actual[196]).to.have.property(`type`, `Word`);
    expect(actual[196]).to.have.property(`value`, `potion`);
    expect(actual[197]).to.have.property(`type`, `Word`);
    expect(actual[197]).to.have.property(`value`, `in`);
    expect(actual[198]).to.have.property(`type`, `Word`);
    expect(actual[198]).to.have.property(`value`, `order`);
    expect(actual[199]).to.have.property(`type`, `Word`);
    expect(actual[199]).to.have.property(`value`, `to`);

    expect(actual[200]).to.have.property(`type`, `Word`);
    expect(actual[200]).to.have.property(`value`, `grant`);
    expect(actual[201]).to.have.property(`type`, `Word`);
    expect(actual[201]).to.have.property(`value`, `this`);
    expect(actual[202]).to.have.property(`type`, `Word`);
    expect(actual[202]).to.have.property(`value`, `ability`);
    expect(actual[203]).to.have.property(`type`, `Word`);
    expect(actual[203]).to.have.property(`value`, `to`);
    expect(actual[204]).to.have.property(`type`, `Word`);
    expect(actual[204]).to.have.property(`value`, `a`);

    expect(actual[205]).to.have.property(`type`, `Word`);
    expect(actual[205]).to.have.property(`value`, `creature`);
    expect(actual[206]).to.have.property(`type`, `Word`);
    expect(actual[206]).to.have.property(`value`, `sharing`);
    expect(actual[207]).to.have.property(`type`, `Word`);
    expect(actual[207]).to.have.property(`value`, `its`);
    expect(actual[208]).to.have.property(`type`, `Word`);
    expect(actual[208]).to.have.property(`value`, `space`);
    expect(actual[209]).to.have.property(`type`, `Period`);
    expect(actual[209]).to.have.property(`value`, `.`);

    expect(actual[210]).to.have.property(`type`, `Word`);
    expect(actual[210]).to.have.property(`value`, `This`);
    expect(actual[211]).to.have.property(`type`, `Word`);
    expect(actual[211]).to.have.property(`value`, `ability`);
    expect(actual[212]).to.have.property(`type`, `Word`);
    expect(actual[212]).to.have.property(`value`, `to`);
    expect(actual[213]).to.have.property(`type`, `Word`);
    expect(actual[213]).to.have.property(`value`, `include`);
    expect(actual[214]).to.have.property(`type`, `Word`);
    expect(actual[214]).to.have.property(`value`, `others`);

    expect(actual[215]).to.have.property(`type`, `Word`);
    expect(actual[215]).to.have.property(`value`, `in`);
    expect(actual[216]).to.have.property(`type`, `Word`);
    expect(actual[216]).to.have.property(`value`, `the`);
    expect(actual[217]).to.have.property(`type`, `Word`);
    expect(actual[217]).to.have.property(`value`, `protection`);
    expect(actual[218]).to.have.property(`type`, `Word`);
    expect(actual[218]).to.have.property(`value`, `effect`);
    expect(actual[219]).to.have.property(`type`, `Word`);
    expect(actual[219]).to.have.property(`value`, `lasts`);

    expect(actual[220]).to.have.property(`type`, `Word`);
    expect(actual[220]).to.have.property(`value`, `for`);
    expect(actual[221]).to.have.property(`type`, `NumberWhole`);
    expect(actual[221]).to.have.property(`value`, `1`);
    expect(actual[222]).to.have.property(`type`, `Word`);
    expect(actual[222]).to.have.property(`value`, `minute`);
    expect(actual[223]).to.have.property(`type`, `Word`);
    expect(actual[223]).to.have.property(`value`, `per`);
    expect(actual[224]).to.have.property(`type`, `Word`);
    expect(actual[224]).to.have.property(`value`, `spell`);

    expect(actual[225]).to.have.property(`type`, `Word`);
    expect(actual[225]).to.have.property(`value`, `level`);
    expect(actual[226]).to.have.property(`type`, `Word`);
    expect(actual[226]).to.have.property(`value`, `of`);
    expect(actual[227]).to.have.property(`type`, `Word`);
    expect(actual[227]).to.have.property(`value`, `the`);
    expect(actual[228]).to.have.property(`type`, `Word`);
    expect(actual[228]).to.have.property(`value`, `potion`);
    expect(actual[229]).to.have.property(`type`, `Word`);
    expect(actual[229]).to.have.property(`value`, `drained`);

    expect(actual[230]).to.have.property(`type`, `Period`);
    expect(actual[230]).to.have.property(`value`, `.`);
    expect(actual[231]).to.have.property(`type`, `Word`);
    expect(actual[231]).to.have.property(`value`, `Scroll`);
    expect(actual[232]).to.have.property(`type`, `Colon`);
    expect(actual[232]).to.have.property(`value`, `:`);
    expect(actual[233]).to.have.property(`type`, `Word`);
    expect(actual[233]).to.have.property(`value`, `The`);
    expect(actual[234]).to.have.property(`type`, `Word`);
    expect(actual[234]).to.have.property(`value`, `clockwork`);

    expect(actual[235]).to.have.property(`type`, `Word`);
    expect(actual[235]).to.have.property(`value`, `familiar`);
    expect(actual[236]).to.have.property(`type`, `Word`);
    expect(actual[236]).to.have.property(`value`, `gains`);
    expect(actual[237]).to.have.property(`type`, `Word`);
    expect(actual[237]).to.have.property(`value`, `a`);
    expect(actual[238]).to.have.property(`type`, `Word`);
    expect(actual[238]).to.have.property(`value`, `constant`);
    expect(actual[239]).to.have.property(`type`, `Word`);
    expect(actual[239]).to.have.property(`value`, `detect`);

    expect(actual[240]).to.have.property(`type`, `Word`);
    expect(actual[240]).to.have.property(`value`, `magic`);
    expect(actual[241]).to.have.property(`type`, `Word`);
    expect(actual[241]).to.have.property(`value`, `effect`);
    expect(actual[242]).to.have.property(`type`, `Word`);
    expect(actual[242]).to.have.property(`value`, `as`);
    expect(actual[243]).to.have.property(`type`, `Word`);
    expect(actual[243]).to.have.property(`value`, `a`);
    expect(actual[244]).to.have.property(`type`, `Word`);
    expect(actual[244]).to.have.property(`value`, `spell`);

    expect(actual[245]).to.have.property(`type`, `Dash`);
    expect(actual[245]).to.have.property(`value`, `-`);
    expect(actual[246]).to.have.property(`type`, `Word`);
    expect(actual[246]).to.have.property(`value`, `like`);
    expect(actual[247]).to.have.property(`type`, `Word`);
    expect(actual[247]).to.have.property(`value`, `ability`);
    expect(actual[248]).to.have.property(`type`, `Period`);
    expect(actual[248]).to.have.property(`value`, `.`);
    expect(actual[249]).to.have.property(`type`, `Word`);
    expect(actual[249]).to.have.property(`value`, `Draining`);

    expect(actual[250]).to.have.property(`type`, `Word`);
    expect(actual[250]).to.have.property(`value`, `magic`);
    expect(actual[251]).to.have.property(`type`, `Word`);
    expect(actual[251]).to.have.property(`value`, `from`);
    expect(actual[252]).to.have.property(`type`, `Word`);
    expect(actual[252]).to.have.property(`value`, `a`);
    expect(actual[253]).to.have.property(`type`, `Word`);
    expect(actual[253]).to.have.property(`value`, `scroll`);
    expect(actual[254]).to.have.property(`type`, `Word`);
    expect(actual[254]).to.have.property(`value`, `allows`);

    expect(actual[255]).to.have.property(`type`, `Word`);
    expect(actual[255]).to.have.property(`value`, `the`);
    expect(actual[256]).to.have.property(`type`, `Word`);
    expect(actual[256]).to.have.property(`value`, `familiar`);
    expect(actual[257]).to.have.property(`type`, `Word`);
    expect(actual[257]).to.have.property(`value`, `to`);
    expect(actual[258]).to.have.property(`type`, `Word`);
    expect(actual[258]).to.have.property(`value`, `cast`);
    expect(actual[259]).to.have.property(`type`, `Word`);
    expect(actual[259]).to.have.property(`value`, `a`);

    expect(actual[260]).to.have.property(`type`, `Word`);
    expect(actual[260]).to.have.property(`value`, `single`);
    expect(actual[261]).to.have.property(`type`, `Word`);
    expect(actual[261]).to.have.property(`value`, `identify`);
    expect(actual[262]).to.have.property(`type`, `Word`);
    expect(actual[262]).to.have.property(`value`, `spell`);
    expect(actual[263]).to.have.property(`type`, `Word`);
    expect(actual[263]).to.have.property(`value`, `on`);
    expect(actual[264]).to.have.property(`type`, `Word`);
    expect(actual[264]).to.have.property(`value`, `behalf`);

    expect(actual[265]).to.have.property(`type`, `Word`);
    expect(actual[265]).to.have.property(`value`, `of`);
    expect(actual[266]).to.have.property(`type`, `Word`);
    expect(actual[266]).to.have.property(`value`, `its`);
    expect(actual[267]).to.have.property(`type`, `Word`);
    expect(actual[267]).to.have.property(`value`, `master`);
    expect(actual[268]).to.have.property(`type`, `Word`);
    expect(actual[268]).to.have.property(`value`, `for`);
    expect(actual[269]).to.have.property(`type`, `Word`);
    expect(actual[269]).to.have.property(`value`, `each`);

    expect(actual[270]).to.have.property(`type`, `Word`);
    expect(actual[270]).to.have.property(`value`, `spell`);
    expect(actual[271]).to.have.property(`type`, `Word`);
    expect(actual[271]).to.have.property(`value`, `level`);
    expect(actual[272]).to.have.property(`type`, `Word`);
    expect(actual[272]).to.have.property(`value`, `of`);
    expect(actual[273]).to.have.property(`type`, `Word`);
    expect(actual[273]).to.have.property(`value`, `the`);
    expect(actual[274]).to.have.property(`type`, `Word`);
    expect(actual[274]).to.have.property(`value`, `spell`);

    expect(actual[275]).to.have.property(`type`, `Word`);
    expect(actual[275]).to.have.property(`value`, `inscribed`);
    expect(actual[276]).to.have.property(`type`, `Word`);
    expect(actual[276]).to.have.property(`value`, `on`);
    expect(actual[277]).to.have.property(`type`, `Word`);
    expect(actual[277]).to.have.property(`value`, `the`);
    expect(actual[278]).to.have.property(`type`, `Word`);
    expect(actual[278]).to.have.property(`value`, `scroll`);
    expect(actual[279]).to.have.property(`type`, `MDash`);
    expect(actual[279]).to.have.property(`value`, `—`);

    expect(actual[280]).to.have.property(`type`, `Word`);
    expect(actual[280]).to.have.property(`value`, `these`);
    expect(actual[281]).to.have.property(`type`, `Word`);
    expect(actual[281]).to.have.property(`value`, `castings`);
    expect(actual[282]).to.have.property(`type`, `Word`);
    expect(actual[282]).to.have.property(`value`, `may`);
    expect(actual[283]).to.have.property(`type`, `Word`);
    expect(actual[283]).to.have.property(`value`, `be`);
    expect(actual[284]).to.have.property(`type`, `Word`);
    expect(actual[284]).to.have.property(`value`, `stored`);

    expect(actual[285]).to.have.property(`type`, `Word`);
    expect(actual[285]).to.have.property(`value`, `and`);
    expect(actual[286]).to.have.property(`type`, `Word`);
    expect(actual[286]).to.have.property(`value`, `saved`);
    expect(actual[287]).to.have.property(`type`, `Comma`);
    expect(actual[287]).to.have.property(`value`, `,`);
    expect(actual[288]).to.have.property(`type`, `Word`);
    expect(actual[288]).to.have.property(`value`, `though`);
    expect(actual[289]).to.have.property(`type`, `Word`);
    expect(actual[289]).to.have.property(`value`, `a`);

    expect(actual[290]).to.have.property(`type`, `Word`);
    expect(actual[290]).to.have.property(`value`, `scroll`);
    expect(actual[291]).to.have.property(`type`, `Word`);
    expect(actual[291]).to.have.property(`value`, `used`);
    expect(actual[292]).to.have.property(`type`, `Word`);
    expect(actual[292]).to.have.property(`value`, `in`);
    expect(actual[293]).to.have.property(`type`, `Word`);
    expect(actual[293]).to.have.property(`value`, `this`);
    expect(actual[294]).to.have.property(`type`, `Word`);
    expect(actual[294]).to.have.property(`value`, `manner`);

    expect(actual[295]).to.have.property(`type`, `Word`);
    expect(actual[295]).to.have.property(`value`, `becomes`);
    expect(actual[296]).to.have.property(`type`, `Word`);
    expect(actual[296]).to.have.property(`value`, `instantly`);
    expect(actual[297]).to.have.property(`type`, `Word`);
    expect(actual[297]).to.have.property(`value`, `useless`);
    expect(actual[298]).to.have.property(`type`, `Comma`);
    expect(actual[298]).to.have.property(`value`, `,`);
    expect(actual[299]).to.have.property(`type`, `Word`);
    expect(actual[299]).to.have.property(`value`, `even`);

    expect(actual[300]).to.have.property(`type`, `Word`);
    expect(actual[300]).to.have.property(`value`, `if`);
    expect(actual[301]).to.have.property(`type`, `Word`);
    expect(actual[301]).to.have.property(`value`, `not`);
    expect(actual[302]).to.have.property(`type`, `Word`);
    expect(actual[302]).to.have.property(`value`, `all`);
    expect(actual[303]).to.have.property(`type`, `Word`);
    expect(actual[303]).to.have.property(`value`, `spell`);
    expect(actual[304]).to.have.property(`type`, `Word`);
    expect(actual[304]).to.have.property(`value`, `levels`);

    expect(actual[305]).to.have.property(`type`, `Word`);
    expect(actual[305]).to.have.property(`value`, `have`);
    expect(actual[306]).to.have.property(`type`, `Word`);
    expect(actual[306]).to.have.property(`value`, `been`);
    expect(actual[307]).to.have.property(`type`, `Word`);
    expect(actual[307]).to.have.property(`value`, `drained`);
    expect(actual[308]).to.have.property(`type`, `Period`);
    expect(actual[308]).to.have.property(`value`, `.`);
    expect(actual[309]).to.have.property(`type`, `Word`);

    expect(actual[309]).to.have.property(`value`, `Wand`);
    expect(actual[310]).to.have.property(`type`, `Colon`);
    expect(actual[310]).to.have.property(`value`, `:`);
    expect(actual[311]).to.have.property(`type`, `Word`);
    expect(actual[311]).to.have.property(`value`, `The`);
    expect(actual[312]).to.have.property(`type`, `Word`);
    expect(actual[312]).to.have.property(`value`, `clockwork`);
    expect(actual[313]).to.have.property(`type`, `Word`);
    expect(actual[313]).to.have.property(`value`, `familiar`);
    expect(actual[314]).to.have.property(`type`, `Word`);
    expect(actual[314]).to.have.property(`value`, `gains`);

    expect(actual[315]).to.have.property(`type`, `Word`);
    expect(actual[315]).to.have.property(`value`, `the`);
    expect(actual[316]).to.have.property(`type`, `Word`);
    expect(actual[316]).to.have.property(`value`, `ability`);
    expect(actual[317]).to.have.property(`type`, `Word`);
    expect(actual[317]).to.have.property(`value`, `to`);
    expect(actual[318]).to.have.property(`type`, `Word`);
    expect(actual[318]).to.have.property(`value`, `spit`);
    expect(actual[319]).to.have.property(`type`, `Word`);
    expect(actual[319]).to.have.property(`value`, `a`);

    expect(actual[320]).to.have.property(`type`, `Word`);
    expect(actual[320]).to.have.property(`value`, `glob`);
    expect(actual[321]).to.have.property(`type`, `Word`);
    expect(actual[321]).to.have.property(`value`, `of`);
    expect(actual[322]).to.have.property(`type`, `Word`);
    expect(actual[322]).to.have.property(`value`, `acid`);
    expect(actual[323]).to.have.property(`type`, `Word`);
    expect(actual[323]).to.have.property(`value`, `up`);
    expect(actual[324]).to.have.property(`type`, `Word`);
    expect(actual[324]).to.have.property(`value`, `to`);

    expect(actual[325]).to.have.property(`type`, `SizeValue`);
    expect(actual[325]).to.have.property(`value`, `30 feet`);
    expect(actual[326]).to.have.property(`type`, `Word`);
    expect(actual[326]).to.have.property(`value`, `as`);
    expect(actual[327]).to.have.property(`type`, `Word`);
    expect(actual[327]).to.have.property(`value`, `a`);
    expect(actual[328]).to.have.property(`type`, `Word`);
    expect(actual[328]).to.have.property(`value`, `ranged`);
    expect(actual[329]).to.have.property(`type`, `AcTouchKey`);
    expect(actual[329]).to.have.property(`value`, `touch`);

    expect(actual[330]).to.have.property(`type`, `Word`);
    expect(actual[330]).to.have.property(`value`, `attack`);
    expect(actual[331]).to.have.property(`type`, `Comma`);
    expect(actual[331]).to.have.property(`value`, `,`);
    expect(actual[332]).to.have.property(`type`, `Word`);
    expect(actual[332]).to.have.property(`value`, `dealing`);
    expect(actual[333]).to.have.property(`type`, `DiceRoll`);
    expect(actual[333]).to.have.property(`value`, `1d4`);
    expect(actual[334]).to.have.property(`type`, `Word`);
    expect(actual[334]).to.have.property(`value`, `points`);

    expect(actual[335]).to.have.property(`type`, `Word`);
    expect(actual[335]).to.have.property(`value`, `of`);
    expect(actual[336]).to.have.property(`type`, `Word`);
    expect(actual[336]).to.have.property(`value`, `damage`);
    expect(actual[337]).to.have.property(`type`, `Period`);
    expect(actual[337]).to.have.property(`value`, `.`);
    expect(actual[338]).to.have.property(`type`, `Word`);
    expect(actual[338]).to.have.property(`value`, `Draining`);
    expect(actual[339]).to.have.property(`type`, `Word`);
    expect(actual[339]).to.have.property(`value`, `a`);

    expect(actual[340]).to.have.property(`type`, `Word`);
    expect(actual[340]).to.have.property(`value`, `charge`);
    expect(actual[341]).to.have.property(`type`, `Word`);
    expect(actual[341]).to.have.property(`value`, `increases`);
    expect(actual[342]).to.have.property(`type`, `Word`);
    expect(actual[342]).to.have.property(`value`, `the`);
    expect(actual[343]).to.have.property(`type`, `Word`);
    expect(actual[343]).to.have.property(`value`, `damage`);
    expect(actual[344]).to.have.property(`type`, `Word`);
    expect(actual[344]).to.have.property(`value`, `to`);
    expect(actual[345]).to.have.property(`type`, `DiceRoll`);

    expect(actual[345]).to.have.property(`value`, `2d4`);
    expect(actual[346]).to.have.property(`type`, `Word`);
    expect(actual[346]).to.have.property(`value`, `points`);
    expect(actual[347]).to.have.property(`type`, `Word`);
    expect(actual[347]).to.have.property(`value`, `for`);
    expect(actual[348]).to.have.property(`type`, `Word`);
    expect(actual[348]).to.have.property(`value`, `a`);
    expect(actual[349]).to.have.property(`type`, `Word`);
    expect(actual[349]).to.have.property(`value`, `single`);

    expect(actual[350]).to.have.property(`type`, `Word`);
    expect(actual[350]).to.have.property(`value`, `attack`);
    expect(actual[351]).to.have.property(`type`, `Period`);
    expect(actual[351]).to.have.property(`value`, `.`);
    expect(actual[352]).to.have.property(`type`, `Word`);
    expect(actual[352]).to.have.property(`value`, `This`);
    expect(actual[353]).to.have.property(`type`, `Word`);
    expect(actual[353]).to.have.property(`value`, `charge`);
    expect(actual[354]).to.have.property(`type`, `Word`);
    expect(actual[354]).to.have.property(`value`, `is`);

    expect(actual[355]).to.have.property(`type`, `Word`);
    expect(actual[355]).to.have.property(`value`, `spent`);
    expect(actual[356]).to.have.property(`type`, `Word`);
    expect(actual[356]).to.have.property(`value`, `before`);
    expect(actual[357]).to.have.property(`type`, `Word`);
    expect(actual[357]).to.have.property(`value`, `the`);
    expect(actual[358]).to.have.property(`type`, `Word`);
    expect(actual[358]).to.have.property(`value`, `attack`);
    expect(actual[359]).to.have.property(`type`, `Word`);
    expect(actual[359]).to.have.property(`value`, `is`);

    expect(actual[360]).to.have.property(`type`, `Word`);
    expect(actual[360]).to.have.property(`value`, `rolled`);
    expect(actual[361]).to.have.property(`type`, `Period`);
    expect(actual[361]).to.have.property(`value`, `.`);
  });
});