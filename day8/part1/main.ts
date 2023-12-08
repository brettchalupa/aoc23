// AOC23 D8P1
// https://adventofcode.com/2023/day/8

const Start = "AAA";
const Finish = "ZZZ";
const Left = "L";
// const Right = "R";

interface Node {
  element: string;
  left: string;
  right: string;
}

/**
 * Returns the number of steps to navigate from Start ("AAA") to Finish ("ZZZ")
 */
export function navigateNodes(nodes: Node[], instructions: string[]): number {
  let node = nodes.find((n) => n.element === Start);
  let steps = 0;
  let instructionsIndex = 0;

  while (true) {
    const stepDir = instructions[instructionsIndex];

    if (stepDir === undefined) {
      throw new Error(`undefined stepDir at step ${steps}`);
    }

    let nextElement = "";
    steps++;

    if (node === undefined) {
      throw new Error(`node at step ${steps} is undefined`);
    }

    if (stepDir === Left) {
      nextElement = node.left;
    } else {
      nextElement = node.right;
    }

    if (nextElement === Finish) {
      return steps;
    } else {
      node = nodes.find((n) => n.element === nextElement);
      instructionsIndex++;
      if (instructionsIndex >= instructions.length) {
        instructionsIndex = 0;
      }
    }
  }
}

export function stepsToReachEnd(str: string): number {
  const split = str.split("\n\n");
  const instructions = split[0].trim().split("");
  const nodeLines = split[1].trim().split("\n");
  const nodes: Node[] = nodeLines.map((line) => {
    const lineSplit = line.split(" = ");
    const elements = lineSplit[1].substring(1, 9).split(", ");
    return {
      element: lineSplit[0],
      left: elements[0],
      right: elements[1],
    };
  });
  return navigateNodes(nodes, instructions);
}

if (import.meta.main) {
  console.log(stepsToReachEnd(await Deno.readTextFile(Deno.args[0])));
}
