#!/usr/bin/env node

var tree;

function Tree() {
  this.root = null;
}

Tree.prototype.addValue = function (val) {
  var n = new Node(val);
  if (this.root == null) {
    this.root = n;
  } else {
    this.root.addNode(n);
  }
};

Node.prototype.addNode = function (n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
    } else {
      this.left.addNode(n);
    }
  } else {
    if (this.right == null) {
      this.right = n;
    } else {
      this.right.addNode(n);
    }
  }
};

function Node(val) {
  this.value = val; // The value of the node
  this.left = null; // Left child (initially null)
  this.right = null; // Right child (initially null)
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "│   " : "    "}`, true); // Print left child first
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "    " : "│   "}`, false); // Print right child later
  }
};

function buildTree(array) {
  // Sort the array
  let sortedArray = array.sort((a, b) => a - b);
  // Remove duplicates
  let noDuplicatesArray = removeDuplicates(sortedArray);
  // Initialize new tree
  tree = new Tree();
  // Add each value to the tree
  noDuplicatesArray.forEach((element) => {
    tree.addValue(element);
  });

  console.log("Binary Search Tree Structure:");
  prettyPrint(tree.root);
}

// Remove duplicates from an array
function removeDuplicates(arr) {
  if (arr.length === 0) return [];

  let i = 0; // Pointer to track the position of unique elements
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j]; // Move unique element forward
    }
  }
  // Return the subarray containing only unique elements
  return arr.slice(0, i + 1);
}

// Example usage
buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// function to add value to the tree
Tree.prototype.insert = function (val) {
  this.addValue(val);
  console.log("Binary Search Tree Structure:");
  prettyPrint(tree.root);
};

tree.insert(20);
tree.insert(2);

Node.prototype.addNode = function (n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
    } else {
      this.left.addNode(n);
    }
  } else {
    if (this.right == null) {
      this.right = n;
    } else {
      this.right.addNode(n);
    }
  }
};

Tree.prototype.find = function (val) {
  return this.root ? this.root.find(val) : null;
};

// write a find(value) function that returns the node with the given value;
Node.prototype.find = function (val) {
  if (this.value === val) {
    return this;
  }

  if (val < this.value && this.left) {
    return this.left.find(val);
  }

  if (val > this.value && this.right) {
    return this.right.find(val);
  }

  return console.log("this value does not exist");
};

// A tree traversal function that accepts a callback

// levelOrder(callback)
Tree.prototype.levelOrder = function (callback) {
  if (this.root === null || typeof callback !== "function") {
    throw new Error("Callback function is required");
  }

  const result = [];
  const queue = [this.root];

  return new Promise((resolve, reject) => {
    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode, result);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    resolve(result);
  });
};

// In Order Traversal
Tree.prototype.inOrder = function (callback, node = this.root, result = []) {
  if (node === null || typeof callback !== "function") {
    throw new Error("Callback function is required");
  }

  return new Promise((resolve, reject) => {
    if (node.left) {
      this.inOrder(callback, node.left, result);
    }

    callback(node, result);

    if (node.right) {
      this.inOrder(callback, node.right, result);
    }

    resolve(result);
  });
};

// Pre Order Traversal with callback
Tree.prototype.preOrder = function (callback, node = this.root, result = []) {
  if (node === null || typeof callback !== "function") {
    throw new Error("Callback function is required");
  }

  return new Promise((resolve, reject) => {
    callback(node, result);

    if (node.left) {
      this.preOrder(callback, node.left, result);
    }

    if (node.right) {
      this.preOrder(callback, node.right, result);
    }

    resolve(result);
  });
};

// Post Order Traversal with callback
Tree.prototype.postOrder = function (callback, node = this.root, result = []) {
  if (node === null || typeof callback !== "function") {
    throw new Error("Callback function is required");
  }

  return new Promise((resolve, reject) => {
    if (node.left) {
      this.postOrder(callback, node.left, result);
    }

    if (node.right) {
      this.postOrder(callback, node.right, result);
    }

    callback(node, result);

    resolve(result);
  });
};

function collectNode(node, result) {
  result.push(node.value);
}

//Write a height(node) function that returns the given node's height. Height is defined as the number of edges in the longest path from a given node to a leaf node
Tree.prototype.height = function (node) {
  if (node === null) {
    return -1;
  }
  const leftHeight = this.height(node.left);
  const rightHeight = this.height(node.right);

  return Math.max(leftHeight, rightHeight) + 1;
};

Tree.prototype.depth = function (node) {
  // Function to calculate depth from the root node to the given node
  let depthCount = 0;

  function findNodeDepth(currentNode, targetNode) {
    if (currentNode === null) return -1;
    if (currentNode === targetNode) return depthCount;

    if (targetNode.value < currentNode.value) {
      depthCount++;
      return findNodeDepth(currentNode.left, targetNode);
    } else {
      depthCount++;
      return findNodeDepth(currentNode.right, targetNode);
    }
  }

  return findNodeDepth(this.root, node);
};

Tree.prototype.isBalanced = function (node) {
  // Function to check if the tree is balanced
  if (!node) return true;

  function height(node) {
    if (!node) return -1;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return height(node) !== -1;
};

Tree.prototype.rebalance = function (root) {
  // Helper function to perform an in-order traversal and collect nodes
  function inOrderTraversal(node, result = []) {
    if (!node) return result;
    inOrderTraversal(node.left, result);
    result.push(node);
    inOrderTraversal(node.right, result);
    return result;
  }

  // Function to build a balanced tree from a sorted array of nodes
  function buildBalancedTree(nodes) {
    if (nodes.length === 0) return null;
    const midIndex = Math.floor(nodes.length / 2);
    const root = nodes[midIndex];
    root.left = buildBalancedTree(nodes.slice(0, midIndex));
    root.right = buildBalancedTree(nodes.slice(midIndex + 1));

    return root;
  }

  // Step 1: Get all nodes in sorted order using in-order traversal
  const nodes = inOrderTraversal(root);

  // Step 2: Build a balanced tree from the sorted nodes
  return buildBalancedTree(nodes);
};

Tree.prototype.deleteNode = function (val) {
  this.root = deleteNodeHelper(this.root, val);
};

// Helper function to delete a node from the tree
function deleteNodeHelper(node, val) {
  if (node === null) {
    return null;
  }

  // Recursively traverse the tree to find the node to delete
  if (val < node.value) {
    node.left = deleteNodeHelper(node.left, val);
  } else if (val > node.value) {
    node.right = deleteNodeHelper(node.right, val);
  } else {
    // Node to be deleted is found

    // Case 1: Node has no children (leaf node)
    if (node.left === null && node.right === null) {
      return null;
    }

    // Case 2: Node has one child
    if (node.left === null) {
      return node.right; // Return the right child
    } else if (node.right === null) {
      return node.left; // Return the left child
    }

    // Case 3: Node has two children
    // Find the in-order successor (smallest value in the right subtree)
    let minNode = findMinNode(node.right);
    node.value = minNode.value; // Replace the node's value with the in-order successor's value
    node.right = deleteNodeHelper(node.right, minNode.value); // Delete the in-order successor
  }

  return node;
}

// Helper function to find the minimum node in a given subtree
function findMinNode(node) {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}

// Level Order traversal with callback, returns an array
console.log("Level Order:", tree.levelOrder(collectNode));

// In Order traversal with callback, returns an array
console.log("In Order:", tree.inOrder(collectNode));

// Pre Order traversal with callback, returns an array
console.log("Pre Order:", tree.preOrder(collectNode));

// Post Order traversal with callback, returns an array
console.log("Post Order:", tree.postOrder(collectNode));

// Checking if the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced(tree.root));

// Rebalancing the tree if unbalanced
if (!tree.isBalanced(tree.root)) {
  tree.root = tree.rebalance(tree.root);
  console.log("Tree has been rebalanced.");
}

// Printing the tree structure after rebalancing
prettyPrint(tree.root);
