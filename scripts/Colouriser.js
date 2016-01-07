import ColourCalculator from "./ColourCalculator";

class Colouriser {
  constructor(options) {
    options = options || {};

    this.calculator = new ColourCalculator();
    (options.colours || []).forEach((c) => {
      let milliseconds = this._timeToMilliseconds(c.at),
          percentageThroughDay = this._timeAsPercentage(milliseconds);
      this.calculator.add({
        colour: c.value, offset: percentageThroughDay
      });
    });

    this.onUpdate = options.onUpdate || ((_colour) => { /* Noop */ });

    this.fps = options.fps || 1;
  }

  start() {
    this.then = Date.now();
    this.interval = 1000 / this.fps;
    this._calculate();
  }

  destroy() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  _calculate() {
    this.requestId = window.requestAnimationFrame(this._calculate.bind(this));

    let now = Date.now(),
        delta = now - this.then;

    if (delta > this.interval) {
      this.then = now - (delta % this.interval);

      let milliseconds = this._currentTime(),
          percentageThroughDay = this._timeAsPercentage(milliseconds),
          colour = this.calculator.at(percentageThroughDay);

      this.onUpdate(colour);
    }
  }

  _currentTime() {
    let d = new Date(),
        hours = d.getHours(),
        minutes = d.getMinutes() + (60 * hours),
        seconds = d.getSeconds() + (60 * minutes);
    return d.getMilliseconds() + (1000 * seconds);
  }

  _timeToMilliseconds(time) {
    let milliseconds = 0;
    if ("milliseconds" in time) { milliseconds += time.milliseconds; }
    if ("seconds" in time) { milliseconds += (1000 * time.seconds); }
    if ("minutes" in time) { milliseconds += (60000 * time.minutes); }
    if ("hours" in time) { milliseconds += (3600000 * time.hours); }

    return milliseconds
  }

  _timeAsPercentage(time) {
    const millisecondsInADay = 8.64e+7;
    return (time / millisecondsInADay) * 100;
  }
}

module.exports = Colouriser;
