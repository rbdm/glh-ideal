import * as mathjs from 'mathjs';
import { GraphNode, GraphLink } from '../../graph/graph-types';
import { LegalLinkData, LegalObjectLink } from '../../legal-object/legal-object';

// A graph can be represented by an adjacency matrix.
// 
// If there is a graph with 10 nodes, then there is a 10x10 matrix.
//
// Consider a directed, weighted graph G(V, E) with 3 nodes, the matrix would be: 
//
//      1   2   3
//  1           1
//  2   6   
//  3   2   5    
//
// We interpret this as an edge going from node 1 to node 3 with weight one. So:
//  E(1,3) = 1
//  E(2,1) = 6
//  E(3,1) = 2
//  E(3,2) =5
//
// There are more efficienct structures for sparse graphs, but these can be implemented later. 
// 
// https://mathworld.wolfram.com/AdjacencyMatrix.html

export class AdjacencyMatrix {
    private innerMatrix: mathjs.Matrix

    length: number

    constructor() {
      this.innerMatrix = mathjs.matrix()
      this.length = 0
    }

    forEach(callback: any) {
      this.innerMatrix.forEach(callback)
    }

    get(i: number, j: number): any {
      return this.innerMatrix.subset(mathjs.index(i, j))
    }

    addDisconnectedVertex() {
      this.length++
      this.innerMatrix.resize([this.length, this.length])
    }

    addDirectedEdge(sourceNode: number, destinationNode: number, linkData: LegalObjectLink<LegalLinkData>) {
      if ((sourceNode < this.length) && (destinationNode < this.length)) {
        var index = mathjs.index([sourceNode], [destinationNode]) 
        this.innerMatrix.subset(index, linkData) // set the element at this index to the given weight
      } else {
        throw Error("SourceNode or DestinationNode index is out of matrix")
      }
    }    

    getNodes(): GraphNode[] {
      var nodes = []
      for (var i = 0; i < this.length; i++) {
        nodes.push({
          id: i,
          group: 0
        })
      }
      return nodes
    }

    getLinks(): GraphLink[] {
      var weights: GraphLink[] = []

      this.forEach((value: number, index: number[], _matrix: any) => {
        if (value != 0) {
          weights.push({
            source: index[0], target: index[1], data: value, weight: 1
          })
        }
      })
      return weights
    }
}
