/********** Initialisation *********/
var svg = d3.select("#canvas");
var width = svg.attr("width");
var height = svg.attr("height");


/************* Data **************/
var nodes_data =  [
    {"name": "Travis", "sex": "M"},
    {"name": "Rake", "sex": "M"},
    {"name": "Diana", "sex": "F"},
    {"name": "Rachel", "sex": "F"},
    {"name": "Shawn", "sex": "M"},
    {"name": "Emerald", "sex": "F"}
]

var links_data = [
	{"source": "Travis", "target": "Rake"},
    {"source": "Diana", "target": "Rake"},
    {"source": "Diana", "target": "Rachel"},
    {"source": "Rachel", "target": "Rake"},
    {"source": "Rachel", "target": "Shawn"},
    {"source": "Emerald", "target": "Rachel"}
]


/*********** Simulation *************/
var simulation = d3
    .forceSimulation()
    .nodes(nodes_data);

var link_force = d3
    .forceLink(links_data)
    .id(function(d) { return d.name; })

simulation
  .force("center_force", d3.forceCenter(width/2, height/2))
  .force("repel_force", d3.forceManyBody())
  .force("links", link_force);


/********** Node and Links ***********/
var link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links_data)
    .enter()
    .append("line")
    .attr("stroke-width", 2);

var node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes_data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", "red");

function tick() 
{
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}


/******** Begin Simulation *******/
simulation.on("tick", tick);
