var request = require('supertest');
var server = require('../server');

describe('Loading express', function() {
  it('responds to /test', function testTest(done) {
    request(server)
      .get('/test')
      .expect(200, done);
  });
  it('404 to /blah', function test404(done) {
    request(server)
      .get('/blah')
      .expect(404, done);
  });
});

describe('Start, configure, a node', function() {
  it('Remove 127.0.0.1 from database', function initialDeleteNode(done) {
    request(server)
      .post('/api/deleteNode')
      .send({'node': {'ip': '127.0.0.1'}})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(function(res) {
        if (res.body.n === 1) {
          res.body.n = 0;
        }
      })
      .expect(200, {
        ok: 1,
        n: 0
      }, done);
  });

  it('add new node 127.0.0.1', function testConnect(done) {
    request(server)
      .get('/api/connect')
      .expect(200, done);
  });

  it('Configure 127.0.0.1 with rgb and relay', function configNode(done) {
    request(server)
      .post('/api/configureNode')
      .send({'node': {
        'name': 'testNode',
        'ip': '127.0.0.1',
        'modules': [{'type': 'relay'}, {'type': 'rgb'}]
      }})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, {
        ok: 1,
        nModified: 1,
        n: 1
      }, done);
  });

  it('Returns rgb and relay when connecting', function getModules(done) {
    request(server)
      .get('/api/connect')
      .expect(200, [{'type': 'relay'}, {'type': 'rgb'}], done);
  });
});

describe('RGBServer sending information to RGB on Python RGBServer', function() {
  it('returns 200 status /rgb/on', function() {
    request(server).get('/rgb/0/on', function(response, body) {
      expect(response.statusCode).to.equal(200);
    });
  });
  it('returns RGB status /rgb/0/on', function() {
    request(server).get('/rgb/0/on', function(response, body) {
      expect(body).to.equal({style: 'on', rgb: [0, 0, 0]});
    });
  });
  it('returns 200 status /rgb/on/1/2/3/', function() {
    request(server).get('/rgb/0/on/1/2/3/', function(response, body) {
      expect(response.statusCode).to.equal(200);
    });
  });
  it('returns RGB status /rgb/0/on/1/2/3/', function() {
    request(server).get('/rgb/0/on/1/2/3/', function(response, body) {
      expect(body).to.equal({style: 'on', rgb: [1, 2, 3]});
    });
  });
  it('returns 200 status /rgb/off', function() {
    request(server).get('/rgb/0/off', function(response, body) {
      expect(response.statusCode).to.equal(200);
    });
  });
  it('returns RGB status /rgb/0/off', function() {
    request(server).get('/rgb/0/off', function(response, body) {
      expect(body).to.equal({style: 'off', rgb: [0, 0, 0]});
    });
  });
  it('returns 200 status /rgb/off/1/2/3/', function() {
    request(server).get('/rgb/0/off/1/2/3/', function(response, body) {
      expect(response.statusCode).to.equal(200);
    });
  });
  it('returns RGB status /rgb/0/off/1/2/3/', function() {
    request(server).get('/rgb/0/1/2/3/', function(response, body) {
      expect(body).to.equal({style: 'off', rgb: [1, 2, 3]});
    });
  });
});

describe('Deleting a Node', function() {
  it('Deletes 127.0.0.1', function deleteNode(done) {
    request(server)
      .post('/api/deleteNode')
      .send({'node': {'ip': '127.0.0.1'}})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200, {
        ok: 1,
        n: 1
      }, done);
  });
});
