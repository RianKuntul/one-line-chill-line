// One Line, One Chill — entry program (v2).
//
// Writes a single line of horror to /output/entry.txt: one sentence,
// under 200 characters, that has to frighten a reader in one breath.
// Dread that outlasts the line, earned not announced.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The horror line. A year of innocent drawings, and only now does the
// narrator see what was in every single one: a man standing behind
// them, drawn by a child who never mentioned him. The scare is what
// the line withholds — how long he has been there, and where he is now.
const ENTRY_LINE: string =
  "My daughter has drawn our family every day for a year, and today she finally drew the man who stands behind me in each one.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-200 characters, or
  // anything that is only whitespace.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
