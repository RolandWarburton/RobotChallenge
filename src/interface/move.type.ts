const direction = ["MOVE"] as const;
type Direction = typeof direction[number];

const isDirectionType = (x: any): x is Direction => direction.includes(x);

export { Direction, direction, isDirectionType };
