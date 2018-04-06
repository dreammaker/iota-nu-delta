// A strategy that buys or sells based on TK cross of Ichimoku Cloud.
//
// In pseudocode:
//
// if Tenkan is crossing above Kijun
//   long
// else if Tenkan is crossing below Kijun
//   short
//
const log = require('../core/log');

const method = {};

method.init = function() {
  let cloudSettings = this.settings.cloud;
  this.addIndicator('cloud', 'Ichimoku', cloudSettings);

  this.requiredHistory = Math.max(cloudSettings.conversionPeriods || 0,
                                  cloudSettings.basePeriods || 0,
                                  this.tradingAdvisor.historySize);

  this.previousTenkanSen = 0;
  this.previousKijunSen = 0;
};

method.update = function(candle) {
  let cloud = this.indicators.cloud;
  this.tkCrossingUp = this.previousTenkanSen <= this.previousKijunSen
                      && cloud.tenkanSen > cloud.kijunSen;
  this.tkCrossingDown = this.previousTenkanSen >= this.previousKijunSen
                        && cloud.tenkanSen < cloud.kijunSen;
  // Indicators have already been updated when update() is called.  Must do this
  // as a last step here.  Can't use check() since isn't called in the
  // requiredHistory.
  this.previousTenkanSen = cloud.tenkanSen;
  this.previousKijunSen = cloud.kijunSen;
};

method.log = function() {
  if (this.tkCrossingUp) {
    log.debug("bullish cross");
  }
  if (this.tkCrossingDown) {
    log.debug("bearish cross");
  }
};

method.check = function(candle) {
  if (this.tkCrossingUp) {
    this.advice('long');
  }
  else if (this.tkCrossingDown) {
    this.advice('short');
  }
};

module.exports = method;
