import ColourCalculator from "../scripts/ColourCalculator";

describe("ColourCalculator", () => {
  describe("#add", () => {
    it("adds a Colour with an offset", () => {
      let calculator = new ColourCalculator(),
          input = { colour: [ 0, 0, 0 ], offset: 0 };

      calculator.add(input);
      expect(calculator.colours).to.have.length(1);

      let actual = calculator.colours[0],
          expected = input;

      expect(actual).to.deep.equal(expected);
    });
  });

  describe("#at", () => {
    context("with two colours at 0 & 100 and an offset of 50", () => {
      it("returns the mid-point colour of the two", () => {
        let calculator = new ColourCalculator();
        calculator.add({ colour: [   0,   0,   0 ], offset: 0 });
        calculator.add({ colour: [   0,   0, 100 ], offset: 100 });

        let actual = calculator.at(50),
            expected = [   0,   0,  50 ];

        expect(actual).to.deep.equal(expected);
      });
    });

    context("with three colours", () => {
      it("returns a mixture of the two closest colours", () => {
        let calculator = new ColourCalculator();
        calculator.add({ colour: [   0,   0,   0 ], offset:   0 });
        calculator.add({ colour: [   0,   0, 100 ], offset: 100 });
        calculator.add({ colour: [ 240,  50,  30 ], offset:  50 });

        let actual = calculator.at(25),
            expected = [ 120,  25,  15 ];

        expect(actual).to.deep.equal(expected);
      });

      it("returns a mixture of the two closest colours", () => {
        let calculator = new ColourCalculator();
        calculator.add({ colour: [   0,   0,   0 ], offset:   0 });
        calculator.add({ colour: [   0,   0, 100 ], offset:  75 });
        calculator.add({ colour: [ 240,  50,  30 ], offset:  50 });

        let actual = calculator.at(75),
            expected = [   0,   0, 100 ];

        expect(actual).to.deep.equal(expected);
      });
    });
  });
});
