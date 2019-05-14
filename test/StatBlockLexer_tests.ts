import { expect } from "chai";
import { StatBlockLexer } from "../src/StatBlockLexer";
import { TestHelper } from "./TestHelper";

describe("StatBlockLexer ", () => {
  it("all works on words and periods", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "The quick brown fox\r\njumped over the lazy dog.";
    let actual = TestHelper.runLexer(lexer, input);

    expect(10).to.equal(actual.length);
  });  
  it("can find CR line data 1", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "ZAZU CR —";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(3).to.equal(actual.length);
    expect("ZAZU").to.equal(actual[0].text);
    expect("CR").to.equal(actual[1].text);
    expect("\u2014").to.equal(actual[2].text);
  });  
  it("can find CR line data 2", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();
    
    const input2 = "AATHERIEXA CR 7";
    let actual = TestHelper.runLexer(lexer, input2);

    expect(3).to.equal(actual.length);
    expect("AATHERIEXA").to.equal(actual[0].text);
    expect("CR").to.equal(actual[1].text);
    expect("7").to.equal(actual[2].text);
  });  
  it("can find CR line data 3", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input3 = "WRATH DRAGON CR 20";
    let actual = TestHelper.runLexer(lexer, input3);

    expect(4).to.equal(actual.length);
    expect("WRATH").to.equal(actual[0].text);
    expect("DRAGON").to.equal(actual[1].text);
    expect("CR").to.equal(actual[2].text);
    expect("20").to.equal(actual[3].text);
  });  
  it("can find CR line data 4", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input4 = "BLACK ORC CR 1/3";
    let actual = TestHelper.runLexer(lexer, input4);

    expect(4).to.equal(actual.length);
    expect("BLACK").to.equal(actual[0].text);
    expect("ORC").to.equal(actual[1].text);
    expect("CR").to.equal(actual[2].text);
    expect("1/3").to.equal(actual[3].text);
  });

  it("can find XP line data 1", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "XP 3,200";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(2).to.equal(actual.length);
    expect("XP").to.equal(actual[0].text);
    expect("3,200").to.equal(actual[1].text);
  });
  it("can find XP line data 2", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "GNOME DRUID 1 XP 400";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(5).to.equal(actual.length);
    expect("GNOME").to.equal(actual[0].text);
    expect("DRUID").to.equal(actual[1].text);
    expect("1").to.equal(actual[2].text);
    expect("XP").to.equal(actual[3].text);
    expect("400").to.equal(actual[4].text);
  });  
  it("can find Alignment, Size, and Type line data 1", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "NE Medium aberration";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(3).to.equal(actual.length);
    expect("NE").to.equal(actual[0].text);
    expect("Medium").to.equal(actual[1].text);
    expect("aberration").to.equal(actual[2].text);
  });
  it("can find Alignment, Size, and Type line data 2", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "NG* Huge dragon (extraplanar, good)";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(9).to.equal(actual.length);
;
    expect(actual[0]).to.have.property("type", "Alignment");
    expect(actual[0]).to.have.property("value", "NG");
    expect(actual[1]).to.have.property("type", "Asterisk");
    expect(actual[2]).to.have.property("type", "CreatureSize");
    expect(actual[2]).to.have.property("value", "Huge");
    expect(actual[3]).to.have.property("type", "CreatureType");
    expect(actual[3]).to.have.property("value", "dragon");
    expect(actual[4]).to.have.property("type", "LParen");
    expect(actual[5]).to.have.property("type", "Word");
    expect(actual[5]).to.have.property("value", "extraplanar");
    expect(actual[6]).to.have.property("type", "Comma");
    expect(actual[7]).to.have.property("type", "Word");
    expect(actual[7]).to.have.property("value", "good");
    expect(actual[8]).to.have.property("type", "RParen");
  }); 
  it("can find Alignment, Size, and Type line data 3", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "Small humanoid (gnome) N";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(actual[0]).to.have.property("type", "CreatureSize");
    expect(actual[0]).to.have.property("value", "Small");
    expect(actual[1]).to.have.property("type", "CreatureType");
    expect(actual[1]).to.have.property("value", "humanoid");
    expect(actual[2]).to.have.property("type", "LParen");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "gnome");
    expect(actual[4]).to.have.property("type", "RParen");
    expect(actual[5]).to.have.property("type", "Alignment");
    expect(actual[5]).to.have.property("value", "N");    
  });
  it("can find Alignment, Size, and Type line data 4", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "CG Large magical beast";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(actual.length).to.equal(3);
    expect(actual[0]).to.have.property("type", "Alignment");
    expect(actual[0]).to.have.property("value", "CG");
    expect(actual[1]).to.have.property("type", "CreatureSize");
    expect(actual[1]).to.have.property("value", "Large");
    expect(actual[2]).to.have.property("type", "CreatureType");
    expect(actual[2]).to.have.property("value", "magical beast");
  });

  it("can find Init/Senses/Perception data 1", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "Init +9; Senses all-around vision, darkvision 120 ft., low-light\r\nvision, see invisibility; Perception +28";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(actual.length).to.equal(22);
    expect(actual[0]).to.have.property("type", "InitKey");
    expect(actual[0]).to.have.property("value", "Init");

    expect(actual[1]).to.have.property("type", "NumberSigned");
    expect(actual[1]).to.have.property("value", "+9");

    expect(actual[2]).to.have.property("type", "SemiColon");

    expect(actual[3]).to.have.property("type", "SensesKey");
    expect(actual[3]).to.have.property("value", "Senses");

    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "all");

    expect(actual[5]).to.have.property("type", "Dash");
    expect(actual[5]).to.have.property("value", "-");

    expect(actual[6]).to.have.property("type", "Word");
    expect(actual[6]).to.have.property("value", "around");

    expect(actual[7]).to.have.property("type", "Word");
    expect(actual[7]).to.have.property("value", "vision");

    expect(actual[8]).to.have.property("type", "Comma");

    expect(actual[9]).to.have.property("type", "Word");
    expect(actual[9]).to.have.property("value", "darkvision");

    expect(actual[10]).to.have.property("type", "SizeValue");
    expect(actual[10]).to.have.property("value", "120 ft.");

    expect(actual[11]).to.have.property("type", "Comma");

    expect(actual[12]).to.have.property("type", "Word");
    expect(actual[12]).to.have.property("value", "low");

    expect(actual[13]).to.have.property("type", "Dash");
    expect(actual[13]).to.have.property("value", "-");

    expect(actual[14]).to.have.property("type", "Word");
    expect(actual[14]).to.have.property("value", "light");

    expect(actual[15]).to.have.property("type", "Word");
    expect(actual[15]).to.have.property("value", "vision");

    expect(actual[16]).to.have.property("type", "Comma");

    expect(actual[17]).to.have.property("type", "Word");
    expect(actual[17]).to.have.property("value", "see");

    expect(actual[18]).to.have.property("type", "Word");
    expect(actual[18]).to.have.property("value", "invisibility");

    expect(actual[19]).to.have.property("type", "SemiColon");

    expect(actual[20]).to.have.property("type", "PerceptionKey");
    expect(actual[20]).to.have.property("value", "Perception");

    expect(actual[21]).to.have.property("type", "NumberSigned");
    expect(actual[21]).to.have.property("value", "+28");
  });

  it("can find Init/Senses/Perception data 2", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "Init +5; Senses darkvision 60 ft.; Perception +14";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(actual.length).to.equal(9);
    expect(actual[0]).to.have.property("type", "InitKey");
    expect(actual[0]).to.have.property("value", "Init");
    
    expect(actual[1]).to.have.property("type", "NumberSigned");
    expect(actual[1]).to.have.property("value", "+5");
    
    expect(actual[2]).to.have.property("type", "SemiColon");
    
    expect(actual[3]).to.have.property("type", "SensesKey");
    expect(actual[3]).to.have.property("value", "Senses");
    
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "darkvision");
    
    expect(actual[5]).to.have.property("type", "SizeValue");
    expect(actual[5]).to.have.property("value", "60 ft.");
    
    expect(actual[6]).to.have.property("type", "SemiColon");
    
    expect(actual[7]).to.have.property("type", "PerceptionKey");
    expect(actual[7]).to.have.property("value", "Perception");
    
    expect(actual[8]).to.have.property("type", "NumberSigned");
    expect(actual[8]).to.have.property("value", "+14");
  });
  it("can find Init/Senses/Perception data 3", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Init +0; Senses Perception +13";
    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);
    expect(actual[0]).to.have.property("type", "InitKey");
    expect(actual[0]).to.have.property("value", "Init");
    
    expect(actual[1]).to.have.property("type", "NumberSigned");
    expect(actual[1]).to.have.property("value", "+0");
    
    expect(actual[2]).to.have.property("type", "SemiColon");
    
    expect(actual[3]).to.have.property("type", "SensesKey");
    expect(actual[3]).to.have.property("value", "Senses");
    
    expect(actual[4]).to.have.property("type", "PerceptionKey");
    expect(actual[4]).to.have.property("value", "Perception");
    
    expect(actual[5]).to.have.property("type", "NumberSigned");    
    expect(actual[5]).to.have.property("value", "+13");    
  });
  it("can find Aura data 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Aura unnatural aura (30 ft.)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);
    expect(actual[0]).to.have.property("type", "AuraKey");
    expect(actual[0]).to.have.property("value", "Aura");
    
    expect(actual[1]).to.have.property("type", "Word");
    expect(actual[1]).to.have.property("value", "unnatural");
    
    expect(actual[2]).to.have.property("type", "Word");
    expect(actual[2]).to.have.property("value", "aura");

    expect(actual[3]).to.have.property("type", "LParen");
    
    expect(actual[4]).to.have.property("type", "SizeValue");
    expect(actual[4]).to.have.property("value", "30 ft.");
    
    expect(actual[5]).to.have.property("type", "RParen");    
  });
  it("can find Aura data 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Aura mucus cloud (5 feet)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(6);
    expect(actual[0]).to.have.property("type", "AuraKey");
    expect(actual[0]).to.have.property("value", "Aura");
    
    expect(actual[1]).to.have.property("type", "Word");
    expect(actual[1]).to.have.property("value", "mucus");
    
    expect(actual[2]).to.have.property("type", "Word");
    expect(actual[2]).to.have.property("value", "cloud");

    expect(actual[3]).to.have.property("type", "LParen");
    
    expect(actual[4]).to.have.property("type", "SizeValue");
    expect(actual[4]).to.have.property("value", "5 feet");
    
    expect(actual[5]).to.have.property("type", "RParen");    
  });
  it("can find Aura data 3", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Aura magic circle against evil (10 ft. radius)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(9);
    expect(actual[0]).to.have.property("type", "AuraKey");
    expect(actual[0]).to.have.property("value", "Aura");
    
    expect(actual[1]).to.have.property("type", "Word");
    expect(actual[1]).to.have.property("value", "magic");
    
    expect(actual[2]).to.have.property("type", "Word");
    expect(actual[2]).to.have.property("value", "circle");

    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "against");
    
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "evil");

    expect(actual[5]).to.have.property("type", "LParen");
    
    expect(actual[6]).to.have.property("type", "SizeValue");
    expect(actual[6]).to.have.property("value", "10 ft.");
    
    expect(actual[7]).to.have.property("type", "Word");
    expect(actual[7]).to.have.property("value", "radius");

    expect(actual[8]).to.have.property("type", "RParen");    
  });
  it("can find Aura data 4", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    // Note: this should probably fail (need a size to set the aura)
    const input = "Aura magic circle against evil";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(5);
    expect(actual[0]).to.have.property("type", "AuraKey");
    expect(actual[0]).to.have.property("value", "Aura");
    
    expect(actual[1]).to.have.property("type", "Word");
    expect(actual[1]).to.have.property("value", "magic");
    
    expect(actual[2]).to.have.property("type", "Word");
    expect(actual[2]).to.have.property("value", "circle");
    
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "against");
    
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "evil");
  });

  it("can find Defense key", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "DEFENSE";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property("type", "DefenseKey");
  });

  it("can find AC line 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "AC 21, touch 15, flat-footed 16 (+5 Dex, +6 natural)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(15);

    expect(actual[0]).to.have.property("type", "AcKey");
    expect(actual[0]).to.have.property("value", "AC");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "21");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "AcTouchKey");
    expect(actual[3]).to.have.property("value", "touch");
    expect(actual[4]).to.have.property("type", "NumberWhole");
    expect(actual[4]).to.have.property("value", "15");
    expect(actual[5]).to.have.property("type", "Comma");
    expect(actual[5]).to.have.property("value", ",");
    expect(actual[6]).to.have.property("type", "AcFlatFootedKey");
    expect(actual[6]).to.have.property("value", "flat-footed");
    expect(actual[7]).to.have.property("type", "NumberWhole");
    expect(actual[7]).to.have.property("value", "16");
    expect(actual[8]).to.have.property("type", "LParen");
    expect(actual[8]).to.have.property("value", "(");
    expect(actual[9]).to.have.property("type", "NumberSigned");
    expect(actual[9]).to.have.property("value", "+5");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "Dex");
    expect(actual[11]).to.have.property("type", "Comma");
    expect(actual[11]).to.have.property("value", ",");
    expect(actual[12]).to.have.property("type", "NumberSigned");
    expect(actual[12]).to.have.property("value", "+6");
    expect(actual[13]).to.have.property("type", "Word");
    expect(actual[13]).to.have.property("value", "natural");
    expect(actual[14]).to.have.property("type", "RParen");
    expect(actual[14]).to.have.property("value", ")");
  });
  it("can find AC line 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "AC 14, touch 12, flat-footed 13 (+2 armor, +1 Dex, +1 size)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(18);

    expect(actual[0]).to.have.property("type", "AcKey");
    expect(actual[0]).to.have.property("value", "AC");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "14");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "AcTouchKey");
    expect(actual[3]).to.have.property("value", "touch");
    expect(actual[4]).to.have.property("type", "NumberWhole");
    expect(actual[4]).to.have.property("value", "12");
    expect(actual[5]).to.have.property("type", "Comma");
    expect(actual[5]).to.have.property("value", ",");
    expect(actual[6]).to.have.property("type", "AcFlatFootedKey");
    expect(actual[6]).to.have.property("value", "flat-footed");
    expect(actual[7]).to.have.property("type", "NumberWhole");
    expect(actual[7]).to.have.property("value", "13");
    expect(actual[8]).to.have.property("type", "LParen");
    expect(actual[8]).to.have.property("value", "(");
    expect(actual[9]).to.have.property("type", "NumberSigned");
    expect(actual[9]).to.have.property("value", "+2");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "armor");
    expect(actual[11]).to.have.property("type", "Comma");
    expect(actual[11]).to.have.property("value", ",");
    expect(actual[12]).to.have.property("type", "NumberSigned");
    expect(actual[12]).to.have.property("value", "+1");
    expect(actual[13]).to.have.property("type", "Word");
    expect(actual[13]).to.have.property("value", "Dex");
    expect(actual[14]).to.have.property("type", "Comma");
    expect(actual[14]).to.have.property("value", ",");
    expect(actual[15]).to.have.property("type", "NumberSigned");
    expect(actual[15]).to.have.property("value", "+1");
    expect(actual[16]).to.have.property("type", "Word");
    expect(actual[16]).to.have.property("value", "size");
    expect(actual[17]).to.have.property("type", "RParen");
    expect(actual[17]).to.have.property("value", ")");
  });
  it("can find AC line 3", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "AC 16, touch 13, flat-footed 16 (+3 armor, +3 deflection)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(15);

    expect(actual[0]).to.have.property("type", "AcKey");
    expect(actual[0]).to.have.property("value", "AC");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "16");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "AcTouchKey");
    expect(actual[3]).to.have.property("value", "touch");
    expect(actual[4]).to.have.property("type", "NumberWhole");
    expect(actual[4]).to.have.property("value", "13");
    expect(actual[5]).to.have.property("type", "Comma");
    expect(actual[5]).to.have.property("value", ",");
    expect(actual[6]).to.have.property("type", "AcFlatFootedKey");
    expect(actual[6]).to.have.property("value", "flat-footed");
    expect(actual[7]).to.have.property("type", "NumberWhole");
    expect(actual[7]).to.have.property("value", "16");
    expect(actual[8]).to.have.property("type", "LParen");
    expect(actual[8]).to.have.property("value", "(");
    expect(actual[9]).to.have.property("type", "NumberSigned");
    expect(actual[9]).to.have.property("value", "+3");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "armor");
    expect(actual[11]).to.have.property("type", "Comma");
    expect(actual[11]).to.have.property("value", ",");
    expect(actual[12]).to.have.property("type", "NumberSigned");
    expect(actual[12]).to.have.property("value", "+3");
    expect(actual[13]).to.have.property("type", "Word");
    expect(actual[13]).to.have.property("value", "deflection");
    expect(actual[14]).to.have.property("type", "RParen");
    expect(actual[14]).to.have.property("value", ")");
  });
  it("can find AC line 4", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    // Note: semicolon was common in Bestiary 1
    const input = "AC 15, touch 12, flat-footed 12; (+3 Dex, +3 natural, –1 size; +2\r\ndeflection vs. evil)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(25);
    expect(actual[0]).to.have.property("type", "AcKey");
    expect(actual[0]).to.have.property("value", "AC");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "15");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "AcTouchKey");
    expect(actual[3]).to.have.property("value", "touch");
    expect(actual[4]).to.have.property("type", "NumberWhole");
    expect(actual[4]).to.have.property("value", "12");
    expect(actual[5]).to.have.property("type", "Comma");
    expect(actual[5]).to.have.property("value", ",");
    expect(actual[6]).to.have.property("type", "AcFlatFootedKey");
    expect(actual[6]).to.have.property("value", "flat-footed");
    expect(actual[7]).to.have.property("type", "NumberWhole");
    expect(actual[7]).to.have.property("value", "12");
    expect(actual[8]).to.have.property("type", "SemiColon");
    expect(actual[8]).to.have.property("value", ";");
    expect(actual[9]).to.have.property("type", "LParen");
    expect(actual[9]).to.have.property("value", "(");
    expect(actual[10]).to.have.property("type", "NumberSigned");
    expect(actual[10]).to.have.property("value", "+3");
    expect(actual[11]).to.have.property("type", "Word");
    expect(actual[11]).to.have.property("value", "Dex");
    expect(actual[12]).to.have.property("type", "Comma");
    expect(actual[12]).to.have.property("value", ",");
    expect(actual[13]).to.have.property("type", "NumberSigned");
    expect(actual[13]).to.have.property("value", "+3");
    expect(actual[14]).to.have.property("type", "Word");
    expect(actual[14]).to.have.property("value", "natural");
    expect(actual[15]).to.have.property("type", "Comma");
    expect(actual[15]).to.have.property("value", ",");
    expect(actual[16]).to.have.property("type", "MNash");
    expect(actual[16]).to.have.property("value", "–");
    expect(actual[17]).to.have.property("type", "NumberWhole");
    expect(actual[17]).to.have.property("value", "1");
    expect(actual[18]).to.have.property("type", "Word");
    expect(actual[18]).to.have.property("value", "size");
    expect(actual[19]).to.have.property("type", "SemiColon");
    expect(actual[19]).to.have.property("value", ";");
    expect(actual[20]).to.have.property("type", "NumberSigned");
    expect(actual[20]).to.have.property("value", "+2");
    expect(actual[21]).to.have.property("type", "Word");
    expect(actual[21]).to.have.property("value", "deflection");
    expect(actual[22]).to.have.property("type", "Versus");
    expect(actual[22]).to.have.property("value", "vs.");
    expect(actual[23]).to.have.property("type", "Word");
    expect(actual[23]).to.have.property("value", "evil");
    expect(actual[24]).to.have.property("type", "RParen");
    expect(actual[24]).to.have.property("value", ")");
  });

  it("can find hp line 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "hp 84 (13d8+26)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);

    expect(actual[0]).to.have.property("type", "HpKey");
    expect(actual[0]).to.have.property("value", "hp");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "84");
    expect(actual[2]).to.have.property("type", "LParen");
    expect(actual[2]).to.have.property("value", "(");
    expect(actual[3]).to.have.property("type", "NumberWhole");
    expect(actual[3]).to.have.property("value", "13");
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "d");
    expect(actual[5]).to.have.property("type", "NumberWhole");
    expect(actual[5]).to.have.property("value", "8");
    expect(actual[6]).to.have.property("type", "NumberSigned");
    expect(actual[6]).to.have.property("value", "+26");
    expect(actual[7]).to.have.property("type", "RParen");
    expect(actual[7]).to.have.property("value", ")");
  });
  it("can find hp line 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "hp 465 (30d12+270)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);

    expect(actual[0]).to.have.property("type", "HpKey");
    expect(actual[0]).to.have.property("value", "hp");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "465");
    expect(actual[2]).to.have.property("type", "LParen");
    expect(actual[2]).to.have.property("value", "(");
    expect(actual[3]).to.have.property("type", "NumberWhole");
    expect(actual[3]).to.have.property("value", "30");
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "d");
    expect(actual[5]).to.have.property("type", "NumberWhole");
    expect(actual[5]).to.have.property("value", "12");
    expect(actual[6]).to.have.property("type", "NumberSigned");
    expect(actual[6]).to.have.property("value", "+270");
    expect(actual[7]).to.have.property("type", "RParen");
    expect(actual[7]).to.have.property("value", ")");    
  });

  it("can find hp line 3", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "hp 8 (1d10+2 plus 1)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(10);
    expect(actual[0]).to.have.property("type", "HpKey");
    expect(actual[0]).to.have.property("value", "hp");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "8");
    expect(actual[2]).to.have.property("type", "LParen");
    expect(actual[2]).to.have.property("value", "(");
    expect(actual[3]).to.have.property("type", "NumberWhole");
    expect(actual[3]).to.have.property("value", "1");
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "d");
    expect(actual[5]).to.have.property("type", "NumberWhole");
    expect(actual[5]).to.have.property("value", "10");
    expect(actual[6]).to.have.property("type", "NumberSigned");
    expect(actual[6]).to.have.property("value", "+2");
    expect(actual[7]).to.have.property("type", "Word");
    expect(actual[7]).to.have.property("value", "plus");
    expect(actual[8]).to.have.property("type", "NumberWhole");
    expect(actual[8]).to.have.property("value", "1");
    expect(actual[9]).to.have.property("type", "RParen");
    expect(actual[9]).to.have.property("value", ")");
  });
  it("can find saving throws line 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Fort +6, Ref +9, Will +8";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property("type", "FortSaveKey");
    expect(actual[0]).to.have.property("value", "Fort");
    expect(actual[1]).to.have.property("type", "NumberSigned");
    expect(actual[1]).to.have.property("value", "+6");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "RefSaveKey");
    expect(actual[3]).to.have.property("value", "Ref");
    expect(actual[4]).to.have.property("type", "NumberSigned");
    expect(actual[4]).to.have.property("value", "+9");
    expect(actual[5]).to.have.property("type", "Comma");
    expect(actual[5]).to.have.property("value", ",");
    expect(actual[6]).to.have.property("type", "WillSaveKey");
    expect(actual[6]).to.have.property("value", "Will");
    expect(actual[7]).to.have.property("type", "NumberSigned");
    expect(actual[7]).to.have.property("value", "+8");
  });

  it("can find saving throws line 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Fort +26; Ref +19; Will +23";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property("type", "FortSaveKey");
    expect(actual[0]).to.have.property("value", "Fort");
    expect(actual[1]).to.have.property("type", "NumberSigned");
    expect(actual[1]).to.have.property("value", "+26");
    expect(actual[2]).to.have.property("type", "SemiColon");
    expect(actual[2]).to.have.property("value", ";");
    expect(actual[3]).to.have.property("type", "RefSaveKey");
    expect(actual[3]).to.have.property("value", "Ref");
    expect(actual[4]).to.have.property("type", "NumberSigned");
    expect(actual[4]).to.have.property("value", "+19");
    expect(actual[5]).to.have.property("type", "SemiColon");
    expect(actual[5]).to.have.property("value", ";");
    expect(actual[6]).to.have.property("type", "WillSaveKey");
    expect(actual[6]).to.have.property("value", "Will");
    expect(actual[7]).to.have.property("type", "NumberSigned");
    expect(actual[7]).to.have.property("value", "+23");
  });

  it("can find saving throws line 3", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Fort +7, Ref +7, Will +6; +2 resistance vs. evil";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(13);
    expect(actual[0]).to.have.property("type", "FortSaveKey");
    expect(actual[0]).to.have.property("value", "Fort");
    expect(actual[1]).to.have.property("type", "NumberSigned");
    expect(actual[1]).to.have.property("value", "+7");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "RefSaveKey");
    expect(actual[3]).to.have.property("value", "Ref");
    expect(actual[4]).to.have.property("type", "NumberSigned");
    expect(actual[4]).to.have.property("value", "+7");
    expect(actual[5]).to.have.property("type", "Comma");
    expect(actual[5]).to.have.property("value", ",");
    expect(actual[6]).to.have.property("type", "WillSaveKey");
    expect(actual[6]).to.have.property("value", "Will");
    expect(actual[7]).to.have.property("type", "NumberSigned");
    expect(actual[7]).to.have.property("value", "+6");
    expect(actual[8]).to.have.property("type", "SemiColon");
    expect(actual[8]).to.have.property("value", ";");
    expect(actual[9]).to.have.property("type", "NumberSigned");
    expect(actual[9]).to.have.property("value", "+2");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "resistance");
    expect(actual[11]).to.have.property("type", "Versus");
    expect(actual[11]).to.have.property("value", "vs.");
    expect(actual[12]).to.have.property("type", "Word");
    expect(actual[12]).to.have.property("value", "evil");
  });

  it("can find Defensive Abilities line 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Defensive Abilities defensive training (+4 dodge bonus to AC vs. giants)";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(12);
    expect(actual[0]).to.have.property("type", "DefensiveAbilitiesKey");
    expect(actual[0]).to.have.property("value", "Defensive Abilities");
    expect(actual[1]).to.have.property("type", "Word");
    expect(actual[1]).to.have.property("value", "defensive");
    expect(actual[2]).to.have.property("type", "Word");
    expect(actual[2]).to.have.property("value", "training");
    expect(actual[3]).to.have.property("type", "LParen");
    expect(actual[3]).to.have.property("value", "(");
    expect(actual[4]).to.have.property("type", "NumberSigned");
    expect(actual[4]).to.have.property("value", "+4");
    expect(actual[5]).to.have.property("type", "Word");
    expect(actual[5]).to.have.property("value", "dodge");
    expect(actual[6]).to.have.property("type", "Word");
    expect(actual[6]).to.have.property("value", "bonus");
    expect(actual[7]).to.have.property("type", "Word");
    expect(actual[7]).to.have.property("value", "to");
    expect(actual[8]).to.have.property("type", "AcKey");
    expect(actual[8]).to.have.property("value", "AC");
    expect(actual[9]).to.have.property("type", "Versus");
    expect(actual[9]).to.have.property("value", "vs.");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "giants");
    expect(actual[11]).to.have.property("type", "RParen");
    expect(actual[11]).to.have.property("value", ")");

  });

  it("can find Defensive Abilities line 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Defensive Abilities blessing of Orcus, ferocity; DR 1/—";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(11);
    expect(actual[0]).to.have.property("type", "DefensiveAbilitiesKey");
    expect(actual[0]).to.have.property("value", "Defensive Abilities");
    expect(actual[1]).to.have.property("type", "Word");
    expect(actual[1]).to.have.property("value", "blessing");
    expect(actual[2]).to.have.property("type", "Word");
    expect(actual[2]).to.have.property("value", "of");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "Orcus");
    expect(actual[4]).to.have.property("type", "Comma");
    expect(actual[4]).to.have.property("value", ",");
    expect(actual[5]).to.have.property("type", "Word");
    expect(actual[5]).to.have.property("value", "ferocity");
    expect(actual[6]).to.have.property("type", "SemiColon");
    expect(actual[6]).to.have.property("value", ";");
    expect(actual[7]).to.have.property("type", "DrKey");
    expect(actual[7]).to.have.property("value", "DR");
    expect(actual[8]).to.have.property("type", "NumberWhole");
    expect(actual[8]).to.have.property("value", "1");
    expect(actual[9]).to.have.property("type", "ForwardSlash");
    expect(actual[9]).to.have.property("value", "/");
    expect(actual[10]).to.have.property("type", "MDash");
    expect(actual[10]).to.have.property("value", "\u2014");
  });

  it("can fine DR/Immune/SR line 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "DR 5/magic; Immune cold, disease, poison";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(11);
    expect(actual[0]).to.have.property("type", "DrKey");
    expect(actual[0]).to.have.property("value", "DR");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "5");
    expect(actual[2]).to.have.property("type", "ForwardSlash");
    expect(actual[2]).to.have.property("value", "/");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "magic");
    expect(actual[4]).to.have.property("type", "SemiColon");
    expect(actual[4]).to.have.property("value", ";");
    expect(actual[5]).to.have.property("type", "ImmuneKey");
    expect(actual[5]).to.have.property("value", "Immune");
    expect(actual[6]).to.have.property("type", "Word");
    expect(actual[6]).to.have.property("value", "cold");
    expect(actual[7]).to.have.property("type", "Comma");
    expect(actual[7]).to.have.property("value", ",");
    expect(actual[8]).to.have.property("type", "Word");
    expect(actual[8]).to.have.property("value", "disease");
    expect(actual[9]).to.have.property("type", "Comma");
    expect(actual[9]).to.have.property("value", ",");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "poison");
  });
    
  it("can find DR/Immune/SR line 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "DR 15/evil; Immune fire, poison, paralysis, sleep; SR 29";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(16);
    expect(actual[0]).to.have.property("type", "DrKey");
    expect(actual[0]).to.have.property("value", "DR");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "15");
    expect(actual[2]).to.have.property("type", "ForwardSlash");
    expect(actual[2]).to.have.property("value", "/");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "evil");
    expect(actual[4]).to.have.property("type", "SemiColon");
    expect(actual[4]).to.have.property("value", ";");
    expect(actual[5]).to.have.property("type", "ImmuneKey");
    expect(actual[5]).to.have.property("value", "Immune");
    expect(actual[6]).to.have.property("type", "Word");
    expect(actual[6]).to.have.property("value", "fire");
    expect(actual[7]).to.have.property("type", "Comma");
    expect(actual[7]).to.have.property("value", ",");
    expect(actual[8]).to.have.property("type", "Word");
    expect(actual[8]).to.have.property("value", "poison");
    expect(actual[9]).to.have.property("type", "Comma");
    expect(actual[9]).to.have.property("value", ",");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "paralysis");
    expect(actual[11]).to.have.property("type", "Comma");
    expect(actual[11]).to.have.property("value", ",");
    expect(actual[12]).to.have.property("type", "Word");
    expect(actual[12]).to.have.property("value", "sleep");
    expect(actual[13]).to.have.property("type", "SemiColon");
    expect(actual[13]).to.have.property("value", ";");
    expect(actual[14]).to.have.property("type", "SrKey");
    expect(actual[14]).to.have.property("value", "SR");
    expect(actual[15]).to.have.property("type", "NumberWhole");
    expect(actual[15]).to.have.property("value", "29");    
  });

  it("can find Resist line 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "DR 5/cold iron; Resist acid 5, fire 5"
    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(12);
    expect(actual[0]).to.have.property("type", "DrKey");
    expect(actual[0]).to.have.property("value", "DR");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "5");
    expect(actual[2]).to.have.property("type", "ForwardSlash");
    expect(actual[2]).to.have.property("value", "/");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "cold");
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "iron");    
    expect(actual[5]).to.have.property("type", "SemiColon");
    expect(actual[5]).to.have.property("value", ";");
    expect(actual[6]).to.have.property("type", "ResistKey");
    expect(actual[6]).to.have.property("value", "Resist");
    expect(actual[7]).to.have.property("type", "Word");
    expect(actual[7]).to.have.property("value", "acid");
    expect(actual[8]).to.have.property("type", "NumberWhole");
    expect(actual[8]).to.have.property("value", "5");
    expect(actual[9]).to.have.property("type", "Comma");
    expect(actual[9]).to.have.property("value", ",");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "fire");
    expect(actual[11]).to.have.property("type", "NumberWhole");
    expect(actual[11]).to.have.property("value", "5");
  });

  it("can find Resist line 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "DR 5/adamantine; Immune construct traits; Resist cold 10, fire 10";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(15);
    expect(actual[0]).to.have.property("type", "DrKey");
    expect(actual[0]).to.have.property("value", "DR");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "5");
    expect(actual[2]).to.have.property("type", "ForwardSlash");
    expect(actual[2]).to.have.property("value", "/");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "adamantine");
    expect(actual[4]).to.have.property("type", "SemiColon");
    expect(actual[4]).to.have.property("value", ";");
    expect(actual[5]).to.have.property("type", "ImmuneKey");
    expect(actual[5]).to.have.property("value", "Immune");
    expect(actual[6]).to.have.property("type", "CreatureType");
    expect(actual[6]).to.have.property("value", "construct");
    expect(actual[7]).to.have.property("type", "Word");
    expect(actual[7]).to.have.property("value", "traits");
    expect(actual[8]).to.have.property("type", "SemiColon");
    expect(actual[8]).to.have.property("value", ";");
    expect(actual[9]).to.have.property("type", "ResistKey");
    expect(actual[9]).to.have.property("value", "Resist");
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "cold");
    expect(actual[11]).to.have.property("type", "NumberWhole");
    expect(actual[11]).to.have.property("value", "10");
    expect(actual[12]).to.have.property("type", "Comma");
    expect(actual[12]).to.have.property("value", ",");
    expect(actual[13]).to.have.property("type", "Word");
    expect(actual[13]).to.have.property("value", "fire");
    expect(actual[14]).to.have.property("type", "NumberWhole");
    expect(actual[14]).to.have.property("value", "10");
  });

  it("can find Weaknesses line 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "Weaknesses vulnerable to electricity";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(4);
    expect(actual[0]).to.have.property("type", "WeaknessesKey");
    expect(actual[0]).to.have.property("value", "Weaknesses");
    expect(actual[1]).to.have.property("type", "Word");
    expect(actual[1]).to.have.property("value", "vulnerable");
    expect(actual[2]).to.have.property("type", "Word");
    expect(actual[2]).to.have.property("value", "to");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "electricity");
  });

  it("can find Weaknesses line 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = `DR 10/adamantine and magic; Immune fire, mind-affecting
effects; Resist cold 20, electricity 20, sonic 20; SR 23
Weaknesses vulnerability to protection from evil`;

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(33);
    expect(actual[0]).to.have.property("type", "DrKey");
    expect(actual[0]).to.have.property("value", "DR");
    expect(actual[1]).to.have.property("type", "NumberWhole");
    expect(actual[1]).to.have.property("value", "10");
    expect(actual[2]).to.have.property("type", "ForwardSlash");
    expect(actual[2]).to.have.property("value", "/");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "adamantine");
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "and");
    expect(actual[5]).to.have.property("type", "Word");
    expect(actual[5]).to.have.property("value", "magic");
    expect(actual[6]).to.have.property("type", "SemiColon");
    expect(actual[6]).to.have.property("value", ";");
    expect(actual[7]).to.have.property("type", "ImmuneKey");
    expect(actual[7]).to.have.property("value", "Immune");
    expect(actual[8]).to.have.property("type", "Word");
    expect(actual[8]).to.have.property("value", "fire");
    expect(actual[9]).to.have.property("type", "Comma");
    expect(actual[9]).to.have.property("value", ",");
    // TODO: what about common words like "mind-affecting"?
    expect(actual[10]).to.have.property("type", "Word");
    expect(actual[10]).to.have.property("value", "mind");
    expect(actual[11]).to.have.property("type", "Dash");
    expect(actual[11]).to.have.property("value", "-");
    expect(actual[12]).to.have.property("type", "Word");
    expect(actual[12]).to.have.property("value", "affecting");
    expect(actual[13]).to.have.property("type", "Word");
    expect(actual[13]).to.have.property("value", "effects");
    expect(actual[14]).to.have.property("type", "SemiColon");
    expect(actual[14]).to.have.property("value", ";");
    expect(actual[15]).to.have.property("type", "ResistKey");
    expect(actual[15]).to.have.property("value", "Resist");
    expect(actual[16]).to.have.property("type", "Word");
    expect(actual[16]).to.have.property("value", "cold");
    expect(actual[17]).to.have.property("type", "NumberWhole");
    expect(actual[17]).to.have.property("value", "20");
    expect(actual[18]).to.have.property("type", "Comma");
    expect(actual[18]).to.have.property("value", ",");
    expect(actual[19]).to.have.property("type", "Word");
    expect(actual[19]).to.have.property("value", "electricity");
    expect(actual[20]).to.have.property("type", "NumberWhole");
    expect(actual[20]).to.have.property("value", "20");
    expect(actual[21]).to.have.property("type", "Comma");
    expect(actual[21]).to.have.property("value", ",");
    expect(actual[22]).to.have.property("type", "Word");
    expect(actual[22]).to.have.property("value", "sonic");
    expect(actual[23]).to.have.property("type", "NumberWhole");
    expect(actual[23]).to.have.property("value", "20");
    expect(actual[24]).to.have.property("type", "SemiColon");
    expect(actual[24]).to.have.property("value", ";");
    expect(actual[25]).to.have.property("type", "SrKey");
    expect(actual[25]).to.have.property("value", "SR");
    expect(actual[26]).to.have.property("type", "NumberWhole");
    expect(actual[26]).to.have.property("value", "23");
    // TODO: \n is like a ;, sometimes...
    expect(actual[27]).to.have.property("type", "WeaknessesKey");
    expect(actual[27]).to.have.property("value", "Weaknesses");
    expect(actual[28]).to.have.property("type", "Word");
    expect(actual[28]).to.have.property("value", "vulnerability");
    expect(actual[29]).to.have.property("type", "Word");
    expect(actual[29]).to.have.property("value", "to");
    expect(actual[30]).to.have.property("type", "Word");
    expect(actual[30]).to.have.property("value", "protection");
    expect(actual[31]).to.have.property("type", "Word");
    expect(actual[31]).to.have.property("value", "from");
    expect(actual[32]).to.have.property("type", "Word");
    expect(actual[32]).to.have.property("value", "evil");
  });
    
  it("can find Offense key", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = "OFFENSE";

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(1);
    expect(actual[0]).to.have.property("type", "OffenseKey");
  });

  it("can find Speed line 1", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = `Speed 5 ft., fly 50 ft. (good)`;

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property("type", "SpeedKey");
    expect(actual[0]).to.have.property("value", "Speed");
    expect(actual[1]).to.have.property("type", "SizeValue");
    expect(actual[1]).to.have.property("value", "5 ft.");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "fly");
    expect(actual[4]).to.have.property("type", "SizeValue");
    expect(actual[4]).to.have.property("value", "50 ft.");
    expect(actual[5]).to.have.property("type", "LParen");
    expect(actual[5]).to.have.property("value", "(");
    expect(actual[6]).to.have.property("type", "Word");
    expect(actual[6]).to.have.property("value", "good");
    expect(actual[7]).to.have.property("type", "RParen");
    expect(actual[7]).to.have.property("value", ")");
  });
  
  it("can find Speed line 2", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = `Speed 40 ft.`;

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(2);
    expect(actual[0]).to.have.property("type", "SpeedKey");
    expect(actual[0]).to.have.property("value", "Speed");
    expect(actual[1]).to.have.property("type", "SizeValue");
    expect(actual[1]).to.have.property("value", "40 ft.");
  });
  
  it("can find Speed line 3", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = `Speed 10 ft., swim 60 ft.`;

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(5);
    expect(actual[0]).to.have.property("type", "SpeedKey");
    expect(actual[0]).to.have.property("value", "Speed");
    expect(actual[1]).to.have.property("type", "SizeValue");
    expect(actual[1]).to.have.property("value", "10 ft.");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "swim");
    expect(actual[4]).to.have.property("type", "SizeValue");
    expect(actual[4]).to.have.property("value", "60 ft.");
  });
  
  it("can find Speed line 4", () => {
    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input = `Speed 50 ft., fly 200 ft. (poor)`;

    let actual = TestHelper.runLexer(lexer, input);

    expect(actual.length).to.equal(8);
    expect(actual[0]).to.have.property("type", "SpeedKey");
    expect(actual[0]).to.have.property("value", "Speed");
    expect(actual[1]).to.have.property("type", "SizeValue");
    expect(actual[1]).to.have.property("value", "50 ft.");
    expect(actual[2]).to.have.property("type", "Comma");
    expect(actual[2]).to.have.property("value", ",");
    expect(actual[3]).to.have.property("type", "Word");
    expect(actual[3]).to.have.property("value", "fly");
    expect(actual[4]).to.have.property("type", "SizeValue");
    expect(actual[4]).to.have.property("value", "200 ft.");
    expect(actual[5]).to.have.property("type", "LParen");
    expect(actual[5]).to.have.property("value", "(");
    expect(actual[6]).to.have.property("type", "Word");
    expect(actual[6]).to.have.property("value", "poor");
    expect(actual[7]).to.have.property("type", "RParen");
    expect(actual[7]).to.have.property("value", ")");
  });
});