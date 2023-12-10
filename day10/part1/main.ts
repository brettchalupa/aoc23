// AOC23 D10P1
// https://adventofcode.com/2023/day/10

interface Point {
  x: number;
  y: number;
  tile: Tile;
}

enum Tile {
  Vertical = "|",
  Horizontal = "-",
  CornerBL = "L",
  CornerBR = "J",
  CornerUR = "7",
  CornerUL = "F",
  Ground = ".",
  Start = "S",
}

enum Direction {
  N = 0,
  E,
  S,
  W,
}

function isConnectedNeighbor(
  point: Point,
  neighbor: Point,
  direction: Direction,
): boolean {
  switch (direction) {
    case Direction.N:
      return neighbor.tile === Tile.Vertical ||
        neighbor.tile === Tile.CornerUR || neighbor.tile === Tile.CornerUL;
    case Direction.E:
      return neighbor.tile === Tile.Horizontal ||
        neighbor.tile === Tile.CornerBR || neighbor.tile === Tile.CornerUR;
    case Direction.S:
      return neighbor.tile === Tile.Vertical ||
        neighbor.tile === Tile.CornerBL || neighbor.tile === Tile.CornerBR;
    case Direction.W:
      return neighbor.tile === Tile.Horizontal ||
        neighbor.tile === Tile.CornerBL || neighbor.tile === Tile.CornerUL;
  }
}

/**
 * Returns the number of steps it takes to navigate the loop from the S starting point
 */
function navigateLoop(points: Point[]): number {
  const startingPoint = points.find((p) => p.tile === Tile.Start)!;
  let point = startingPoint;
  let steps = 0;
  let navigatingLoop = true;
  let direction: Direction = Direction.N;
  const neighborDiffs = [
    [0, -1], // N, 0
    [1, 0], // E, 1
    [0, 1], // S, 2
    [-1, 0], // W, 3
  ];

  while (navigatingLoop) {
    const neighbors = [];
    for (const nd of neighborDiffs) {
      const n = points.find((p) =>
        p.x === point.x + nd[0] && p.y === point.y + nd[1]
      );
      neighbors.push(n);
    }

    switch (point.tile) {
      case Tile.Start:
        if (steps === 0) {
          point = neighbors.find((n, i) => {
            if (n !== undefined && n.tile !== Tile.Ground) {
              direction = i;
              if (isConnectedNeighbor(point, n, direction)) {
                return true;
              }
            } else {
              return false;
            }
          })!;
          if (point === undefined) {
            throw new Error(`undefined point! steps: ${steps}`);
          }
        } else {
          navigatingLoop = false;
        }
        break;
      case Tile.Vertical:
        point = neighbors[direction]!;
        break;
      case Tile.Horizontal:
        point = neighbors[direction]!;
        break;
      case Tile.CornerBL:
        if (direction === Direction.S) {
          direction = Direction.E;
        } else {
          direction = Direction.N;
        }
        point = neighbors[direction]!;
        break;
      case Tile.CornerBR:
        if (direction === Direction.E) {
          direction = Direction.N;
        } else {
          direction = Direction.W;
        }
        point = neighbors[direction]!;
        break;
      case Tile.CornerUR:
        if (direction === Direction.E) {
          direction = Direction.S;
        } else {
          direction = Direction.W;
        }
        point = neighbors[direction]!;
        break;
      case Tile.CornerUL:
        if (direction === Direction.W) {
          direction = Direction.S;
        } else {
          direction = Direction.E;
        }
        point = neighbors[direction]!;
        break;
    }

    if (point === undefined) {
      throw new Error(`undefined point, step: ${steps}`);
    }

    steps++;
  }

  return steps - 1;
}

export function stepsToFurthestPoint(str: string): number {
  const points: Point[] = [];

  const splitLines = str.trim()
    .split("\n")
    .map((l) => Array.from(l));

  splitLines.forEach((line, y) => {
    line.forEach((c, x) => {
      points.push({
        tile: c as Tile,
        x: x,
        y: y,
      });
    });
  });

  const steps = navigateLoop(points);

  return steps / 2;
}

if (import.meta.main) {
  console.log(stepsToFurthestPoint(await Deno.readTextFile(Deno.args[0])));
}
