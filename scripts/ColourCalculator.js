import ColourMixer from "./ColourMixer";

class ColourCalculator {
  constructor() {
    this.colours = [];
  }

  add({ colour, offset }) {
    this.colours.push({
      colour: colour,
      offset: offset
    });
    this._sortColours();
  }

  at(offset) {
    let index = 0;
    for (var i = 0; i < this.colours.length; ++i) {
      if (this.colours[i].offset < offset) { continue; }
      else {
        index = i;
        break;
      }
    }

    let from = this.colours[((index == 0) ? 0 : index - 1)],
        to = this.colours[index],
        offsetMin = Math.min(to.offset, from.offset),
        offsetFrom = from.offset - offsetMin,
        offsetTo = to.offset - offsetMin,
        offsetDiff = Math.abs(offsetFrom - offsetTo),
        percentage = ((offset - offsetMin) / offsetDiff) * 100;

    let colourMixer = new ColourMixer({
      from: from.colour,
      to: to.colour,
      percentage: percentage || 0
    });

    return colourMixer.getColour();
  }

  _sortColours() {
    this.colours = this.colours.sort((a, b) => { return a.offset - b.offset });
  }
}

module.exports = ColourCalculator;
