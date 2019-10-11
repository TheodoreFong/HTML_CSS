var svgWidth = 1200;
var svgHeight = 800;
var yPad = 20;
var xPad = 50;

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

d3.json("data/data.json", function(data) {

  var dataLength = Object.keys(data).length;

  // scales
  var xMax = d3.max(data, function(d,i) {
    return d.date;
  });
  var xMin = d3.min(data, function(d,i) {
    return d.date;
  })
  var xScale = d3.scaleTime()
    .domain([new Date(2019, 7, 20), new Date(2019, 8, 18)])
  	.range([xPad, svgWidth-xPad]);
xScale.ticks(30);

  var yMax = d3.max(data, function(d,i) {
    return d.sleep_hours;
  })

  var yScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([svgHeight-yPad, yPad]);
  // tooltip
  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // create axis
  var xAxis = d3.axisBottom()
    .scale(xScale);
  svg.append("g")
    .attr("transform", "translate(0," + (svgHeight - yPad) + ")")
    .call(xAxis);
  var yAxis = d3.axisLeft()
    .scale(yScale);
  svg.append("g")
    .attr("transform", "translate("+ xPad + "," + "0)")
    .call(yAxis)

  // bind the data, process each data element from the json file
  var bars = d3.select("svg").selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", function(d) {
      return "rect." + d.weekday;
    })
    .attr("x", function(d) {
      return xScale(new Date(d.date));
    })
    .attr("y", function(d) {
      return yScale(d.sleep_hours);
    })
    .attr("width", function(d) {
      return (xScale(new Date(xMax))/dataLength - 2);
    })
    .attr("height", function(d) {
      return yScale(yMax - d.sleep_hours) - yPad;
    })
    .attr("fill", "#000000")
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", 0.9);
      div.html("Date: " + d.date +
              "</br> Day of Week: " + d.weekday +
              "</br> Hours of Sleep: " + d.sleep_hours +
              ", Workout?: " + d.workout)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - yPad) + "px");
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(500)
        .style("opacity", 0);
    })
    .on("click", function(d) {
      var thisDay = d.weekday;
      d3.selectAll("rect")
        .attr("fill", function(d) {
          if (d.weekday === thisDay) {
            return "#3DC01C";
          }
          return "#000000";
        });
    });
  });
