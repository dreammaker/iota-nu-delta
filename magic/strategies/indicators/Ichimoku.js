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

// Ichimoku Cloud indicator.
//
// Standard arguments are:
//   conversionPeriods: 9
//   basePeriods: 26
//   laggingSpan2Periods: 52
//   displacement: 26
//
// All arguments must be positive integers.  Displacement can be zero.
var Indicator = function(settings) {
  this.input = 'candle';
  this.conversionPeriods = settings.conversionPeriods;
  this.basePeriods = settings.basePeriods;
  this.laggingSpan2Periods = settings.laggingSpan2Periods;
  this.displacement = settings.displacement;

  // Output conversion line.
  this.tenkanSen = 0;
  // Output base line.
  this.kijunSen = 0;
  // Output leading span A.
  this.senkouA = 0;
  // Output leading span B.
  this.senkouB = 0;

  // The number of historical highs and lows we need.  Used internally.
  this.requiredHistory = Math.max(this.conversionPeriods, this.basePeriods, this.laggingSpan2Periods);
  // These arrays must always have the same length.
  this.highPrices = [];
  this.lowPrices = [];
  // Buffers to store future leading span values.
  this.senkouABuffer = [];
  this.senkouBBuffer = [];
}

Indicator.prototype.update = function(candle) {
  this.highPrices.push(candle.high);
  this.lowPrices.push(candle.low);

  let numPrices = this.lowPrices.length;
  if (numPrices > this.requiredHistory) {
    this.lowPrices.shift();
    this.highPrices.shift();
  }

  if (numPrices >= this.conversionPeriods) {
    this.tenkanSen = this._donchianCenter(this.conversionPeriods);
  }

  if (numPrices >= this.basePeriods) {
    this.kijunSen = this._donchianCenter(this.basePeriods);

    // Future Senkou Span A is the mean between Tenkan Sen and Kijun Sen.
    let futureSenkouA = (this.tenkanSen + this.kijunSen) / 2;
    // Save it for later.
    this.senkouABuffer.push(futureSenkouA);
    // If we have a Senkou Span A from before, use it.
    if (this.senkouABuffer.length > this.displacement) {
      this.senkouA = this.senkouABuffer.shift();
    }
  }

  if (numPrices >= this.laggingSpan2Periods) {
    // Future Senkou Span B.
    let futureSenkouB = this._donchianCenter(this.laggingSpan2Periods);
    // Save it for later.
    this.senkouBBuffer.push(futureSenkouB);
    // If we have a Senkou Span B from before, use it.
    if (this.senkouBBuffer.length > this.displacement) {
      this.senkouB = this.senkouBBuffer.shift();
    }
  }
}

// Returns the mean between the highest high and the lowest low, using the last
// N periods.
Indicator.prototype._donchianCenter = function(periods) {
  // Get min of low prices.
  let lows = this.lowPrices;
  let firstIndex = lows.length - periods;
  let lowest = lows[firstIndex];
  let len = lows.length;
  for (let i = firstIndex + 1; i < len; i++) {
    let val = lows[i];
    if (val < lowest) {
      lowest = val;
    }
  }

  // Get max of high prices.
  let highs = this.highPrices;
  let highest = highs[firstIndex];
  for (let i = firstIndex + 1; i < len; i++) {
    let val = highs[i];
    if (val > highest) {
      highest = val;
    }
  }

  // Return the mean.
  return (lowest + highest) / 2;
}

module.exports = Indicator;
