import * as d3 from 'd3';
import { ElementRef } from '@angular/core';

class GraphNode implements d3.SimulationNodeDatum {
    index?: number; 
    x?: number; 
    y?: number; 
    vx?: number; 
    vy?: number;
  
    id: number
  }
  
class GraphLink implements d3.SimulationLinkDatum<GraphNode> {
    source: number
    target: number

    weight: number
}

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

    listener: any

    constructor(data: ForceDirectedGraphData, options: ForceDirectedGraphOptions) {
        this.options = options
        this.data = data
    }

    setListener(listener: any) {
        this.listener = listener
    }

    notifyListener(event: number) {
        console.log('Graph notifying listeners: ' + event)
        this.listener.notifyListener(event)
    }

    tickBehaviour(node: any, link: any) {
        return () => {
            link.attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);
    
            node.attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);
        }
    }

    buildGraphIntoElement(viewChild: ElementRef) {
        const selectedElement = viewChild.nativeElement as HTMLElement

        const nodes = this.data.nodes
        const links = this.data.links

        const width = this.options.width
        const height = this.options.height
        const color = this.options.color

        const simulation: d3.Simulation<GraphNode, GraphLink> = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d: any) => d.id) )
            .force("charge", d3.forceManyBody() )
            .force("center", d3.forceCenter(width / 2, height / 2));
  
        const svg = d3.select(selectedElement)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const link = svg.append("g")
            .style("stroke", "#ccc")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.weight));

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", color)
            .call(
                this.options.nodeDragBehaviour(simulation)
            );

        node.append("title").text(d => d.id);

        node.on('click', (d: any) => {
            console.log(d.id + ' was clicked!')
            this.notifyListener(d.id)
        })

        const ticked = this.tickBehaviour(node, link)

        simulation.on('tick', ticked)
    }
}
