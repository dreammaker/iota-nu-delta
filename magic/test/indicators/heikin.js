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

  let HeikinAshi = require(INDICATOR_PATH + filename);

  it('should calculate Heikin Ashi candles like QuantConnect', function() {
    // Source: https://github.com/QuantConnect/Lean/blob/master/Tests/TestData/spy_heikin_ashi.txt
    let candles = [
      {
        open: 151.16,
        high: 151.89,
        low: 150.49,
        close: 151.89,
        volume: 1.06e8,
      },
      {
        open: 152.63,
        high: 152.86,
        low: 149.0,
        close: 149.0,
        volume: 2.45e8,
      },
      {
        open: 149.72,
        high: 150.2,
        low: 148.73,
        close: 150.02,
        volume: 1.86e8,
      },
      {
        open: 149.89,
        high: 152.33,
        low: 149.76,
        close: 151.91,
        volume: 1.44e8,
      },
      {
        open: 151.9,
        high: 152.87,
        low: 151.41,
        close: 151.61,
        volume: 1.24e8,
      },
    ];
    let expected = [
      {
        open: 151.525,
        high: 151.89,
        low: 150.49,
        close: 151.3575,
        volume: 1.06e8,
      },
      {
        open: 151.44125,
        high: 152.86,
        low: 149.0,
        close: 150.8725,
        volume: 2.45e8,
      },
      {
        open: 151.156875,
        high: 151.156875,
        low: 148.73,
        close: 149.6675,
        volume: 1.86e8,
      },
      {
        open: 150.4121875,
        high: 152.33,
        low: 149.76,
        close: 150.9725,
        volume: 1.44e8,
      },
      {
        open: 150.6923438,
        high: 152.87,
        low: 150.6923438,
        close: 151.9475,
        volume: 1.24e8,
      },
    ];

    let indicator = new HeikinAshi({});
    candles.forEach((candle, i) => {
      indicator.update(candle);
      let result = indicator.result;
      expect(result.open).to.be.closeTo(expected[i].open, 0.0000001);
      expect(result.high).to.be.closeTo(expected[i].high, 0.0000001);
      expect(result.low).to.be.closeTo(expected[i].low, 0.0000001);
      expect(result.close).to.be.closeTo(expected[i].close, 0.0000001);
      expect(result.volume).to.equal(expected[i].volume);
    });
  });

});
