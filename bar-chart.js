const getDataRange = (arr) => {
  if( arr.length < 0 ) return undefined;
  let max = arr[0], min = arr[0];
  for( let val of arr ){
    if(max < val) max = val;
    else if(min > val) min = val;
  }
  return [min,max];
};

const createBars = (data, opts) => {
  let barWidth = opts.conWidth / data.length;
  let minMax = getDataRange(data) || [1,-1];
  let bars = [], heightCalc;
  if( minMax[1] - minMax[0] === 0 ) heightCalc = undefined;
  else if( minMax[1] - minMax[0] < 0 ) return undefined;
  else lengthCalc = (val,minMax) => (val - minMax[0]) / (minMax[1] - minMax[0]);
  for(let val of data){
    let barHeight = opts.conHeight * (lengthCalc ? lengthCalc(val,minMax) : 0.5);
    bars.push($('<div>')
      .css({
      display: "inline-block",
      backgroundColor: "red",
      width: barWidth,
      height: barHeight,
      marginLeft: 10
    }));
  }
  return bars;
};

const createGraphBox = () => {

};

/**
 *
 * @param {array object} data
 * @param {object} options
 * @param {jQuery element} element is the container for the bar chart
 */
const drawBarChart = (data, options, element) => {
  let title, bars, width = 500, height = 500;
  if( options["width"] ) width = Number(options.width);
  if( options["height"] ) height = Number(options.height);
  element.append(createBars(data,{conWidth: width, conHeight: height}));
};
