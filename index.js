const Gpio = require('onoff').Gpio;
const axios = require('axios');

const LED = new Gpio(17, 'out');
const DOOR = new Gpio(27, 'in', 'both');

const doorLog = (status) => console.log(`Door status: ${STATES[status]}`);

const STATES = {
  0: "open",
  1: "close"
};

LED.writeSync(1); 

// Initial status
const doorStatus = DOOR.readSync();
doorLog(doorStatus);

DOOR.watch((err, status) => {
  if (err) {
    throw err;
  }
  
  axios.post("https://logs-util.herokuapp.com/logs", {pretzi: "test"})
  doorLog(status);
});
