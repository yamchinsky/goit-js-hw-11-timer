import './styles.css';


const refs = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
}


class CountdownTimer {
    constructor({ onTick }) {
      this.intervalId = null;
      this.onTick = onTick;

      this.init();
    }
  
  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
    }
  
  start() {
        const startTime = Date.now();
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const time = this.getTimeComponents(deltaTime);

            this.onTick(time);
        }, 1000);
    }
    
    getTimeComponents(time) {
        const days = this.pad(Math.floor((time / (1000 * 60 * 60 * 24))));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
    return { days, hours, mins, secs };
    }

     /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  onTick: updateClockface,
  selector: '#timer-1',
  //targetDate: new Date('Jun 16, 2021'),
});

timer.start();


function updateClockface({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}