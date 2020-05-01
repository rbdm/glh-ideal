/********** Canvas *********/
var svg = d3.select("#canvas");
var width = svg.attr("width");
var height = svg.attr("height");


/********** Node and Links ***********/
var g = svg
    .append("g")
    .attr("class", "everything");

var link = g.selectAll("line");

var node = g.selectAll("circle");


/************* Data **************/
var root;

function parse_json(error, json)
{
    if (error) throw error;
    root = json;
    update()
}
d3.json("../json/example.json", parse_json);

function update()
{
    var nodes = flatten(root);
    var links = d3
        .layout()
        .tree()
        .links(nodes);

    simulation.restart();

    function link_id(d)
    {
        return d.target.id;
    }
    link = link.data(links, link_id)

    link
        .exit()
        .remove();

    link
        .enter()
        .append("line")
        .attr("stroke-width", 2)
        .style("stroke", linkColor)
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    
    function node_id(d)
    {
        return node.id;
    }
    node = node.data(nodes, node_id);

    node
        .exit()
        .remove()

    node
        .enter()
        .append("circle")
        .attr("r", 5)
        


}


const width = 1000,
    height = 1000;

let i = 0;

const root = d3.hierarchy(data);
const transform = d3.zoomIdentity;
let node, link;

const svg = d3.select('#canvas').append('svg')
    .call(d3.zoom().scaleExtent([1/2, 8]).on('zoom', zoomed))
    .append('g')
    .attr('transform', 'translate(40,0)');


/********** Zoomable ************/
function zoom_actions()
{
    g.attr("transform", d3.event.transform)
}

function clicked(d) {
    console.log(d.data.name);

    if (!d3.event.defaultPrevented) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update()
    }
}


function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
}

function dragged(d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
}

function flatten(root) {
    const nodes = []
    function recurse(node) {
    if (node.children) node.children.forEach(recurse)
    if (!node.id) node.id = ++i;
    else ++i;
    nodes.push(node)
    }
    recurse(root)
    return nodes
}

function zoomed() {
    svg.attr('transform', d3.event.transform)
}

update() 