import test from "tape";
import path from 'path';
import fse from 'fs-extra';
import { parseUsfm2draftJson, parseUsfm2viewerJson } from "../../src/parse/index.js";

test("Parse: Hello world", (t) => {
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
  t.end();
});

test("Parse: PSA", (t) => {
    t.plan(1);
  const usfm = fse.readFileSync(path.resolve("./test_data/PSA_v0.usfm"));
    const doParse = () => {parseUsfm2draftJson(usfm)};
  t.doesNotThrow(doParse);
  const result = parseUsfm2draftJson(usfm);
  t.end();
});

test("Parse viewer: Hello world", (t) => {
  t.plan(12);

  const usfm =
    "\\id GEN\n\\toc2 Genesis\n\\mt Book of Genesis\n\\c 1\n\\p\n\\v 1\nIn the beginning";

  const doParse = () => {
    parseUsfm2viewerJson(usfm);
  };

  t.doesNotThrow(doParse, "viewer parser does not throw");

  const result = parseUsfm2viewerJson(usfm);

  t.equal(typeof result, "object", "viewer result is an object");
  t.equal(result.headers.bookCode, "GEN", "viewer bookCode is GEN");
  t.equal(result.headers.toc2, "Genesis", "viewer toc2 is Genesis");
  t.equal(result.blocks.length, 3, "viewer has 3 blocks");

  t.equal(
    result.blocks[0].type,
    "chapter",
    "viewer block 0 is chapter",
  );
  t.equal(
    result.blocks[0].chapter,
    1,
    "viewer chapter number is 1",
  );

  t.equal(
    result.blocks[1].type,
    "title",
    "viewer block 1 is title",
  );
  t.equal(
    result.blocks[1].tag,
    "mt",
    "viewer title tag is mt",
  );
  t.equal(
    result.blocks[1].content[0],
    "Book of Genesis",
    "viewer title content is Book of Genesis",
  );

  t.equal(
    result.blocks[2].type,
    "main",
    "viewer block 2 is main",
  );
  t.equal(
    result.blocks[2].tag,
    "p",
    "viewer main block tag is p",
  );

  t.end();
});