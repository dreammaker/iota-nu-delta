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

  this.rsi = new RSI({ interval: settings.rsiPeriods });
  this.period = settings.stochasticPeriods;
  this.kSMA = new SMA(settings.kPeriods);
  this.dSMA = new SMA(settings.dPeriods);
  this.rsiHistory = [];
  // SMA is meaningless until it has its periods filled.  Values only start
  // feeding it once stochasticPeriods is reached.
  this.requiredHistory = settings.stochasticPeriods + Math.max(settings.kPeriods, settings.dPeriods) - 1;
}

Indicator.prototype.update = function(price) {
  let rsi = this.rsi;
  let rsiHistory = this.rsiHistory;

  // Compute RSI.
  rsi.update(price);

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
