'use strict';

const _ = require('lodash');
const path = require('path');

const findup = require('findup');
const Confluence = require('confluence-api');
const prettyjson = require('prettyjson');
const recursive = require('recursive-readdir');

const rcfilename = '.confluent.json';

/**
 * Create a new Confluence session.
 */
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

/**
 * Assume markup sources appear in directory of invocation.
 */
function findWikiSources(searchdir) {
    if (typeof searchdir === 'undefined') {
        searchdir = process.cwd();
    }
    return new Promise(function(resolve, reject) {
        recursive(searchdir, function(err, files) {
            if (err) { reject('no markdown files detected'); }
            const markdown = _.filter(files, elt => isMarkdown(elt));
            resolve(markdown);
        });
    });
}

/**
 * Test a file's extension against known markdown types.
 */
function isMarkdown(file) {
    let knownMarkdownTypes = [
        ".md", ".rst", ".html", ".org",
        ".tex", ".epub", ".xml", ".opml"
    ];
    return _.includes(knownMarkdownTypes, path.extname(file));
}

/**
 * Find user's Confluence credentials.
 */
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
