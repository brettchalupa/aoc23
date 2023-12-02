import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  calibration,
  firstDigit,
  lastDigit,
  sumDocumentCalibration,
} from "./calibration.ts";

Deno.test("firstDigit", () => {
  assertEquals(2, firstDigit("two1nine"));
  assertEquals(8, firstDigit("eightwothree"));
  assertEquals(1, firstDigit("abcone2threexyz"));
  assertEquals(2, firstDigit("xtwone3four"));
  assertEquals(4, firstDigit("4nineeightseven2"));
  assertEquals(1, firstDigit("zoneight234"));
  assertEquals(7, firstDigit("7pqrstsixteen"));
});

Deno.test("lastDigit", () => {
  assertEquals(9, lastDigit("two1nine"));
  assertEquals(3, lastDigit("eightwothree"));
  assertEquals(3, lastDigit("abcone2threexyz"));
  assertEquals(4, lastDigit("xtwone3four"));
  assertEquals(2, lastDigit("4nineeightseven2"));
  assertEquals(4, lastDigit("zoneight234"));
  assertEquals(6, lastDigit("7pqrstsixteen"));
});

Deno.test("string calibration", () => {
  assertEquals(12, calibration("1abc2"));
  assertEquals(38, calibration("pqr3stu8vwx"));
  assertEquals(15, calibration("a1b2c3d4e5f"));
  assertEquals(77, calibration("treb7uchet"));
  assertEquals(29, calibration("two1nine"));
  assertEquals(83, calibration("eightwothree"));
  assertEquals(13, calibration("abcone2threexyz"));
  assertEquals(24, calibration("xtwone3four"));
  assertEquals(42, calibration("4nineeightseven2"));
  assertEquals(14, calibration("zoneight234"));
  assertEquals(76, calibration("7pqrstsixteen"));
});

Deno.test("document calibration sum", async () => {
  assertEquals(281, await sumDocumentCalibration("input-test.txt"));
});
