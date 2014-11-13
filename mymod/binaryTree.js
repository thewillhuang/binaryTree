/*jshint node: true*/
'use strict';
var Node = function(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
};

Node.prototype.show = function() {
  return this.data;
};

var inOrder = function(node) {
  if (node !== null) {
    inOrder(node.left);
    console.log(node.show() + ' ');
    inOrder(node.right);
  }
};

var preOrder = function(node) {
  if (node !== null) {
    console.log(node.show() + ' ');
    inOrder(node.left);
    inOrder(node.right);
  }
};

var postOrder = function(node) {
  if (node !== null) {
    inOrder(node.left);
    inOrder(node.right);
    console.log(node.show() + ' ');
  }
};

var countBst = function(node) {
  var count = 0;
  var inOrder = function(node) {
    if (node !== null) {
      inOrder(node.left);
      count++;
      inOrder(node.right);
    }
  };
  inOrder(node);
  return count;
};

var BST = function() {
  this.root = null;
};

//5,6,
BST.prototype.insert = function(data) {
  var n = new Node(data, null, null);
  if (this.root === null) {
    this.root = n;
  } else {
    var current = this.root;
    var parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current === null) {
          parent.left = n;
          break;
        }
      } else {
        current = current.right;
        if (current === null) {
          parent.right = n;
          break;
        }
      }
    }
  }
};

BST.prototype.getMin = function(node) {
  var current = node || this.root;
  var parent = current;
  while (current.left !== null) {
    current = current.left;
  }
  if (current.data < parent.data) {
    return current;
  } else return parent;
};

BST.prototype.getMax = function(node) {
  var current = node || this.root;
  var parent = current;
  while (current.right !== null) {
    current = current.right;
  }
  if (current.data > parent.data) {
    return current;
  } else return parent;
};

BST.prototype.findData = function(data) {
  var current = this.root;
  var parent = current;
  while (current.data !== data) {
    if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
    if (current === null) {
      return null;
    }
  }
  return current;
};

BST.prototype.removeData = function(data) {
  var current = this.root;
  var parent = current;
  while (current.data !== data) {
    if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
    if (current === null) {
      return null;
    }
  }
  if (current.data === data) {
    console.log('parent of the min or max', parent);
    if (parent.left.data === data) {
      parent.left = null;
    } else {
      parent.right = null;
    }
    console.log('current', current);
    console.log('parent', parent);
    console.log('this.root', this.root);
  }
};

BST.prototype.removeNode = function(data) {
  console.log('removeing Node', data);
  var current = this.root;
  var parent;
  while (current.data !== data) {
    if (data < current.data) {
      parent = current;
      current = current.left;
    } else {
      parent = current;
      current = current.right;
    }
    if (current === null) {
      return null;
    }
  }
  if (!current.left && !current.right) { //case 1 no child
    console.log('no child');
    this.root = null;
  } else if (current.right === null) { //case 2 one child
    console.log('1 child');
    this.root = current.left;
  } else {
    this.root = current.right;
  }
  //case 3 two child (min or max)
  if (current.left && current.right) {
    console.log(2 + 'child');
    var temp = this.getMin(current.right);
    console.log('get Min in temp.current.right', temp);
    console.log('current', current);
    current.data = temp.data;
    console.log('current with data replaced', current);
    //remove link to min
    this.removeData(temp.data);
  }
};

var nums = new BST();
nums.insert(5);
nums.insert(2);
nums.insert(12);
nums.insert(-4);
nums.insert(3);
nums.insert(9);
nums.insert(21);
nums.insert(19);
nums.insert(25);

// console.log('Inorder traversal: ');
// inOrder(nums.root);

console.log('Preorder traversal: ');
console.log(nums);
preOrder(nums.root);

// console.log('Postorder traversal: ');
// postOrder(nums.root);

// console.log('print the whole tree');
// console.log(nums);
// console.log('getting min');
// console.log(nums.getMin());
// console.log('getting max');
// console.log(nums.getMax());
// console.log('counting');
// console.log(countBst(nums.root));

nums.removeNode(12);

console.log('-------------------------------');
preOrder(nums.root);
console.log('------------------------');
inOrder(nums.root);
console.log('------------------------');
postOrder(nums.root);

console.log(nums);
