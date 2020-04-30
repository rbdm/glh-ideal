/********** Initialisation *********/
var svg = d3.select("#canvas");
var width = svg.attr("width");
var height = svg.attr("height");


/************* Data **************/
//Characters
var nodes_data =  [
    {"name": "Lillian", "sex": "F"},
    {"name": "Gordon", "sex": "M"},
    {"name": "Sylvester", "sex": "M"},
    {"name": "Mary", "sex": "F"},
    {"name": "Helen", "sex": "F"},
    {"name": "Jamie", "sex": "M"},
    {"name": "Jessie", "sex": "F"},
    {"name": "Ashton", "sex": "M"},
    {"name": "Duncan", "sex": "M"},
    {"name": "Evette", "sex": "F"},
    {"name": "Mauer", "sex": "M"},
    {"name": "Fray", "sex": "F"},
    {"name": "Duke", "sex": "M"},
    {"name": "Baron", "sex": "M"},
    {"name": "Infante", "sex": "M"},
    {"name": "Percy", "sex": "M"},
    {"name": "Cynthia", "sex": "F"}
]

//Relationships
//type: A for Ally, E for Enemy
var links_data = [
    {"source": "Sylvester", "target": "Gordon", "type":"A" },
    {"source": "Sylvester", "target": "Lillian", "type":"A" },
    {"source": "Sylvester", "target": "Mary", "type":"A"},
    {"source": "Sylvester", "target": "Jamie", "type":"A"},
    {"source": "Sylvester", "target": "Jessie", "type":"A"},
    {"source": "Sylvester", "target": "Helen", "type":"A"},
    {"source": "Helen", "target": "Gordon", "type":"A"},
    {"source": "Mary", "target": "Lillian", "type":"A"},
    {"source": "Ashton", "target": "Mary", "type":"A"},
    {"source": "Duncan", "target": "Jamie", "type":"A"},
    {"source": "Gordon", "target": "Jessie", "type":"A"},
    {"source": "Sylvester", "target": "Fray", "type":"E"},
    {"source": "Fray", "target": "Mauer", "type":"A"},
    {"source": "Fray", "target": "Cynthia", "type":"A"},
    {"source": "Fray", "target": "Percy", "type":"A"},
    {"source": "Percy", "target": "Cynthia", "type":"A"},
    {"source": "Infante", "target": "Duke", "type":"A"},
    {"source": "Duke", "target": "Gordon", "type":"A"},
    {"source": "Duke", "target": "Sylvester", "type":"A"},
    {"source": "Baron", "target": "Duke", "type":"A"},
    {"source": "Baron", "target": "Sylvester", "type":"E"},
    {"source": "Evette", "target": "Sylvester", "type":"E"},
    {"source": "Cynthia", "target": "Sylvester", "type":"E"},
    {"source": "Cynthia", "target": "Jamie", "type":"E"},
    {"source": "Mauer", "target": "Jessie", "type":"E"}
]


/*********** Simulation *************/
var simulation = d3
    .forceSimulation()
    .nodes(nodes_data);

var center_force = d3.forceCenter(width/2, height/2);
var repel_force = d3.forceManyBody();

var link_force = d3
    .forceLink(links_data)
    .id(function(d) { return d.name; });

simulation
  .force("center_force", center_force)
  .force("repel_force", repel_force)
  .force("links", link_force);

simulation.on("tick", tick);


/********** Node and Links ***********/
var g = svg
    .append("g")
    .attr("class", "everything");

function linkColor(d)
{
    if (d.type == "A") {
        return "green"
    } else {
        return "red"
    }
}

var link = g
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links_data)
    .enter()
    .append("line")
    .attr("stroke-width", 2)
    .style("stroke", linkColor);


function nodeColor(d)
{
    if (d.sex == "M") {
        return "blue"
    } else {
        return "pink"
    }
}

var node = g
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes_data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", nodeColor);


/********** Zoomable ************/
function zoom_actions()
{
    g.attr("transform", d3.event.transform)
}

var zoom_handler = d3
    .zoom()
    .on("zoom", zoom_actions);

zoom_handler(svg);


/********* Draggable *********/
function drag_start(d)
{
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x
    d.fy = d.y
}

function drag_actions(d)
{
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function drag_end(d)
{
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = d.x;
    d.fy = d.y;
}

var drag_handler = d3.drag()
    .on("start", drag_start)
    .on("drag", drag_actions)
    .on("end", drag_end);

drag_handler(node);


/******** Tick *************/
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
