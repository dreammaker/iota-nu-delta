// Copyright (C) 2018 Jonathan Tran
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
let _ = require('lodash');

// Average True Range indicator.
//
// Standard arguments:
//   periods: 14
//
// Periods must be a positive integer.
let Indicator = function(settings) {
  this.input = 'candle';

  this.periods = _.isNumber(settings) ? settings : settings.periods;
  this.requiredHistory = this.periods;

  // Output.
  this.result = 0;

  // Internal state.
  this.previousClose = 0;
  this.index = 0;
  this.trueRangeSum = 0;
}

Indicator.prototype.update = function(candle) {
  const previousClose = this.previousClose;
  this.previousClose = candle.close;

  const periods = this.periods;
  const index = this.index;

  // The very first true range is just the difference between high and low.
  let currentTR = candle.high - candle.low;
  if (index > 0) {
    // Calculate true range in all other cases.
    let b = Math.abs(candle.high - previousClose);
    let c = Math.abs(candle.low - previousClose);
    currentTR = Math.max(currentTR, b, c);
  }

  if (index < periods - 1) {
    this.trueRangeSum += currentTR;
    this.index++;
  }
  else if (index === periods - 1) {
    this.trueRangeSum += currentTR;

    // The first time we reach the period length, use the average of all prior
    // true ranges.
    this.result = this.trueRangeSum / periods;

    this.index++;
  }
  else {
    let previousATR = this.result;
    this.result = (previousATR * (periods - 1) + currentTR) / periods;
  }
}

module.exports = Indicator;
