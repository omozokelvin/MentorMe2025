const countDownForm = document.getElementById('countdown-form');
const countDownDisplay = document.getElementById('countdown-display');
const minuteDisplay = document.getElementById('minutes-display');
const secondDisplay = document.getElementById('seconds-display');
const body = document.getElementsByTagName('body')[0];

countDownForm.onsubmit = (e) => {
  e.preventDefault();

 const formData = new FormData(e.target);

 let minutes = +formData.get('minutes');
 let seconds = +formData.get('seconds');

 countDownDisplay.style.display = 'flex';
 countDownForm.style.display = 'none';

 let interval = setInterval(() => {

  if(seconds === 0 && minutes === 0) {
    body.style.backgroundColor = 'red';
    countDownDisplay.style.color = 'white';
    clearInterval(interval);


    body.onclick = () => {
      body.style.backgroundColor = 'unset';
      countDownDisplay.style.color = 'black';
      countDownDisplay.style.display = 'none';
      countDownForm.style.display = 'flex';
      
      e.target.reset();
      
      body.onclick = null;
    }

    return;
  }

  if(seconds > 0) {
    seconds -= 1;
    renderTime(minutes, seconds);
    return;
  }

  if(seconds === 0) {
    minutes -= 1;
    seconds = 59;
    renderTime(minutes, seconds);
    return;
  }
 }, 1000)

 renderTime(minutes, seconds);
 
}

const renderTime =(minutes, seconds) => {
  minuteDisplay.innerText = minutes;
  secondDisplay.innerText = seconds > 9 ? `${seconds}`.padEnd(2, '0'): `${seconds}`.padStart(2, '0');
}
