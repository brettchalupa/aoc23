import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { stepsToReachEnd } from "./main.ts";

const testInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const testInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

Deno.test("stepToReachEnd", () => {
  assertEquals(2, stepsToReachEnd(testInput1));
  assertEquals(6, stepsToReachEnd(testInput2));
});
