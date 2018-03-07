// Ichimoku Cloud indicator.
//
// Standard arguments are: (9, 26, 52, 26).
var Indicator = function(conversionPeriods, basePeriods, laggingSpan2Periods, displacement) {
  this.input = 'candle';
  this.conversionPeriods = conversionPeriods;
  this.basePeriods = basePeriods;
  this.laggingSpan2Periods = laggingSpan2Periods;
  this.displacement = displacement;

  // Output conversion line.
  this.tenkanSen = 0;
  // Output base line.
  this.kijunSen = 0;
  // Output leading span A.
  this.senkouA = 0;
  // Output leading span B.
  this.senkouB = 0;

  // The number of historical highs and lows we need.  Used internally.
  this.requiredHistory = Math.max(conversionPeriods, basePeriods, laggingSpan2Periods);
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
