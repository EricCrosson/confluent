'use strict';

const assert = require('assert');
const should = require('should');

const _ = require('lodash');

const index = require('../index.js');
const cli = require('../cli.js');


describe('index', function () {
    describe('#findRcFile', function() {
        it('should find a .rc file', function(done) {
            index.findRcFile(__dirname + '/test')
                .then(data => {
                    assert.equal(data, __dirname + '/.confluent.json')
                    done();
                }).catch(err => done(err));
        });
    });

    describe('#confluent', function() {
        it('should authenticate with confluence server', function(done) {
            index.confluent()
                .then(data => {
                    data.getContentByPageTitle('ipp', 'rapt user guide', function(err, res) {
                        assert.strictEqual(res.statusCode, undefined);
                        done() ;
                    });
                }).catch(err => done(err))
        });
    });

    describe('#findWikiSources', function() {
        xit('should be able to find all local wiki sources', function(done) {
            index.findWikiSources()
                .then(data => {
                    console.log(data);
                    done();
                }).catch(err => done(err))
        });
    });
});
