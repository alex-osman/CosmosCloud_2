const assert = require('assert');
const CronJob = require('cron').CronJob;
const baseUrl = '/alarm';
let jobs = {};

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
      res.send(alarms);
    })
  })

  app.get(baseUrl + '/addTestAlarm', (req, res) => {
    Alarms.create({
      name: 'defaultAlarm',
      trigger: ['localhost:4200/relay/10.0.0.106/toggle', 'localhost:4200/relay/10.0.0.64/toggle'],
      cronDate: '* * * * * *',
      active: false
    }, (err, result) => {
      console.log(err)
      res.send(result);
    })
  })

  app.get(baseUrl + '/run', (req, res) => {
    runAllJobs()
    .then((j) => {
      j.forEach((j) => {
        jobs[j._id] = j;
        j.start()
      })
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

  app.get(baseUrl + '/activate/:alarm_id', (req, res) => {
    Alarms.find().exec((err, alarms) => {
      let alarm = alarms.find(x => x._id == req.params.alarm_id)
      if (alarm.active) {
        //Turn off the alarm
        if (jobs[alarm._id])
          jobs[alarm._id].stop();
        jobs[alarm._id] = null;
        alarm.active = false;
        updateAlarm(alarm)
        .then(() => res.send('deactivated'))
        .catch((err) => console.log('Error deactivating ' + alarm._id));
      } else {
        //Start the cron job
        getJob(alarm)
        .then((job) => {
          //Start the Job
          job.start();
          //Add the job to `jobs` object
          jobs[alarm._id] = job;
          alarm.active = true;
          updateAlarm(alarm)
          .then(() => res.send('activated'))
          .catch((err) => console.log('Error activating ' + alarm._id));
        })
      }
    })
    .catch((err) => console.log('caught error: ' + err));
  })

  app.post(baseUrl + '/updateAlarm', (req, res) => {
    let alarm = req.body.alarm;
    updateAlarm(alarm)
    .then(() => res.send('updated'));
  })

  let getJob = (alarm) => {
    return new Promise((resolve, reject) => {
      resolve(new CronJob(alarm.cronDate, () => {
        //Everything to run a job
        console.log("Running job: " + alarm.name);
        alarm.trigger.forEach((url) => {
          request('http://' + url, (err, res) => {
            if (err)
              reject(err)
            console.log(err);
          })
        })
      }, () => {
        //What to do when ending a job
        console.log('Stopped running: ' + alarm.name);
      }))
    })
  }

  let updateAlarm = (alarm) => {
    return new Promise((resolve, reject) => {
      Alarms.update({_id: alarm._id}, alarm, (err, result) => {
        if (err)
          reject(err);
        resolve(result);
      })
    })
  }

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