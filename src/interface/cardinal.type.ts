const cardinal = ["NORTH", "EAST", "SOUTH", "WEST"] as const;
type Cardinal = typeof cardinal[number];

const isCardinalType = (x: any): x is Cardinal => cardinal.includes(x);

export { Cardinal, cardinal, isCardinalType };
