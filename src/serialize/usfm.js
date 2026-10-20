function draftJson2usfm(json) {
  let retBits = [];
  // Process headers
  if (!json.headers.id) {
    return new Error("No id found in headers");
  }
  retBits.push(`\\id ${json.headers.id}`);
  for (const headerTag of ["toc", "toc2", "toc3", "h"]) {
    if (json.headers[headerTag]) {
      retBits.push(
        `\\${headerTag === "toc" ? "toc1" : headerTag} ${json.headers[headerTag]}`,
      );
    }
  }
  // Process blocks
  let waiting = [];
  for (const block of json.blocks) {
    switch (block.type) {
      case "chapter":
        waiting.push(`\\c ${block.chapter}`);
        break;
      case "remark":
        retBits.push(`\\rem ${block.content[0]}`);
        break;
      case "main":
        for (const waitingThing of waiting) {
          retBits.push(waiting);
        }
        waiting = [];
        retBits.push(`\\${block.tag}`);
        for (const unit of block.units) {
          retBits.push(`\\v ${unit.verses}`);
          const trimmedContent = unit.content[0].trim();
          retBits.push(trimmedContent.length === 0 ? "___" : trimmedContent);
        }
        break;
      default:
        retBits.push(
          `\\${block.tag} ${block.content[0].length === 0 ? "___" : block.content[0]}`,
        );
    }
  }
  return retBits.join("\n");
}

export {draftJson2usfm};