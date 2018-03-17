let chai = require('chai');
let expect = chai.expect;

let util = require('../../core/util');
let path = require('path');

let dirs = util.dirs();
let INDICATOR_PATH = dirs.indicators;
let filename = path.basename(__filename);

describe('indicators/' + filename, function() {

  let EMA = require(INDICATOR_PATH + filename);

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

  it('should calculate EMAs like QuantConnect', function() {
    // Source: https://github.com/QuantConnect/Lean/blob/master/Tests/TestData/spy_with_indicators.txt
    let prices = [13390.51, 13471.22, 13488.43, 13507.32, 13534.89, 13511.23, 13596.02, 13649.7, 13712.21, 13779.33, 13825.33, 13895.98, 13881.93, 13954.42, 13910.42, 13860.58, 14009.79, 13880.08, 13979.3, 13986.52, 13944.05, 13992.97, 13971.24, 14018.7, 13982.91, 13973.39, 13981.76, 14035.67, 13927.54, 13880.62, 14000.57, 13784.17, 13900.13, 14075.37, 14054.49, 14089.66, 14127.82, 14253.77, 14296.24, 14329.49, 14397.07, 14447.29, 14450.06, 14455.28, 14539.14, 14514.11, 14452.06, 14455.82, 14511.73, 14421.49, 14512.03, 14447.75, 14559.65, 14526.16, 14578.54, 14572.85, 14662.01, 14550.35, 14606.11, 14565.25, 14613.48, 14673.46, 14802.24, 14865.14, 14865.06, 14599.2, 14756.78, 14618.59, 14537.14, 14547.51, 14567.17, 14719.46, 14676.3, 14700.8, 14712.55, 14818.75, 14839.8, 14700.95, 14831.58, 14973.96, 14968.89, 15056.2, 15105.12, 15082.62, 15118.49, 15091.68, 15215.25, 15275.69, 15233.22, 15354.4, 15335.28, 15387.58, 15307.17, 15294.5, 15303.1, 15409.39, 15302.8, 15324.53, 15115.57, 15254.03, 15177.54, 14960.59, 15040.62, 15248.12, 15238.59, 15122.02, 14995.23, 15176.08, 15070.18, 15179.85, 15318.23, 15112.19, 14758.32, 14799.4, 14659.56, 14760.31, 14910.14, 15024.49, 14909.6, 14974.96, 14932.41, 14988.55, 15135.84, 15224.69, 15300.34, 15291.66, 15460.92, 15464.3, 15484.26, 15451.85, 15470.52, 15548.54, 15543.74, 15545.55, 15567.74, 15542.24, 15555.61, 15558.83, 15521.97, 15520.59, 15499.54, 15628.02, 15658.36, 15612.13, 15518.74, 15470.67, 15498.32, 15425.51, 15419.68, 15451.01, 15337.66, 15112.19, 15081.47, 15010.74, 15002.99, 14897.55, 14963.74, 15010.51, 14946.46, 14776.13, 14824.51, 14840.95, 14810.31, 14833.96, 14930.87, 14937.48, 14922.5, 15063.12, 15191.06, 15326.6, 15300.64, 15376.06, 15494.78, 15529.73, 15676.94, 15636.55, 15451.09, 15401.38, 15334.59, 15273.26, 15328.3, 15258.24, 15129.67, 15191.7, 15133.14, 14996.48, 15072.58, 14936.24, 14776.53, 14802.98, 15126.07, 15237.11, 15301.26, 15168.01, 15373.83, 15371.65, 15399.65, 15392.2, 15467.66, 15413.33, 15509.21, 15570.28, 15568.93, 15680.35, 15618.76, 15545.75, 15615.55, 15639.12, 15618.22, 15746.88, 15593.98, 15761.78, 15783.1, 15750.67, 15821.63, 15876.22, 15961.7, 15976.02, 15967.03, 15900.82, 16009.99, 16064.77, 16072.54, 16072.8, 16097.33, 16086.41, 16008.77, 15914.62, 15889.77, 15821.51, 16020.2, 16025.53, 15973.13, 15843.53, 15739.43, 15755.36, 15884.57, 15875.26, 16167.97, 16179.08, 16221.14, 16294.61, 16357.55, 16479.88, 16478.41, 16504.29, 16576.66, 16441.35, 16469.99, 16425.1, 16530.94, 16462.74, 16444.76, 16437.05, 16257.94, 16373.86, 16481.94, 16417.01, 16458.56, 16414.44, 16373.34, 16197.35, 15879.11, 15837.88, 15928.56, 15738.79, 15848.61, 15698.85, 15372.8, 15445.24, 15440.23, 15628.53, 15794.08, 15801.79, 15994.77, 15963.94, 16027.59, 16154.39, 16130.4, 16040.56, 16133.23, 16103.3, 16207.14, 16179.66, 16198.41, 16272.65, 16321.71, 16168.03, 16395.88, 16360.18, 16421.89, 16452.72, 16418.68, 16351.25, 16340.08, 16108.89, 16065.67, 16247.22, 16336.19, 16222.17, 16331.05, 16302.77, 16276.69, 16367.88, 16268.99, 16264.23, 16323.06, 16457.66, 16532.61, 16573, 16572.55, 16412.71, 16245.87, 16256.14, 16437.18, 16170.22, 16026.75, 16173.24, 16262.56, 16424.85, 16408.54, 16449.25, 16514.37, 16501.65, 16501.65, 16361.46, 16448.74, 16535.37, 16580.84, 16558.87, 16512.89, 16530.55, 16401.02, 16518.54, 16550.97, 16583.34, 16695.47, 16715.44, 16613.97, 16446.81, 16491.31, 16511.86, 16374.31, 16533.06, 16543.08, 16606.27, 16675.5, 16633.18, 16698.74, 16717.17, 16743.63, 16722.34, 16737.53, 16836.11, 16924.28, 16943.1, 16945.92, 16843.88, 16734.19, 16775.74, 16781.01, 16808.49, 16906.62, 16921.46, 16947.08, 16937.26, 16818.13, 16867.51, 16846.13, 16851.84, 16826.6, 16956.07, 16976.24, 17068.26, 17024.21, 16906.62, 16985.61, 16915.07, 16943.81, 17055.42, 17060.68, 17138.2, 16976.81, 17100.18, 17051.73, 17113.54, 17086.63, 17083.8, 16960.57, 16982.59, 16912.11, 16880.36, 16563.3, 16493.37, 16569.28, 16429.47, 16443.34, 16368.27, 16553.93, 16569.98, 16560.54, 16651.8, 16713.58, 16662.91, 16838.74, 16919.59, 16979.13, 17039.49, 17001.22, 17076.87, 17106.7, 17122.01, 17079.57, 17098.45, 17067.56, 17078.28, 17069.58, 17137.36, 17111.42, 17013.87, 17068.71, 17049, 16987.51, 17031.14, 17131.97, 17156.85, 17265.99, 17279.74, 17172.68, 17055.87, 17210.06, 16945.8, 17113.15, 17071.22, 17042.9, 16804.71, 16801.05, 17009.69, 16991.91, 16719.39, 16994.22, 16659.25, 16544.1, 16321.07, 16315.19, 16141.74, 16117.24, 16380.41, 16399.67, 16614.81, 16461.32, 16677.9, 16805.41, 16817.94, 17005.75, 16974.31, 17195.42, 17390.52, 17366.24, 17383.84, 17484.53, 17554.47, 17573.93, 17613.74, 17614.9, 17612.2, 17652.79, 17634.74, 17647.75, 17687.82, 17685.73, 17719, 17810.06, 17817.9, 17814.94, 17827.75, 17828.24, 17776.8, 17879.55, 17912.62, 17900.1, 17958.79, 17852.48, 17801.2, 17533.15, 17596.34, 17280.83, 17180.84, 17068.87, 17356.87, 17778.15, 17804.8, 17959.44, 18024.17, 18030.21, 18053.71, 18038.23, 17983.07, 17823.07, 17832.99];
    let expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13657.04, 13690.82, 13713.46, 13752.97, 13769.92, 13797.83, 13822.99, 13839.13, 13859.64, 13874.52, 13893.75, 13905.64, 13914.67, 13923.62, 13938.56, 13937.09, 13929.56, 13939.03, 13918.38, 13915.95, 13937.2, 13952.84, 13971.08, 13991.98, 14026.89, 14062.8, 14098.36, 14138.19, 14179.4, 14215.49, 14247.46, 14286.35, 14316.72, 14334.76, 14350.91, 14372.35, 14378.9, 14396.65, 14403.46, 14424.29, 14437.87, 14456.63, 14472.12, 14497.44, 14504.5, 14518.04, 14524.34, 14536.22, 14554.52, 14587.55, 14624.56, 14656.63, 14648.97, 14663.35, 14657.38, 14641.35, 14628.84, 14620.61, 14633.79, 14639.46, 14647.64, 14656.29, 14677.96, 14699.53, 14699.72, 14717.3, 14751.52, 14780.51, 14817.27, 14855.65, 14885.91, 14916.92, 14940.22, 14976.89, 15016.73, 15045.6, 15086.77, 15119.91, 15155.6, 15175.81, 15191.63, 15206.49, 15233.55, 15242.78, 15253.68, 15235.27, 15237.77, 15229.74, 15193.85, 15173.42, 15183.38, 15190.74, 15181.58, 15156.73, 15159.31, 15147.43, 15151.75, 15173.95, 15165.71, 15111.39, 15069.79, 15015.1, 14981.13, 14971.66, 14978.71, 14969.49, 14970.22, 14965.18, 14968.29, 14990.63, 15021.84, 15058.97, 15090, 15139.46, 15182.77, 15222.97, 15253.48, 15282.42, 15317.91, 15348.02, 15374.35, 15400.14, 15419.09, 15437.29, 15453.49, 15462.63, 15470.35, 15474.25, 15494.75, 15516.56, 15529.31, 15527.9, 15520.27, 15517.34, 15505.1, 15493.71, 15488.01, 15467.97, 15420.53, 15375.32, 15326.71, 15283.55, 15232.08, 15196.3, 15171.53, 15141.52, 15092.8, 15057.03, 15028.22, 14999.17, 14977.14, 14970.97, 14966.5, 14960.64, 14974.3, 15003.2, 15046.32, 15080.23, 15119.67, 15169.69, 15217.69, 15278.93, 15326.61, 15343.21, 15350.96, 15348.78, 15338.71, 15337.32, 15326.78, 15300.5, 15285.99, 15265.61, 15229.73, 15208.77, 15172.44, 15119.65, 15077.43, 15083.91, 15104.34, 15130.59, 15135.58, 15167.35, 15194.59, 15221.93, 15244.63, 15274.37, 15292.9, 15321.74, 15354.88, 15383.42, 15423.01, 15449.11, 15462, 15482.47, 15503.36, 15518.67, 15549.1, 15555.08, 15582.64, 15609.37, 15628.21, 15654, 15683.63, 15720.71, 15754.75, 15783.05, 15798.75, 15826.92, 15858.63, 15887.15, 15911.91, 15936.63, 15956.6, 15963.56, 15957.03, 15948.06, 15931.19, 15943.06, 15954.05, 15956.6, 15941.52, 15914.58, 15893.35, 15892.18, 15889.92, 15926.99, 15960.61, 15995.34, 16035.25, 16078.22, 16131.77, 16177.99, 16221.5, 16268.85, 16291.85, 16315.6, 16330.2, 16356.97, 16371.07, 16380.9, 16388.38, 16370.99, 16371.37, 16386.12, 16390.23, 16399.35, 16401.36, 16397.62, 16370.92, 16305.34, 16243.02, 16201.09, 16139.45, 16100.67, 16047.09, 15957.19, 15888.93, 15829.1, 15802.36, 15801.25, 15801.33, 15827.12, 15845.36, 15869.66, 15907.62, 15937.33, 15951.09, 15975.38, 15992.43, 16021.06, 16042.21, 16063.03, 16090.98, 16121.75, 16127.92, 16163.65, 16189.85, 16220.79, 16251.71, 16273.98, 16284.28, 16291.72, 16267.34, 16240.45, 16241.35, 16254, 16249.76, 16260.59, 16266.22, 16267.61, 16280.98, 16279.38, 16277.36, 16283.46, 16306.68, 16336.81, 16368.3, 16395.53, 16397.82, 16377.56, 16361.37, 16371.48, 16344.65, 16302.26, 16285.06, 16282.06, 16301.1, 16315.42, 16333.27, 16357.41, 16376.64, 16393.31, 16389.06, 16397.02, 16415.47, 16437.52, 16453.7, 16461.59, 16470.79, 16461.48, 16469.09, 16480.01, 16493.79, 16520.68, 16546.64, 16555.62, 16541.11, 16534.47, 16531.46, 16510.51, 16513.51, 16517.46, 16529.3, 16548.79, 16560.04, 16578.54, 16597.02, 16616.57, 16630.67, 16644.92, 16670.41, 16704.26, 16736.11, 16764.08, 16774.72, 16769.32, 16770.17, 16771.62, 16776.53, 16793.88, 16810.89, 16829.05, 16843.48, 16840.1, 16843.75, 16844.07, 16845.11, 16842.64, 16857.76, 16873.56, 16899.52, 16916.14, 16914.88, 16924.31, 16923.07, 16925.84, 16943.12, 16958.79, 16982.71, 16981.93, 16997.69, 17004.9, 17019.38, 17028.35, 17035.74, 17025.72, 17019.97, 17005.59, 16988.89, 16932.15, 16873.64, 16833.06, 16779.25, 16734.46, 16685.63, 16668.07, 16655, 16642.4, 16643.65, 16652.98, 16654.3, 16678.89, 16710.99, 16746.74, 16785.77, 16814.5, 16849.48, 16883.78, 16915.54, 16937.41, 16958.88, 16973.38, 16987.36, 16998.32, 17016.86, 17029.47, 17027.39, 17032.9, 17035.05, 17028.71, 17029.03, 17042.76, 17057.97, 17085.71, 17111.58, 17119.72, 17111.21, 17124.39, 17100.58, 17102.25, 17098.12, 17090.75, 17052.62, 17019.07, 17017.82, 17014.37, 16975.04, 16977.6, 16935.15, 16883.01, 16808.08, 16742.37, 16662.28, 16589.61, 16561.72, 16540.11, 16550.07, 16538.24, 16556.86, 16590, 16620.39, 16671.77, 16712.11, 16776.55, 16858.41, 16926.13, 16987.15, 17053.47, 17120.27, 17180.76, 17238.49, 17288.68, 17331.81, 17374.61, 17409.29, 17441.09, 17473.99, 17502.22, 17531.12, 17568.31, 17601.59, 17630.04, 17656.4, 17679.31, 17692.31, 17717.28, 17743.32, 17764.22, 17790.17, 17798.48, 17798.84, 17763.41, 17741.14, 17679.76, 17613.24, 17540.66, 17516.15, 17551.09, 17584.91, 17634.85, 17686.76, 17732.55, 17775.38, 17810.42, 17833.44, 17832.06, 17832.18];

    let ema = new EMA(14);
    prices.forEach((price, i) => {
      ema.update(price);
      expect(ema.result).to.be.closeTo(expected[i], 0.008);
    });
  });

});
