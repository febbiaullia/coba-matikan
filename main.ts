import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// "Have You Tried Turning It Off?" — one funny single-line reply that a
// hopeless tech support agent gives a desperate customer, written to
// /output/entry.txt (the gate wants UTF-8 text of 1 to 199 characters).
//
// The classic fix never gets said out loud. Instead the agent does the
// most support-agent thing possible: escalates the ticket. The twist is
// where it escalates to — the highest level of support turns out to be
// the power button itself, which is the "turn it off and on again"
// cliché wearing a tier-3 badge.

const LINE =
  "I've escalated your ticket to the highest level of support: the power button.";

// Mirror the competition gate locally (UTF-8 text of 1 to 199 characters,
// not only white space, one single line) so a future edit to the line
// fails loudly here instead of writing an entry the sealed scorer would
// refuse.
function checkGate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 199) {
    throw new Error(`gate: line is ${chars} characters, must be 1 to 199`);
  }
  if (line.trim().length === 0) {
    throw new Error("gate: line is only white space");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("gate: line must be a single line");
  }
}

checkGate(LINE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, LINE, "utf8");

console.log(`wrote ${outputPath} (${LINE.length} characters)`);
