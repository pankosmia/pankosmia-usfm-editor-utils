import test from "tape";
import { parseUsfm2draftJson } from "../../src/parse/index.js";

test("USFM Parse: Hello world", (t) => {
    t.plan(13);
  const usfm =
    "\\id GEN\n\\toc2 Genesis\n\\mt Book of Genesis\n\\c 1\n\\p\n\\v 1\nIn the beginning";
    const doParse = () => {parseUsfm2draftJson(usfm)};
  t.doesNotThrow(doParse);
  const result = parseUsfm2draftJson(usfm);
  t.equal(typeof result, "object");
  t.equal(result.headers.bookCode, "GEN");
  t.equal(result.headers.toc2, "Genesis");
  t.equal(result.blocks.length, 3);
  t.equal(result.blocks[0].type, "chapter");
  t.equal(result.blocks[0].chapter, 1 );
  t.equal(result.blocks[1].type, "title");
  t.equal(result.blocks[1].tag, "mt");
  t.equal(result.blocks[1].content[0], "Book of Genesis");
  t.equal(result.blocks[2].type, "main");
  t.equal(result.blocks[2].tag, "p");
  t.equal(result.blocks[2].units[0].content[0], "In the beginning");
  // console.log(JSON.stringify(result, null, 2));
  t.end();
});
