const getDataRange = (arr) => {
  if (arr.length < 0) return undefined;
  let max = arr[0], min = arr[0];
  for (let val of arr) {
    if (max < val) max = val;
    else if (min > val) min = val;
  }
  return [min,max];
};

const createBars = (data, opts) => {
  let lengthCalc;
  let barWidth = opts.width / data.length;
  let minMax = getDataRange(data) || [1,-1];
  let barsContainer = $('<div>').css({
    height: opts.height,
  });
  if (minMax[1] - minMax[0] === 0) lengthCalc = undefined;
  else if (minMax[1] - minMax[0] < 0) return undefined;
  else lengthCalc = (val,minMax) => (val - minMax[0]) / (minMax[1] - minMax[0]);
  for (let val of data) {
    let bar, txt;
    let barHeight = ((opts.height - opts.height / opts.ticks) * (lengthCalc ? lengthCalc(val,minMax) : 0.5)) + opts.height / opts.ticks;
    bar = $('<div>')
      .css({
        position: "relative",
        textAlign: "center",
        display: "inline-block",
        backgroundColor: opts.barColour,
        width: barWidth,
        height: barHeight,
        marginLeft: opts.barSpace
      });
    txt = $("<div>").css({
      position: "absolute",
      width: "auto",
      left: "50%",
      bottom: opts.dataPlace,
      transform: "translateX(-50%)"
    }).html(val);
    bar.append(txt);
    barsContainer.append(bar);
  }
  return barsContainer;
};

const createXAxis = (data, opts) => {
  let labels = opts.labels, axisContainer, metadata;
  axisContainer = $('<div>').css({
    position: "relative",
    display: "block",
    width: opts.width + opts.barSpace * data.length + data.length * opts.lineWidth * 2 - 2,
    height: opts.tickLength - opts.lineWidth,
    borderTop: "1px solid black"
  });
  axisContainer.append($('<div>').css({
    position: "relative",
    display: "inline-block",
    verticalAlign: "top",
    width: opts.tickLength - opts.lineWidth,
    height: opts.tickLength - opts.lineWidth,
    borderRight: "1px solid black"
  }));
  for (let label of labels) {
    metadata = $('<div>').css({
      position: "relative",
      display: "inline-block",
      textAlign: "center",
      width: (opts.width / data.length) - opts.lineWidth * 2,
      height: opts.tickLength - opts.lineWidth,
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      marginLeft: opts.barSpace
    });
    text = $('<div>').css({
      position: "relative",
      top: 0
    }).html(label);
    metadata.append(text);
    axisContainer.append(metadata);
  }
  return axisContainer;
};

const createYAxis = (data,opts) => {
  let labels = opts.labels, axisContainer, metadata;
  axisContainer = $('<div>').css({
    position: "relative",
    display: "inline-block",
    float: "left",
    width: "10"
  });
  for (let i = 0; i < opts.ticks; i++) {
    metadata = $('<div>').css({
      display: "block",
      textAlign: "center",
      height: (opts.height / opts.ticks) - 1,
      borderTop: "1px solid black",
      borderRight: "1px solid black"
    });
    axisContainer.append(metadata);
  }
  return axisContainer;
};

const createGraphBox = (data,options) => {
  let graphContainer, yAxis, xAxis, bars;
  graphContainer = $('<div>');
  xAxis = createXAxis(data,options);
  yAxis = createYAxis(data,options);
  bars = createBars(data,options);
  graphContainer.append(yAxis,bars,xAxis);
  return graphContainer;
};

/** Takes the user inputted options and replaces the default values with the
 * inputted values.
 *
 * @param {*} opts
 */
const getDefaultOpts = (data,opts) => {
  let defaultOpts = {
    // put all default options here
    width: 500,
    height: 500,
    title: "Bar Chart",
    titleSize: "16px",
    titleColour: "black",
    barSpace: 2,
    lineWidth: 1,
    dataPlace: "100%",
    barColour: "red",
    labels: Array(data.length).fill().map((val,i) => i + 1),
    labelColour: "white",
    xAxisName: 'x',
    yAxisName: 'y',
    ticks: 10,
    tickLength: 10
  };
  for (let prop in opts) {
    if (defaultOpts[prop]) defaultOpts[prop] = opts[prop];
  }
  return defaultOpts;
};

/**
 *
 * @param {array object} data
 * @param {object} options
 * @param {jQuery element} element is the container for the bar chart
 */
const drawBarChart = (data, options, element) => {
  let title, graphBox, allOpts;
  allOpts = getDefaultOpts(data,options);
  title = $("<div>").css({
    textAlign: "center",
    margin: "auto",
    fontSize: options["titleSize"],
    fontColour: options["titleColour"]
  }).html(allOpts["title"]);
  graphBox = createGraphBox(data,allOpts);
  element.append(title,graphBox);
};
