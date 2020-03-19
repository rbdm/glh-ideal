import * as mathjs from 'mathjs';


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

    get(i: number, j: number) {
      return this.innerMatrix.subset(mathjs.index([i], [j]))
    }

    addDisconnectedVertex() {
      this.length++
      this.innerMatrix.resize([this.length, this.length])
    }

    addDirectedEdge(sourceNode: number, destinationNode: number, weight: number) {
        var dimensions: number[] = this.innerMatrix.size() 
        var nodes: number = dimensions[0] // first argument in dimensions is number of nodes in the graph
        
        while ((sourceNode >= nodes) || (destinationNode >= nodes)) {
          nodes += 1
          this.innerMatrix.resize([nodes,  nodes]) // increase row and column by one
        }
        this.length = nodes // update size for nodes

        var index = mathjs.index([sourceNode], [destinationNode]) 
        this.innerMatrix.subset(index, weight) // set the element at this index to the given weight
    }    

    intoNodesAndLinks() {
      const size: number = this.length

      var nodes = []
      for (var i = 0; i < size; i++) {
        nodes.push({
          id: i,
          group: 0
        })
      }
  
      var links = []
      this.forEach((value: number, index: number[], _matrix: any) => {
        if (value != 0) {
          links.push({
            source: index[0], target: index[1], weight: value
          })
        }
      })
      
      return { nodes: nodes, links: links }
    }
}
