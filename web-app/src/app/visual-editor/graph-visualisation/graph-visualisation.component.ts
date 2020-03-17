import * as d3 from 'd3';

import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-graph-visualisation',
  templateUrl: './graph-visualisation.component.html',
  styleUrls: ['./graph-visualisation.component.css']
})
export class GraphVisualisationComponent implements AfterViewInit {

  @ViewChild("graph") divView: ElementRef

  constructor() {

  }

  nodes = [
    {name: "node1", group: 1},
    {name: "node2", group: 2},
    {name: "node3", group: 2},
    {name: "node4", group: 3}
  ]
  
  links = [
    {source: 2, target: 1, weight: 1},
    {source: 0, target: 2, weight: 3}
  ]

  ngAfterViewInit(): void {
    
  }

  drawGraph() {
    var graphElement = this.divView.nativeElement as HTMLElement;

    const data = TEST_DATA
    const nodes = data.nodes
    const links = data.links

    const width = 1000
    const height = 1000

    const color = d => d3.scaleOrdinal(d3.schemeCategory10)(d.group)

    const simulation: d3.Simulation<GraphNode, GraphLink> = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(graphElement)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const link = svg.append("g")
      .style("stroke", "#ccc")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.weight));

    var drag = (simulation: any) => {
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

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", color)
      .call(drag(simulation));

    node.append("title").text(d => d.id);

    simulation.on("tick", () => {
      link.attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });
  }
}

class GraphNode implements d3.SimulationNodeDatum {
  index?: number; 
  x?: number; 
  y?: number; 
  vx?: number; 
  vy?: number;

  id: string
  group: number
}

class GraphLink implements d3.SimulationLinkDatum<GraphNode> {
  source: number
  target: number

  weight: number
}

const TEST_DATA: { nodes: GraphNode[], links: GraphLink[] } = {
  nodes: [
    {id: "Toussaint", group: 5},
    {id: "Child1", group: 10},
    {id: "Child2", group: 10},
    {id: "Brujon", group: 4},
    {id: "Mme.Hucheloup", group: 8}
  ],
  links: [
    { source: 0, target:  4, weight: 1}
  ]
}
