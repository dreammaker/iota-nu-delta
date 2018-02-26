var Indicator = function(period) {
  this.input = 'price';
  this.period = period;
  this.result = 0;
  this.index = 0;
  this.previousPrice = 0;
  this.previousAvgUp = 0;
  this.previousAvgDown = 0;
  this.sumUps = 0;
  this.sumDowns = 0;
}

Indicator.prototype.update = function(price) {
  const index = this.index;
  this.index++;

  const difference = price - this.previousPrice;
  this.previousPrice = price;

  if (index === 0) {
    this.result = 0;
    return;
  }

  let currentUp, currentDown;
  if (difference > 0) {
    this.sumUps += difference;
    currentUp = difference;
    currentDown = 0;
  }
  else {
    this.sumDowns -= difference;
    currentUp = 0;
    currentDown = -difference;
  }

  const period = this.period;
  if (index < period) {
    this.result = 0;
    return;
  }

  let avgUps, avgDowns;
  if (index === period) {
    avgUps = this.sumUps / index;
    avgDowns = this.sumDowns / index;
  }
  else {
    avgUps = (this.previousAvgUp * (period - 1) + currentUp) / period;
    avgDowns = (this.previousAvgDown * (period - 1) + currentDown) / period;
  }
  this.previousAvgUp = avgUps;
  this.previousAvgDown = avgDowns;
  this.result = this.calculateRSI(avgUps, avgDowns);
}

Indicator.prototype.calculateRSI = function(upAverage, downAverage) {
  let relativeStrength = upAverage / downAverage;
  return 100 - (100 / (1 + relativeStrength));
}

module.exports = Indicator;
