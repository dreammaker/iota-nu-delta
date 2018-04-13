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
let RSI = require('./RSI.js');
let SMA = require('./SMA.js');

// Stochastic RSI indicator.  Result is between 0 and 1.
//
// Standard arguments:
//   kPeriods: 3
//   dPeriods: 3
//   rsiPeriods: 14
//   stochasticPeriods: 14
//
// All periods must be positive integers.
let Indicator = function(settings) {
  this.input = 'price';

  // Output.
  this.result = 0;
  this.k = 0;
  this.d = 0;

  this.rsiPeriods = settings.rsiPeriods;
  this.rsi = new RSI({ interval: settings.rsiPeriods });
  this.rsiExpectsCandle = this.rsi.input === 'candle';
  this.period = settings.stochasticPeriods;
  this.kSMA = new SMA(settings.kPeriods);
  this.dSMA = new SMA(settings.dPeriods);
  this.rsiHistory = [];
  this.index = 0;
  // SMA is meaningless until it has its periods filled.  Values only start
  // feeding it once stochasticPeriods is reached.
  this.requiredHistory = settings.rsiPeriods + settings.stochasticPeriods
                         + Math.max(settings.kPeriods, settings.dPeriods) - 1;
}

Indicator.prototype.update = function(price) {
  let rsi = this.rsi;
  let rsiHistory = this.rsiHistory;

  // Compute RSI.
  if (this.rsiExpectsCandle) {
    rsi.update({ close: price });
  }
  else {
    rsi.update(price);
  }
  if (this.index < this.rsiPeriods) {
    this.index++;
    return;
  }

  // Save history of RSI.
  let currentRSI = rsi.result;
  rsiHistory.push(currentRSI);

  const period = this.period;
  if (rsiHistory.length < period) {
    return;
  }

  // Discard unneeded history.
  if (rsiHistory.length > period) {
    rsiHistory.shift();
  }

  // Get the lowest and highest RSI.
  let lowest = rsiHistory[0];
  let highest = rsiHistory[0];
  for (let i = 1; i < period; i++) {
    let val = rsiHistory[i];
    if (val < lowest) {
      lowest = val;
    }
    if (val > highest) {
      highest = val;
    }
  }

  // Fast Stochastic RSI.
  let stochRSI = (currentRSI - lowest) / (highest - lowest);
  this.result = stochRSI;

  // Full K is the fast Stochastic RSI smoothed with SMA.
  let kSMA = this.kSMA;
  kSMA.update(stochRSI);
  let k = kSMA.result;
  this.k = k;

  // Full D is the full K smoothed with SMA.
  let dSMA = this.dSMA;
  dSMA.update(k);
  this.d = dSMA.result;
}

module.exports = Indicator;
