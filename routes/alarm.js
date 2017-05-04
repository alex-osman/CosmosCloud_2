const assert = require('assert');
const CronJob = require('cron').CronJob;
const baseUrl = '/alarm';
let jobs = [];

module.exports = (app, request, a) => {
  const Alarms = a;


  app.get(baseUrl + '/getAlarms', (req, res) => {
    Alarms.find().exec((err, alarms) => {
      res.send(alarms);
    })
  })

  app.get(baseUrl + '/addAlarm', (req, res) => {
    Alarms.create({
      name: '',
      cronDate: '0 0 0 * * *',
      active: false
    }, (err, result) => {
      console.log(err)
      res.send(result);
    })
  })

  app.get(baseUrl + '/getJobs', (req, res) => {
    res.send('jobs: ' + jobs.length)
  })

  app.get(baseUrl + '/stopJobs', (req, res) => {
    jobs.forEach(j => j.stop());
    res.send('Stopped');
  })

  app.post(baseUrl + '/updateAlarm', (req, res) => {
    let alarm = req.body.alarm;
    updateAlarm(alarm)
    .then(() => {
      res.send('updated');
      runAllJobs()
      .then(x => console.log("Alarms updated"))
    });
  })

  let getJob = (alarm) => {
    return new Promise((resolve, reject) => {
      resolve(new CronJob(alarm.cronDate, () => {
        //Everything to run a job
        console.log("Running job: " + alarm.name);
        alarm.trigger.forEach((url) => {
          request(url, (err, res) => {
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
      //Stop all jobs
      jobs.forEach((job) => {
        console.log("Found: " + job.cronTime.source)
        job.stop()
      });
      //Get all alarms
      Alarms.find().exec((err, alarms) => {
        //Start a job for each alarm that is active
        jobs = alarms.filter(a => a.active).map((alarm) => {
          return new CronJob(alarm.cronDate, () => {
            //Run the job
            console.log("Running: " + alarm.name);
            console.log(this)
            console.log(this.running)
            alarm.trigger.forEach((url) => {
              request(url, (err, res) => {
                if (err)
                  reject(err);
                console.log("Success");
              })
            })
          }, () => {
            //Stop the job
            console.log("Stopped: " + alarm.name)
          }, true)
        });
      })
    })
  }
  runAllJobs()
  .then(jobs => console.log(jobs.length + ' jobs'));
}