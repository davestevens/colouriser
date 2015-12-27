import ColourMixer from "./ColourMixer";

class ColourCalculator {
  constructor() {
    this.colours = [];
  }

  add({ colour, offset }) {
    this.colours.push({
      colour: colour,
      offset: Math.max(Math.min(offset, 100), 0)
    });
    this._sortColours();
  }

  at(offset) {
    if (offset > 100 || offset < 0) {
      throw new Error(`Issue with requested offset: ${offset}`);
    }
    if (offset == 100) { offset = 0; } // Wrap

    let index = 0;
    for (var i = 0; i < this.colours.length; ++i) {
      if (this.colours[i].offset < offset) { continue; }
      else {
        index = i;
        break;
      }
    }

    let fromIndex = (index == 0) ? (this.colours.length - 1) : index - 1,
        from = this.colours[fromIndex],
        to = this.colours[index],
        diff = 0,
        percentage = 0;

    if (from.offset < to.offset) {
      diff = to.offset - from.offset,
      percentage = ((offset - from.offset) / diff) * 100;
    }
    else {
      diff = (100 - from.offset) + to.offset;

      if (offset < to.offset) {
        percentage = (((100 - from.offset) + offset) / diff) * 100;
      }
      else {
        percentage = ((offset - from.offset) / diff) * 100;
      }
    }

    let colourMixer = new ColourMixer({
      from: from.colour,
      to: to.colour,
      percentage: percentage
    });

    return colourMixer.getColour();
  }

  _sortColours() {
    this.colours = this.colours.sort((a, b) => { return a.offset - b.offset });
  }
}

module.exports = ColourCalculator;
