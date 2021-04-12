# 05 - Flex Panel Gallery
點擊任意一張圖片，圖片展開，同時從圖片上下兩方分別移入文字。點擊已經展開的圖片後，圖片被壓縮，同時該圖片上下兩端的文字被擠走。

## 以下重點整理:

CSS 在這個過程中佔了重點，運用 `flex` 可以使各個元素按一定比例佔據頁面。在調試的時候，可以把邊框顯示出來方便查看效果。 （`border: 1px solid #f00;`）

1. 將 `.panels` 設置為 `display:flex`
2. 設定每個子 `panel` 的 `flex` 值為 `1`
3. 針對每個子 `panel`，設為 `display:flex`，設置其 flex 主軸方向
4. 控制 `.panle` 的子元素 `<p>` 中的文字垂直、水平居中（單獨看每個 panel，其中的文字也可以用 flex 的思路來使其三等分後居中）
   1. 設置為 `display:flex`
   2. 設置 `flex` 值
   2. 設置其子元素的佈局方式：垂直水平居中（沿主軸、側軸居中）
4. 設定點擊圖片後文字移動的樣式
5. 設定點擊圖片展開後的圖片的 `flex` 值

## JavaScript 
```Javascript
<script>
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
      panel.addEventListener('click', ()=>{
        panel.classList.toggle('open');      
      })
    })

    panels.forEach(panel => {
      panel.addEventListener('transitionend', (e)=>{
       if(e.propertyName.includes('flex-grow')){
         panel.classList.toggle('open-active');
       }
      })
    })
  </script>
```
