'use strict';

const _ = require('lodash');
const path = require('path');

const findup = require('findup');
const Confluence = require('confluence-api');
const prettyjson = require('prettyjson');
const recursive = require('recursive-readdir');

const rcfilename = '.confluent.json';

// Future feature: add 'start managing wiki page through confluent'

/**
 * Commit the local, standardized wikis into git.
 */
function prepareLocalWikis() {
    // TODO: implement
    // findLocalWikis()
    // standardizeLocalWikis()
    // commitLocalWikis()
}

/**
 * Commit into git each remote wiki converted into the same format as
 * its corresponding local wiki.
 */
function prepareRemoteWikis(session) {
    // TODO: implement
    // let localWikis = _.map(findLocalWikis(), fileToWiki)
    // let downloadedWikis = downloadRemoteWikis(session, localWikis)
    // standardizeDownloadedWikis(downloadedWikis)
    // commitDownloadedWikis()
}

/**
 * Download remote wikis from confluence.
 */
function downloadRemoteWikis(session, wikis) {
    // TODO: implement
}

/**
 * Create a new Confluence session.
 */
function merge() {
    // TODO: implement
}

/**
 * Create a new Confluence session.
 */
function push(session) {
    // TODO: implement
}

/**
 * Create a new Confluence session.
 */
function authenticate() {
    return new Promise(function(resolve, reject) {
        findRcFile()
            .then(data => {
                let rcfile = data;
                let rc = require(rcfile);
                // console.log(prettyjson.render(rc));
                let session = new Confluence(rc);
                resolve(session);
            }).catch(err => reject('no rc file found'));
    });
}

/**
 * Convert a file path into a wiki address.
 */
function fileToWiki(file) {
    return [path.dirname(file).match(/([^\/]*)\/*$/)[1],
            path.basename(file)];
}

/**
 * Assume markup sources appear in directory of invocation.
 */
function findLocalWikis(searchdir) {
    if (typeof searchdir === 'undefined') {
        searchdir = process.cwd();
    }
    return new Promise(function(resolve, reject) {
        recursive(searchdir, function(err, files) {
            if (err) { reject('no markdown files detected'); }
            const markdownFiles = _.filter(files, elt => isMarkdown(elt));
            const markdownWikis = _.map(markdownFiles, fileToWiki);
            resolve(markdownWikis);
        });
    });
}

// TODO: remove need for passing argument into this function
// RESUME: function getRemoteWikis MatchingLocalWikis
function downloadRemoteWikis(dir) {
    return new Promise(function(resolve,reject) {
        commitLocalWikis(dir).then(function(specs) {
            let wikis = _.map(specs, fileToWiki);
            console.log(wikis);
            resolve(wikis);
        }).catch(err => console.log(err));
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
module.exports.authenticate = authenticate;
module.exports.findLocalWikis = findLocalWikis;
module.exports.prepareLocalWikis = prepareLocalWikis;
module.exports.prepareRemoteWikis = prepareRemoteWikis;
module.exports.merge = merge;
module.exports.push = push;
