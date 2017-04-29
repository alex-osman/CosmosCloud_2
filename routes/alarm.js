const assert = require('assert');
const CronJob = require('cron').CronJob;
const baseUrl = '/alarm';
let jobs = [];

module.exports = (app, request, a) => {
  const Alarms = a;

  //Start a cron job
  let job = new CronJob('* * * * * *', () => {
    console.log('every second job');
  }, () => {
    console.log('job stopped');
  })

  app.get(baseUrl + '/getAlarms', (req, res) => {
    Alarms.find().exec((err, alarms) => {
      console.log(err);
      console.log(alarms);
      res.send(alarms);
    })
  })

  app.get(baseUrl + '/addTestAlarm', (req, res) => {
    Alarms.create({
      name: 'defaultAlarm',
      trigger: ['localhost:4200/relay/localhost/off'],
      cronDate: '* * * * * *'
    }, (err, result) => {
      console.log(err)
      res.send(result);
    })
  })

  app.get(baseUrl + '/run', (req, res) => {
    runAllJobs()
    .then((j) => {
      jobs = j;
      jobs.forEach(j => j.start())
    })
    res.send('running')
  })

  app.get(baseUrl + '/getJobs', (req, res) => {
    res.send('jobs: ' + jobs.length)
  })

  app.get(baseUrl + '/stopJobs', (req, res) => {
    jobs.forEach(j => j.stop());
    res.send('Stopped');
  })


  let runAllJobs = () => {
    return new Promise((resolve, reject) => {
      Alarms.find().exec((err, alarms) => {
        jobs = alarms.map((alarm) => {
          console.log(alarm.cronDate[0]);
          return new CronJob(alarm.cronDate, () => {
            console.log('Running job: ' + alarm.name);
          }, () => {
            console.log('Stopped running: ' + alarm.name);
          })
        })
        console.log('Ran ' + jobs.length)
        resolve(jobs);
      }, (err, result) => {
        if (err)
          reject(err);
      })
    })
  }

}