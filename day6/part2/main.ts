// AOC23 D6P2
// https://adventofcode.com/2023/day/6#part2

interface Race {
  distance: number;
  time: number;
}

export function waysToBeatRecord(race: Race): number {
  let waysToBeat = 0;

  for (const holdTime of [...Array(race.time + 1).keys()]) {
    const speed = holdTime;
    const remainingTime = race.time - holdTime;
    const distance = speed * remainingTime;

    if (distance > race.distance) {
      waysToBeat++;
    }
  }

  return waysToBeat;
}

export function numberOfWaysToBeatEachRecord(str: string): number {
  const lineNums: number[] = str.trim()
    .split("\n")
    .map((line) => {
      const numStr = line.split(":")[1].trim()
        .split(" ")
        .filter((str) => str.trim() !== "")
        .join("");
      return Number.parseInt(numStr);
    });

  const race = { time: lineNums[0], distance: lineNums[1] };
  return waysToBeatRecord(race);
}

if (import.meta.main) {
  console.log(
    numberOfWaysToBeatEachRecord(await Deno.readTextFile(Deno.args[0])),
  );
}
