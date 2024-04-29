import './style.css';

const hourInput = document.getElementById('hours') as HTMLInputElement;
const minuteInput = document.getElementById('minutes') as HTMLInputElement;
const secondInput = document.getElementById('seconds') as HTMLInputElement;
const continueBtn = document.querySelector('.continue-btn') as HTMLButtonElement;

const resetBtn = document.querySelector('.reset-btn') as HTMLButtonElement;
const timerControlBtns = document.getElementById('timer-controls') as HTMLDivElement;

const pauseBtn = document.createElement('button');
pauseBtn.classList.add('pause-btn');
pauseBtn.textContent = 'Pause';
pauseBtn.addEventListener('click', () => {
  clearInterval(TIMER);

  timerControlBtns.innerHTML = `
  <button class="continue-btn">Continue</button>
  <button class="reset-btn">Reset</button>`;
});

let TIMER: number;

const updateTimerUI = (hours: number, minutes: number, seconds: number) => {
  hourInput.value = hours.toString().padStart(2, '0');
  minuteInput.value = minutes.toString().padStart(2, '0');
  secondInput.value = seconds.toString().padStart(2, '0');
};

const getTotalSeconds = (hours: number, minutes: number, seconds: number) =>
  seconds + minutes * 60 + hours * 60 * 60;

const getTimeFromSeconds = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { hours, minutes, seconds };
};

const getTimerValue = () => {
  return {
    hours: parseInt(hourInput.value, 10),
    minutes: parseInt(minuteInput.value, 10),
    seconds: parseInt(secondInput.value, 10),
  };
};

const beautifyTimer = () => {
  const values = getTimerValue();
  const totalSeconds = getTotalSeconds(values.hours, values.minutes, values.seconds);
  const parsedValues = getTimeFromSeconds(totalSeconds);
  updateTimerUI(parsedValues.hours, parsedValues.minutes, parsedValues.seconds);
};

const startTimer = () => {
  TIMER = setInterval(() => {
    const values = getTimerValue();
    const totalSeconds = getTotalSeconds(values.hours, values.minutes, values.seconds);
    if (totalSeconds === 0) {
      clearInterval(TIMER);
      return;
    }
    const parsedValues = getTimeFromSeconds(totalSeconds - 1);
    updateTimerUI(parsedValues.hours, parsedValues.minutes, parsedValues.seconds);
  }, 1000);
};

continueBtn?.addEventListener('click', () => {
  clearInterval(TIMER);
  beautifyTimer();
  startTimer();

  timerControlBtns.appendChild(pauseBtn);

  // timerControlBtns.innerHTML = `
  // <button class="pause-btn">Pause</button>
  // <button class="reset-btn">Reset</button>`;
});

resetBtn.addEventListener('click', () => {
  clearInterval(TIMER);
  updateTimerUI(0, 0, 0);
});
