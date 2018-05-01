const canvHeight = 600, canvWidth = 800;
const margin = {top: 50, right: 20, bottom: 30, left: 60};

const svg = d3.select("body").append("svg")
    .attr("width", canvWidth)
    .attr("height", canvHeight)
    .style("border", "1px solid");

const g = svg.append("g")
    .attr("id", "chart-area")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const width = canvWidth - margin.left - margin.right;
const height = canvHeight - margin.top - margin.bottom;

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

var chosen = 2;

svg.append("text")
    .attr("x", margin.left)
    .attr("y", 0)
    .attr("dy", "1.5em")  // line height
    .attr("font-family", "sans-serif")
    .attr("font-size", "24px")
    .style("text-anchor", "left")
    .text("Anzahl Unfälle im Ort");

d3.csv("./data/Unfaelle_Autos.csv", function(error, data) {

    const xScale = d3.scaleBand().rangeRound([0, width]).padding(0.2)
        .domain(_.map(data, d => d.INDIKATOR_JAHR));

    const yScale = d3.scaleLinear().rangeRound([height, 0])
        .domain([0, d3.max(_.map(data, d => d.Anzahl_Unfaelle))]);

    const xAxis = d3.axisBottom(xScale);
    g.append("g")
        .attr("transform", "translate(0," + height + ")").call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    g.append("g")
        .call(yAxis);

    g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (height / 2))
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .text("Anzahl Unfälle");

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