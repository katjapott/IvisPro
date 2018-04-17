const width = 960,
    height = 500;


const path = d3.geo.path()
    .projection(projection);

const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


// load the data from the cleaned csv file.
// note: the call is done asynchronous.
// That is why you have to load the data inside of a
// callback function.
d3.csv("./data/Unfaelle_Autos.csv", function(error, data) {
    const cars = d3.extent(data, d => Number(d.AVG_Autos));
    const acc = d3.extent(data, d => Number(d.AVG_Unfaelle_pro_Ort));
    const muni = d3.extent(data, d => Number(d.GEBIET_NAME));

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);


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

var projection = d3.geo.albers()
    .rotate([0, 0])
    .center([8.3, 46.8])
    .scale(16000)
    .translate([width / 2, height / 2])
    .precision(.1);

d3.json("swiss-maps/topo/zh-municipalities-lakes.json", function(error, ch) {
    svg.append("path")
        .datum(topojson.feature(ch, ch.objects.municipalities))
        .attr("class", "municipalities")
        .attr("d", path);

    svg.append("path")
        .datum(topojson.mesh(ch, ch.objects.municipalities, function(a, b) { return a !== b; }))
        .attr("class", "municipality-boundaries")
        .attr("d", path);

    svg.append("path")
        .datum(topojson.feature(ch, ch.objects.lakes))
        .attr("class", "lakes")
        .attr("d", path);

    svg.append("path")
        .datum(topojson.mesh(ch, ch.objects.lakes, function(a, b) { return a !== b; }))
        .attr("class", "lakes")
        .attr("d", path);

    svg.selectAll("text")
        .data(topojson.feature(ch, ch.objects.municipalities).features)
        .enter().append("text")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.id; });



});