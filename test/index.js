'use strict';

const assert = require('assert');
const should = require('should');

const _ = require('lodash');

const confluent = require('../confluent.js');
const cli = require('../cli.js');

const testDir = __dirname;


describe('confluent', function () {
    it('should quit if uncommitted changes are present', function() {
        // todo: ensure no uncommitted changes
        new confluent();
        // todo: assert here
        // todo: add uncommitted change
        new confluent();
        // todo: assert never get here
    })

    describe('#findRcFile', function() {
        it('should find a .rc file', function(done) {
            new confluent().findRcFile(testDir)
                .then(data => {
                    assert.equal(data, __dirname + '/.confluent.json')
                    done();
                }).catch(err => done(err));
        });
    });

    // TODO: fix
    describe('#authenticate', function() {
        it('should authenticate with confluence server', function(done) {
            const result = new confluent().authenticate();
            console.log("Result: " + (result instanceof Error) + result)
            // result.session.getContentByPageTitle("space-name", "page-title", function(err, data) {
            //     // do something interesting with data; for instance,
            //     // data.results[0].body.storage.value contains the stored markup for the first
            //     // page found in space 'space-name' matching page title 'page-title'
            //     console.log(data);
            // });
            done(result);
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

    describe('#prepareLocalWikis', function() {
        it('should commit standardized wikis into git', function() {
            new confluent().prepareLocalWikis();
            // fixme: parametrize start branch in rc file
            // assert that each file in git:confluent-local is a transform of master
        });
    });

    // TODO: refactor out
    describe('#findLocalWikis', function() {
        it('should be able to find all local wiki sources', function(done) {
            new confluent().findLocalWikis(testDir)
                .then(data => {
                    console.log(data);
                    assert.equal(7, data.length);
                    done();
                }).catch(err => done(err));
        });
    });
});
