function apicall() {
    const data = JSON.parse(request.responseText);
    const width = 1000;
    const height = 800;
    const linkDistance = 50;
    const forceCharge = -100;

    let graph = d3.select("#maindiv");

    const tooltip = d3.select("#tooltip");

    const svg = graph.append("svg").attr("width", width).attr("height", height);
    let force = d3.layout
        .force()
        .size([width, height])
        .nodes(data.nodes)
        .links(data.links)
        .linkDistance(linkDistance)
        .charge(forceCharge)
        .start()
        .on("tick", () => {
            node
                .style("left", (d) => `${d.x - 8}px`)
                .style("top", (d) => `${d.y - 5}px`);

            link
                .attr("x1", (d) => d.source.x)
                .attr("x2", (d) => d.target.x)
                .attr("y1", (d) => d.source.y)
                .attr("y2", (d) => d.target.y);
        });

    let link = svg
        .selectAll(".link")
        .data(data.links)
        .enter()
        .append("line")
        .attr("class", "link");

    let node = graph
        .select(".flags")
        .selectAll(".node")
        .data(data.nodes)
        .enter()
        .append("img")
        .attr("class", (d) => "flag flag-" + d.code)
        .on("mouseover", (d) => {
            tooltip.style("display", "flex");
            tooltip
                .html(d.country)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", (d) => {
            tooltip.style("display", "none");
        })
        .call(force.drag);
}

let request = new XMLHttpRequest();
request.addEventListener("load", apicall);
request.open(
    "GET",
    "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
    true
);
request.send(null);