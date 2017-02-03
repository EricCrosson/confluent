#!/usr/bin/env node

'use strict';

const confluent = require ('./confluent.js');

// resume: implement and test the client code

// resume: how viable is this?  remember that modern regexp package?
// how was it implemented? do args interfere?
//

function main(args) {
    console.log("In the session")
    new confluent().authenticate(args)
        .prepareLocalWikis()
        .prepareRemoteWikis()
        .merge()
        .push()
}

let args = process.argv.slice(2);
main(args);
