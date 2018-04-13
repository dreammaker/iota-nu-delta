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
let chai = require('chai');
let expect = chai.expect;

let util = require('../../core/util');
let path = require('path');

let dirs = util.dirs();
let INDICATOR_PATH = dirs.indicators;
let filename = path.basename(__filename);

describe('indicators/' + filename, function() {

  let StochasticRSI = require(INDICATOR_PATH + filename);

  it('should use the correct period for RSI', function() {
    // This is really testing the internals, which we normally wouldn't do.
    // However, other tests rely on mock objects that wouldn't catch some
    // real problems.
    let settings = {
      kPeriods: 3,
      dPeriods: 7,
      rsiPeriods: 42,
      stochasticPeriods: 14,
    };
    let indicator = new StochasticRSI(settings);
    let rsi = indicator.rsi;
    // Depending on the RSI implementation, it may use a different property.
    expect(rsi.weight || rsi.period).to.equal(42);
  });

  it('should calculate Stochastic RSI like stockcharts', function() {
    // TODO: Test the k and d results.

    // Source: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:stochrsi
    let rsis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 54.09, 59.90, 58.20, 59.76, 52.35, 52.82, 56.94, 57.47, 55.26, 57.51, 54.80, 51.47, 56.16, 58.34, 56.02, 60.22, 56.75, 57.38, 50.23, 57.06, 61.51, 63.69, 66.22, 69.16, 70.73, 67.79, 68.82, 62.38, 67.59, 67.59];
    let expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.81, 0.54, 1.00, 0.60, 0.68, 0.00, 0.68, 1.00, 1.00, 1.00, 1.00, 1.00, 0.86, 0.91, 0.59, 0.85, 0.85];
    // Computed manually.
    let expectedK = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.783, 0.713, 0.76, 0.427, 0.453, 0.56, 0.893, 1.0, 1.0, 1.0, 0.953, 0.923, 0.787, 0.783, 0.763];

    // Create a mock RSI indicator that returns our RSI values.
    let mockRSI = {
      index: 0,
      result: 0,
      update: function(price) {
        // Ignore price and use our reference RSIs.
        this.result = rsis[this.index];
        this.index++;
      },
    };

    let settings = {
      kPeriods: 3,
      dPeriods: 3,
      rsiPeriods: 14,
      stochasticPeriods: 14,
    };
    let indicator = new StochasticRSI(settings);
    indicator.rsi = mockRSI;
    rsis.forEach((rsi, i) => {
      // We would normally pass the price, but it doesn't matter here.
      indicator.update(0);
      expect(indicator.result).to.be.closeTo(expected[i], 0.005);
      // Not currently checking this since it depends on a slightly different
      // implementation of SMA.
      // expect(indicator.k).to.be.closeTo(expectedK[i], 0.005);
    });
  });

});
