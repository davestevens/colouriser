!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.Colouriser=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _ColourMixer = _dereq_("./ColourMixer");

var _ColourMixer2 = _interopRequireDefault(_ColourMixer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColourCalculator = (function () {
  function ColourCalculator() {
    _classCallCheck(this, ColourCalculator);

    this.colours = [];
  }

  _createClass(ColourCalculator, [{
    key: "add",
    value: function add(_ref) {
      var colour = _ref.colour;
      var offset = _ref.offset;

      this.colours.push({
        colour: colour,
        offset: Math.max(Math.min(offset, 100), 0)
      });
      this._sortColours();
    }
  }, {
    key: "at",
    value: function at(offset) {
      if (offset > 100 || offset < 0) {
        throw new Error("Issue with requested offset: " + offset);
      }
      if (offset == 100) {
        offset = 0;
      } // Wrap

      var index = 0;
      for (var i = 0; i < this.colours.length; ++i) {
        if (this.colours[i].offset < offset) {
          continue;
        } else {
          index = i;
          break;
        }
      }

      var fromIndex = index == 0 ? this.colours.length - 1 : index - 1,
          from = this.colours[fromIndex],
          to = this.colours[index],
          diff = 0,
          percentage = 0;

      if (from.offset < to.offset) {
        diff = to.offset - from.offset, percentage = (offset - from.offset) / diff * 100;
      } else {
        diff = 100 - from.offset + to.offset;

        if (offset < to.offset) {
          percentage = (100 - from.offset + offset) / diff * 100;
        } else {
          percentage = (offset - from.offset) / diff * 100;
        }
      }

      var colourMixer = new _ColourMixer2.default({
        from: from.colour,
        to: to.colour,
        percentage: percentage
      });

      return colourMixer.getColour();
    }
  }, {
    key: "_sortColours",
    value: function _sortColours() {
      this.colours = this.colours.sort(function (a, b) {
        return a.offset - b.offset;
      });
    }
  }]);

  return ColourCalculator;
})();

module.exports = ColourCalculator;

},{"./ColourMixer":2}],2:[function(_dereq_,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColourMixer = (function () {
  function ColourMixer(_ref) {
    var from = _ref.from;
    var to = _ref.to;
    var percentage = _ref.percentage;

    _classCallCheck(this, ColourMixer);

    this.from = from;
    this.to = to;
    this.percentage = percentage;
  }

  _createClass(ColourMixer, [{
    key: "getColour",
    value: function getColour() {
      var _this = this;

      var factor = this.percentage / 100;

      return [0, 0, 0].map(function (_element, index) {
        var from = _this.from[index],
            to = _this.to[index];

        if (from < to) {
          var base = Math.min(_this.to[index], _this.from[index]);
          return base + Math.abs(_this.to[index] - _this.from[index]) * factor;
        } else {
          var base = Math.max(_this.to[index], _this.from[index]);
          return base - Math.abs(_this.to[index] - _this.from[index]) * factor;
        }
      });
    }
  }, {
    key: "percentage",
    set: function set(value) {
      this._percentage = Math.max(Math.min(value, 100), 0);
    },
    get: function get() {
      return this._percentage;
    }
  }, {
    key: "from",
    set: function set(value) {
      this._from = value;
    },
    get: function get() {
      return this._from;
    }
  }, {
    key: "to",
    set: function set(value) {
      this._to = value;
    },
    get: function get() {
      return this._to;
    }
  }]);

  return ColourMixer;
})();

module.exports = ColourMixer;

},{}],3:[function(_dereq_,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _ColourCalculator = _dereq_("./ColourCalculator");

var _ColourCalculator2 = _interopRequireDefault(_ColourCalculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Colouriser = (function () {
  function Colouriser(options) {
    var _this = this;

    _classCallCheck(this, Colouriser);

    options = options || {};

    this.calculator = new _ColourCalculator2.default();
    (options.colours || []).forEach(function (c) {
      var milliseconds = _this._timeToMilliseconds(c.at),
          percentageThroughDay = _this._timeAsPercentage(milliseconds);
      _this.calculator.add({
        colour: c.value, offset: percentageThroughDay
      });
    });

    this.onUpdate = options.onUpdate || function (_colour) {/* Noop */};
  }

  _createClass(Colouriser, [{
    key: "start",
    value: function start() {
      this._calculate();
    }
  }, {
    key: "_calculate",
    value: function _calculate() {
      var milliseconds = this._currentTime(),
          percentageThroughDay = this._timeAsPercentage(milliseconds),
          colour = this.calculator.at(percentageThroughDay);

      this.onUpdate(colour);
      window.requestAnimationFrame(this._calculate.bind(this));
    }
  }, {
    key: "_currentTime",
    value: function _currentTime() {
      var d = new Date(),
          hours = d.getHours(),
          minutes = d.getMinutes() + 60 * hours,
          seconds = d.getSeconds() + 60 * minutes;
      return d.getMilliseconds() + 1000 * seconds;
    }
  }, {
    key: "_timeToMilliseconds",
    value: function _timeToMilliseconds(time) {
      var milliseconds = 0;
      if ("milliseconds" in time) {
        milliseconds += time.milliseconds;
      }
      if ("seconds" in time) {
        milliseconds += 1000 * time.seconds;
      }
      if ("minutes" in time) {
        milliseconds += 60000 * time.minutes;
      }
      if ("hours" in time) {
        milliseconds += 3600000 * time.hours;
      }

      return milliseconds;
    }
  }, {
    key: "_timeAsPercentage",
    value: function _timeAsPercentage(time) {
      var millisecondsInADay = 8.64e+7;
      return time / millisecondsInADay * 100;
    }
  }]);

  return Colouriser;
})();

module.exports = Colouriser;

},{"./ColourCalculator":1}]},{},[3])
(3)
});