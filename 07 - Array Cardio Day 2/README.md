# JS30-Day7-Array Cardio 2
介紹了幾個陣列的操作練習題目

## 以下內容是實作中的重點整理:
### 1. Array.prototype.some()
方法會透過給定函式、測試陣列中是否至少有一個元素，通過該函式所實作的測試。這方法回傳的是布林值。  
```javascript
const array = [1, 2, 3, 4, 5];
// checks whether an element is even
const even = (element) => element % 2 === 0;
console.log(array.some(even));
// expected output: true
```
### 2. Array.prototype.every()
方法會測試陣列中的所有元素是否都通過了由給定之函式所實作的測試。
```javascript
const isBelowThreshold = (currentValue) => currentValue < 40;
const array1 = [1, 30, 39, 29, 10, 13];
console.log(array1.every(isBelowThreshold));
// expected output: true
```
### 3. slice, splice, split分別  
* splice複製開始與結束點（結束點不算）中的內容  
1. 對象：可操控Array及String，
2. 用法：
    1. begin 為開始的索引值，負數代表從後面開始算起，-1為倒數第一個元素。
    2. end 為結束的索引值，沒有填寫時則得到arr中的所有元素。
```Javascript
//arr.slice()
// arr.slice(begin)
// arr.slice(begin, end)

var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var fruit1 = fruits.slice(1);
var fruit2 = fruits.slice(1, 3);
var fruit3 = fruits.slice(-3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// fruit1 contains ['Orange', 'Lemon', 'Apple', 'Mango']
// fruit2 contains ['Orange', 'Lemon']
// fruit3 contains ["Lemon", "Apple", "Mango"]
```

* slice從Array中添加/刪除項目，回傳被刪除的項目。  
1. 對象：可操控Array
2. 用法：
    1. start 增加/刪除項目的位置，負數代表從後方算起。
    2. deleteCount 刪除的個數，如為0則不會刪除。
    3. item… 添加的新項目。
```Javascript
// array.splice(start)
// array.splice(start, deleteCount)
// array.splice(start, deleteCount, item1, item2, ...)

var myFish1 = ['angel', 'clown', 'drum', 'sturgeon'];
var removed1 = myFish1.splice(2, 1, 'trumpet');

// myFish1 is ["angel", "clown", "trumpet", "sturgeon"]
// removed1 is ["drum"]

var myFish2 = ['angel', 'clown', 'drum', 'sturgeon'];
var removed2 = myFish2.splice(-2, 2, 'trumpet');

// myFish2 is ["angel", "clown", "trumpet"]
// removed2 is ["drum", "sturgeon"]
```

* split 分割字串成字串組  
1. 對象：可操控String
2. 用法：
    1. separator 字串符或正則表達式，從該參數指定的地方分割stringObject。
    2. howmany 返回值的最大長度，超過該長度則不顯示。
    3. 在此實作中，作者綁定了兩個事件: change & keyup 去搜尋資料，但其實只要使用 input 事件就能達到一樣的效果
```Javascript
// stringObject.split(separator,howmany)
var str="How are you ?"
var splits1 = str.split(" ");
var splits2 = str.split("");
var splits3 = str.split(" ",3);

//splits1 contains ["How", "are", "you", "?"]
//splits2 contains ["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "?"]
//splits3 contains ["How", "are", "you"]
```