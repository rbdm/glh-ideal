import * as d3 from 'd3';

import { GraphLink, GraphNode } from './graph-types';

import { GraphListenerEvent, GraphObserver, GraphListenerEventKind } from '../../graph-listener-event/graph-listener-event';

export class ForceDirectedGraphData {
    links: GraphLink[] 
    nodes: GraphNode[]

    constructor(nodes: GraphNode[], links: GraphLink[]) {
        this.nodes = nodes
        this.links = links
    }
}

export class ForceDirectedGraphOptions {
    height: number
    width: number

    nodeDragBehaviour: any
    color: any

    constructor(height: number, width: number, nodeDragBehaviour?: any, color?: any) {
        this.height = height
        this.width = width
       
        this.nodeDragBehaviour = nodeDragBehaviour ? nodeDragBehaviour : this.defaultDragBehaviour
        this.color = color ? color : this.defaultColor
    }

    defaultDragBehaviour = (simulation: d3.Simulation<GraphNode, GraphLink>): d3.DragBehavior<Element, GraphNode, unknown> => {
        function dragStarted(d: any) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(d: any) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function dragEnded(d: any) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    
        return d3.drag<Element, GraphNode, unknown>()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);
    }

    defaultColor(d: any) {
        return d3.scaleOrdinal(d3.schemeCategory10)(d.group)
    }
}

export class ForceDirectedGraph {
    
    graphElement: HTMLElement
    data: ForceDirectedGraphData

    options: ForceDirectedGraphOptions;

    listener: GraphObserver

    nodes: any
    links: any
    svg: any
    simulation: any

    constructor(data: ForceDirectedGraphData, options: ForceDirectedGraphOptions) {
        this.options = options
        this.data = data
    }

    updateData(newData: ForceDirectedGraphData) {
        console.log('Updating force directed graph')

        const old = new Map(this.nodes.data().map(d => [d.id, d]));

        const nodes = newData.nodes.map(d => Object.assign(old.get(d.id) || {}, d)); // https://observablehq.com/@d3/modifying-a-force-directed-graph
        const links = newData.links.map(d => Object.assign({}, d));

        this.nodes = this.nodes
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", this.options.color)
            .call(this.options.nodeDragBehaviour(this.simulation))
            .on('click', (d: any) => {
                console.log(d.id + ' was clicked!')
                this.notifyListener(d.id, GraphListenerEventKind.OnNodeClick)
            })
        
        this.links = this.links
            .data(links, d => [d.source, d.target])
            .join("line");


        this.simulation.nodes(nodes);
        this.simulation.force("link").links(links);
        this.simulation.alpha(1).restart()
    }

    setListener(listener: GraphObserver) {
        this.listener = listener
    }

    notifyListener(event: number, eventKind: GraphListenerEventKind) {
        var listenerEvent: GraphListenerEvent = {
            eventSelector: event,
            eventKind: eventKind
        }
        this.listener(listenerEvent)
        console.log('Graph notifying listeners: ' + event)
    }

    tickBehaviour() {
        return () => {
            this.links.attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);
    
            this.nodes
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        }
    }

    buildGraphIntoElement(selectedElement: HTMLElement) {
        this.graphElement = selectedElement

        const nodes = this.data.nodes
        const links = this.data.links

        const width = this.options.width
        const height = this.options.height
        const color = this.options.color

        this.simulation = d3
            .forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d: any) => d.id) )
            .force("charge", d3.forceManyBody() )
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", this.tickBehaviour());
  
        var svg = d3.select(selectedElement)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(
                d3.zoom()
                    .on("zoom", function () {
                        svg.attr("transform", d3.event.transform)
                    })
                    .scaleExtent([0.5, 2.0])
            )
            .append("g")
            .attr("transform", "translate(" + 1 + "," + 1 + ")");

        this.svg = svg

        this.links = this.svg
            .append("g")
            .style("stroke", "#ccc")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.weight));

        this.nodes = this.svg
            .append("g")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", color)
            .call(
                this.options.nodeDragBehaviour(this.simulation)
            );

        this.nodes.append("title").text(d => d.id);

        this.nodes.on('click', (d: any) => {
            console.log(d.id + ' was clicked!')
            this.notifyListener(d.id, GraphListenerEventKind.OnNodeClick)
        })
    }
}
