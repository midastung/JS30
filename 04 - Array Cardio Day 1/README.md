# JS30-Day4-Array Cardio 1
介紹了幾個陣列的操作練習題目

## 以下內容是實作中的重點整理:
由於大部分的練習都做的出來，所以只針對沒解出來的一題做紀錄:
 
### 第3, 5題:
Array.prototype.sort()，對一個陣列的所有元素進行排序，並回傳此陣列。
而WesBos是利用
```Javascript
function compare(a, b) {
  if (在某排序標準下 a 大於 b) {
    return -1;
  }
}
```
如果 compareFunction 被應用，陣列元素們將根據比較函式之回傳值來排序。如果 a 和 b 為被比較之兩元素，則：

* 若 compareFunction(a, b) 的回傳值小於 0，則會把 a 排在小於 b 之索引的位置，即 a 排在 b 前面。    
* 若 compareFunction(a, b) 的回傳值大於 0，則會把 b 排在小於 a 之索引的位置，即 b 排在 a 前面。  
* compareFunction(a, b) 在給予一組特定元素 a 及 b 為此函數之兩引數時必須總是回傳相同的值。若回傳值不一致，排序順序則為 undefined。
我們另外可以用

```Javascript
function compareNumbers(a, b) {
  return b - a;
}
//降冪的方式排列
```

### 第 8 題:
原本以為 reduce 的第一個參數只能設定數字的累加值，沒想到裡面還能放空物件，這是自己以前沒注意到的細節
```javascript
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck'];

// 設定第一個參數為空物件
const instancesNum = data.reduce((obj, item) => {
  // 若 obj 物件沒有 item 屬性(item 為 data 內的各元素)，就增加該屬性，並設定值為 0
  if(!obj[item]) {
    obj[item] = 0;
  }
  // 再次碰到該屬性的話，值+1
  obj[item]++;
  return obj;
}, {})
console.log(instancesNum);
```

印出的結果:

![](https://i.imgur.com/mmmwSEz.png)
