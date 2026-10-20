import test from "tape";
import { draftJson2usfm } from "../../src/serialize/index.js";

test("Serialize: Hello world", (t) => {
  t.plan(3);
  const usfm =
    "\\id GEN\n\\toc2 Genesis\n\\mt Book of Genesis\n\\c 1\n\\p\n\\v 1\nIn the beginning";
  const draftJson = {
    headers: {
      id: "GEN",
      bookCode: "GEN",
      toc2: "Genesis",
    },
    blocks: [
      {
        type: "chapter",
        chapter: 1,
      },
      {
        type: "title",
        tag: "mt",
        content: ["Book of Genesis"],
      },
      {
        type: "main",
        tag: "p",
        units: [
          {
            chapter: 1,
            verses: "1",
            content: ["In the beginning"],
          },
        ],
      },
    ],
  };

  const doSerialize = () => {
    draftJson2usfm(draftJson);
  };
  t.doesNotThrow(doSerialize);
  const result = draftJson2usfm(draftJson);
  t.equal(typeof result, "string");
  t.equal(result, usfm);
  t.end();
});
