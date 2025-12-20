
/* =========================================================
   DFS (Depth First Search)
   - Uses Recursion (Call Stack)
   - Does NOT guarantee shortest path
========================================================= */

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  dfsHelper(startNode, finishNode, grid, visitedNodesInOrder);
  return visitedNodesInOrder;
}

function dfsHelper(node, finishNode, grid, visitedNodesInOrder) {
  if (!node || node.isWall || node.isVisited) return;

  node.isVisited = true;
  visitedNodesInOrder.push(node);

  if (node === finishNode) return 1;

  const neighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.previousNode = node;
    if(dfsHelper(neighbor, finishNode, grid, visitedNodesInOrder))return 1;
  }
}

/* =========================================================
   SHARED HELPER FUNCTIONS
========================================================= */

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);              // up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
  if (col > 0) neighbors.push(grid[row][col - 1]);              // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right

  return neighbors.filter(neighbor => !neighbor.isVisited);
}

/* =========================================================
   SHORTEST PATH BACKTRACKING (WORKS FOR BFS & DFS)
========================================================= */

export function getNodesInShortestPathOrder2(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
