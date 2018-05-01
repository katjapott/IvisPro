

// define svn size and margin.
const canvHeight = 600, canvWidth = 800;
const margin = {top: 50, right: 20, bottom: 30, left: 60};

// 1. get reference to <body>-Tag
// 2. Create a new tag <svg width="800" height="600"> and append as child to <body>-Tag.
// 3. store reference to new tag in variable 'svg'
const svg = d3.select("body").append("svg")
    .attr("width", canvWidth)
    .attr("height", canvHeight)
    .style("border", "1px solid");

// 1. create parent group and append as child to <svg>-Tag.
// 2. move parent group by left and top margin.
// this will be the container that holds the histogram.
const g = svg.append("g")
    .attr("id", "chart-area")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// compute the width and height of the actual chart area.
const width = canvWidth - margin.left - margin.right;
const height = canvHeight - margin.top - margin.bottom;

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var chosen = 2;

// we now have created the folling structure in our index.html
// <body>
//   ...
//   <svg width="800" height="600" style="border: 1px solid;">
//      <g id="chart-area" transform="translate(60,50)">
//      </g>
//   </svg>
// </body>

// chart title
// 1. create tag
// <text x="60" y="0" dy="1.5em" font-family="sans-serif" font-size="24px" text-anchor="left">
//   Shirt Size Histogram
// </text>
// and append as child to svg (we want the title be relative to the main svg canvas.)
svg.append("text")
    .attr("x", margin.left)
    .attr("y", 0)
    .attr("dy", "1.5em")  // line height
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .style("text-anchor", "left")
    .text("Shirt Size Histogram");


d3.csv("./data/Unfaelle_Autos.csv", function(error, data) {


// create scale for x direction
//see https://github.com/d3/d3-scale#band-scales
// 1. create scaleBand and configure padding
// 2. set range to [0, width]
// 3. set domain to the shirt size (i.e. ["S", "M", "L"])
    const xScale = d3.scaleBand().rangeRound([0, width]).padding(0.2)
        .domain(_.map(data, d => d.INDIKATOR_JAHR));

// create scale for y direction
// 1. create linear scale
// 2. set range to ]height,0| - this is a hack to deal with the fact that the bars
// are plotted from bottom to top, while SVG y-coordinate runs from top to bottom
    const yScale = d3.scaleLinear().rangeRound([height, 0])
        .domain([0, d3.max(_.map(data, d => d.Anzahl_Unfaelle))]);

// 1. create xAxis
    const xAxis = d3.axisBottom(xScale);
// 2. create a new group
// 3. append new group as child to <g>
// 3. translate/move new group to the bottom of the main <g>.
// 4. generate axis and add to new group.
    g.append("g")
        .attr("transform", "translate(0," + height + ")").call(xAxis);

// 1. create yAxis
    const yAxis = d3.axisLeft(yScale);
// 2. create new group (step 2 and 3)
// 3. append new group as child to <g>
// 4. generate axis and add to new group.
    g.append("g")
        .call(yAxis);


// 1. create text label for the y axis and append to <g>
// compute the position of the label
    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height / 2))
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .text("Count of Shirt Size");



// create the histogram rects.
// 1. selectAll creates an empty placeholder for a yet inexisting rect.
// 2. .data(shirt_data).enter() loops over the data array. subsequent methods are called for every element in the data array.
// 3. attr("class", "bar") assigns the class attribut. CSS can be used to style all "bar"s.
// 4. x and y use the scale-functions to convert the domain values to actual pixel values.
// 5. the width of the box is given by the scaleBand().
// 6. the height depends scale-function again.
    g.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.INDIKATOR_JAHR))
        .attr("y", d => yScale(d.Anzahl_Unfaelle))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.Anzahl_Unfaelle))
        .style("fill", d => colorScale(d["Anzahl_Unfaelle"]));
})