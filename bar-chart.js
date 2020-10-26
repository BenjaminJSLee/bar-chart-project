const getDataRange = (arr) => {
  if( arr.length < 0 ) return undefined;
  let max = arr[0], min = arr[0];
  for( let val of arr ){
    if(max < val) max = val;
    else if(min > val) min = val;
  }
  return [min,max];
};

const createBars = (data, opts, width, height) => {
  let heightCalc;
  let barWidth = width / data.length;
  let minMax = getDataRange(data) || [1,-1];
  let barsContainer = $('<div>').css({
    height: height,
  });
  if( minMax[1] - minMax[0] === 0 ) heightCalc = undefined;
  else if( minMax[1] - minMax[0] < 0 ) return undefined;
  else lengthCalc = (val,minMax) => (val - minMax[0]) / (minMax[1] - minMax[0]);
  for(let val of data){
    let bar, txt;
    let barHeight = ((height-20) * (lengthCalc ? lengthCalc(val,minMax) : 0.5)) + 20;
    bar = $('<div>')
      .css({
      position: "relative",
      textAlign: "center",
      display: "inline-block",
      backgroundColor: opts["colour"] || "blue",
      width: barWidth,
      height: barHeight,
      marginLeft: opts["barSpace"] || 10
    });
    txt = $("<div>").css({
      position: "absolute",
      width: "auto",
      top: opts["top"] || null,
      left: "50%",
      bottom: opts["bottom"] || null,
      transform: "translate(-50%,-" + (opts["top"] || "0%") +  ")"
    }).html(val);
    bar.append(txt);
    barsContainer.append(bar);
  }
  return barsContainer;
};

const createXAxis = (data, opts, width) => {
  let labels = opts.labels, axisContainer, metadata;
  axisContainer = $('<div>').css({
    display: "block",
    width: width + opts["barSpace"] * data.length + 10,
    height: 20 - opts["lineWidth"],
    borderTop: "1px solid black"
  });
  axisContainer.append($('<div>').css({
    display: "inline-block",
    width: 10 - opts["lineWidth"],
    height: 20 - opts["lineWidth"],
    borderRight: "1px solid black"
  }));
  for(let label of labels){
    metadata = $('<div>').css({
      position: "relative",
      display: "inline-block",
      textAlign: "center",
      width: (width / labels.length) - 2,
      height: 20 - opts["lineWidth"],
      borderLeft: "1px solid black",
      borderRight: "1px solid black",
      marginLeft: opts["barSpace"]
    });
    text = $('<div>').css({
      position: "absolute",
      top: 0
    }).html(label);
    metadata.append(text);
    axisContainer.append(metadata);
  }
  return axisContainer;
};

const createYAxis = (data,opts,height) => {
  let labels = opts.labels, axisContainer, metadata;
  axisContainer = $('<div>').css({
    position: "relative",
    display: "inline-block",
    float: "left",
    width: "10"
  });
  for(let i = 0; i < 10; i++){
    metadata = $('<div>').css({
      display: "block",
      textAlign: "center",
      height: (height / 10) - 1,
      borderTop: "1px solid black",
      borderRight: "1px solid black"
    });
    axisContainer.append(metadata);
  }
  return axisContainer;
};

const createGraphBox = (data,options) => {
  let graphContainer, yAxis, xAxis, bars,
  width = options["width"] || 500, height = options["height"] || 500;
  if( !(options["barSpace"]) ) options["barSpace"] = 10;
  graphContainer = $('<div>');
  xAxis = createXAxis(data,options,width);
  yAxis = createYAxis(data,options,height);
  bars = createBars(data,options,width,height);
  graphContainer.append(yAxis,bars,xAxis);
  return graphContainer;
};

/**
 *
 * @param {array object} data
 * @param {object} options
 * @param {jQuery element} element is the container for the bar chart
 */
const drawBarChart = (data, options, element) => {
  let title, graphBox;
  title = $("<div>").css({

  }).html(options["title"] || "Bar Chart");
  graphBox = createGraphBox(data,options);
  element.append(title,graphBox);
};
