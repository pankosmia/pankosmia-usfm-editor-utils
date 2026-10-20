
import test from "tape";
import { getBookCode } from "../../src/utils/index.js";

test("Utils: getBookCode returns valid book code", (t) => {
  t.plan(2);
  const usfm = `\\id GEN something here`;

  const result = getBookCode(usfm);

  t.equal(result.ok, true);
  t.equal(result.value, "GEN");
  t.end();
});

test("Utils: getBookCode returns error if no \\id line", (t) => {
  t.plan(2);
  const usfm = `\\c 1 verse text`;

  const result = getBookCode(usfm);

  t.equal(result.ok, false);
  t.equal(result.error, "NO_USFM_ID_FOUND");
  t.end();
});

test("Utils: getBookCode returns error for invalid book code", (t) => {
  t.plan(2);
  const usfm = `\\id GENE something`;

  const result = getBookCode(usfm);

  t.equal(result.ok, false);
  t.equal(result.error, "BAD_USFM_ID_LINE");
  t.end();
});