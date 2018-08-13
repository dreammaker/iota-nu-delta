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

// Heikin-Ashi candle indicator.
let Indicator = function(settings) {
  this.input = 'candle';

  // Output.
  this.result = null;
}

Indicator.prototype.update = function(candle) {
  let close = (candle.open + candle.high + candle.low + candle.close) / 4.0;
  let open, high, low;

  let previousHa = this.result;
  if (previousHa) {
    open = (previousHa.open + previousHa.close) / 2.0;
    high = Math.max(candle.high, open, close);
    low = Math.min(candle.low, open, close);
  } else {
    open = (candle.open + candle.close) / 2.0;
    high = candle.high;
    low = candle.low;
  }

  let start = candle.start;
  let haCandle = {
    start: (start && start.clone) ? start.clone() : _.clone(start),
    open: open,
    high: high,
    low: low,
    close: close,
    vwp: candle.vwp, // TODO: What should this be?
    volume: candle.volume,
    trades: candle.trades,
  };

  this.result = haCandle;
}

module.exports = Indicator;
