# JS30-Day6-Ajax Type Ahead
輸入特定的城市名片段後會出現 json 檔中符合該名字的城市

## 以下內容是實作中的重點整理:
### 1. (複習)正則表達式
常見的使用方式有兩種:
1. 直接用兩個斜線代表
```javascript
const regex = /\w/gi;
```
2. 建立 RegExp 物件，本實作採用此寫法
```javascript
const regex = new RegExp('\\w+', 'gi');
```

### 2. change 監聽事件
這邊要補充的是 change 和 input 事件的比較:
* change: 在`<input>`，`<select>`，和`<textarea>`內的值改變時且不再是 focus 狀態時觸發
* input:  `<input>`，`<select>`，和`<textarea>`內的值改變時就會觸發

在此實作中，作者綁定了兩個事件: change & keyup 去搜尋資料，但其實只要使用 input 事件就能達到一樣的效果

### 3. (複習)replace 函式
將一個 str 字串的某個部分用新的字串取代
語法:
```javascript
str.replace(regexp|substr, newSubstr|function)
```

### 4. 小細節補充
* fetch 的用途是在串接外部json檔，並回傳promise
```javascript
//使用 Fetch 發送請求 ( request )
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

* filter() 方法會建立一個經指定之函式運算後，由原陣列中通過該函式檢驗之元素所構成的新陣列。
```javascript
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

* map() 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。  
map 會建立新的陣列，如果在不想建立新陣列時使用該方法，就會變成反模式（anti-pattern）：這種情況下，要使用 forEach
```javascript
const array1 = [1, 4, 9, 16];
// pass a function to map
const map1 = array1.map(x => x * 2);
console.log(map1);
// expected output: Array [2, 8, 18, 32]
```