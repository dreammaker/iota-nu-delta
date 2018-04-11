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
