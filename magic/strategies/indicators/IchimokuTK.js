// The Tenkan Sen and Kijun Sen components of the Ichimoku Cloud indicator.
//
// If you don't need the entire cloud, this may be a more performant version.
//
// Standard arguments are:
//   conversionPeriods: 9
//   basePeriods: 26
//
// All arguments must be positive integers.
var Indicator = function(settings) {
  this.input = 'candle';
  this.conversionPeriods = settings.conversionPeriods;
  this.basePeriods = settings.basePeriods;

  // Output conversion line.
  this.tenkanSen = 0;
  // Output base line.
  this.kijunSen = 0;

  // The number of historical highs and lows we need.  Used internally.
  this.requiredHistory = Math.max(this.conversionPeriods, this.basePeriods);
  // These arrays must always have the same length.
  this.highPrices = [];
  this.lowPrices = [];
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
