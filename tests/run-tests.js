import fs from "fs";
import path from "path";
import os from "os";

function findTests(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let tests = [];

  for (const e of entries) {
    const full = path.join(dir, e.name);

    if (e.isDirectory()) {
      tests = tests.concat(findTests(full));
    }

    if (e.isFile() && e.name.endsWith(".test.js")) {
      tests.push(full);
    }
  }

  return tests;
}

const user = os.userInfo().username;
console.log(`Running as user: ${user}`);

const testDir = path.resolve("./tests");
const tests = findTests(testDir);

console.log(`Running ${tests.length} test files...\n`);

try {
  for (const testFile of tests) {
    console.log("▶", testFile);
    await import(path.resolve(testFile));
  }

  // Give Tape's asynchronous tests time to finish.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("\n✓ Tests completed");
} catch (err) {
  console.error(`Error on running tests: ${err}`)
}