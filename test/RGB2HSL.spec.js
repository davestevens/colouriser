import RGB2HSL from "../scripts/RGB2HSL";

describe("RGB2HSL", () => {
  let conversions = [
    { colour: "Black",   rgb: [   0,   0,   0], hsl: [   0,   0,   0] },
    { colour: "White",   rgb: [ 255, 255, 255], hsl: [   0,   0, 100] },
    { colour: "Red",     rgb: [ 255,   0,   0], hsl: [   0, 100,  50] },
    { colour: "Lime",    rgb: [   0, 255,   0], hsl: [ 120, 100,  50] },
    { colour: "Blue",    rgb: [   0,   0, 255], hsl: [ 240, 100,  50] },
    { colour: "Yellow",  rgb: [ 255, 255,   0], hsl: [  60, 100,  50] },
    { colour: "Cyan",    rgb: [   0, 255, 255], hsl: [ 180, 100,  50] },
    { colour: "Magenta", rgb: [ 255,   0, 255], hsl: [ 300, 100,  50] },
    { colour: "Silver",  rgb: [ 192, 192, 192], hsl: [   0,   0,  75] },
    { colour: "Gray",    rgb: [ 128, 128, 128], hsl: [   0,   0,  50] },
    { colour: "Maroon",  rgb: [ 128,   0,   0], hsl: [   0, 100,  25] },
    { colour: "Olive",   rgb: [ 128, 128,   0], hsl: [  60, 100,  25] },
    { colour: "Green",   rgb: [   0, 128,   0], hsl: [ 120, 100,  25] },
    { colour: "Purple",  rgb: [ 128,   0, 128], hsl: [ 300, 100,  25] },
    { colour: "Teal",    rgb: [   0, 128, 128], hsl: [ 180, 100,  25] },
    { colour: "Navy",    rgb: [   0,   0, 128], hsl: [ 240, 100,  25] }
  ];

  conversions.forEach((c) => {
    it(`converts ${c.rgb} (${c.colour}) to ${c.hsl}`, () => {
      let converted = RGB2HSL(c.rgb);

      expect(converted).to.deep.equal(c.hsl);
    });
  });
});
