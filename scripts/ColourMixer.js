class ColourMixer {
  constructor({ from, to, percentage }) {
    this.from = from;
    this.to = to;
    this.percentage = percentage;
  }

  set percentage(value) {
    this._percentage = Math.max(Math.min(value, 100), 0);
  }
  get percentage() { return this._percentage; }

  set from(value) { this._from = value; }
  get from() { return this._from; }

  set to(value) { this._to = value; }
  get to() { return this._to; }

  getColour() {
    return [
      this._getOffset(+this.from[0], +this.to[0], 360),
      this._getOffset(+this.from[1], +this.to[1]),
      this._getOffset(+this.from[2], +this.to[2])
    ]
  }

  _getOffset(from, to, limit = 100) {
    if (from > to) {
      to += limit;
    }
    return ((to - from) * this._factor()) + from
  }

  _factor() {
    return this.percentage / 100;
  }
}

module.exports = ColourMixer;
