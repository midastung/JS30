//找出所有的DOM
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButton = player.querySelectorAll('[data-skip]');
const fullscreen = player.querySelector('.fullScreen');

//建立方法
//1.暫停播放按鈕
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    //2.變換播放鍵樣式
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    video[method]();
}

//2.變換播放鍵樣式
// function updateButton() {
//     const icon = this.paused ? '►' : '❚ ❚'
//     toggle.textContent = icon
// }

//3.快轉功能
function skip() {
    console.log(this.dataset.skip)
    //currentTime為現在播放的位置（以秒計）
    video.currentTime += parseFloat(this.dataset.skip)
}

//4.音量、速度range bar功能
function handleRangeUpdate() {
    video[this.name] = this.value
}

//5.進度條
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//6.拉動進度條
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//7.全螢幕 各種瀏覽器寫法
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

//8.左右按鍵控制進度
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

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);

skipButton.forEach(button => {
    button.addEventListener('click', skip)
});

ranges.forEach(range => { range.addEventListener('change', handleRangeUpdate) });
ranges.forEach(range => { range.addEventListener('mousemove', handleRangeUpdate) });

let mousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', fullScreen);
document.addEventListener('keydown', eventKeydown);