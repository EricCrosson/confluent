'use strict';

const assert = require('assert');
const should = require('should');

const _ = require('lodash');

const confluent = require('../confluent.js');
const cli = require('../cli.js');

const testDir = __dirname;


describe('confluent', function () {

    var dut;

    before(function() {
        dut = new confluent();
    })

    it('should quit if uncommitted changes are present', function() {
        // todo: ensure no uncommitted changes
        // todo: assert here
    })

    describe('#findRcFile', function() {
        it('should find a .rc file', function() {
            let rcfile = dut.findRcFile(testDir)
            assert.equal(rcfile, __dirname + '/.confluent.json')
        });
    });

    describe('#authenticate', function() {
        it('should authenticate with confluence server', function(done) {
            const result = dut.authenticate();
            // FIXME: generalize test of authentication to work with
            // arbitrary confluence servers
            result.session.getSpace('ipp', function(err, data) {
                done(err);
            });
        });
    });

    // TODO: refactor out by exposing only a test that relies on this
    // one?  Keep the public api small, right?
    describe('#findLocalWikis', function() {
        it('should be able to find all local wiki sources', function() {
            const localWikis = dut.findLocalWikis(testDir)
            // console.log(localWikis);
            assert.equal(7, localWikis.length);
        });
    });

    describe('#prepareLocalWikis', function() {
        it('should commit standardized wikis into git', function() {
            dut.prepareLocalWikis();
            // fixme: parametrize start branch in rc file
            // assert that each file in git:confluent-local is a transform of master
        });
    });

    describe('#downloadRemoteWikis', function() {
        xit('should be able to convert local files into remote wikis', function(done) {
            dut.downloadRemoteWikis(testDir).then(data => {
                // console.log(data);
                done();
            }).catch(err => done(err));
        });
    });
});
