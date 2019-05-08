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

    expect(actual.length).to.equal(24);
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

    expect(actual[10]).to.have.property("type", "NumberWhole");
    expect(actual[10]).to.have.property("value", "120");

    expect(actual[11]).to.have.property("type", "Word");
    expect(actual[11]).to.have.property("value", "ft");

    expect(actual[12]).to.have.property("type", "Period");

    expect(actual[13]).to.have.property("type", "Comma");

    expect(actual[14]).to.have.property("type", "Word");
    expect(actual[14]).to.have.property("value", "low");

    expect(actual[15]).to.have.property("type", "Dash");
    expect(actual[15]).to.have.property("value", "-");

    expect(actual[16]).to.have.property("type", "Word");
    expect(actual[16]).to.have.property("value", "light");

    expect(actual[17]).to.have.property("type", "Word");
    expect(actual[17]).to.have.property("value", "vision");

    expect(actual[18]).to.have.property("type", "Comma");

    expect(actual[19]).to.have.property("type", "Word");
    expect(actual[19]).to.have.property("value", "see");

    expect(actual[20]).to.have.property("type", "Word");
    expect(actual[20]).to.have.property("value", "invisibility");

    expect(actual[21]).to.have.property("type", "SemiColon");

    expect(actual[22]).to.have.property("type", "PerceptionKey");
    expect(actual[22]).to.have.property("value", "Perception");

    expect(actual[23]).to.have.property("type", "NumberSigned");
    expect(actual[23]).to.have.property("value", "+28");
  });

  it("can find Init/Senses/Perception data 2", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "Init +5; Senses darkvision 60 ft.; Perception +14";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(actual.length).to.equal(11);
    expect(actual[0]).to.have.property("type", "InitKey");
    expect(actual[0]).to.have.property("value", "Init");
    
    expect(actual[1]).to.have.property("type", "NumberSigned");
    expect(actual[1]).to.have.property("value", "+5");
    
    expect(actual[2]).to.have.property("type", "SemiColon");
    
    expect(actual[3]).to.have.property("type", "SensesKey");
    expect(actual[3]).to.have.property("value", "Senses");
    
    expect(actual[4]).to.have.property("type", "Word");
    expect(actual[4]).to.have.property("value", "darkvision");
    
    expect(actual[5]).to.have.property("type", "NumberWhole");
    expect(actual[5]).to.have.property("value", "60");
    
    expect(actual[6]).to.have.property("type", "Word");
    expect(actual[6]).to.have.property("value", "ft");
    
    expect(actual[7]).to.have.property("type", "Period");
    
    expect(actual[8]).to.have.property("type", "SemiColon");
    
    expect(actual[9]).to.have.property("type", "PerceptionKey");
    expect(actual[9]).to.have.property("value", "Perception");
    
    expect(actual[10]).to.have.property("type", "NumberSigned");
    expect(actual[10]).to.have.property("value", "+14");
  });
});