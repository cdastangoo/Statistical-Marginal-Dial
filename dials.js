window.onload = function() {
	StatisticalDial();
	MarginalDial();
}

/*
 * code for statistical dial
 */
function StatisticalDial() {
	/*
	function httpGet(sUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", sUrl, false);
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	*/
	var sTitle, sTitleFormat, sTitleColor;
	var sMetricType, sMetricLabel, sMetricValue;
	var dMetric, dMetricRed, dMetricYellow;
	var dMetricArrow, dMetricMin, dMetricMax, dMetricRange;
	var lsLabels, lsData, ldData;
	var bLowerIsGreen, lcBackground, lcHover;
	
	//dMetric = httpGet("dMetric");
	//dMetricRed = httpGet("dMetricRed");
	//dMetricYellow = httpGet("dMetricYellow");
	//sMetricValue = dMetric.toString();
	//sMetricType = httpGet("sMetricType");
	
	// test values
	dMetric = 4.2;
	dMetricRed = 3.6;
	dMetricYellow = 4.5;
	sMetricValue = dMetric.toString();
	sMetricType = "zscore";
	
	switch(sMetricType) {
		case "cpk":
			dMetricMin = 0.0;
			dMetricMax = 3.0;
			dMetricArrow = dMetric;
			sMetricLabel = "Cpk";
			bLowerIsGreen = false;
			break;
		case "zscore":
			dMetricMin = 0.0;
			dMetricMax = 6.0;
			dMetricArrow = dMetric;
			sMetricLabel = "Z Score";
			bLowerIsGreen = false;
			break;
		// pnc doesn't work atm
		case "pnc":
			dMetricMin = -6.0;
			dMetricMax = 2.0;
			if (dMetric > 0.000001) {
				dMetric = Math.log(dMetric) / Math.log(10);
			}
			else {
				dMetric = -6.0;
			}
			if (dMetricRed > 0.000001) {
				dMetricRed = Math.log(dMetricRed) / Math.log(10);
			}
			else {
				dMetricRed = -6.0;
			}
			if (dMetricYellow > 0.000001) {
				dMetricYellow = Math.log(dMetricYellow) / Math.log(10);
			}
			else {
				dMetricYellow = -6.0;
			}
			dMetricArrow = dMetric;
			sMetricLabel = "PNC";
			bLowerIsGreen = true;
			break;
		default:
			dMetricMin = -2.0;
			dMetricMax = 6.0;
			if (dMetric > 0.01) {
				dMetric = Math.log(dMetric) / Math.log(10);
			}
			else {
				dMetric = -2.0;
			}
			if (dMetricRed > 0.01) {
				dMetricRed = Math.log(dMetricRed) / Math.log(10);
			}
			else {
				dMetricRed = -2.0;
			}
			if (dMetricYellow > 0.01) {
				dMetricYellow = Math.log(dMetricYellow) / Math.log(10);
			}
			else {
				dMetricYellow = -2.0;
			}
			dMetricArrow = dMetric;
			sMetricLabel = "DPMO";
			bLowerIsGreen = true;
	}
	
	if (dMetric > dMetricMax) {
		dMetricArrow = dMetricMax;
	}
	else if (dMetric < dMetricMin) {
		dMetricArrow = dMetricMin;
	}
	
	if (dMetricRed > dMetricMax) {
		dMetricRed = dMetricMax;
	}
	else if (dMetricRed < dMetricMin) {
		dMetricRed = dMetricMin;
	}
	
	if (dMetricYellow > dMetricMax) {
		dMetricYellow = dMetricMax;
	}
	else if (dMetricYellow < dMetricMin) {
		dMetricYellow = dMetricMin;
	}
	
	if (bLowerIsGreen) {
		if (dMetricYellow > dMetricRed) {
			dMetricRed = dMetricYellow;
		}
	}
	else {
		if (dMetricYellow < dMetricRed) {
			dMetricYellow = dMetricRed;
		}
	}
	
	dMetricRange = dMetricMax - dMetricMin;
	if (bLowerIsGreen) {
		if (dMetricArrow >= dMetricRed) {
			sTitle = "Risk: " + sMetricLabel + " = " + sMetricValue;
			sTitleColor = "red";
			lsLabels = ["Green", "Yellow", "Red", sMetricLabel, "Red"];
			lsData = [dMetricMin, dMetricYellow, dMetricRed, dMetricArrow, dMetricRed];
			ldData = [dMetricYellow / dMetricRange, (dMetricRed - dMetricYellow) / dMetricRange, (dMetricArrow - dMetricRed) / dMetricRange, 0.01, (dMetricMax - dMetricArrow) / dMetricRange];
			lcBackground = ['rgba(0, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.6)'];
			lcHover = ['rgba(0, 255, 0, 0.8)', 'rgba(255, 255, 0, 0.8)', 'rgba(255, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.8)'];
		}
		else if (dMetricArrow >= dMetricYellow) {
			sTitle = "Warning: " + sMetricLabel + " = " + sMetricValue;
			sTitleColor = "#b0a602";
			lsLabels = ["Green", "Yellow", sMetricLabel, "Yellow", "Red"];
			lsData = [dMetricMin, dMetricYellow, dMetricArrow, dMetricYellow, dMetricRed];
			ldData = [dMetricYellow / dMetricRange, (dMetricArrow - dMetricYellow) / dMetricRange, 0.01, (dMetricRed - dMetricYellow) / dMetricRange, (dMetricMax - dMetricRed) / dMetricRange];
		}
		else {
			sTitle = "Opportunity: " + sMetricLabel + " = " + sMetricValue;
			sTitleColor = "green";
			lsLabels = ["Green", sMetricLabel, "Green", "Yellow", "Red"];
			lsData = [dMetricMin, dMetricArrow, dMetricMin, dMetricYellow, dMetricRed];
			ldData = [dMetricArrow / dMetricRange, 0.01, (dMetricYellow - dMetricArrow) / dMetricRange, (dMetricRed - dMetricYellow) / dMetricRange, (dMetricMax - dMetricRed) / dMetricRange];
		}
	}
	else {
		if (dMetricArrow <= dMetricRed) {
			sTitle = "Risk: " + sMetricLabel + " = " + sMetricValue;
			sTitleColor = "red";
			lsLabels = ["Risk", sMetricLabel, "Risk", "Warning", "Opportunity"];
			lsData = [dMetricRed, dMetricArrow, dMetricRed, dMetricYellow, dMetricMax];
			ldData = [dMetricArrow / dMetricRange, 0.01, (dMetricRed - dMetricArrow) / dMetricRange, (dMetricYellow - dMetricRed) / dMetricRange, (dMetricMax - dMetricYellow) / dMetricRange];
			lcBackground = ['rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)'];
			lcHover = ['rgba(255, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.8)', 'rgba(255, 255, 0, 0.8)', 'rgba(0, 255, 0, 0.8)'];
		}
		else if (dMetricArrow <= dMetricYellow) {
			sTitle = "Warning: " + sMetricLabel + " = " + sMetricValue;
			sTitleColor = "#b0a602";
			lsLabels = ["Risk", "Warning", sMetricLabel, "Warning", "Opportunity"];
			lsData = [dMetricRed, dMetricYellow, dMetricArrow, dMetricYellow, dMetricMax];
			ldData = [dMetricRed / dMetricRange, (dMetricArrow - dMetricRed) / dMetricRange, 0.01, (dMetricYellow - dMetricArrow) / dMetricRange, (dMetricMax - dMetricYellow) / dMetricRange];
			lcBackground = ['rgba(255, 0, 0, 0.6)', 'rgba(255, 255, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)'];
			lcHover = ['rgba(255, 0, 0, 0.8)', 'rgba(255, 255, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 0, 0.8)', 'rgba(0, 255, 0, 0.8)'];
		}
		else {
			sTitle = "Opportunity: " + sMetricLabel + " = " + sMetricValue;
			sTitleColor = "green";
			lsLabels = ["Risk", "Warning", "Opportunity", sMetricLabel, "Opportunity"];
			lsData = [dMetricRed, dMetricYellow, dMetricMax, dMetricArrow, dMetricMax];
			ldData = [dMetricRed / dMetricRange, (dMetricYellow - dMetricRed) / dMetricRange, (dMetricArrow - dMetricYellow) / dMetricRange, 0.01, (dMetricMax - dMetricArrow) / dMetricRange];
			lcBackground = ['rgba(255, 0, 0, 0.6)', 'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 255, 0, 0.6)'];
			lcHover = ['rgba(255, 0, 0, 0.8)', 'rgba(255, 255, 0, 0.8)', 'rgba(0, 255, 0, 0.8)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 255, 0, 0.8)'];
		}
	}
	
	// chart.js
	var ctx = document.getElementById("statisticalDial").getContext("2d");
	var statisticalDial = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: lsLabels,
			datasets: [{
				label: sTitle,
				data: ldData,
				backgroundColor: lcBackground,
				hoverBackgroundColor: lcHover,
				borderWidth: 0
			},
			{
				data: [dMetricArrow / dMetricRange, 0.01, 1 - dMetricArrow / dMetricRange],
				backgroundColor: [
					'rgba(0, 0, 0, 0.1)',
					'rgba(0, 0, 0, 0.6)',
					'rgba(0, 0, 0, 0.1)',
				],
				hoverBackgroundColor: [
					'rgba(0, 0, 0, 0.1)',
					'rgba(0, 0, 0, 0.6)',
					'rgba(0, 0, 0, 0.1)',
				],
				borderWidth: 0
			}]
		},
		options: {
			cutoutPercentage: 50,
			rotation: 1 * Math.PI,
			circumference: 1 * Math.PI,
			responsive: false,
			legend: {
				display: false
			},
			tooltips: {
				filter: function(tooltipItem) {
					return tooltipItem.datasetIndex == 0 || tooltipItem.index == 1;
				},
				callbacks: {
					label: function(tooltipItem) {
						if (tooltipItem.datasetIndex == 1 || lcHover[tooltipItem.index] == 'rgba(0, 0, 0, 0.6)') {
							return "Design Value: " + dMetricArrow;
						}
						return lsLabels[tooltipItem.index] + ": <" + lsData[tooltipItem.index];
					}
				}
			},
			title: {
				display: true,
				text: sTitle,
				fontSize: 24,
				fontColor: sTitleColor,
				//fontFamily: sTitleFormat,
			},
			animation: {
				animateScale: true,
				animateRotate: true
			},
			chartArea: {
				backgroundColor: ['rgba(0, 0, 0, 0.1)'],
			}
		}
	});
}

/**********************************************************************************************************************/

/*
 * code for marginal dial
 */
function MarginalDial() {

	/*
	function httpGet(sUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", sUrl, false);
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
	*/
	var sTitle, sTitleFormat, sTitleColor;
	var sMetric, sLSL, sUSL, dLSL, dUSL;
	var bUpper, bLower;
	
	var dValue, dMargin, dDiff, dDelta;
	var dMarginLower, dMarginUpper;
	var dRedMargin, dYellowMargin, dRedLower, dYellowLower, dRedUpper, dYellowUpper;
	var dLower, dUpper, dRealLower, dRealUpper, dDelta;
	
	var dRealValue, dRealRedLower, dRealRedUpper, dRealYellowLower, dRealYellowUpper;
	var lsLabels, lsData, ldData, lsBackground, lsHover, lsDial;
	
	//dValue = httpGet("dValue");
	//sLSL = httpGet("sLSL");
	//sUSL = httpGet("sUSL");
	//sMetric = httpGet("sMetric");
	//dRedMargin = httpGet("dRedMargin");
	//dYellowMargin = httpGet("dYellowMargin");
	
	// test values
	dValue = 4.0;
	sLSL = "3";
	sUSL = "5";
	sMetric = "20. %";
	dRedMargin = 0.25;
	dYellowMargin = 0.5;
	
	// check is specification limits are N/A
	bLower = true;
	if (sLSL != "NA") {
		dLSL = parseInt(sLSL);
	}
	else {
		bLower = false;
	}
	bUpper = true;
	if (sUSL != "NA") {
		dUSL = parseInt(sUSL);
	}
	else {
		bUpper = false;
	}
	
	if (bLower && bUpper) {
		//find margin boundaries
		dDiff = dUSL - dLSL;
		dLower = dLSL - 0.5 * dDiff;
		dUpper = dUSL + 0.5 * dDiff;
		dMarginLower = dValue - dLSL;
		dMarginUpper = dUSL - dValue;
		// find margins
		if (dMarginLower > dMarginUpper) {
			dMargin = dMarginUpper;
		}
		else {
			dMargin = dMarginLower;
		}
		// find threshold boundaries
		dRealRedLower = dLSL + dRedMargin;
		dRealYellowLower = dLSL + dYellowMargin;
		dRealRedUpper = dUSL - dRedMargin;
		dRealYellowUpper = dUSL - dYellowMargin;
		// find delta
		dRealUpper = dUpper;
		dRealLower = dLower;
		dDelta = (dUpper - dLower) / 4;
		// normalize boundaries
		dLower = 0.0;
		dUpper = 4.0;
		dRedLower = (dRealRedLower - dRealLower) / dDelta;
		dRedUpper = (dRealRedUpper - dRealLower) / dDelta;
		dYellowLower = (dRealYellowLower - dRealLower) / dDelta;
		dYellowUpper = (dRealYellowUpper - dRealLower) / dDelta;
		// normalize data
		dRealValue = dValue;
		dValue = (dValue - dRealLower) / dDelta;
		dLSL = 1.0;
		dUSL = 3.0;
	}
	else if (bLower) {
		// find margin boundaries
		if (dYellowMargin > 0) {
			dDiff = 2 * dYellowMargin;
		}
		else if (dLSL == 0) {
			dDiff = 0.2 * Math.abs(dLSL);
		}
		else if (dValue == 0) {
			dDiff = 0.2 * Math.abs(dValue);
		}
		else {
			dDiff = 1.0;
		}
		// find threshold boundaries
		dRealLower = dLSL - dDiff;
		dRealUpper = dLSL + dDiff;
		dDelta = (dRealUpper - dRealLower) / 2;
		// find margins
		dMargin = dValue - dLSL;
		dRealValue = dValue;
		dRealRedLower = dLSL + dRedMargin;
		dRealYellowLower = dLSL + dYellowMargin;
		//normalize data
		dLower = 0.0;
		dUpper = 2.0;
		dLSL = 1.0;
		dRedLower = (dRealRedLower - dRealLower) / dDelta;
		dYellowLower = (dRealYellowLower - dRealLower) / dDelta;
		dValue = (dValue - dRealLower) / dDelta;
	}
	else if (bUpper) {
		// find margin bounaries
		if (dYellowMargin > 0) {
			dDiff = 2 * dYellowMargin;
		}
		else if (dUSL == 0) {
			dDiff = 0.2 * Math.abs(dUSL);
		}
		else if (dValue == 0) {
			dDiff = 0.2 * Math.abs(dValue);
		}
		else {
			dDiff = 1.0;
		}
		// find threshold boundaries
		dRealLower = dUSL - dDiff;
		dRealUpper = dUSL + dDiff;
		dDelta = (dRealUpper - dRealLower) / 2;
		// find margins
		dMargin = dUSL - dValue;
		dRealRedUpper = dUSL - dRedMargin;
		dRealYellowUpper = dUSL - dYellowMargin;
		// normalize data
		dLower = 0.0;
		dUpper = 2.0;
		dUSL = 1.0;
		dRedUpper = (dRealRedUpper - dRealLower) / dDelta;
		dYellowUpper = (dRealYellowUpper - dRealLower) / dDelta;
		dValue = (dValue - dRealLower) / dDelta;
	}
	
	// account for value out of bounds
	if (dValue < dLower) {
		dValue = dLower;
	}
	else if (dValue > dUpper) {
		dValue = dUpper;
	}
	
	// account for margin out of bounds
	if (dMargin <= dRedMargin) {
		sTitle = "Risk: Margin = " + sMetric;
		sTitleColor = "red";
	}
	else if (dMargin <= dYellowMargin) {
		sTitle = "Warning: Margin = " + sMetric;
		sTitleColor = "#b0a602";
	}
	else {
		sTitle = "Opportunity: Margin = " + sMetric;
		sTitleColor = "green";
	}
	
	// configure normalized data and chart display parameters
	dValue = dValue.toFixed(2);
	if (dValue < dLSL) {
		// when value is less than Lower Specification Limit
		lsLabels = ["Red", "Design Value", "Red", "LSL", "Red", "Yellow", "Green", "Yellow", "Red", "USL", "Red"];
		lsData = [sLSL, dRealValue, sLSL, sLSL, dRealRedLower, dRealYellowLower, dRealYellowUpper, dRealRedUpper, dRealUpper, sUSL, dRealUpper];
		ldData = [
			dValue, 0.05, dLSL - dValue, 0.03, dRedLower - dLSL,
			dYellowLower - dRedLower, dYellowUpper - dYellowLower, dRedUpper - dYellowUpper,
			dUSL - dRedUpper, 0.03, dUpper - dUSL
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)'
		];
	}
	else if (dValue == dLSL) {
		// when value is equal to LSL
		lsLabels = ["Red", "LSL", "Red", "Yellow", "Green", "Yellow", "Red", "USL", "Red"];
		lsData = [sLSL, dRealValue, dRealRedLower, dRealYellowLower, dRealYellowUpper, dRealRedUpper, dRealUpper, sUSL, dRealUpper];
		ldData = [
			dValue, 0.05, dRedLower - dLSL,
			dYellowLower - dRedLower, dYellowUpper - dYellowLower, dRedUpper - dYellowUpper,
			dUSL - dRedUpper, 0.03, dUpper - dUSL
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)'
		];
	}
	else if (dValue <= dRedLower) {
		// when value is in lower Red zone
		lsLabels = ["Red", "LSL", "Red", "Design Value", "Red", "Yellow", "Green", "Yellow", "Red", "USL", "Red"];
		lsData = [sLSL, sLSL, dRealRedLower, dRealValue, dRealRedLower, dRealYellowLower, dRealYellowUpper, dRealRedUpper, dRealUpper, sUSL, dRealUpper];
		ldData = [
			dLSL, 0.03, dValue - dLSL, 0.05, dRedLower - dValue,
			dYellowLower - dRedLower, dYellowUpper - dYellowLower, dRedUpper - dYellowUpper,
			dUSL - dRedUpper, 0.03, dUpper - dUSL
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(0, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)'
		];
	}
	else if (dValue <= dYellowLower) {
		// when value is in lower Yellow zone
		lsLabels = ["Red", "LSL", "Red", "Yellow", "Design Value", "Yellow", "Green", "Yellow", "Red", "USL", "Red"];
		lsData = [sLSL, sLSL, dRealRedLower, dRealYellowLower, dRealValue, dRealYellowLower, dRealYellowUpper, dRealRedUpper, dRealUpper, sUSL, dRealUpper];
		ldData = [
			dLSL, 0.03, dRedLower - dLSL,
			dValue - dRedLower, 0.05, dYellowLower - dValue,
			dYellowUpper - dYellowLower, dRedUpper - dYellowUpper,
			dUSL - dRedUpper, 0.03, dUpper - dUSL
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(0, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)'
		];
	}
	else if (dValue <= dYellowUpper) {
		// when value is in Green zone
		lsLabels = ["Red", "LSL", "Red", "Yellow", "Green", "Design Value", "Green", "Yellow", "Red", "USL", "Red"];
		lsData = [sLSL, sLSL, dRealRedLower, dRealYellowLower, dRealYellowUpper, dRealValue, dRealYellowUpper, dRealRedUpper, dRealUpper, sUSL, dRealUpper];
		ldData = [
			dLSL, 0.03, dRedLower - dLSL, dYellowLower - dRedLower,
			dValue - dYellowLower, 0.05, dYellowUpper - dValue,
			dRedUpper - dYellowUpper, dUSL - dRedUpper, 0.03, dUpper - dUSL
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)',
			'rgba(0, 255, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 255, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)'
		];
	}
	else if (dValue <= dRedUpper) {
		// when value is in upper Yellow zone
		lsLabels = ["Red", "LSL", "Red", "Yellow", "Green", "Yellow", "Design Value", "Yellow", "Red", "USL", "Red"];
		lsData = [sLSL, sLSL, dRealRedLower, dRealYellowLower, dRealYellowUpper, dRealRedUpper, dRealValue, dRealRedUpper, dRealUpper, sUSL, dRealUpper];
		ldData = [
			dLSL, 0.03, dRedLower - dLSL,
			dYellowLower - dRedLower, dYellowUpper - dYellowLower,
			dValue - dYellowUpper, 0.05, dRedUpper - dValue,
			dUSL - dRedUpper, 0.03, dUpper - dUSL
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
		];
	}
	else if (dValue < dUSL) {
		// when value is in upper Red zone
		lsLabels = ["Red", "LSL", "Red", "Yellow", "Green", "Yellow", "Red", "Design Value", "Red", "USL", "Red"];
		lsData = [sLSL, sLSL, dRealRedLower, dRealYellowLower, dRealYellowUpper, dRealRedUpper, dRealUpper, dRealValue, sUSL, sUSL, dRealUpper];
		ldData = [
			dLSL, 0.03, dRedLower - dLSL,
			dYellowLower - dRedLower, dYellowUpper - dYellowLower, dRedUpper - dYellowUpper,
			dValue - dRedUpper, 0.05, dUSL - dValue, 0.03, dUpper - dUSL
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
		];
	}
	else if (dValue == dUSL) {
		// when value is equal to USL
		lsLabels = ["Red", "LSL", "Red", "Yellow", "Green", "Yellow", "red", "USL", "Red"];
		lsData = [sLSL, sLSL, dRealRedLower, dRealYellowLower, dRealYellowUpper, dRealRedUpper, dRealUpper, dRealValue, dRealUpper];
		ldData = [
			dLSL, 0.03, dRedLower - dLSL,
			dYellowLower - dRedLower, dYellowUpper - dYellowLower, dRedUpper - dYellowUpper,
			dUSL - dRedUpper, 0.05, dUpper - dUSL
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.6)',
		];
	}
	else {
		// when value is greater than Upper Specification Limit
		lsLabels = ["Red", "LSL", "Red", "Yellow", "Green", "Yellow", "Red", "USL", "Red", "Design Value", "Red"];
		lsData = [sLSL, sLSL, dRealRedLower, dRealYellowLower, dRealYellowUpper, dRealRedUpper, dRealUpper, sUSL, sUSL, dRealValue, dRealUpper];
		ldData = [
			dLSL, 0.03, dRedLower - dLSL,
			dYellowLower - dRedLower, dYellowUpper - dYellowLower, dRedUpper - dYellowUpper,
			dUSL - dRedUpper, 0.03, dValue - dUSL, 0.05, dUpper - dValue
		];
		lsBackground = [
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(255, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)',
			'rgba(255, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)', 'rgba(255, 0, 0, 0.6)',
			'rgba(0, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.6)',
		];
	}
	
	// chart.js
	var ctx = document.getElementById("marginalDial").getContext("2d");
	var marginalDial = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels: lsLabels,
			datasets: [{
				label: sTitle,
				data: ldData,
				backgroundColor: lsBackground,
				/*
				hoverBackgroundColor: [
					'rgba(255, 0, 0, 0.8)',
					'rgba(0, 0, 0, 0.7)',
					'rgba(255, 0, 0, 0.8)',
					'rgba(255, 255, 0, 0.8)', 
					'rgba(0, 255, 0, 0.8)',
					'rgba(255, 255, 0, 0.8)',
					'rgba(255, 0, 0, 0.8)',
					'rgba(0, 0, 0, 0.7)',
					'rgba(255, 0, 0, 0.8)'
				], */
				borderWidth: 0
			},
			{
				data: [dValue, 0.05, dUpper - dValue],
				backgroundColor: [
					'rgba(0, 0, 0, 0.1)',
					'rgba(0, 0, 0, 0.6)',
					'rgba(0, 0, 0, 0.1)',
				],
				hoverBackgroundColor: [
					'rgba(0, 0, 0, 0.1)',
					'rgba(0, 0, 0, 0.6)',
					'rgba(0, 0, 0, 0.1)',
				],
				borderWidth: 0
			}]
		},
		options: {
			cutoutPercentage: 50,
			rotation: 1 * Math.PI,
			circumference: 1 * Math.PI,
			responsive: false,
			legend: {
				display: false
			},
			tooltips: {
				filter: function(tooltipItem) {
					return tooltipItem.datasetIndex == 0 || tooltipItem.index == 1;
				},
				callbacks: {
					label: function(tooltipItem) {
						var l = lsLabels[tooltipItem.index];
						if (tooltipItem.datasetIndex == 1) {
							return "Design Value: " + dRealValue;
						}
						else if (l.startsWith("Design") || l.startsWith("LSL") || l.startsWith("USL")) {
							return l + ": " + lsData[tooltipItem.index];
						}
						else if (lsData[tooltipItem.index] <= dRealYellowLower) {
							return l + ": < " + lsData[tooltipItem.index];
						}
						else if (lsData[tooltipItem.index - 1] >= dRealYellowUpper) {
							return l + ": > " + lsData[tooltipItem.index - 1];
						}
						else if (l.startsWith("Green")) {
							return l + ": [" + dRealYellowLower + ", " + dRealYellowUpper + "]";
						}
					}
				}
			},
			title: {
				display: true,
				text: sTitle,
				fontSize: 24,
				fontColor: sTitleColor,
				//fontFamily: sTitleFormat,
			},
			animation: {
				animateScale: true,
				animateRotate: true
			},
			chartArea: {
				backgroundColor: ['rgba(0, 0, 0, 0.1)'],
			}
		}
	});
}
