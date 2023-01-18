/** @type { import('./types.js').BrowserStackCaps[] } */
export default [
    {
        browserName: "IE",
        'bstack:options' : {
            "os": "Windows",
            "osVersion": "10",
            "browserVersion": "11.0",
            "sessionName" : "IE11 (Windows 10)",
            "sendKeys" : "true"
        },
        // BrowserStack have issues with driver actions, so disable it.
        // Notice that IE11 is being tested locally, so we shouldn't be worry about that we can't use driver actions on BrowserStack.
        actionsEnabled: false
    },
    {
        browserName: "Safari",
        'bstack:options' : {
            "os": "OS X",
            "osVersion": "Mojave",
            "browserVersion": "12.1",
            "sessionName" : "Safari 12.1",
            "sendKeys" : "true"
        }
    },
    {
        browserName: "Chrome",
        'bstack:options' : {
            "os": "Windows",
            "osVersion": "XP",
            "browserVersion": "14",
            "sessionName" : "Chrome 14 (Windows XP)",
            "sendKeys" : "true"
        },
        actionsEnabled: false
    }
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