@preprocessor typescript

@{%
import moo from "moo";
import { StatBlockLexer } from "../src/StatBlockLexer";

const statBlock = new StatBlockLexer();
// make typescript happy
// Nearley's Lexer definition doesn't include moo module,
// so cast it to Nearley's definition!
const lexer = statBlock.getStatBlockLexer() as unknown as Lexer;
%}

@lexer lexer

SimpleStatBlock -> HeaderBlock DefenseBlock Todo
HeaderBlock -> NameAndCrLine __ XpLine __ AlignSizeAndTypeLine __ InitSensesPerceptLine _ AuraLine:? __
NameAndCrLine -> WordAndSpace:+ CrSec
WordAndSpace -> CompoundWord __
CompoundWord -> %Word
CompoundWord -> %Word %Dash %Word
WordsAndComma -> _ WordAndSpace:* CompoundWord %Comma
CommaSeperatedListOfWords -> WordsAndComma:* _ WordAndSpace:* CompoundWord
CrSec -> %CrKey __ %NumberWhole FractionalCr:?
 | %CrKey __ %MDash
FractionalCr -> %ForwardSlash %NumberWhole
XpLine -> %XpKey __ %NumberWhole
XpLine -> XpRaceClassLevel __ %XpKey __ %NumberWhole
XpRaceClassLevel -> WordAndSpace:+ %NumberWhole
AlignSizeAndTypeLine -> %Alignment %Asterisk:? __ %CreatureSize __ %CreatureType _ SubtypeList:?
AlignSizeAndTypeLine -> %CreatureSize __ %CreatureType __ SubtypeList:? _ %Alignment 
SubtypeList -> %LParen CommaSeperatedListOfWords %RParen
InitSensesPerceptLine -> InitSec __ SensesSec __ PerceptSec
InitSec -> %InitKey __ %NumberSigned %SemiColon
SpaceAndSize -> __ %SizeValue
WordsAndSize -> WordAndSpace:* CompoundWord SpaceAndSize:?
WordsSizeAndComma -> _ WordsAndSize %Comma
CommaSeperatedWordsAndSize -> WordsSizeAndComma:* _ WordsAndSize %SemiColon
SensesSec -> %SensesKey _ CommaSeperatedWordsAndSize:?
PerceptSec -> %PerceptionKey __ %NumberSigned
AuraLine -> %AuraKey AuraDetailAndComma:* __ AuraDetail
AuraDetail -> WordAndSpace:+ AuraStats:?
AuraStats -> %LParen %SizeValue:? %Comma:? %DcKey:? _ %NumberWhole:? %Comma:? _ %NumberWhole:? %DiceRoll:? _ %CompountWord:? %RParen
AuraDetailAndComma -> _ AuraDetail %Comma
DefenseBlock -> %DefenseKey Todo
Todo -> "TODO"

# Words ( __ Section __ Words ):*
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
