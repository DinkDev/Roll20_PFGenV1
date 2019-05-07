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
    expect("NG").to.equal(actual[0].text);
    expect("*").to.equal(actual[1].text);
    expect("Huge").to.equal(actual[2].text);
    expect("dragon").to.equal(actual[3].text);
    expect("(").to.equal(actual[4].text);
    expect("extraplanar").to.equal(actual[5].text);
    expect(",").to.equal(actual[6].text);
    expect("good").to.equal(actual[7].text);
    expect(")").to.equal(actual[8].text);
  }); 
  it("can find Alignment, Size, and Type line data 3", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "Small humanoid (gnome) N";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(6).to.equal(actual.length);
    expect("Small").to.equal(actual[0].text);
    expect("humanoid").to.equal(actual[1].text);
    expect("(").to.equal(actual[2].text);
    expect("gnome").to.equal(actual[3].text);
    expect(")").to.equal(actual[4].text);
    expect("N").to.equal(actual[5].text);
  });
  it("can find Alignment, Size, and Type line data 4", () => {

    let sut = new StatBlockLexer();
    let lexer = sut.getLexer();

    const input1 = "CG Large magical beast";
    let actual = TestHelper.runLexer(lexer, input1);

    expect(3).to.equal(actual.length);
    expect("CG").to.equal(actual[0].text);
    expect("Large").to.equal(actual[1].text);
    expect("magical beast").to.equal(actual[2].text);
  });
});