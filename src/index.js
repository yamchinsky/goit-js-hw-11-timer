import './styles.css';



class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.intervalId = null;
      this.refs = {
        days: document.querySelector(selector + ' span[data-value="days"]'),
        hours: document.querySelector(selector + ' span[data-value="hours"]'),
        mins: document.querySelector(selector + ' span[data-value="mins"]'),
        secs: document.querySelector(selector + ' span[data-value="secs"]'),
        labels: document.querySelectorAll(selector + ' .label')
      };
      this.startTime = targetDate;

      this.init();
    }
  
  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
    }
  
  start() {
        this.intervalId = setInterval(() => {
            const time = this.getTimeComponents(this.startTime - Date.now());
            if (time.days < 1 && time.hours < 1 && time.mins < 1 && time.secs < 1)
              clearInterval(this.intervalId);
            else 
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

   onTick({ days, hours, mins, secs }) {
    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
     
    this.refs.labels[0].innerText = `Day${days == 1 ? '' : 's'}`;
    this.refs.labels[1].innerText = `Hour${hours == 1 ? '' : 's'}`;
    this.refs.labels[2].innerText = `Minute${mins == 1 ? '' : 's'}`;
    this.refs.labels[3].innerText = `Second${secs == 1 ? '' : 's'}`;
   }
     /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2021'),
});

timer.start();





