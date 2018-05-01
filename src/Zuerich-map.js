const width = 960,
    height = 500;


var svg = d3.select("svg");

var path = d3.geoPath();

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.json("./data/merged.json", function(error, ch) {
    if (error) throw error;

    svg.append("g")
        .attr("class", "municipalities")
        .selectAll("path")
        .data(topojson.feature(ch, ch.objects.municipalities).features)
        .enter().append("path")
        .attr("d", path)
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html((d.properties.GEBIET_NAME))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .on('click', function () { //TODO on click do histogram of municipality
        d3.select('body')
            .append('h3')
            .text('Today is a beautiful day!!');
    });

    svg.append("path")
        .attr("class", "municipality-boundaries")
        .attr("d", path(topojson.mesh(ch, ch.objects.municipalities, function(a, b) { return a !== b; })));

    svg.append("g")
        .attr("class", "lakes")
        .selectAll("path")
        .data(topojson.feature(ch, ch.objects.lakes).features)
        .enter().append("path")
        .attr("d", path);

    svg.append("path")
        .attr("class", "lakes")
        .attr("d", path(topojson.mesh(ch, ch.objects.lakes, function(a, b) { return a !== b; })));

});


