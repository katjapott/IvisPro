// // create svg canvas
 const canvHeight3 = 600, canvWidth3 = 800;
//
// const svg = d3.select("body").append("svg")
//     .attr("width", canvWidth)
//     .attr("height", canvHeight)
//     .style("border", "1px solid");
//
// calc the width and height depending on margins.
const margin2 = {top: 50, right: 80, bottom: 50, left: 60};
const width2 = canvWidth3 - margin2.left - margin2.right;
const height2 = canvHeight3 - margin2.top - margin2.bottom;

// create parent group and add left and top margin
const g2 = svg.append("g")
    .attr("id", "scatterplot")
    .attr("transform", "translate(400, 800)");

// chart title
g2.append("text")
    .attr("y", -100)
    .attr("x", margin2.left)
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
        .rangeRound([0,width2])
        .domain(heightDomain)
        .nice(5);

    const yScale = d3.scaleLinear()
        .rangeRound([height2,0])
        .domain(weightDomain)
        .nice(10);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // create xAxis
    const xAxis = d3.axisBottom(xScale);
    g2.append("g")  // create a group and add axis
        .attr("transform", "translate(0," + height2 + ")").call(xAxis);

    // create yAxis
    const yAxis = d3.axisLeft(yScale);
    g2.append("g")  // create a group and add axis
        .call(yAxis);

    // add circle
    var data_points = g2.selectAll("circle")  // this is just an empty placeholder
        .data(data)
        .enter().append("circle")
        .attr("class", "bar")
        .attr("cx", d => xScale(d.AVG_Autos))
        .attr("cy", d => yScale(d.AVG_Unfaelle_pro_Ort))
        .attr("r", 4)
        .style("fill", d => colorScale(d["AVG_Unfaelle_pro_Ort"]));

    // Create tooltip
    var tooltipScat = d3.select("body").append("div").classed("tooltipScat", true);

    data_points.on("mouseover", function(d, i) {
        tooltipScat
            .html(`${d["GEBIET_NAME"]} <br/>`
                + `Autos: ${d.AVG_Autos}<br/>`
                + `Unfaelle: ${d.AVG_Unfaelle_pro_Ort}` )
            .style("visibility", "visible")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function(d,i) {
            tooltipScat.style("visibility", "hidden")
        });
});

// text label for the x axis
g2.append("text")
    .attr("y", height2 + margin2.bottom / 2)
    .attr("x", width2 / 2)
    .attr("dy", "1em")
    .attr("font-family", "sans-serif")
    .style("text-anchor", "middle")
    .text("Autos");

// text label for the y axis
g2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin2.left)
    .attr("x",0 - (height2 / 2))
    .attr("dy", "1em")
    .attr("font-family", "sans-serif")
    .style("text-anchor", "middle")
    .text("Unfaelle");

