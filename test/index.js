'use strict';

const assert = require('assert');
const should = require('should');

const _ = require('lodash');

const confluent = require('../confluent.js');
const cli = require('../cli.js');

const testDir = __dirname;


describe('confluent', function () {
    describe('#findRcFile', function() {
        it('should find a .rc file', function(done) {
            confluent.findRcFile(testDir)
                .then(data => {
                    assert.equal(data, __dirname + '/.confluent.json')
                    done();
                }).catch(err => done(err));
        });
    });

    // TODO: refactor out (?)
    describe('#authenticate', function() {
        xit('should authenticate with confluence server', function(done) {
            confluent.authenticate()
                .then(session => {
                    confluent.session.getContentByPageTitle('ipp', 'rapt user guide', function(err, res) {
                        assert.strictEqual(res.statusCode, undefined);
                        done();
                    });
                }).catch(err => done(err))
        });
    });
    describe('#downloadRemoteWikis', function() {
        xit('should be able to convert local files into remote wikis', function(done) {
            confluent.downloadRemoteWikis(testDir).then(data => {
                // console.log(data);
                done();
            }).catch(err => done(err));
        });
    });

    // TODO: refactor out
    describe('#findLocalWikis', function() {
        it('should be able to find all local wiki sources', function(done) {
            confluent.findLocalWikis(testDir)
                .then(data => {
                    console.log(data);
                    assert.equal(8, data.length);
                    done();
                }).catch(err => done(err));
        });
    });
});
