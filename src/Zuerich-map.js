const width = 1200,
    height = 500;

const margin = {top: 50, right: 20, bottom: 30, left: 60};

const canvHeight = 400, canvWidth = 500;

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
        .on('click', function(d) {
            updateHistogram(d.id);

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



    const g = svg.append("g")
        .attr("id", "chart-area")
        .attr("transform", `translate(900,200)`);

    const widthH = canvWidth - margin.left - margin.right;
    const heightH = canvHeight - margin.top - margin.bottom;

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    svg.append("text")
        .attr("x", margin.left)
        .attr("y", 0)
        .attr("dy", "1.5em")  // line height
        .attr("font-family", "sans-serif")
        .attr("font-size", "24px")
        .style("text-anchor", "left")
        .text("Anzahl Unfälle im Ort");

    d3.csv("./data/Unfaelle_Autos.csv", function (error, data) {

        const xScale = d3.scaleBand().rangeRound([0, widthH]).padding(0.2)
            .domain(_.uniq(data.map(d => d.INDIKATOR_JAHR)).map(d => Number.parseInt(d)));

        const yScale = d3.scaleLinear().rangeRound([heightH, 0])
            .domain([0, d3.max(_.map(data, d => d.Anzahl_Unfaelle).map(d => Number.parseInt(d)))]);

        const xAxis = d3.axisBottom(xScale);
        g.append("g")
            .attr("transform", "translate(0," + heightH + ")").call(xAxis);

        const yAxis = d3.axisLeft(yScale);
        g.append("g")
            .call(yAxis);

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - (heightH / 2))
            .attr("y", 0 - margin.left)
            .attr("dy", "1em")
            .attr("font-family", "sans-serif")
            .style("text-anchor", "middle")
            .text("Anzahl Unfälle");

        const bfsMatch = data.filter(d => Number.parseInt(d.BFS_NR) === 1);

        var init =
            g.selectAll("rect")
                .data(bfsMatch);

        var update = init.enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.INDIKATOR_JAHR))
            .attr("y", d => yScale(Number.parseInt(d.Anzahl_Unfaelle)))
            .attr("width", xScale.bandwidth())
            .attr("height", d => heightH - yScale(Number.parseInt(d.Anzahl_Unfaelle)))
            .style("fill", d => colorScale(d["Anzahl_Unfaelle"]));


   ;



    })


function updateHistogram(id){

    const heightH = canvHeight - margin.top - margin.bottom;



    d3.csv("./data/Unfaelle_Autos.csv", function (error, data) {

        const bfsMatch = data.filter(d => Number.parseInt(d.BFS_NR) === id);

        const xScale = d3.scaleBand().rangeRound([0, widthH]).padding(0.2)
            .domain(_.uniq(data.map(d => d.INDIKATOR_JAHR)).map(d => Number.parseInt(d)));

        const yScale = d3.scaleLinear().rangeRound([heightH, 0])
            .domain([0, d3.max(_.map(data, d => d.Anzahl_Unfaelle).map(d => Number.parseInt(d)))]);

        var init =
        g.selectAll("rect")
            .data(bfsMatch)
            .style("fill", d => colorScale(d["Anzahl_Unfaelle"]))
            .attr("x", d => xScale(d.INDIKATOR_JAHR))
            .attr("y", d => yScale(Number.parseInt(d.Anzahl_Unfaelle)))
            .attr("width", xScale.bandwidth())
            .attr("height", d => heightH - yScale(Number.parseInt(d.Anzahl_Unfaelle)));
        ;

        // var update = init.enter().append("rect")
        //     .attr("class", "bar")
        //     .attr("x", d => xScale2(d.INDIKATOR_JAHR))
        //     .attr("y", d => yScale2(Number.parseInt(d.Anzahl_Unfaelle)))
        //     .attr("width", xScale2.bandwidth())
        //     .attr("height", d => heightH - yScale2(Number.parseInt(d.Anzahl_Unfaelle)))
        //     .style("fill", d => colorScale(d["Anzahl_Unfaelle"]));




    })
}


