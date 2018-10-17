export function squareCoords(t, width, height, radius) {
  const usableWidth = width - radius * 2;
  const usableHeight = height - radius * 2;
  let d = t * (usableWidth * 2 + usableHeight * 2);

  if (d < usableWidth) {
    return [d + radius, radius];
  }
  d -= usableWidth;

  if (d < usableHeight) {
    return [width - radius, d + radius];
  }
  d -= usableHeight;

  if (d < usableWidth) {
    return [width - radius - d, height - radius];
  }
  d -= usableWidth;

  return [radius, height - radius - d];
}