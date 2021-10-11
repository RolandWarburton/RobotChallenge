const rotate = ["LEFT", "RIGHT"] as const;
type Rotate = typeof rotate[number];

const isRotateType = (x: any): x is Rotate => rotate.includes(x);

export { Rotate, rotate, isRotateType };
