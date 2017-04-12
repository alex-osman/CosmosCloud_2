const exec = require('child_process').exec

const r1 = process.argv[2]
const r2 = process.argv[3]
const r3 = process.argv[4]

//My BSSID values
//'10:86:8c:25:f6:e0' - Neighbor's network
//'5c:e3:0e:dc:0b:8d' - Home network
//'22:86:8c:25:f6:e0' - Xfinity Hotspot

let parseSignal = () => {
  return new Promise((resolve, reject) => {
    exec('airport -s', (stdin, stdout, stderr) => {
      let lines = stdout.trim().split('\n');
      lines = lines.map(line => line.replace(/\s\s+/g, ' ').split(' ').filter(el => el.length > 0))
        .map(l => {
          return {
            SSID: l[0],
            BSSID: l[1],
            RSSI: Math.abs(parseInt(l[2]))
          }
        })
      resolve(lines);
    })
  })
}

let getSignalValues = () => {
  return new Promise((resolve, reject) => {
    parseSignal()
    .then((signals) => {
      let signalValue = [0, 0, 0];
      signals.forEach((signal) => {
        if (signal.BSSID == r1)
          signalValue[0] = signal.RSSI
          if (signal.BSSID == r2)
          signalValue[1] = signal.RSSI
        if (signal.BSSID == r3)
          signalValue[2] = signal.RSSI
      })
      resolve(signalValue);
    })
  })
}


let doToSignal = (action) => {
  getSignalValues()
  .then((s) => {
    action(s);
    doToSignal(action);
  })
}

//Main 
doToSignal((s) => console.log(s));
