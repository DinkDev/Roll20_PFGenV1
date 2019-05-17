import { expect } from "chai";
import { StatBlockLexer } from "../src/StatBlockLexer";
import { TestHelper } from "./TestHelper";

describe(`StatBlockLexer `, () => {
  it(`all works on words and periods`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

    const input = `The quick brown fox\r\njumped over the lazy dog.`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(10);
  });
  it(`can find CR line data 1`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

    const input = `ZAZU CR —`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(3);
    expect(actual[0]).to.have.property(`type`, `Word`);
    expect(actual[0]).to.have.property(`value`, `ZAZU`);
    expect(actual[1]).to.have.property(`type`, `CrKey`);
    expect(actual[1]).to.have.property(`value`, `CR`);
    expect(actual[2]).to.have.property(`type`, `MDash`);
    expect(actual[2]).to.have.property(`value`, `\u2014`);
  });
  it(`can find CR line data 2`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();
    
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
  it(`can find CR line data 3`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

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
  it(`can find CR line data 4`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

    const input = `NE Medium aberration`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(3);
    expect(actual[0]).to.have.property(`type`, `Alignment`);
    expect(actual[0]).to.have.property(`value`, `NE`);
    expect(actual[1]).to.have.property(`type`, `CreatureSize`);
    expect(actual[1]).to.have.property(`value`, `Medium`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `aberration`);
  });
  it(`can find Alignment, Size, and Type line data 2`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

    const input = `NG* Huge dragon (extraplanar, good)`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(9);
    expect(actual[0]).to.have.property(`type`, `Alignment`);
    expect(actual[0]).to.have.property(`value`, `NG`);
    expect(actual[1]).to.have.property(`type`, `Asterisk`);
    expect(actual[2]).to.have.property(`type`, `CreatureSize`);
    expect(actual[2]).to.have.property(`value`, `Huge`);
    expect(actual[3]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

    const input = `Small humanoid (gnome) N`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);
    expect(actual[0]).to.have.property(`type`, `CreatureSize`);
    expect(actual[0]).to.have.property(`value`, `Small`);
    expect(actual[1]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

    const input = `CG Large magical beast`;
    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(4);
    expect(actual[0]).to.have.property(`type`, `Alignment`);
    expect(actual[0]).to.have.property(`value`, `CG`);
    expect(actual[1]).to.have.property(`type`, `CreatureSize`);
    expect(actual[1]).to.have.property(`value`, `Large`);
    expect(actual[2]).to.have.property(`type`, `Word`);
    expect(actual[2]).to.have.property(`value`, `magical`);
    expect(actual[3]).to.have.property(`type`, `Word`);
    expect(actual[3]).to.have.property(`value`, `beast`);    
  });

  it(`can find Init/Senses/Perception data 1`, () => {

    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

    const input = `DEFENSE`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `DefenseKey`);
  });

  it(`can find AC line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

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
    expect(actual[10]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

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
    expect(actual[13]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    expect(actual[11]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    expect(actual[6]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

    const input = `OFFENSE`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `OffenseKey`);
  });

  it(`can find Speed line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

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
    expect(actual[27]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

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
    expect(actual[103]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();
  
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
    const lexer = sut.getLexer();
    
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
    const lexer = sut.getLexer();

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

    expect(actual[25]).to.have.property(`type`, `Word`);
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
    const lexer = sut.getLexer();

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
    const lexer = sut.getLexer();

    const input = `STATISTICS`;

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property(`type`, `StatisticsKey`);
  });

  it(`can find Ability scores line 1`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

    const input = 'Str 11, Dex 21, Con 14, Int 18, Wis 10, Cha 19';

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(17);

    expect(actual[0]).to.have.property(`type`, `Ability`);
    expect(actual[0]).to.have.property(`value`, `Str `);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `11`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);

    expect(actual[3]).to.have.property(`type`, `Ability`);
    expect(actual[3]).to.have.property(`value`, `Dex `);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `21`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);

    expect(actual[6]).to.have.property(`type`, `Ability`);
    expect(actual[6]).to.have.property(`value`, `Con `);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `14`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);

    expect(actual[9]).to.have.property(`type`, `Ability`);
    expect(actual[9]).to.have.property(`value`, `Int `);
    expect(actual[10]).to.have.property(`type`, `NumberWhole`);
    expect(actual[10]).to.have.property(`value`, `18`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);

    expect(actual[12]).to.have.property(`type`, `Ability`);
    expect(actual[12]).to.have.property(`value`, `Wis `);
    expect(actual[13]).to.have.property(`type`, `NumberWhole`);
    expect(actual[13]).to.have.property(`value`, `10`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Ability`);
    expect(actual[15]).to.have.property(`value`, `Cha `);
    expect(actual[16]).to.have.property(`type`, `NumberWhole`);
    expect(actual[16]).to.have.property(`value`, `19`);
  });

  it(`can find Ability scores line 2`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

    const input = 'Str 31, Dex 14, Con 28, Int 16, Wis 18, Cha 20';

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(17);

    expect(actual[0]).to.have.property(`type`, `Ability`);
    expect(actual[0]).to.have.property(`value`, `Str `);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `31`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);

    expect(actual[3]).to.have.property(`type`, `Ability`);
    expect(actual[3]).to.have.property(`value`, `Dex `);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `14`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);

    expect(actual[6]).to.have.property(`type`, `Ability`);
    expect(actual[6]).to.have.property(`value`, `Con `);
    expect(actual[7]).to.have.property(`type`, `NumberWhole`);
    expect(actual[7]).to.have.property(`value`, `28`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);

    expect(actual[9]).to.have.property(`type`, `Ability`);
    expect(actual[9]).to.have.property(`value`, `Int `);
    expect(actual[10]).to.have.property(`type`, `NumberWhole`);
    expect(actual[10]).to.have.property(`value`, `16`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);

    expect(actual[12]).to.have.property(`type`, `Ability`);
    expect(actual[12]).to.have.property(`value`, `Wis `);
    expect(actual[13]).to.have.property(`type`, `NumberWhole`);
    expect(actual[13]).to.have.property(`value`, `18`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Ability`);
    expect(actual[15]).to.have.property(`value`, `Cha `);
    expect(actual[16]).to.have.property(`type`, `NumberWhole`);
    expect(actual[16]).to.have.property(`value`, `20`);
  });

  it(`can find Ability scores line 3`, () => {
    const sut = new StatBlockLexer();
    const lexer = sut.getLexer();

    const input = 'Str 14, Dex 10, Con —, Int —, Wis 1, Cha 1';

    const actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(17);

    expect(actual[0]).to.have.property(`type`, `Ability`);
    expect(actual[0]).to.have.property(`value`, `Str `);
    expect(actual[1]).to.have.property(`type`, `NumberWhole`);
    expect(actual[1]).to.have.property(`value`, `14`);
    expect(actual[2]).to.have.property(`type`, `Comma`);
    expect(actual[2]).to.have.property(`value`, `,`);

    expect(actual[3]).to.have.property(`type`, `Ability`);
    expect(actual[3]).to.have.property(`value`, `Dex `);
    expect(actual[4]).to.have.property(`type`, `NumberWhole`);
    expect(actual[4]).to.have.property(`value`, `10`);
    expect(actual[5]).to.have.property(`type`, `Comma`);
    expect(actual[5]).to.have.property(`value`, `,`);

    expect(actual[6]).to.have.property(`type`, `Ability`);
    expect(actual[6]).to.have.property(`value`, `Con `);
    expect(actual[7]).to.have.property(`type`, `MDash`);
    expect(actual[7]).to.have.property(`value`, `\u{2014}`);
    expect(actual[8]).to.have.property(`type`, `Comma`);
    expect(actual[8]).to.have.property(`value`, `,`);

    expect(actual[9]).to.have.property(`type`, `Ability`);
    expect(actual[9]).to.have.property(`value`, `Int `);
    expect(actual[10]).to.have.property(`type`, `MDash`);
    expect(actual[10]).to.have.property(`value`, `\u{2014}`);
    expect(actual[11]).to.have.property(`type`, `Comma`);
    expect(actual[11]).to.have.property(`value`, `,`);

    expect(actual[12]).to.have.property(`type`, `Ability`);
    expect(actual[12]).to.have.property(`value`, `Wis `);
    expect(actual[13]).to.have.property(`type`, `NumberWhole`);
    expect(actual[13]).to.have.property(`value`, `1`);
    expect(actual[14]).to.have.property(`type`, `Comma`);
    expect(actual[14]).to.have.property(`value`, `,`);

    expect(actual[15]).to.have.property(`type`, `Ability`);
    expect(actual[15]).to.have.property(`value`, `Cha `);
    expect(actual[16]).to.have.property(`type`, `NumberWhole`);
    expect(actual[16]).to.have.property(`value`, `1`);
  });
});