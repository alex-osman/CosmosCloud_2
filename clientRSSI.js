const exec = require('child_process').exec
const request = require('request')

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

let getSignalValue = () => {
  return new Promise((resolve, reject) => {
    exec('airport -I | grep agrCtlRSSI', (stdin, stdout, stderr) => {
      resolve(Math.abs(parseInt(stdout.trim().split(' ')[1])))
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
  getSignalValue()
  .then((s) => {
    action(s);
    setTimeout(() => {
      doToSignal(action);
    }, 500)
  })
}

//Main 
doToSignal((s) => {
  console.log(s);
  //request('http://10.0.0.122:4200/rssi/' + s[0] + '/' + s[1] + '/' + s[2], (err, res) => {
  request('http://192.168.0.3:4200/rssi/' + s + '/' + s[1] + '/' + s[2], (err, res) => {
    console.log(res.body);
  })
})
