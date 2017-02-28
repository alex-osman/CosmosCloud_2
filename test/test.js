var request = require('supertest');

describe("Initialize express", function() {
	var server = require('../server');
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

describe("Initialize a Node", function() {
	it('Delete a node', function initialDeleteNode(done) {
		request(server)
			.post('/api/deleteNode')
			.send({"node": {"ip": "127.0.0.1"}})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(function(res) {
				if (res.body.n == 1)
					res.body.n = 0;
			})
			.expect(200, {
				ok: 1,
				n: 0
			}, done);
	});

	it('Add a node', function testConnect(done) {
		request(server)
			.get('/api/connect')
			.expect(200, done);
	});

	it('Configure a node', function deleteNode(done) {
		request(server)
			.post('/api/configureNode')
			.send({"node": {
				"name": "testNode",
				 "ip": "127.0.0.1",
				 "modules": [{"type": "relay"}, {"type": "rgb"}]
			}})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200,{
				ok: 1,
				nModified: 1,
				n: 1
			}, done);
	});

	it('Return modules to start', function getModules(done) {
		request(server)
			.get('/api/connect')
			.expect(200, [{"type": "relay"}, {"type": "rgb"}], done);
	});

	it('Delete a node', function deleteNode(done) {
		request(server)
			.post('/api/deleteNode')
			.send({"node": {"ip": "127.0.0.1"}})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, {
				ok: 1,
				n: 1
			}, done);
	})
})





