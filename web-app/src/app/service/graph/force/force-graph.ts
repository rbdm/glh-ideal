import * as d3 from 'd3';

import { GraphLink, GraphData, GraphOptions } from '../graph-types';

import { GraphListenerEvent, GraphListenerEventKind } from '../graph-event';
import { Subject, Observable } from 'rxjs';

export class ForceGraph {
    graphElement: HTMLElement | undefined = undefined

    private graphUpdateSubject: Subject<GraphListenerEvent> = new Subject()
    public observable: Observable<GraphListenerEvent> = this.graphUpdateSubject.asObservable()

    nodes: any
    links: any
    svg: any
    simulation: any

    constructor(public data: GraphData | undefined, public options: GraphOptions) {

    }

    private notifySubscribers(machineID: any, eventKind: GraphListenerEventKind) {
        const eventNotification = new GraphListenerEvent(machineID, eventKind)
        this.graphUpdateSubject.next(eventNotification)
    }

    buildGraphIntoElement(selectedElement: HTMLElement) {
        if (!this.data) {
            throw Error('D3.js graph has not been loaded with any data')
        }

        this.graphElement = selectedElement

        const nodes = this.data.nodes
        const links = this.data.links

        const width = this.options.width
        const height = this.options.height

        this.simulation = d3
            .forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance((d: GraphLink) => 60 + d.weight/2))
            .force("charge", d3.forceManyBody() )
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", this.tickBehaviour());
  
        this.initSVG()
        this.initLinks(links)
        this.initNodes(nodes)

    }

    tickBehaviour() {
        return () => {
            this.nodes
                .attr("cx", (d: any) => { return d.x = Math.max(5, Math.min(this.options.width - 5, d.x)); })
                .attr("cy", (d: any) => { return d.y = Math.max(5, Math.min(this.options.height - 5, d.y)); });
    
            this.links
                .attr("x1", (d: any) => { return d.source.x; })
                .attr("y1", (d: any) => { return d.source.y; })
                .attr("x2", (d: any) => { return d.target.x; })
                .attr("y2", (d: any) => { return d.target.y; });
        }
    }

    initNodes(nodes: any) {
        var nodeRadius: number = 5

        this.nodes = this.svg
            .append("g")
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", this.options.color)
            .call(this.options.nodeDragBehaviour(this.simulation))
            .on('click', (d: any) => {
                const currentTarget = d3.event.currentTarget 
                const color = d3.select(currentTarget).attr("fill") == "orange" ? this.options.color : "orange"
                d3.select(d3.event.currentTarget).attr("fill", color)
                this.notifySubscribers(d.id, GraphListenerEventKind.OnNodeClick)
            })
            .on('mouseenter', () => {
                d3.select(d3.event.currentTarget).attr("r", nodeRadius + 2)
            })
            .on('mouseleave', () => {
                d3.select(d3.event.currentTarget).attr("r", nodeRadius)
            })
    }

    initLinks(links: any) {
        this.links = this.svg
            .append("g")
            .style("stroke", "#ccc")
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", (d: GraphLink) => d.weight*2)
            .on("click", (d: GraphLink) => {
                const currentTarget = d3.event.currentTarget 
                const color = d3.select(currentTarget).attr("stroke") == "orange" ? this.options.color : "orange"
                d3.select(d3.event.currentTarget).attr("stroke", color)
                this.notifySubscribers({source: d.source, destination:  d.target}, GraphListenerEventKind.OnLinkClick)
            });
    }

    initSVG() {
        if (!this.graphElement) {
            throw Error('Graph element selected for D3.js is undefined.')
        }

        var svg = d3.select(this.graphElement)
            .append("svg")
            .attr("width", this.options.width)
            .attr("height", this.options.height)
            .append("g")
            .attr("transform", "translate(" + 1 + "," + 1 + ")");
        this.svg = svg
    }

    updateData(newData: GraphData) {
        const old = new Map(
            this.nodes
                .data()
                .map((d: any) => [d.id, d])
        );

        const nodes = newData.nodes.map(d => Object.assign(old.get(d.id) || {}, d)); // https://observablehq.com/@d3/modifying-a-force-directed-graph
        const links = newData.links.map(d => Object.assign({}, d));

        this.refreshLinks(links)
        this.refreshNodes(nodes)

        this.simulation.nodes(nodes);
        this.simulation.force("link").links(links);
        this.simulation.alpha(1).restart()
    }

    refreshNodes(nodes: any) {
        var nodeRadius: number = 7

        this.nodes = this.nodes
            .data(nodes)
            .join("circle")
            .attr("r", nodeRadius)
            .attr("fill", this.options.color)
            .call(this.options.nodeDragBehaviour(this.simulation))
            .on('click', (d: any) => {
                const currentTarget = d3.event.currentTarget 
                const color = d3.select(currentTarget).attr("fill") == "orange" ? this.options.color : "orange"
                d3.select(d3.event.currentTarget).attr("fill", color)
                this.notifySubscribers(d.id, GraphListenerEventKind.OnNodeClick)
            })
            .on('mouseenter', () => {
                d3.select(d3.event.currentTarget).attr("r", nodeRadius + 2)
            })
            .on('mouseleave', () => {
                d3.select(d3.event.currentTarget).attr("r", nodeRadius)
            })
    }

    refreshLinks(links: any) {
        this.links = this.links
            .data(links, (d: GraphLink) => [d.source, d.target])
            .join("line")
            .attr("marker-end", "url(#triangle)")
            .on('mouseenter', (d: GraphLink) => {
                d3.select(d3.event.currentTarget).attr("stroke-width", () => d.weight * 4)
            })
            .on('mouseleave', (d: GraphLink) => {
                d3.select(d3.event.currentTarget).attr("stroke-width", () => d.weight * 2)
            })
            .on("click", (d: GraphLink) => {
                const currentTarget = d3.event.currentTarget 
                const color = d3.select(currentTarget).attr("stroke") == "orange" ? this.options.color : "orange"
                d3.select(d3.event.currentTarget).attr("stroke", color)
                this.notifySubscribers({source: d.source, destination:  d.target}, GraphListenerEventKind.OnLinkClick)
            });
    }
}
