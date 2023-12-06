// AOC23 D6P1
// https://adventofcode.com/2023/day/6

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
  const lineNums: number[][] = str.trim()
    .split("\n")
    .map((line) => {
      return line.split(":")[1].trim()
        .split(" ")
        .filter((str) => str.trim() !== "")
        .map((str) => Number.parseInt(str));
    });

  const times = lineNums[0];
  const distances = lineNums[1];
  const races: Race[] = [];

  for (let i = 0; i < times.length; i++) {
    races.push({
      distance: distances[i],
      time: times[i],
    });
  }

  return races.map((r) => waysToBeatRecord(r))
    .reduce((acc, num) => acc * num, 1);
}

if (import.meta.main) {
  console.log(
    numberOfWaysToBeatEachRecord(await Deno.readTextFile(Deno.args[0])),
  );
}
