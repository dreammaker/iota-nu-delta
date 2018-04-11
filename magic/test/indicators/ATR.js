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

  let ATR = require(INDICATOR_PATH + filename);

  it('should calculate ATRs like stockcharts', function() {
    // Source: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:average_true_range_atr
    let highs = [48.70, 48.72, 48.90, 48.87, 48.82, 49.05, 49.20, 49.35, 49.92, 50.19, 50.12, 49.66, 49.88, 50.19, 50.36, 50.57, 50.65, 50.43, 49.63, 50.33, 50.29, 50.17, 49.32, 48.50, 48.32, 46.80, 47.80, 48.39, 48.66, 48.79];
    let lows = [47.79, 48.14, 48.39, 48.37, 48.24, 48.64, 48.94, 48.86, 49.50, 49.87, 49.20, 48.90, 49.43, 49.73, 49.26, 50.09, 50.30, 49.21, 48.98, 49.61, 49.20, 49.43, 48.08, 47.64, 41.55, 44.28, 47.31, 47.20, 47.90, 47.73];
    let closes = [48.16, 48.61, 48.75, 48.63, 48.74, 49.03, 49.07, 49.32, 49.91, 50.13, 49.53, 49.50, 49.75, 50.03, 50.31, 50.52, 50.41, 49.34, 49.37, 50.23, 49.24, 49.93, 48.43, 48.18, 46.57, 45.41, 47.77, 47.72, 48.62, 47.85];
    let expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.56, 0.59, 0.59, 0.57, 0.62, 0.62, 0.64, 0.67, 0.69, 0.78, 0.78, 1.21, 1.30, 1.38, 1.37, 1.34, 1.32];

    let indicator = new ATR({ periods: 14 });
    closes.forEach((close, i) => {
      let candle = {
        low: lows[i],
        high: highs[i],
        close: closes[i],
      };
      indicator.update(candle);
      expect(indicator.result).to.be.closeTo(expected[i], 0.006);
    });
  });

});
