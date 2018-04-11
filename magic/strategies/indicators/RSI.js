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

// Relative Strength Index.
//
// Standard arguments:
//   interval: 14
//
// Interval must be a positive integer.
let Indicator = function(period) {
  this.input = 'price';
  // Be compatible with built-in RSI which accepts a settings object.
  this.period = _.isNumber(period) ? period : period.interval;
  this.result = 0;
  this.index = 0;
  this.previousPrice = 0;
  this.previousAvgUp = 0;
  this.previousAvgDown = 0;
  this.sumUps = 0;
  this.sumDowns = 0;
}

Indicator.prototype.update = function(price) {
  const index = this.index;
  this.index++;

  const difference = price - this.previousPrice;
  this.previousPrice = price;

  if (index === 0) {
    this.result = 0;
    return;
  }

  let currentUp, currentDown;
  if (difference > 0) {
    this.sumUps += difference;
    currentUp = difference;
    currentDown = 0;
  }
  else {
    this.sumDowns -= difference;
    currentUp = 0;
    currentDown = -difference;
  }

  const period = this.period;
  if (index < period) {
    this.result = 0;
    return;
  }

  let avgUps, avgDowns;
  if (index === period) {
    avgUps = this.sumUps / index;
    avgDowns = this.sumDowns / index;
  }
  else {
    avgUps = (this.previousAvgUp * (period - 1) + currentUp) / period;
    avgDowns = (this.previousAvgDown * (period - 1) + currentDown) / period;
  }
  this.previousAvgUp = avgUps;
  this.previousAvgDown = avgDowns;
  let relativeStrength = avgUps / avgDowns;
  this.result = 100 - (100 / (1 + relativeStrength));
}

module.exports = Indicator;
