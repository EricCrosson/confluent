'use strict';

const assert = require('assert');
const should = require('should');

const _ = require('lodash');

const index = require('../index.js');
const cli = require('../cli.js');

const testDir = __dirname;


describe('index', function () {
    describe('#findRcFile', function() {
        it('should find a .rc file', function(done) {
            index.findRcFile(testDir)
                .then(data => {
                    assert.equal(data, __dirname + '/.confluent.json')
                    done();
                }).catch(err => done(err));
        });
    });

    // TODO: refactor out
    describe('#confluent', function() {
        it('should authenticate with confluence server', function(done) {
            index.confluent()
                .then(confluent => {
                    confluent.session.getContentByPageTitle('ipp', 'rapt user guide', function(err, res) {
                        assert.strictEqual(res.statusCode, undefined);
                        done();
                    });
                }).catch(err => done(err))
        });
    });
    describe('#downloadRemoteWikis', function() {
        it('should be able to convert local files into remote wikis', function() {
            index.downloadRemoteWikis(testDir).then(data => {
                console.log(data);
                done();
            });
        });
    });

             // TODO: refactor out
    describe('#findWikiSources', function() {
        it('should be able to find all local wiki sources', function(done) {
            index.findWikiSources(testDir)
                .then(data => {
                    // console.log(data);
                    assert.equal(8, data.length);
                    done();
                }).catch(err => done(err))
        });
    });
});

describe('client code', function() {
    xit('should be simple', function(done) {
        index.confluent().then(session => {
            session.sync();
        }).catch(err => done(err));
    });
});
