// The Tenkan Sen and Kijun Sen components of the Ichimoku Cloud indicator.
var Indicator = function(conversionPeriods, basePeriods) {
  this.input = 'candle';
  this.conversionPeriods = conversionPeriods;
  this.basePeriods = basePeriods;

  // Output conversion line.
  this.tenkanSen = 0;
  // Output base line.
  this.kijunSen = 0;

  // Used internally.
  this.requiredHistory = Math.max(conversionPeriods, basePeriods);
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
