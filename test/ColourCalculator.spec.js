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

    it("clamps offset to be greater than or equal to zero", () => {
      let calculator = new ColourCalculator(),
          input = { colour: [ 0, 0, 0 ], offset: -250 };

      calculator.add(input);
      expect(calculator.colours).to.have.length(1);

      let actual = calculator.colours[0].offset,
          expected = 0;

      expect(actual).to.deep.equal(expected);
    });

    it("clamps offset to be less than or equal to 100", () => {
      let calculator = new ColourCalculator(),
          input = { colour: [ 0, 0, 0 ], offset: 250 };

      calculator.add(input);
      expect(calculator.colours).to.have.length(1);

      let actual = calculator.colours[0].offset,
          expected = 100;

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

        let actual = calculator.at(60),
            expected = [ 144,  30,  58 ];

        expect(actual).to.deep.equal(expected);
      });
    });

    describe("Mixing colours", () => {
      let calculator;

      before(() => {
        calculator = new ColourCalculator();
        calculator.add({ colour: [  25,  45,  80 ], offset:  10 });
        calculator.add({ colour: [ 120,  12, 100 ], offset:  20 });
      });

      let tests = [
        { at: 15, expected: [
          72.5,
          28.5,
          90
        ] },
        { at: 0, expected: [
          35.55555555555556,
          41.33333333333333,
          82.22222222222223
        ] },
        { at: 5, expected: [
          30.277777777777786,
          43.166666666666664,
          81.11111111111111
        ] },
        { at: 60, expected: [
          77.77777777777777,
          26.666666666666664,
          91.11111111111111
        ] }
      ];

      tests.forEach((test) => {
        it("correctly calculates colour", () => {
          let actual = calculator.at(test.at);

          expect(actual).to.deep.equal(test.expected);
        });
      });
    });
  });
});
