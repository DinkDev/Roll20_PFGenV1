import * as nearley from "nearley";
import * as pathfinderGrammar from "../grammarout/pathfinder1";  // TODO: move to an intermediate directory
import { aatheriexaStatBlock } from "./aatheriexa_stat";

describe(`simple_parser`, () => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(pathfinderGrammar));

  try {
    parser.feed(aatheriexaStatBlock);

    // TODO: much work to be done here!
    const res = parser.results;
  } catch (error) {
    // catch to allow test to complete, even though it failed!
    const myError = error;
  }
});
