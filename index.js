#!/usr/bin/env node

'use strict';

const confluent = require ('./confluent.js');

// resume: implement and test the client code

// resume: how viable is this?  remember that modern regexp package?
// how was it implemented? do args interfere?
//
// confluent.authenticate(args)
//     .prepareLocalWikis()
//     .prepareRemoteWikis()
//     .merge()
//     .push()

function main(args) {
    confluent.authenticate(args).then(session => {
        console.log("In the session")
        confluent.prepareLocalWikis()
        confluent.prepareRemoteWikis(session)
        confluent.merge()
        confluent.push(session)
    }).catch(err => console.log(err))
}

let args = process.argv.slice(2);
main(args);
