import * as d3 from 'd3'

export enum GraphTypes {
    ForceDirectedGraph
}

export class GraphNode implements d3.SimulationNodeDatum {
    index?: number; 
    x?: number; 
    y?: number; 
    vx?: number; 
    vy?: number;
  
    id: number
    group: number
}
  
export class GraphLink implements d3.SimulationLinkDatum<GraphNode> {
    source: number
    target: number

    weight: number
}
