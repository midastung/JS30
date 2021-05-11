let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown)
    const now = Date.now(); //距1970/1/1至今的毫秒數
    const then = now + seconds*1000  //加上要倒數的時間
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(()=>{
        const secondLeft = Math.round((then - Date.now()) / 1000)
        if(secondLeft < 0){
            clearInterval(countdown);
            return;
        }
        //display it 
        displayTimeLeft(secondLeft)
    }, 1000);
}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSecond = seconds % 60
    const display = `${minutes}:${remainderSecond < 10?'0':''}${remainderSecond}`
    document.title = display;
    timeDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${minutes < 10?'0':''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.midasForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})