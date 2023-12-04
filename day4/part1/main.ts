// AOC23 D4P1
// https://adventofcode.com/2023/day/4
// Answer: 23750

interface Card {
  cardNumber: number;
  yourNumbers: number[];
  winningNumbers: number[];
  matches: number[];
}

function numbersStrToArray(str: string): number[] {
  return str.split(" ").map((str) => str.trim())
    .filter((str: string) => str.trim() !== "")
    .map((str: string) => Number.parseInt(str));
}

function sortNumbers(arr: number[]): number[] {
  return arr.sort((a, b) => a - b);
}

export function strToCard(str: string): Card {
  const split = str.split(":");
  const card = split[0];
  const numbersSplit = split[1].split("|");
  const winningNumbers = numbersStrToArray(numbersSplit[0]);
  const yourNumbers = numbersStrToArray(numbersSplit[1]);
  return {
    cardNumber: Number.parseInt(card.match(/\d+/)![0]),
    yourNumbers: sortNumbers(yourNumbers),
    winningNumbers: sortNumbers(winningNumbers),
    matches: sortNumbers(
      yourNumbers.filter((num) => winningNumbers.includes(num)),
    ),
  };
}

export function scoreCard(card: Card): number {
  if (card.matches.length < 1) {
    return 0;
  } else {
    return Math.pow(2, card.matches.length - 1);
  }
}

export function sumOfScratchCards(str: string): number {
  return str.trim().split("\n")
    .map((l: string) => strToCard(l))
    .reduce((acc: number, card: Card) => acc + scoreCard(card), 0);
}

if (import.meta.main) {
  console.log(sumOfScratchCards(await Deno.readTextFile(Deno.args[0])));
}
