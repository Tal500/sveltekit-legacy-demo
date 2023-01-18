// @ts-nocheck
// This code was copied from https://www.browserstack.com/docs/automate/selenium/error-codes/keep-alive-not-used#Node_JS

var http = require('http'),
    https = require('https');

//set the time (in seconds) for connection to be alive
var keepAliveTimeout = 30*1000;

if(http.globalAgent && http.globalAgent.hasOwnProperty('keepAlive')) {
    http.globalAgent.keepAlive = true;
    https.globalAgent.keepAlive = true;
    http.globalAgent.keepAliveMsecs = keepAliveTimeout;
    https.globalAgent.keepAliveMsecs = keepAliveTimeout;
} else {
    var agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: keepAliveTimeout
    });

    var secureAgent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: keepAliveTimeout
    });

    var httpRequest = http.request;
    var httpsRequest = https.request;

    http.request = function(options, callback){
        if(options.protocol == "https:"){
            options["agent"] = secureAgent;
            return httpsRequest(options, callback);
        }
        else {
            options["agent"] = agent;
            return httpRequest(options, callback);
        }
    };
}
