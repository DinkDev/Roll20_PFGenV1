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
});