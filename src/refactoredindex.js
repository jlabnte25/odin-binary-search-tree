#!/usr/bin/env node

const { call } = require("file-loader");

// Refactored
class Tree {
  constructor() {
    this.root = null;
  }

  addValue = (val) => {
    var n = new Node(val);
    if (this.root == null) {
      this.root = n;
    } else {
      this.root.addNode(n);
    }
  };

  buildTree = (array) => {
    let sortedArray = array.sort((a, b) => a - b);
    let noDuplicatesArray = this.removeDuplicates(sortedArray);

    noDuplicatesArray.forEach((element) => {
      this.addValue(element);
    });

    console.log("Binary Search Tree Structure:");
    prettyPrint(this.root);
  };

  removeDuplicates = (arr) => {
    if (arr.length === 0) return [];

    let i = 0;
    for (let j = 1; j < arr.length; j++) {
      if (arr[i] !== arr[j]) {
        i++;
        arr[i] = arr[j];
      }
    }

    return arr.slice(0, i + 1);
  };

  insert = (val) => {
    this.addValue(val);
    console.log("Binary Search Tree Structure:");
    prettyPrint(this.root);
  };

  find = (val) => {
    return this.root ? this.root.find(val) : val;
  };

  levelOrder = (callback) => {
    if (this.root === null || typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(currentNode.value);

      if (typeof callback === "function") {
        callback(currentNode);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return result;
  };

  inOrder = (callback) => {
    if (this.root === null || typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    let result = [];

    const traverse = (node) => {
      if (node === null) return; // break point

      traverse(node.left);

      callback(node);
      result.push(node.value);

      traverse(node.right);
    };
    traverse(this.root);

    return result;
  };

  preOrder = (callback) => {
    if (this.root === null || typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    let result = [];

    const traverse = (node) => {
      if (node === null) return; // break point

      callback(node);
      result.push(node.value);

      traverse(node.left);

      traverse(node.right);
    };
    traverse(this.root);

    return result;
  };

  postOrder = (callback) => {
    if (this.root === null || typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    let result = [];

    const traverse = (node) => {
      if (node === null) return; // break point

      traverse(node.left);

      traverse(node.right);

      callback(node);
      result.push(node.value);
    };
    traverse(this.root);

    return result;
  };

  height = (node) => {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  depth = (node, x) => {
    if (node == null) return -1;

    if (node.value == x) return 0;

    const leftDepth = this.depth(node.left, x);
    const rightDepth = this.depth(node.right, x);

    if (leftDepth >= 0) return leftDepth + 1;
    if (rightDepth >= 0) return rightDepth + 1;

    return -1;
  };

  isBalanced = (node) => {
    if (node === null) {
      return true;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  };

  reBalance = (callback) => {
    const sortedNodes = this.inOrder(callback);

    function buildBalancedTree(nodes) {
      if (nodes.length === 0) return null;

      const midIndex = Math.floor(nodes.length / 2);
      const nodeValue = nodes[midIndex];
      const root = new Node(nodeValue);
      root.left = buildBalancedTree(nodes.slice(0, midIndex));
      root.right = buildBalancedTree(nodes.slice(midIndex + 1));

      return root;
    }

    this.root = buildBalancedTree(sortedNodes);
  };

  deleteNode = (val) => {
    const deleteNodeHelper = (node, val) => {
      if (!node) return null;

      if (val < node.value) {
        node.left = deleteNodeHelper(node.left, val);
      } else if (val > node.value) {
        node.right = deleteNodeHelper(node.right, val);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let minNode = node.right;
        while (minNode.left) minNode = minNode.left;
        node.value = minNode.value;
        node.right = deleteNodeHelper(node.right, minNode.value);
      }

      return node;
    };

    this.root = deleteNodeHelper(this.root, val);
  };
}

class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }

  addNode = (n) => {
    let direction = n.value < this.value ? "left" : "right";

    if (this[direction] === null) {
      this[direction] = n;
    } else {
      this[direction].addNode(n);
    }
  };

  find = (val) => {
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

// Create and build the tree
let newTree = new Tree();
newTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// Test insert function
newTree.insert(20);
newTree.insert(2);

function collectNode(node) {}

// Test traversal methods
console.log("Level Order:", newTree.levelOrder(collectNode));
console.log("In Order:", newTree.inOrder(collectNode));
console.log("Pre Order:", newTree.preOrder(collectNode));
console.log("Post Order:", newTree.postOrder(collectNode));

// Test height
let someNode = newTree.root.right;
console.log("Height", newTree.height(someNode));

// Test Depth
console.log("Depth", newTree.depth(newTree.root, 20));

// Balanced?
console.log(newTree.isBalanced(newTree.root));

// Rebalance
console.log("Tree Rebalanced", newTree.reBalance(collectNode));
prettyPrint(newTree.root);

//DeleteNode
console.log("Delete Node", newTree.deleteNode(8));
prettyPrint(newTree.root);
