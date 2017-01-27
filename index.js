'use strict';

const _ = require('lodash');
const findup = require('findup');

const Confluence = require('confluence-api');
const prettyjson = require('prettyjson');

const rcfilename = '.confluent.json';

function confluent() {
    return new Promise(function(resolve, reject) {
        findRcFile()
            .then(data => {
                let rcfile = data;
                let rc = require(rcfile);
                // console.log(prettyjson.render(rc));
                resolve(new Confluence(rc));
            }).catch(err => reject('no rc file found'));
    });
}

function findWikiSources() {
    return new Promise(function(resolve, reject) {

    });
}

function findRcFile(searchdir) {
    if (typeof searchdir === 'undefined') {
        searchdir = __dirname;
    }
    return new Promise(function(resolve, reject) {
        let rcfile;
        try {
            let rcDir = findup.sync(searchdir, rcfilename);
            rcfile = `${rcDir}/${rcfilename}`;
        } catch(e) {
            rcfile = false;
        }
        resolve(rcfile);
    });
}

module.exports.findRcFile = findRcFile;
module.exports.confluent = confluent;
module.exports.findWikiSources = findWikiSources;
