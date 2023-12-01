import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { calibration, sumDocumentCalibration } from "./calibration.ts";

Deno.test("string calibration", () => {
  assertEquals(12, calibration("1abc2"));
  assertEquals(38, calibration("pqr3stu8vwx"));
  assertEquals(15, calibration("a1b2c3d4e5f"));
  assertEquals(77, calibration("treb7uchet"));
});

Deno.test("document calibration sum", async () => {
  assertEquals(142, await sumDocumentCalibration("input-test.txt"));
});
