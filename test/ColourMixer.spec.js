import ColourMixer from "../scripts/ColourMixer";

describe("ColourMixer", () => {
  describe("#percentage=", () => {
    it("must be less than or equal to 100", () => {
      let colourMixer = new ColourMixer({});
      colourMixer.percentage = 250;

      let actual = colourMixer.percentage,
          expected = 100;

      expect(actual).to.equal(expected);
    });

    it("must be greater than or equal to 0", () => {
      let colourMixer = new ColourMixer({});
      colourMixer.percentage = -250;

      let actual = colourMixer.percentage,
          expected = 0;

      expect(actual).to.equal(expected);
    });
  });

  describe("#getColour", () => {
    let colourMixer;
    before(() => {
      let from = [  25,  50, 100 ],
          to   = [  10,  30,  70 ];
      colourMixer = new ColourMixer({ from: from, to: to });
    });

    context("with a percentage of zero", () => {
      it("returns the 'from' colour", () => {
        colourMixer.percentage = 0;

        let actual = colourMixer.getColour(),
            expected = colourMixer.from;

        expect(actual).to.deep.equal(expected);
      });
    });

    context("with a percentage of 100", () => {
      it("returns the 'to' colour", () => {
        colourMixer.percentage = 100;

        let actual = colourMixer.getColour(),
            expected = colourMixer.to;

        expect(actual).to.deep.equal(expected);
      });
    });

    context("with a percentage of 50", () => {
      it("returns a mix of the two colours", () => {
        colourMixer.percentage = 50;

        let actual = colourMixer.getColour(),
            expected = [ 7.5,  10,  15 ];

        expect(actual).to.deep.equal(expected);
      });
    });
  });
});
