// create svg canvas
const svg = d3.select("body").append("svg")
    .attr("width", canvWidth)
    .attr("height", canvHeight)
    .style("border", "1px solid");

// calc the width and height depending on margins.
const margin = {top: 50, right: 80, bottom: 50, left: 60};
const width = canvWidth - margin.left - margin.right;
const height = canvHeight - margin.top - margin.bottom;

// create parent group and add left and top margin
const g = svg.append("g")
    .attr("id", "chart-area")
    .attr("transform", "translate(" +margin.left + "," + margin.top + ")");

// chart title
svg.append("text")
    .attr("y", 0)
    .attr("x", margin.left)
    .attr("dy", "1.5em")
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .style("text-anchor", "left")
    .text("Unfälle und zugelassene Autos pro Ort pro 1000 Einwohner");


d3.csv("./data/Unfaelle_Autos.csv", function(error, data) {
    const heightDomain = d3.extent(data, d => Number(d.AVG_Autos));
    const weightDomain = d3.extent(data, d => Number(d.AVG_Unfaelle_pro_Ort));

    // create scales for x and y direction
    const xScale = d3.scaleLinear()
        .rangeRound([0,width])
        .domain(heightDomain)
        .nice(5);

    const yScale = d3.scaleLinear()
        .rangeRound([height,0])
        .domain(weightDomain)
        .nice(5);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // create xAxis
    const xAxis = d3.axisBottom(xScale);
    g.append("g")  // create a group and add axis
        .attr("transform", "translate(0," + height + ")").call(xAxis);

    // create yAxis
    const yAxis = d3.axisLeft(yScale);
    g.append("g")  // create a group and add axis
        .call(yAxis);

    // add circle
    var data_points = g.selectAll("circle")  // this is just an empty placeholder
        .data(data)
        .enter().append("circle")
        .attr("class", "bar")
        .attr("cx", d => xScale(d.AVG_Autos))
        .attr("cy", d => yScale(d.AVG_Unfaelle_pro_Ort))
        .attr("r", 4)
        .style("fill", d => colorScale(d["AVG_Unfaelle_pro_Ort"]));

    // Create tooltip
    var tooltip = d3.select("body").append("div").classed("tooltip", true);

    data_points.on("mouseover", function(d, i) {
        tooltip
            .html(`${d["GEBIET_NAME"]} <br/>`
                + `Autos: ${d.AVG_Autos}<br/>`
                + `Unfaelle: ${d.AVG_Unfaelle_pro_Ort}` )
            .style("visibility", "visible")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function(d,i) {
            tooltip.style("visibility", "hidden")
        });
});

// text label for the x axis
g.append("text")
    .attr("y", height + margin.bottom / 2)
    .attr("x", width / 2)
    .attr("dy", "1em")
    .attr("font-family", "sans-serif")
    .style("text-anchor", "middle")
    .text("Autos");

// text label for the y axis
g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .attr("font-family", "sans-serif")
    .style("text-anchor", "middle")
    .text("Unfaelle");

