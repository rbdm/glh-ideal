import * as d3 from 'd3'

export enum GraphTypes {
    ForceDirectedGraph
}

export abstract class GraphNode implements d3.SimulationNodeDatum {
    index?: number; 
    x?: number; 
    y?: number; 
    vx?: number; 
    vy?: number;
  
    abstract id: number
    group?: number 
}
  
export abstract class GraphLink implements d3.SimulationLinkDatum<GraphNode> {
    abstract source: number
    abstract target: number

    abstract get weight(): number
    abstract get data(): any
}

export class GraphData {
    links: GraphLink[] 
    nodes: GraphNode[]

    constructor(nodes: GraphNode[], links: GraphLink[]) {
        this.nodes = nodes
        this.links = links
    }
}

export class GraphOptions {
    height: number
    width: number

    nodeDragBehaviour: any
    nodeClickBehaviour: any
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
