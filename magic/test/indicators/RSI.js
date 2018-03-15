var chai = require('chai');
var expect = chai.expect;

var util = require('../../core/util');
var dirs = util.dirs();
var INDICATOR_PATH = dirs.indicators;

describe('indicators/projectgRSI', function() {

  var RSI = require(INDICATOR_PATH + 'projectgRSI');

  it('should accept a settings object like the built-in RSI', function() {
    var rsi = new RSI({ interval: 42 });
    expect(rsi.period).to.equal(42);
  });

  it('should calculate RSIs like stockcharts', function() {
    // Source: http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:relative_strength_index_rsi
    var closePrices = [44.3389, 44.0902, 44.1497, 43.6124, 44.3278, 44.8264, 45.0955, 45.4245, 45.8433, 46.0826, 45.8931, 46.0328, 45.614, 46.282, 46.282, 46.0028, 46.0328, 46.4116, 46.2222, 45.6439, 46.2122, 46.2521, 45.7137, 46.4515, 45.7835, 45.3548, 44.0288, 44.1783, 44.2181, 44.5672, 43.4205, 42.6628, 43.1314]
    var expected = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 70.53278948, 66.31856181, 66.54982994, 69.40630534, 66.35516906, 57.97485571, 62.92960675, 63.25714756, 56.05929872, 62.37707144, 54.70757308, 50.42277441, 39.98982315, 41.46048198, 41.86891609, 45.46321245, 37.30404209, 33.07952299, 37.77295211]

    var rsi = new RSI(14);
    closePrices.forEach((price, i) => {
      rsi.update(price);
      expect(rsi.result).to.be.closeTo(expected[i], 0.00000001);
    });
  });

  it('should calculate RSIs like J Willer Wilder', function() {
    // Source: J. Willer Wilder - "New Concepts In Technical Trading System"
    // Note: J.W. Wilder truncated the floating point number at the 2nd decimal
    // point of the results of his calculations.  No proper or accurate expected
    // results rounding :( This gives a difference in results of +/-0.53
    var closePrices = [54.8, 56.8, 57.85, 59.85, 60.57, 61.10, 62.17, 60.60, 62.35, 62.15, 62.35, 61.45, 62.80, 61.37, 62.50, 62.57, 60.80, 59.37, 60.35, 62.35, 62.17, 62.55, 64.55, 64.37, 65.30, 64.42, 62.90, 61.60, 62.05, 60.05, 59.70, 60.90, 60.25, 58.27, 58.70, 57.72, 58.10, 58.20]
    var expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74.36, 74.55, 65.75, 59.68, 61.98, 66.44, 65.75, 67.0, 71.43, 70.50, 72.14, 67.95, 60.78, 55.56, 56.71, 49.49, 48.19, 52.38, 50.0, 43.50, 45.36, 42.53, 44.13, 44.75]

    var rsi = new RSI(14);
    closePrices.forEach((price, i) => {
      rsi.update(price);
      expect(rsi.result).to.be.closeTo(expected[i], 0.53);
    });
  });

});
