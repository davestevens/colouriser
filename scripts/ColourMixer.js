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
    let factor = this.percentage / 100;

    return [ 0, 0, 0 ].map((_element, index) => {
      let from = this.from[index],
          to = this.to[index];

      if (from < to) {
        let base = Math.min(this.to[index], this.from[index]);
        return base + (Math.abs(this.to[index] - this.from[index]) * factor);
      }
      else {
        let base = Math.max(this.to[index], this.from[index]);
        return base - (Math.abs(this.to[index] - this.from[index]) * factor);
      }

    });
  }
}

module.exports = ColourMixer;
