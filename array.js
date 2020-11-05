const Memory = require('./memory');
const memory = new Memory()

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this.capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }
}

Array.SIZE_RATIO = 3;

// #1, #2, #3, #4
/* 
function main() {
  let arr = new Array;

  arr.push(3);
  console.log(arr);

  arr.push(5);
  arr.push(10);
  arr.push(19);
  console.log(arr);

  arr.pop();
  arr.pop();
  arr.pop();
  console.log(arr);

  arr.push('Tauhida');
  console.log(arr);
}
*/
// main()


// #5
/*
function replace(str) {
  let newStr = new Array()
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      newStr.push('%20')
    } else {
      newStr.push(str[i])
    }
  }

  let result = ''
  for (let j = 0; j < newStr.length; j++) {
    result += newStr.get(j)
  }
  return result
}
*/

// #5 alt
/*
function replace(string) {
  return (string.split(' ').join('%20'));
}
*/
// replace('www.thinkful.com /tauh ida parv een')

// #6
/*
function filter(arr) {
  let newArr = []
  for (let item of arr) {
    if (item < 5) {
      continue
    } else {
      newArr.push(item)
    }
  }
  return newArr
}
*/
// filter([4, 6, -3, 5, -2, 1])

// #7
/*
let result = []
function maxSum(arr) {
  let sum = 0
  if (arr.length < 2) {
    return arr
  }
  sum = arr.reduce((a, b) => a + b, 0)
  if (!result.includes(sum)) {
    result.push(sum)
  }
  for (let i = 0; i < arr.length; i++) {
    maxSum(arr.slice(i, arr.length-1))
  }
  return Math.max(...result)
}
*/
// maxSum([4, 6, -3, 5, -2, 1]) // 12

// #8
/*
function merge(arr1, arr2) {
  for (let i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i])
  }
  return arr1.sort((a, b) => {return a-b})
}
*/
//merge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10])

// #9
/*
function removeChar(str, char){
  let result = ''
  for(let letter of str){
    if(char.includes(letter)){
      result += ''
    } else {
      result += letter
    }
  }
  return result
}
*/
//removeChar('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou')

// #10
/*
function products(arr){
  product = arr.reduce((a, b) => a * b, 1)
  let result = []
  for (let num of arr){
    result.push(product/num)
  }
  return result
}
*/
// products([1, 3, 9, 4]) // [108, 36, 12, 27]

// #11
/*
function twoDArray(arr) {
  let output = []
  let result = []
  for (let j = 0; j < arr[0].length; j++) {
    result.push(1)
  }
  for (let i = 0; i < arr.length; i++) {
    for (let k = 0; k < arr[i].length; k++) {
      if(arr[i][k]===0){
        result[k] = 0
      }
    }
    output.push(result)
  }
  return output
}
*/
/* twoDArray([
  [1, 0, 1, 1, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1]
])
*/

// #12

function rotation(str, answer) {
  let newWord = str
  for (let i = 0; i < str.length; i++) {
    newWord = newWord.substring(1) + newWord[0]
    if (newWord === answer) {
      return true
    }
  }
  return false
}

console.log(rotation('azonam', 'amazon'))
