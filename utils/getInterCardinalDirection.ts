export function getInterCardinalDirection(degree: number): string {
  const directions: [string, [number, number]][] = [
    ["N", [0, 11.25]],
    ["NNE", [11.25, 33.75]],
    ["NE", [33.75, 56.25]],
    ["ENE", [56.25, 78.75]],
    ["E", [78.75, 101.25]],
    ["ESE", [101.25, 123.75]],
    ["SE", [123.75, 146.25]],
    ["SSE", [146.25, 168.75]],
    ["S", [168.75, 191.25]],
    ["SSW", [191.25, 213.75]],
    ["SW", [213.75, 236.25]],
    ["WSW", [236.25, 258.75]],
    ["W", [258.75, 281.25]],
    ["WNW", [281.25, 303.75]],
    ["NW", [303.75, 326.25]],
    ["NNW", [326.25, 348.75]],
    ["N2", [348.75, 360.0]],
  ];

  degree = degree % 360;
  for (const [direction, [start, end]] of directions) {
    if (degree >= start && degree < end) {
      return direction;
    }
  }

  // If the degree is exactly 360, return 'N' (North)
  if (degree === 360.0) {
    return "N";
  }

  return "";
}
