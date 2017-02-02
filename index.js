#!/usr/bin/env node

'use strict';

const confluent = require ('./confluent.js');

// resume: implement and test the client code

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
