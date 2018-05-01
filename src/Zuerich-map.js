const width = 960,
    height = 500;


const path = d3.geo.path()
    .projection(projection);

const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);


var projection = d3.geo.albers()
    .rotate([0, 0])
    .center([8.3, 46.8])
    .scale(16000)
    .translate([width / 2, height / 2])
    .precision(.1);

d3.json("./data/merged.json", function(error, ch) {
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

    // Create tooltip
    var tooltip = d3.select("body").append("div").classed("tooltip", true);

    path.on("mouseover", function(d, i) {
        tooltip
            .data(topojson.feature(ch, ch.objects.municipalities).features)
            .enter().append("text")
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("visibility", "visible")
            .text(function(d) { return d.properties.GEBIET_NAME; });
    })
        .on("mouseout", function(d,i) {
            tooltip.style("visibility", "hidden")
        });


});




