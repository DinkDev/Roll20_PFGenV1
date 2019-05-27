@preprocessor typescript

@{%
import moo from "moo";
import { StatBlockLexer } from "../src/StatBlockLexer";

export interface Lexer {
    reset: (chunk: string, info: any) => void;
    next: () => Token | undefined;
    save: () => any;
    formatError: (token: Token) => string;
    has: (tokenType: string) => boolean;
}

const statBlock = new StatBlockLexer();
// make typescript happy!
const lexer = statBlock.getSectionLexer() as unknown as Lexer;
%}

@lexer lexer

SimpleStatBlock -> Words ( __ Section __ Words ):*
Section -> %DefenseKey
 | %OffenseKey
 | %TacticsKey
 | %StatisticsKey
 | %SpecialAbilitiesKey
 | %GearKey
 | %EcologyKey
Words -> ( Words __ ):*
 | %Word
 | Punctuation 
 | Number
# | ( Words _ ):* 
Punctuation ->
 %Colon
 | %SemiColon
 | %Comma
 | %Period
 | %Dash
 | %MDash
 | %NDash
 | %DoubleQuoteOpen
 | %DoubleQuoteClose
 | %Asterisk
 | %LParen
 | %RParen
 | %ForwardSlash
 Number ->
   %DiceRoll
 | %NumberSigned
 | %NumberWhole
_ -> %WS:*
__ -> %WS:+
