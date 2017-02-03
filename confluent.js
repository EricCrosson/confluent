'use strict';

const _ = require('lodash');
const path = require('path');

const findup = require('findup');
const Confluence = require('confluence-api');
const prettyjson = require('prettyjson');
const recursive = require('recursive-readdir');

const rcfilename = '.confluent.json';

// Future feature: add 'start managing wiki page through confluent'

function confluent() {
    this.quitIfUncommittedChanges();
}

confluent.prototype.quitIfUncommittedChanges = function() {
    // TODO: implement
}

/**
 * Create a new Confluence session.
 */
confluent.prototype.authenticate = function() {
    this.findRcFile()
        .then(data => {
            let rcfile = data;
            let rc = require(rcfile);
            // console.log(prettyjson.render(rc));
            this.session = new Confluence(rc);
            return this;
        }).catch(err => {
            console.log("Here" + err)
            return err;
        });
}

/**
 * Commit the local, standardized wikis into git.
 */
confluent.prototype.prepareLocalWikis = function() {
    // TODO: implement
    // findLocalWikis()
    // standardizeLocalWikis()
    // commitLocalWikis()
    return this;
}

/**
 * Commit into git each remote wiki converted into the same format as
 * its corresponding local wiki.
 */
confluent.prototype.prepareRemoteWikis = function(session) {
    // TODO: implement
    // let localWikis = _.map(findLocalWikis(), fileToWiki)
    // let downloadedWikis = downloadRemoteWikis(session, localWikis)
    // standardizeDownloadedWikis(downloadedWikis)
    // commitDownloadedWikis()
    return this;
}

/**
 * Download remote wikis from confluence.
 */
function downloadRemoteWikis(session, wikis) {
    // TODO: implement
}

/**
 * Merge the local wikis into remote and check for conflicts.
 */
confluent.prototype.merge = function() {
    // TODO: implement
    return this;
}

/**
 * Push the new remote wikis to Confluence.
 */
confluent.prototype.push = function(session) {
    // TODO: implement
    return this;
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
confluent.prototype.findLocalWikis = function(searchdir) {
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
confluent.prototype.findRcFile = function(searchdir) {
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

module.exports = confluent;
