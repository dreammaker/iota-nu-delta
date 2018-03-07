let chai = require('chai');
let expect = chai.expect;

let util = require('../../core/util');
let dirs = util.dirs();
let INDICATOR_PATH = dirs.indicators;

describe('indicators/projectgIchimoku', function() {

  let Ichimoku = require(INDICATOR_PATH + 'projectgIchimoku');

  it('should calculate Ichimoku Cloud like TradingView', function() {
    // Candle data from Binance API 2017-08-26 1d.
    let highs = [0.000340, 0.000294, 0.000223, 0.000215, 0.000153, 0.000389, 0.000422, 0.000684, 0.000639, 0.000428, 0.000331, 0.000344, 0.000438, 0.000375, 0.000393, 0.000536, 0.000588, 0.000515, 0.000541, 0.000497, 0.000493, 0.000466, 0.000470, 0.000447, 0.000400, 0.000368, 0.000410, 0.000475, 0.000508, 0.000570, 0.000830, 0.001009, 0.001680, 0.001550, 0.001334, 0.001747, 0.001996, 0.001899, 0.001825, 0.001779, 0.001640, 0.001850, 0.001850, 0.001630, 0.001540, 0.001538, 0.001449, 0.001185, 0.001143, 0.001089, 0.001177, 0.001119, 0.001271, 0.001260, 0.001331, 0.001170, 0.001241, 0.001184, 0.001485, 0.001475, 0.001347, 0.001211, 0.001193, 0.001166, 0.001340, 0.001240, 0.000960, 0.000748, 0.000790, 0.000759, 0.000700, 0.000725, 0.000714, 0.001117, 0.000945, 0.000880, 0.000870, 0.000831, 0.000860, 0.000819, 0.000808, 0.000728, 0.000695, 0.000667, 0.000660, 0.000660, 0.000620, 0.000595, 0.000577, 0.000654, 0.000646, 0.000596, 0.000853];
    let lows = [0.000104, 0.000182, 0.000141, 0.000116, 0.000100, 0.000114, 0.000233, 0.000300, 0.000150, 0.000091, 0.000197, 0.000205, 0.000245, 0.000275, 0.000316, 0.000371, 0.000320, 0.000409, 0.000451, 0.000355, 0.000430, 0.000435, 0.000435, 0.000361, 0.000290, 0.000318, 0.000340, 0.000402, 0.000432, 0.000481, 0.000543, 0.000699, 0.000902, 0.001074, 0.001020, 0.001237, 0.001668, 0.001636, 0.001435, 0.001525, 0.001461, 0.001510, 0.001474, 0.001200, 0.001279, 0.001371, 0.001060, 0.000815, 0.000962, 0.000977, 0.001030, 0.001063, 0.001080, 0.001155, 0.000980, 0.000982, 0.001103, 0.001103, 0.001149, 0.001236, 0.001147, 0.001117, 0.001120, 0.001110, 0.001109, 0.000854, 0.000710, 0.000540, 0.000590, 0.000640, 0.000626, 0.000643, 0.000680, 0.000650, 0.000791, 0.000715, 0.000790, 0.000745, 0.000762, 0.000750, 0.000682, 0.000594, 0.000572, 0.000594, 0.000590, 0.000560, 0.000566, 0.000540, 0.000525, 0.000530, 0.000571, 0.000540, 0.000485];
    let closes = [0.000254, 0.000218, 0.000182, 0.000141, 0.000127, 0.000319, 0.000398, 0.000638, 0.000429, 0.000268, 0.000218, 0.000330, 0.000301, 0.000373, 0.000373, 0.000509, 0.000436, 0.000490, 0.000490, 0.000470, 0.000465, 0.000459, 0.000443, 0.000385, 0.000325, 0.000346, 0.000408, 0.000468, 0.000490, 0.000560, 0.000770, 0.000948, 0.001480, 0.001320, 0.001237, 0.001690, 0.001900, 0.001825, 0.001750, 0.001580, 0.001540, 0.001791, 0.001500, 0.001310, 0.001490, 0.001399, 0.001060, 0.001002, 0.001015, 0.001048, 0.001080, 0.001082, 0.001221, 0.001251, 0.001025, 0.001164, 0.001150, 0.001152, 0.001475, 0.001299, 0.001175, 0.001160, 0.001143, 0.001125, 0.001220, 0.000861, 0.000713, 0.000651, 0.000685, 0.000685, 0.000655, 0.000706, 0.000680, 0.000871, 0.000869, 0.000801, 0.000821, 0.000769, 0.000800, 0.000801, 0.000712, 0.000600, 0.000615, 0.000647, 0.000611, 0.000610, 0.000580, 0.000569, 0.000545, 0.000584, 0.000593, 0.000554, 0.000667];
    let tenkanSen = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0003920, 0.0003875, 0.0003875, 0.0003875, 0.0003875, 0.0003875, 0.0003875, 0.0003875, 0.0003650, 0.0003395, 0.0003925, 0.0003965, 0.0004165, 0.0004315, 0.0004520, 0.0004540, 0.0004390, 0.0004155, 0.0004155, 0.0003935, 0.0003990, 0.0004300, 0.0005600, 0.0006495, 0.0009850, 0.0009990, 0.0010100, 0.0010745, 0.0012140, 0.0012385, 0.0012695, 0.0013475, 0.0014490, 0.0015080, 0.0015080, 0.0015980, 0.0015980, 0.0015495, 0.0014550, 0.0013325, 0.0013325, 0.0013325, 0.0013325, 0.0012225, 0.0011775, 0.0011765, 0.0011320, 0.0010730, 0.0011465, 0.0011540, 0.0012325, 0.0012325, 0.0012325, 0.0012325, 0.0012325, 0.0012335, 0.0012940, 0.0011695, 0.0010975, 0.0010075, 0.0009435, 0.0009400, 0.0009400, 0.0009400, 0.0009400, 0.0008900, 0.0008285, 0.0008285, 0.0008535, 0.0008715, 0.0008715, 0.0008800, 0.0008835, 0.0008555, 0.0007585, 0.0007260, 0.0007210, 0.0007100, 0.0007100, 0.0006795, 0.0006665, 0.0006265, 0.0006100, 0.0005960, 0.0006690];
    let kijunSen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0003875, 0.0003875, 0.0003875, 0.0003875, 0.0003875, 0.0004605, 0.0005500, 0.0008855, 0.0008855, 0.0008855, 0.0009720, 0.0011005, 0.0011205, 0.0011355, 0.0011430, 0.0011430, 0.0011430, 0.0011430, 0.0011430, 0.0011430, 0.0011430, 0.0011430, 0.0011430, 0.0011430, 0.0011430, 0.0011570, 0.0011680, 0.0011990, 0.0012140, 0.0012385, 0.0012695, 0.0013475, 0.0014055, 0.0014055, 0.0014055, 0.0014055, 0.0014055, 0.0013570, 0.0013325, 0.0013325, 0.0013325, 0.0012800, 0.0011950, 0.0010850, 0.0010400, 0.0010390, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010125, 0.0010075, 0.0009435, 0.0009400, 0.0009400, 0.0009325, 0.0009325, 0.0008825, 0.0008210, 0.0008010];
    let senkouA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00040150, 0.00040150, 0.00039050, 0.00039325, 0.00040875, 0.00051025, 0.00059975, 0.00093525, 0.00094225, 0.00094775, 0.00102325, 0.00115725, 0.00117950, 0.00120250, 0.00124525, 0.00129600, 0.00132550, 0.00132550, 0.00137050, 0.00137050, 0.00134625, 0.00129900, 0.00123775, 0.00123775, 0.00123775, 0.00124475, 0.00119525, 0.00118825, 0.00119525, 0.00118525, 0.00117125, 0.00124700, 0.00127975, 0.00131900, 0.00131900, 0.00131900, 0.00131900, 0.00129475, 0.00128300, 0.00131325, 0.00125100, 0.00118875];
    let senkouB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00104350, 0.00104350, 0.00104350, 0.00104350, 0.00104350, 0.00104350, 0.00104350, 0.00104350, 0.00104350, 0.00104350, 0.00109650, 0.00110050, 0.00112050, 0.00113550, 0.00114300, 0.00114300];

    let indicator = new Ichimoku(9, 26, 52, 26);
    highs.forEach((val, i) => {
      let candle = {
        high: highs[i],
        low: lows[i],
        close: closes[i],
      };
      indicator.update(candle);
      expect(indicator.tenkanSen).to.be.closeTo(tenkanSen[i], 0.0000001);
      expect(indicator.kijunSen).to.be.closeTo(kijunSen[i], 0.0000001);
      expect(indicator.senkouA).to.be.closeTo(senkouA[i], 0.0000001);
      expect(indicator.senkouB).to.be.closeTo(senkouB[i], 0.0000001);
    });
  });

  it('should calculate Ichimoku Cloud like QuantConnect', function() {
    // Source: https://github.com/QuantConnect/Lean/blob/master/Tests/TestData/spy_with_ichimoku.csv
    let highs = [206.690, 206.880, 207.180, 206.930, 206.590, 206.160, 205.500, 205.400, 205.140, 206.130, 207.720, 207.940, 208.220, 208.110, 208.160, 208.520, 208.690, 208.050, 207.860, 207.650, 207.860, 208.150, 208.250, 208.420, 207.440, 207.570, 207.580, 207.340, 207.340, 210.370, 211.270, 210.100, 210.290, 209.870, 209.460, 209.760, 209.810, 209.850, 210.020, 210.350, 210.610, 210.840, 211.020, 210.980, 211.000, 210.980, 211.110, 210.910, 210.890, 210.790, 210.980, 210.780, 210.010, 210.230, 210.400, 210.270, 209.740, 209.520, 209.500, 209.350, 208.960, 208.870, 207.420, 207.160, 207.130, 206.760, 205.510, 205.380, 205.820, 205.900, 206.370, 206.220, 205.900, 205.660, 205.920, 205.950, 205.650, 205.660, 205.670, 205.950, 208.050, 208.100, 208.000, 208.230, 208.480, 208.540, 208.610, 207.560, 207.860, 208.100, 207.580, 207.880, 207.640, 207.590, 206.420, 205.930, 206.020, 205.710, 205.950, 205.800, 205.740, 206.850, 206.980, 206.630, 206.420, 206.550, 206.730, 206.770, 206.710, 207.730, 208.030, 208.270, 208.450, 208.420, 208.400, 208.640, 208.760, 208.540, 208.650, 208.550, 208.470, 208.280, 208.450, 208.510, 208.240, 208.130, 208.030, 208.450, 208.080, 208.650, 208.340, 208.010, 208.320, 208.460, 208.530, 209.180, 209.360, 209.820, 209.980, 209.930, 209.950, 210.090, 210.060, 210.500, 210.630, 210.440, 210.210, 210.050, 209.780, 209.650, 209.500, 208.750, 209.330, 209.710, 209.480, 209.420, 209.600, 210.710, 210.650, 210.660, 210.540, 210.980, 211.040, 210.960, 210.250, 210.400, 210.460, 210.480, 210.970, 210.980, 210.720, 209.230, 208.510, 208.350, 208.330, 208.300, 207.560, 208.200, 209.910, 210.090, 210.250, 210.170, 210.180, 209.970, 210.200, 210.860, 210.260, 210.150, 209.820, 209.960, 209.860, 209.800, 210.100, 210.160, 210.240, 210.370, 210.670, 210.770, 210.850, 210.650, 210.860, 211.400, 211.780, 211.770, 211.720, 211.940, 211.760, 211.590, 211.790, 211.970, 211.870, 211.820, 211.710, 212.430, 212.480, 212.120, 211.810, 211.400, 211.370, 211.250, 210.920, 210.630, 211.270, 211.460, 211.500, 211.300, 211.430, 211.210, 210.980, 210.950, 210.520, 210.720, 211.290, 210.970, 210.350, 209.520, 210.200, 209.720, 209.540, 210.590, 208.530, 209.880, 210.100, 210.100, 209.940, 210.490, 210.720, 210.770, 211.980, 212.020, 211.750, 211.740, 211.560, 211.750, 211.700, 211.460, 210.880, 210.510, 210.230, 209.830, 209.620, 209.360, 209.930, 208.980, 208.890, 208.580, 208.170, 207.650, 208.090, 208.390, 208.650, 209.020, 209.380, 209.360, 209.250, 209.210, 211.430, 211.580, 211.860, 211.820, 211.770, 211.580, 211.760, 211.850, 211.890, 211.680, 211.580, 211.420, 211.250, 211.080, 209.630, 210.190, 210.280, 210.280, 210.490, 210.630, 210.400, 211.220, 210.980, 210.440, 210.420, 210.590, 210.400, 210.220, 211.480, 211.650, 211.620, 211.920, 212.190, 212.200, 212.320, 212.610, 212.370, 212.420, 212.220, 212.230, 212.390, 212.480, 212.600, 212.600, 212.990, 212.990, 213.200, 213.280, 213.400, 213.320, 213.310, 213.360, 213.300, 213.570, 213.490, 213.190, 213.200, 213.190, 213.130, 213.100, 212.950, 213.780, 213.480, 212.960, 213.370, 213.600, 213.640, 213.550, 213.580, 213.750, 213.340, 213.430, 213.400, 213.270, 213.540, 213.350, 213.440, 212.500, 211.690, 211.240, 211.110, 210.880, 210.620, 210.920, 212.160, 212.000, 212.340, 212.330, 212.490, 212.700, 212.980, 212.590, 212.210, 212.340, 212.150, 212.260, 212.530, 212.580, 212.430, 212.160, 211.580, 211.960, 212.100, 211.820, 211.660, 212.110, 211.730, 211.590, 212.010, 212.090, 212.340, 212.260, 211.140, 211.470, 211.440, 212.130, 212.190, 212.150, 211.660, 212.160, 212.670, 212.630, 211.970, 211.960, 212.250, 212.100, 211.440, 211.780, 211.100, 210.810, 210.500, 210.350, 210.340, 210.170, 210.580, 210.220, 210.070, 210.150, 210.170, 210.080, 209.820, 209.510, 209.470, 209.190, 208.880, 209.260, 209.150, 208.820, 208.600, 208.910, 208.880, 209.100, 209.020, 208.810, 210.100, 210.600, 211.410, 211.260, 211.250, 211.390, 211.350, 211.980, 212.090, 211.720, 211.700, 211.870, 211.820, 211.760, 210.840, 210.730, 210.540, 210.170, 210.300, 210.200, 210.200, 208.660, 208.590, 209.340, 209.310, 209.450, 209.320, 209.260, 209.720, 209.560, 209.870, 210.030, 210.230, 210.350, 210.340, 210.990, 210.840, 210.760, 210.350, 210.030, 211.320, 211.170, 212.020, 212.590, 212.940, 213.340, 212.950, 212.990, 213.100, 211.520, 211.550, 211.520, 211.180, 211.310, 211.220, 211.010, 212.180, 212.460, 212.590, 212.210, 212.020, 212.150, 212.090, 212.310, 212.440, 212.020, 211.860, 211.940, 212.150, 212.170];
    let lows = [206.340, 206.420, 206.840, 206.220, 205.120, 204.580, 204.730, 204.760, 204.640, 204.930, 206.680, 207.560, 207.740, 207.760, 207.670, 207.940, 208.340, 207.250, 207.440, 206.980, 207.140, 207.720, 207.690, 207.890, 206.950, 207.110, 207.120, 206.950, 206.620, 207.240, 209.990, 209.490, 209.480, 209.030, 209.070, 209.070, 209.320, 209.310, 209.610, 209.750, 210.240, 210.430, 210.720, 210.660, 210.360, 210.330, 210.670, 210.550, 210.500, 210.550, 210.620, 210.010, 209.450, 209.840, 209.860, 209.520, 209.220, 208.980, 208.740, 208.290, 208.290, 207.080, 206.650, 206.500, 206.640, 205.710, 204.500, 204.120, 204.690, 205.250, 205.170, 205.370, 205.170, 205.130, 204.900, 205.270, 205.250, 205.300, 205.370, 205.380, 206.960, 207.520, 207.660, 207.900, 208.140, 208.270, 208.240, 206.970, 207.300, 207.370, 207.140, 207.390, 207.290, 206.360, 204.510, 204.670, 205.340, 205.060, 205.290, 205.100, 205.030, 205.400, 206.230, 206.170, 205.830, 206.200, 206.150, 206.220, 205.210, 206.490, 207.570, 207.900, 208.220, 208.120, 207.750, 207.760, 207.730, 208.200, 208.310, 208.140, 208.220, 207.240, 207.520, 207.150, 207.450, 207.800, 207.640, 207.080, 207.600, 207.750, 207.400, 207.190, 207.830, 208.040, 208.040, 208.460, 208.960, 209.200, 209.620, 209.720, 209.660, 209.740, 209.740, 209.840, 210.200, 210.140, 209.870, 209.380, 209.270, 209.030, 208.560, 208.100, 208.420, 209.150, 209.230, 209.090, 209.190, 209.950, 210.260, 210.060, 210.220, 210.460, 210.730, 210.410, 209.810, 209.790, 210.020, 210.190, 210.280, 210.650, 210.240, 208.170, 207.800, 207.690, 207.980, 207.340, 207.010, 207.330, 208.960, 209.530, 209.970, 209.950, 209.850, 209.710, 209.770, 210.000, 209.650, 209.500, 209.530, 209.440, 209.240, 209.430, 209.280, 208.900, 209.920, 209.910, 210.120, 210.530, 210.080, 210.010, 210.160, 210.290, 211.110, 211.450, 211.410, 211.160, 211.120, 211.110, 211.420, 211.620, 211.590, 211.410, 211.430, 211.870, 211.810, 211.650, 211.010, 210.920, 210.890, 210.540, 210.400, 209.330, 210.400, 210.930, 211.170, 210.950, 211.060, 210.320, 210.100, 210.310, 209.600, 209.780, 210.070, 210.280, 209.280, 208.920, 209.250, 208.970, 209.190, 208.150, 207.620, 209.370, 209.350, 209.280, 209.340, 209.780, 210.340, 210.210, 211.100, 211.530, 211.410, 211.370, 211.180, 211.400, 211.310, 210.570, 210.270, 209.500, 209.750, 209.160, 208.740, 208.730, 207.980, 207.650, 208.120, 207.860, 207.280, 206.760, 206.890, 207.570, 207.520, 208.310, 208.680, 208.840, 208.950, 208.620, 210.780, 211.230, 211.410, 211.520, 211.400, 211.300, 211.450, 211.270, 211.110, 211.250, 211.030, 211.130, 210.680, 210.520, 208.620, 208.740, 209.750, 209.580, 209.920, 209.930, 209.930, 210.290, 210.040, 209.850, 209.920, 210.180, 209.870, 209.740, 210.910, 210.940, 211.330, 211.460, 211.860, 212.000, 212.060, 212.120, 211.860, 211.940, 211.940, 212.040, 211.970, 212.220, 212.160, 212.250, 212.430, 212.560, 212.880, 213.090, 213.060, 212.800, 212.860, 212.930, 213.080, 213.150, 212.970, 212.690, 212.500, 212.530, 212.680, 212.780, 212.740, 212.840, 212.720, 212.510, 212.740, 213.240, 213.390, 213.150, 213.150, 213.210, 212.910, 213.140, 212.920, 213.030, 213.070, 213.150, 212.920, 211.470, 210.830, 210.610, 210.670, 210.270, 210.210, 210.200, 210.850, 211.600, 211.850, 212.070, 212.160, 212.470, 212.590, 211.820, 211.630, 211.660, 211.720, 211.840, 212.000, 212.300, 211.820, 210.820, 210.860, 211.400, 211.630, 210.920, 211.100, 210.940, 210.620, 211.030, 211.120, 211.830, 211.980, 211.460, 210.270, 210.560, 211.040, 211.350, 211.870, 211.380, 211.240, 211.330, 211.570, 211.690, 211.500, 211.680, 211.900, 211.740, 210.600, 210.800, 210.360, 210.470, 209.760, 209.780, 209.750, 208.980, 209.660, 209.790, 209.470, 209.810, 209.800, 209.560, 209.170, 209.150, 208.960, 208.770, 208.420, 208.470, 208.390, 207.910, 207.690, 208.410, 208.500, 208.630, 208.640, 208.270, 209.310, 209.900, 210.470, 211.020, 210.920, 211.070, 210.940, 211.410, 211.200, 211.220, 211.380, 211.490, 211.560, 211.290, 210.130, 209.710, 209.680, 209.890, 209.920, 209.720, 209.720, 207.790, 208.030, 208.570, 208.900, 208.780, 208.820, 208.750, 208.720, 208.870, 209.200, 209.590, 209.920, 210.110, 210.120, 210.570, 210.480, 210.130, 209.490, 209.550, 209.360, 210.580, 211.170, 211.860, 212.540, 212.690, 212.440, 212.510, 212.660, 211.090, 211.260, 211.070, 210.950, 210.990, 210.680, 210.440, 211.690, 211.970, 212.140, 211.640, 211.680, 211.810, 211.740, 212.070, 211.700, 211.710, 211.570, 211.590, 211.830, 211.930];
    let closes = [206.590, 206.840, 207.130, 206.480, 205.120, 205.070, 205.370, 205.070, 205.070, 205.840, 207.600, 207.770, 208.080, 207.940, 208.060, 208.470, 208.640, 207.570, 207.650, 207.470, 207.850, 208.100, 207.990, 207.970, 207.140, 207.510, 207.270, 207.040, 207.290, 210.110, 210.420, 210.020, 209.720, 209.350, 209.170, 209.360, 209.680, 209.500, 209.820, 210.250, 210.470, 210.770, 210.860, 210.950, 210.450, 210.750, 210.810, 210.740, 210.710, 210.650, 210.720, 210.020, 209.980, 210.000, 210.140, 209.540, 209.510, 209.220, 208.780, 208.520, 208.740, 207.350, 207.030, 206.890, 206.740, 205.760, 204.790, 205.230, 205.810, 205.770, 206.170, 205.390, 205.280, 205.590, 205.890, 205.560, 205.610, 205.550, 205.530, 205.750, 207.940, 207.850, 207.930, 208.180, 208.270, 208.520, 208.270, 207.360, 207.550, 207.380, 207.470, 207.470, 207.570, 206.450, 204.840, 205.700, 205.470, 205.490, 205.740, 205.420, 205.740, 206.760, 206.390, 206.250, 206.290, 206.420, 206.330, 206.400, 206.510, 207.590, 207.920, 208.230, 208.300, 208.320, 207.840, 208.080, 208.480, 208.510, 208.410, 208.250, 208.240, 207.280, 208.390, 207.590, 208.070, 207.890, 207.950, 207.790, 207.990, 208.010, 207.790, 207.880, 208.290, 208.130, 208.470, 208.920, 209.230, 209.670, 209.750, 209.840, 209.890, 209.960, 210.060, 210.450, 210.220, 210.160, 210.050, 209.660, 209.440, 209.060, 208.730, 208.580, 209.190, 209.410, 209.360, 209.370, 209.490, 210.450, 210.630, 210.400, 210.510, 210.800, 210.910, 210.470, 210.000, 210.220, 210.200, 210.360, 210.940, 210.650, 210.370, 208.400, 207.970, 208.190, 208.160, 207.450, 207.380, 207.950, 209.800, 210.050, 210.160, 210.030, 209.860, 209.960, 209.850, 210.060, 209.880, 209.650, 209.720, 209.440, 209.780, 209.560, 209.540, 210.080, 210.210, 210.260, 210.580, 210.580, 210.630, 210.620, 210.320, 211.220, 211.740, 211.650, 211.570, 211.180, 211.540, 211.500, 211.640, 211.730, 211.740, 211.490, 211.650, 212.320, 211.900, 211.740, 211.170, 211.230, 211.080, 210.740, 210.630, 210.410, 211.100, 211.310, 211.290, 211.180, 211.410, 210.820, 210.560, 210.460, 210.140, 210.580, 210.830, 210.530, 209.300, 209.260, 209.450, 209.310, 209.240, 208.200, 208.480, 209.540, 209.600, 209.600, 209.940, 210.380, 210.440, 210.690, 211.910, 211.600, 211.660, 211.430, 211.540, 211.540, 211.320, 210.630, 210.510, 209.930, 209.770, 209.400, 208.920, 208.890, 208.360, 208.800, 208.550, 207.980, 207.510, 207.170, 208.040, 207.660, 208.450, 208.710, 209.210, 208.950, 209.100, 208.870, 211.290, 211.420, 211.740, 211.610, 211.420, 211.570, 211.650, 211.660, 211.530, 211.540, 211.180, 211.130, 210.720, 210.600, 209.050, 209.780, 210.020, 210.120, 210.100, 210.200, 209.980, 210.810, 210.060, 210.240, 210.190, 210.360, 209.970, 210.060, 211.080, 211.510, 211.560, 211.900, 212.060, 212.150, 212.210, 212.270, 212.290, 212.080, 212.160, 212.090, 212.320, 212.440, 212.550, 212.420, 212.900, 212.900, 213.140, 213.240, 213.100, 213.070, 213.080, 213.190, 213.200, 213.450, 213.180, 213.030, 212.620, 213.020, 212.810, 212.930, 212.870, 213.430, 212.880, 212.840, 213.240, 213.500, 213.460, 213.190, 213.480, 213.500, 213.230, 213.370, 213.160, 213.240, 213.330, 213.270, 212.980, 211.570, 210.900, 210.890, 210.700, 210.350, 210.240, 210.700, 211.850, 211.990, 212.220, 212.180, 212.470, 212.610, 212.700, 211.850, 211.880, 211.840, 211.890, 212.100, 212.450, 212.460, 212.060, 211.130, 211.480, 211.710, 211.790, 211.180, 211.100, 211.300, 211.310, 211.150, 211.980, 212.040, 212.160, 211.570, 210.770, 211.150, 211.370, 212.000, 212.110, 211.660, 211.360, 211.960, 212.550, 211.910, 211.820, 211.900, 211.980, 211.920, 211.350, 210.880, 210.590, 210.500, 209.930, 210.130, 210.230, 209.680, 209.960, 209.970, 210.010, 209.870, 209.950, 209.770, 209.330, 209.230, 209.040, 208.790, 208.690, 209.130, 208.490, 207.960, 208.560, 208.690, 208.860, 208.700, 208.760, 208.470, 209.900, 210.550, 211.060, 211.190, 211.080, 211.350, 210.950, 211.930, 211.300, 211.550, 211.620, 211.760, 211.640, 211.650, 210.410, 209.750, 210.070, 209.960, 210.190, 209.760, 210.000, 208.130, 208.570, 208.990, 209.230, 208.980, 208.910, 209.070, 209.420, 209.260, 209.670, 209.990, 210.110, 210.270, 210.250, 210.710, 210.710, 210.330, 209.640, 209.920, 211.070, 210.610, 211.860, 212.560, 212.760, 212.810, 212.560, 212.960, 212.780, 211.350, 211.510, 211.130, 211.110, 211.210, 210.770, 210.460, 212.090, 212.340, 212.180, 211.990, 211.950, 212.070, 211.890, 212.260, 211.860, 211.840, 211.680, 211.890, 212.070, 211.990];
    let tenkanSen = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 205.880, 205.880, 206.150, 206.260, 206.400, 206.400, 206.430, 206.580, 206.665, 206.810, 207.685, 207.835, 207.835, 207.835, 207.835, 207.835, 207.820, 207.685, 207.685, 207.685, 207.520, 208.495, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 209.255, 210.150, 209.690, 209.820, 209.935, 210.045, 210.045, 210.165, 210.165, 210.360, 210.430, 210.675, 210.720, 210.720, 210.560, 210.280, 210.280, 210.280, 210.215, 210.100, 209.980, 209.860, 209.535, 209.345, 208.740, 208.525, 208.385, 208.120, 207.615, 207.000, 206.735, 206.540, 206.495, 205.770, 205.640, 205.625, 205.440, 205.245, 205.245, 205.530, 205.635, 205.635, 205.560, 206.475, 206.500, 206.500, 206.740, 206.865, 206.920, 206.990, 206.995, 207.785, 207.790, 207.790, 207.790, 207.790, 207.485, 206.560, 206.305, 206.305, 206.305, 206.195, 206.195, 206.075, 206.050, 205.745, 205.825, 206.005, 206.005, 206.005, 206.005, 206.005, 206.470, 206.620, 206.740, 206.830, 206.830, 206.830, 206.925, 206.985, 207.625, 208.165, 208.245, 208.245, 208.000, 208.000, 207.955, 207.955, 207.900, 207.900, 207.815, 207.795, 207.865, 207.865, 207.865, 207.865, 207.865, 207.865, 208.130, 208.275, 208.505, 208.585, 208.585, 208.905, 209.065, 209.065, 209.480, 209.795, 209.915, 210.125, 210.005, 209.950, 209.830, 209.595, 209.365, 209.365, 209.270, 209.155, 209.075, 208.940, 209.405, 209.405, 209.405, 209.565, 210.035, 210.065, 210.065, 210.115, 210.415, 210.415, 210.415, 210.415, 210.415, 210.415, 209.575, 209.390, 209.335, 209.335, 209.160, 208.995, 208.995, 208.865, 208.550, 208.630, 208.630, 208.630, 208.630, 208.630, 209.095, 209.910, 210.180, 210.180, 210.150, 210.050, 210.050, 210.050, 209.880, 209.580, 209.635, 209.785, 209.835, 209.875, 209.875, 209.880, 210.150, 210.845, 210.845, 210.895, 210.975, 210.975, 210.975, 211.050, 211.130, 211.540, 211.540, 211.540, 211.770, 211.795, 211.795, 211.745, 211.700, 211.685, 211.510, 211.440, 210.905, 210.905, 210.725, 210.570, 210.415, 210.415, 210.415, 210.415, 210.415, 210.550, 210.550, 210.550, 210.515, 210.355, 210.105, 210.105, 210.105, 210.105, 209.720, 209.455, 209.295, 209.105, 209.105, 209.105, 209.105, 209.170, 209.195, 209.800, 210.650, 210.650, 210.650, 210.680, 210.900, 211.115, 211.115, 211.145, 210.760, 210.625, 210.455, 210.245, 210.240, 209.840, 209.555, 209.265, 209.080, 208.755, 208.345, 208.345, 208.345, 208.345, 207.890, 208.070, 208.070, 208.070, 208.070, 209.160, 209.550, 209.690, 210.085, 210.240, 210.240, 210.240, 210.240, 211.335, 211.500, 211.460, 211.460, 211.285, 211.205, 210.255, 210.255, 210.255, 210.150, 210.100, 210.020, 209.935, 209.920, 209.920, 209.980, 210.400, 210.400, 210.535, 210.480, 210.610, 210.695, 210.695, 210.830, 210.965, 210.970, 211.030, 211.175, 211.760, 211.775, 211.970, 212.035, 212.235, 212.235, 212.235, 212.235, 212.425, 212.465, 212.570, 212.625, 212.685, 212.780, 212.780, 212.825, 212.915, 213.065, 213.185, 213.130, 213.035, 213.035, 213.035, 213.035, 213.035, 213.140, 213.140, 213.140, 213.140, 213.145, 213.145, 213.145, 213.145, 213.145, 213.130, 213.130, 213.245, 213.330, 213.330, 213.330, 213.330, 212.610, 212.185, 212.075, 212.075, 211.905, 211.875, 211.820, 211.820, 211.350, 211.270, 211.270, 211.345, 211.450, 211.590, 211.590, 211.915, 212.290, 212.305, 212.305, 212.305, 212.305, 212.305, 211.705, 211.700, 211.700, 211.700, 211.700, 211.700, 211.700, 211.525, 211.390, 211.365, 211.365, 211.480, 211.480, 211.305, 211.305, 211.305, 211.305, 211.305, 211.305, 211.305, 211.265, 211.470, 211.615, 211.855, 211.955, 211.955, 211.955, 211.635, 211.635, 211.515, 211.495, 211.005, 211.005, 211.000, 210.540, 210.380, 210.380, 210.040, 209.895, 209.780, 209.780, 209.780, 209.780, 209.770, 209.495, 209.295, 209.295, 209.280, 208.995, 208.755, 208.600, 208.580, 208.475, 208.475, 208.475, 208.895, 209.145, 209.550, 209.840, 209.840, 209.840, 209.840, 210.125, 210.700, 210.995, 211.280, 211.505, 211.505, 211.515, 211.110, 210.900, 210.885, 210.775, 210.775, 210.775, 210.750, 209.775, 209.315, 209.260, 209.165, 209.045, 209.045, 208.995, 208.995, 208.755, 208.950, 209.300, 209.475, 209.535, 209.535, 209.855, 209.855, 209.930, 210.095, 210.240, 210.340, 210.340, 210.690, 210.975, 211.150, 211.350, 211.350, 211.350, 211.350, 211.960, 212.215, 212.205, 212.145, 212.145, 211.890, 211.770, 211.770, 211.450, 211.515, 211.515, 211.515, 211.515, 211.515, 211.515, 212.115, 212.115, 212.080, 212.005, 212.005, 212.005];
    let kijunSen = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 206.635, 206.635, 206.635, 206.635, 207.475, 207.925, 207.955, 207.955, 207.955, 208.100, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 208.945, 209.255, 210.150, 210.070, 210.045, 209.925, 209.700, 209.700, 209.095, 208.880, 208.805, 208.805, 208.410, 207.805, 207.615, 207.615, 207.615, 207.615, 207.615, 207.550, 207.550, 207.550, 207.550, 207.450, 207.260, 207.260, 207.260, 207.195, 206.930, 206.820, 206.810, 206.735, 206.540, 206.495, 206.365, 206.365, 206.365, 206.365, 206.365, 206.365, 206.650, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.560, 206.480, 206.480, 206.480, 206.575, 206.635, 206.635, 206.635, 206.635, 206.715, 206.895, 206.895, 206.895, 206.895, 206.895, 206.985, 206.985, 206.985, 206.985, 206.985, 206.985, 206.985, 206.985, 207.625, 208.130, 208.220, 208.450, 208.530, 208.530, 208.530, 208.585, 208.585, 208.790, 208.855, 208.855, 208.855, 208.855, 208.855, 208.855, 208.855, 208.855, 208.855, 208.910, 208.910, 208.910, 208.910, 209.270, 209.375, 209.375, 209.405, 209.540, 209.570, 209.570, 209.570, 209.570, 209.570, 209.570, 209.570, 209.570, 209.570, 209.570, 209.420, 209.365, 209.365, 209.190, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 208.995, 208.995, 208.995, 208.995, 208.995, 208.995, 208.995, 208.935, 208.935, 208.935, 208.935, 208.935, 208.935, 209.205, 209.555, 210.340, 210.340, 210.420, 210.420, 210.420, 210.420, 210.435, 210.435, 210.435, 210.435, 210.665, 210.690, 210.690, 210.690, 210.690, 210.690, 211.195, 211.195, 210.905, 210.905, 210.905, 210.905, 210.905, 210.905, 210.905, 210.905, 210.905, 210.905, 210.905, 210.905, 210.905, 210.880, 210.700, 210.700, 210.700, 210.700, 210.315, 209.870, 209.715, 209.560, 209.560, 209.560, 209.560, 209.560, 209.560, 209.800, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.820, 209.650, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.255, 209.255, 209.255, 209.310, 209.310, 209.310, 209.310, 209.310, 209.310, 209.325, 209.325, 209.325, 209.325, 209.325, 209.325, 209.325, 209.325, 209.325, 209.390, 209.705, 209.705, 210.100, 210.255, 210.255, 210.255, 210.255, 210.255, 210.255, 210.255, 210.255, 210.255, 210.255, 210.270, 210.405, 210.410, 210.470, 210.615, 210.615, 210.615, 210.615, 210.615, 210.675, 211.095, 211.095, 211.175, 211.365, 211.365, 211.470, 211.510, 211.570, 211.570, 211.570, 211.570, 211.570, 212.240, 212.255, 212.450, 212.515, 212.715, 212.715, 212.715, 212.715, 212.820, 212.860, 212.860, 212.875, 212.875, 212.970, 212.970, 213.015, 213.105, 213.140, 213.140, 213.140, 213.140, 213.140, 213.140, 213.140, 212.625, 212.305, 212.195, 212.195, 212.025, 211.995, 211.990, 211.990, 211.990, 211.990, 211.975, 211.975, 211.975, 211.975, 211.975, 211.975, 211.975, 211.975, 211.870, 211.870, 211.870, 211.870, 211.870, 211.820, 211.820, 211.590, 211.590, 211.590, 211.590, 211.590, 211.590, 211.590, 211.800, 211.800, 211.800, 211.625, 211.625, 211.625, 211.625, 211.430, 211.425, 211.425, 211.425, 211.470, 211.470, 211.470, 211.470, 211.470, 211.470, 211.470, 211.470, 211.470, 211.470, 211.215, 211.215, 211.210, 210.825, 210.825, 210.825, 210.825, 210.825, 210.825, 210.825, 210.825, 210.825, 210.815, 210.720, 210.545, 210.545, 210.510, 210.080, 209.970, 209.970, 209.895, 209.735, 209.735, 209.395, 209.250, 209.145, 209.550, 209.550, 209.550, 209.550, 209.550, 209.835, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 210.180, 209.940, 209.940, 209.940, 209.940, 209.940, 209.940, 209.940, 209.940, 209.940, 209.940, 209.940, 209.940, 209.940, 209.830, 209.830, 209.830, 209.805, 209.775, 209.390, 209.555, 209.555, 209.905, 210.190, 210.365, 210.565, 210.565, 210.685, 210.955, 211.030, 211.030, 211.030, 211.030, 211.030, 211.105, 211.270, 211.350, 211.350, 211.350, 211.350, 211.350, 211.350, 211.350, 211.350, 211.350, 211.350, 211.890, 211.890, 211.890, 211.890];
    let senkouA = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 207.160, 207.160, 207.160, 207.078, 207.985, 208.435, 208.450, 208.450, 208.450, 208.523, 208.945, 208.945, 209.100, 209.548, 209.318, 209.383, 209.440, 209.495, 209.495, 209.555, 209.555, 209.653, 209.688, 209.810, 209.833, 209.833, 209.753, 209.613, 209.613, 209.768, 210.183, 210.085, 210.013, 209.893, 209.618, 209.523, 208.918, 208.703, 208.595, 208.463, 208.013, 207.403, 207.175, 207.078, 207.055, 206.693, 206.628, 206.588, 206.495, 206.398, 206.398, 206.490, 206.448, 206.448, 206.410, 206.835, 206.715, 206.660, 206.775, 206.800, 206.730, 206.743, 206.680, 207.075, 207.078, 207.078, 207.078, 207.078, 207.068, 206.560, 206.433, 206.433, 206.433, 206.378, 206.378, 206.318, 206.305, 206.153, 206.193, 206.283, 206.283, 206.283, 206.283, 206.283, 206.515, 206.590, 206.650, 206.655, 206.655, 206.655, 206.750, 206.810, 207.130, 207.400, 207.440, 207.480, 207.448, 207.448, 207.425, 207.425, 207.398, 207.443, 207.400, 207.390, 207.425, 207.425, 207.425, 207.425, 207.425, 207.745, 208.130, 208.248, 208.478, 208.558, 208.558, 208.718, 208.825, 208.825, 209.135, 209.325, 209.385, 209.490, 209.430, 209.403, 209.343, 209.225, 209.110, 209.110, 209.090, 209.033, 208.993, 208.925, 209.338, 209.390, 209.390, 209.485, 209.788, 209.818, 209.818, 209.843, 209.993, 209.993, 209.993, 209.993, 209.993, 209.993, 209.573, 209.405, 209.350, 209.350, 209.175, 209.010, 209.010, 208.945, 208.788, 208.828, 208.828, 208.828, 208.828, 208.828, 209.060, 209.468, 209.603, 209.588, 209.573, 209.523, 209.523, 209.523, 209.438, 209.288, 209.285, 209.360, 209.385, 209.405, 209.405, 209.408, 209.678, 210.200, 210.593, 210.618, 210.698, 210.698, 210.698, 210.735, 210.783, 210.988, 210.988, 210.988, 211.218, 211.243, 211.243, 211.218, 211.195, 211.188, 211.353, 211.318, 210.905, 210.905, 210.815, 210.738, 210.660, 210.660, 210.660, 210.660, 210.660, 210.728, 210.728, 210.728, 210.710, 210.618, 210.403, 210.403, 210.403, 210.403, 210.018, 209.663, 209.505, 209.333, 209.333, 209.333, 209.333, 209.365, 209.378, 209.800, 210.235, 210.235, 210.235, 210.250, 210.360, 210.468, 210.468, 210.483, 210.290, 210.223, 210.138, 210.033, 210.030, 209.830, 209.688, 209.543, 209.450, 209.203, 208.868, 208.868, 208.868, 208.868, 208.640, 208.730, 208.730, 208.730, 208.663, 209.208, 209.403, 209.500, 209.698, 209.775, 209.775, 209.775, 209.775, 210.330, 210.413, 210.393, 210.393, 210.305, 210.265, 209.790, 209.790, 209.790, 209.770, 209.903, 209.863, 210.018, 210.088, 210.088, 210.118, 210.328, 210.328, 210.395, 210.368, 210.433, 210.475, 210.475, 210.550, 210.685, 210.690, 210.750, 210.895, 211.188, 211.195, 211.293, 211.325, 211.455, 211.665, 211.665, 211.705, 211.895, 211.915, 212.020, 212.068, 212.128, 212.175, 212.175, 212.198, 212.243, 212.653, 212.720, 212.790, 212.775, 212.875, 212.875, 212.875, 212.875, 212.980, 213.000, 213.000, 213.008, 213.010, 213.058, 213.058, 213.080, 213.125, 213.135, 213.135, 213.193, 213.235, 213.235, 213.235, 213.235, 212.618, 212.245, 212.135, 212.135, 211.965, 211.935, 211.905, 211.905, 211.670, 211.630, 211.623, 211.660, 211.713, 211.783, 211.783, 211.945, 212.133, 212.140, 212.088, 212.088, 212.088, 212.088, 211.788, 211.760, 211.760, 211.645, 211.645, 211.645, 211.645, 211.558, 211.490, 211.478, 211.583, 211.640, 211.640, 211.465, 211.465, 211.465, 211.465, 211.368, 211.365, 211.365, 211.345, 211.470, 211.543, 211.663, 211.713, 211.713, 211.713, 211.553, 211.553, 211.493, 211.483, 211.110, 211.110, 211.105, 210.683, 210.603, 210.603, 210.433, 210.360, 210.303, 210.303, 210.303, 210.303, 210.293, 210.108, 209.920, 209.920, 209.895, 209.538, 209.363, 209.285, 209.238, 209.105, 209.105, 208.935, 209.073, 209.145, 209.550, 209.695, 209.695, 209.695, 209.695, 209.980, 210.295, 210.443, 210.585, 210.698, 210.698, 210.703, 210.500, 210.395, 210.388, 210.333, 210.333, 210.333, 210.465, 209.858, 209.628, 209.600, 209.553, 209.493, 209.493, 209.468, 209.468, 209.348, 209.445, 209.620, 209.708, 209.738, 209.683, 209.843, 209.843, 209.868, 209.935, 209.815, 209.948, 209.948, 210.298, 210.583];
    let senkouB = [0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 0.000, 207.925, 207.925, 207.925, 207.925, 207.925, 207.925, 207.955, 207.955, 207.955, 208.100, 208.945, 208.945, 208.885, 208.885, 208.490, 207.885, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.695, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.615, 207.550, 207.550, 207.550, 207.550, 207.450, 207.260, 207.260, 207.260, 207.195, 206.930, 206.820, 206.810, 206.735, 206.540, 206.495, 206.365, 206.365, 206.380, 206.440, 206.440, 206.440, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.635, 206.845, 206.935, 207.165, 207.245, 207.245, 207.245, 207.300, 207.300, 207.505, 207.570, 207.570, 207.650, 207.830, 207.830, 207.830, 207.830, 207.830, 207.920, 207.920, 207.920, 207.920, 207.920, 207.960, 207.960, 207.960, 208.600, 209.030, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.060, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.025, 209.205, 209.395, 209.395, 209.395, 209.475, 209.475, 209.475, 209.475, 209.490, 209.490, 209.490, 209.490, 209.720, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.745, 209.905, 210.690, 210.690, 210.690, 210.690, 210.690, 210.690, 210.690, 210.690, 210.690, 210.690, 210.315, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 210.050, 209.700, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.390, 209.325, 209.325, 209.325, 209.325, 209.325, 209.325, 209.340, 209.475, 209.480, 209.540, 209.685, 209.685, 209.685, 209.685, 209.685, 209.685, 209.685, 209.685, 209.750, 210.255, 210.255, 210.755, 210.950, 211.010, 211.010, 211.010, 211.010, 211.010, 211.095, 211.095, 211.095, 211.095, 211.095, 211.095, 211.095, 211.095, 211.200, 211.200, 211.200, 211.200, 211.200, 211.260, 211.680, 211.680, 211.760, 211.760, 211.760, 211.760, 211.760, 211.760, 211.760, 211.760, 211.760, 211.760, 212.195, 212.195, 212.025, 211.995, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.990, 211.975, 211.975, 211.975, 211.975, 211.975, 211.975, 211.975, 211.975, 211.870, 211.870, 211.870, 211.870, 211.870, 211.820, 211.820, 211.590, 211.590, 211.370, 211.370, 211.365, 210.980, 210.980, 210.980, 210.980, 210.980, 210.980, 210.980, 210.980, 210.980, 210.815, 210.720, 210.545, 210.545, 210.530, 210.290, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.180, 210.160, 209.970, 209.970, 209.970, 209.895, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 209.890, 210.140];

    let indicator = new Ichimoku(9, 26, 52, 26);
    highs.forEach((val, i) => {
      let candle = {
        high: highs[i],
        low: lows[i],
        close: closes[i],
      };
      indicator.update(candle);
      expect(indicator.tenkanSen).to.be.closeTo(tenkanSen[i], 0.0009);
      expect(indicator.kijunSen).to.be.closeTo(kijunSen[i], 0.0009);
      expect(indicator.senkouA).to.be.closeTo(senkouA[i], 0.0009);
      expect(indicator.senkouB).to.be.closeTo(senkouB[i], 0.0009);
    });
  });

});
