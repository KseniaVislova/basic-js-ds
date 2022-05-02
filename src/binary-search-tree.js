const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const addData = (node, data) => {
      if (!node) {
        return new Node(data);  
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addData(node.left, data);
      } else {
        node.right = addData(node.right, data)
      }

      return node;
    }

    this.rootNode = addData(this.rootNode, data);
  }

  has(data) {
    const search = (node, data) => {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      if (node.data > data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }

    return search(this.rootNode, data)
  }

  find(data) {
    const search = (node, data) => {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (node.data > data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }

    return search(this.rootNode, data)
  }

  remove(data) {
    const deleteNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (node.data > data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = deleteNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;

        while (minRight.left) {
          minRight = minRight.left;
        }

        node.data = minRight.data;
        node.right = deleteNode(node.right, minRight.data);

        return node;
      }
    }

    this.rootNode = deleteNode(this.rootNode, data);
  }

  min() {
    let node = this.rootNode;

    if (!node) {
      return null;
    }

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    let node = this.rootNode;

    if (!node) {
      return null;
    }

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};