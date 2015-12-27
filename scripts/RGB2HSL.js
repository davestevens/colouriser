module.exports = (rgb) => {
  let r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255;

  let cMax = Math.max(r, g, b),
      cMin = Math.min(r, g, b),
      delta = cMax - cMin;

  let hue, saturation, light;

  light = (cMax + cMin) / 2;

  if (delta == 0) {
    hue = 0;
  }
  else if(cMax == r) {
    hue = ((g - b) / delta) % 6;
    hue = hue & (6 - 1); // Ensures modulo is positive
  }
  else if(cMax == g) {
    hue = ((b - r) / delta) + 2;
  }
  else if(cMax == b) {
    hue = ((r - g) / delta) + 4;
  }

  if (delta == 0) {
    saturation = 0;
  }
  else {
    saturation = delta / (1 - Math.abs((2 * light) - 1));
  }

  return [hue * 60, saturation * 100, +(light * 100).toFixed()];
};
