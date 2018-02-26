var chai = require('chai');
var expect = chai.expect;

var util = require('../../core/util');
var dirs = util.dirs();
var INDICATOR_PATH = dirs.indicators;

describe('indicators/projectgEMA', function() {

  var EMA = require(INDICATOR_PATH + 'projectgEMA');

  it('should calculate EMAs like stockcharts', function() {
    // Source: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:moving_averages
    var pricesEMA = [22.2734, 22.194, 22.0847, 22.1741, 22.184, 22.1344, 22.2337, 22.4323, 22.2436, 22.2933, 22.1542, 22.3926, 22.3816, 22.6109, 23.3558, 24.0519, 23.753, 23.8324, 23.9516, 23.6338, 23.8225, 23.8722, 23.6537, 23.187, 23.0976, 23.326, 22.6805, 23.0976, 22.4025, 22.1725]
    var expectedEMA = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 22.22475, 22.21192273, 22.24477314, 22.26965075, 22.33169607, 22.51789678, 22.79680646, 22.97065983, 23.12733986, 23.27720534, 23.34204073, 23.42939696, 23.50990661, 23.53605086, 23.47258707, 23.4044076, 23.39015167, 23.2611241, 23.23139244, 23.08068473, 22.91556023]

    var ema = new EMA(10);
    pricesEMA.forEach((price, i) => {
      ema.update(price);
      expect(ema.result).to.be.closeTo(expectedEMA[i], 0.00000001);
    });
  });

});
