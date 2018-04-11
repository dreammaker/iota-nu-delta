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
