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

// Exponential Moving Average.
var Indicator = function(period) {
  this.input = 'price';
  this.period = period;
  this.sumPrices = 0;
  this.result = 0;
  this.index = 0;
}

Indicator.prototype.update = function(price) {
  let period = this.period;
  let index = this.index;
  if (index < period - 1) {
    this.sumPrices += price;
    this.result = 0;
  }
  else if (index === period - 1) {
    // The first EMA is actually the SMA of the first period.
    this.sumPrices += price;
    this.result = this.sumPrices / period;
  }
  else {
    let previousEMA = this.result;
    let multiplier = 2 / (period + 1);
    this.result = (price - previousEMA) * multiplier + previousEMA;
  }
  this.index++;
}

module.exports = Indicator;
