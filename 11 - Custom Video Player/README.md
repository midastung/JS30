# 11 - Custom Video Player
>首次上傳：2017/07/23

![](https://guahsu.io/2017/07/JavaScript30-11-Custom-Video-Player/demo11.png)

## **主題**
介紹如何使用HTML5的video tag來完成各種播放器功能，  
播放/暫停、快進/快退、音量控制、速率控制等...

[[BLOG]](https://guahsu.io/2017/07/JavaScript30-11-Custom-Video-Player/)  
[[DEMO]](https://guahsu.io/JavaScript30/11_Custom-Video-Player/index-GuaHsu.html)

## **步驟**
### Step1. 基本設定
作者已經有將基礎的css及html tag設定好，僅需針對各項目的功能開始進行js撰寫即可，  
但這邊我有將背景色調調整，並把對應icon改用font-awesome來顯示（原本是文字符號）。
>由於寫到最後已經很多寫法跟原作者的方法不太一樣，所以接著各功能會再稍微備註為何這麼寫。

### Step2. 播放/暫停按鈕
為了在整個播放器範圍及點擊播放按鈕時能播放/暫停，  
先針對這兩個元素做`addEventListener`，  
並在`togglePlay()`中使影片產生對應動作＆更換圖示，
比較特別的是使用了`video[method]`的寫法，來直接操作video的屬性，
直接用影片是否已暫停`paused`來做判斷。
````javascript
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
 const icon = video.paused ? '►' : '❚ ❚';
  toggle.innerHTML = icon;
  video[method]();
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
````
>原本是將圖標更換＆影片動作分開寫，我改成寫一起。

### Step3. 音量/速率操作
在HTML中已經定義好對應的`input-range`標籤，
在這裡只需要做監聽並取屬性值來操作就好了！
````html
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">Ï
````
在javascript的部分，ranges是透過`querySelectorAll`來取得的，
所以可以用`forEach`來把所有range加上`addEventListener`，
也因為range是拖曳條，除了`click`外，也必須要監聽`mousemove`，
而name的命名`volume`與`playbackRate`也就是video本身的屬性，直接使用。
````javascript
function handleRangeUpadte() {
  video[this.name] = this.value;
}
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpadte);
  range.addEventListener('mousemove', handleRangeUpadte);
})
````

### Step4. 快進/快退操作
一樣也在HTML中的`input`定義好對應的秒數了，只須取出使用。
````html
<button data-skip="-10" class="player__button"><i class="icon-backward"></i></button>
<button data-skip="25" class="player__button"><i class="icon-forward"></i></button>
````
在javascript的部分，原本的寫法只有點擊後觸發，  
快進快退的作法是取出input中設定的`data-skip`後透過`currentTime`來調整影片時間。
````javascript
//3.快轉功能
function skip() {
    console.log(this.dataset.skip)
    //currentTime為現在播放的位置（以秒計）
    video.currentTime += parseFloat(this.dataset.skip)
}

skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})
````
### Step5. 進度條顯示
使用video的`currenTime`與`duration`計算出進度％數，  
再透過CSS改變進度條的色塊％數，值得一提的是作者有說到兩個監聽參數：
`timeupdate`與`progress`都可以做為影片時間變動時的觸發條件，  
我稍微小測試後發現，使用`progress`會在載入時就將進度顯示在正確位置，  
而`timeupdate`必須在啟動播放後才會去抓到正確的位置，  
可以將CSS中的flexBasis預設設為50%來觀察這兩者的差別。
````javascript
function handleProgress() {
  const precent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${precent}%`;
}
video.addEventListener('progress', handleProgress);
````

### Step6. 進度條操作
在影片的進度條上，做點擊切換段落，或著是按著滑動片段，
分解動作會有：`點擊`、`按住並移動`這兩種觸發條件，  
為了要讓function能同時判斷兩種狀態，必須要將其中一個條件設flag，  
這裡就將`mousedown`做了一個flag來操作狀態，  
並利用`e.offsetX`的位置及`progress.offsetWidth`寬度與影片總長來操作當前秒數。

````javascript
//6.拉動進度條
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
let mousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
````

### Step7. 全螢幕
作者最後有提到的小功能，他說留給我們自己去研究。  
首先在HTML中加上對應的功能按鈕與圖標(就是這個放大圖標讓我去用font-aswsome的XD)
````html
<button class="player__button fullScreen" title="Full Screen"><i class="icon-fullscreen"></i></button>
````
然後再javascript中加入這段，多個判斷是為了不同的瀏覽器而寫，
值得一提的是，不用對取消全螢幕特別做處理，預設就會有esc關閉及對應的關閉icon了，
但如果有特別需求可以使用`exitFullscreen()`來關閉。
````javascript
function fullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}
fullScreenBtn.addEventListener('click', fullScreen);
````

### Step8. 鍵盤動作偵測
最後加上的功能是鍵盤對應操作，  
加入了空白對應播放/暫停、鍵盤左右鍵對應快進/快退，
空白鍵加上了`preventDefalut`是防止預設空白會跳到最底下的功能。
````javascript
function eventKeydown(e) {
    console.log(e.keyCode)
    switch (e.keyCode) {
        //空白鍵
        case 32:
            e.preventDefault()
            togglePlay();
            break;
        //右鍵
        case 39:
            video.currentTime += 25
            break;
        //左鍵
        case 37:
            video.currentTime += -10
            break;
        //F鍵 全螢幕
        case 70:
            fullScreen()
            break;
    }
}
document.addEventListener('keydown', eventKeydown);
````

## **HTML5語法&備註**
### **Video & Media Element**
這次的主軸是HTML的`video`標籤，所以滿多操作都是直接操作`video`的屬性，  
例如偵測暫停的`paused`或是當前播放時間`currentTime`，  
但其實這些屬性並非`video`獨有的，而是HTML Media Element，好比說`audio`也會有。
>參閱：  
>[MDN-Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)  
>[MDN-HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

## **JavaScript語法&備註**
### **屬性使用** 
在Step2中有使用`video[method]()`的方法來操作屬性，  
其實相關的操作方法就等同於`video.play()`，但不能寫成`video.method()`，  
因為這樣就變成呼叫video底下的function method了，  
所以使用中括號[]包起來的會自動變成字串，可以避免掉這樣的問題。

### **HTMLElement.dataset**
在Step4中使用到的，使用`dataset`可以取得`htmlTag`中的`data-*`屬性！
>參閱：[MDN-](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)

### **Event.preventDefault()**
在Step8中使用到的，這個方法是將取消事件（如果事件可取消），  
這次使用的場景是於網頁瀏覽器中按下空白，預設會將網頁捲到底部，  
但我希望只要啟動我的播放/暫停功能就好不要捲動，就可以使用。
>參閱：[MDN-Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
[MDN-Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
