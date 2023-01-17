export default [
    {
        browserName: "IE",
        'bstack:options' : {
            "os": "Windows",
            "osVersion": "7",
            "browserVersion": "11.0",
            "sessionName" : "IE11 (Windows 7)",
            "sendKeys" : "true"
        },
        // BrowserStack have issues with driver actions, so disable it.
        // Notice that IE11 is being tested locally, so we shouldn't be worry about that we can't use driver actions on BrowserStack.
        actionsEnabled: false
    },
    // {
    //     browserName: "Safari",
    //     'bstack:options' : {
    //         "os": "OS X",
    //         "osVersion": "Sierra",
    //         "browserVersion": "10.1",
    //         "sessionName" : "Safari 10.1",
    //         "sendKeys" : "true"
    //     },
    // },
    // {
    // 'bstack:options' : {
    //     "os": "Windows",
    //     "osVersion": "7",
    //     "browserVersion": "109.0",
    //     "sessionName" : "Chrome",
    //     "sendKeys" : "true"
    // },
    // "browserName": "Chrome",
    // }
];