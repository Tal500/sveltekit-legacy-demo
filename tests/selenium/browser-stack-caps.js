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
        extraCaps: {
            actionsEnabled: false
        }
    },
    {
        browserName: "Safari",
        'bstack:options' : {
            "os": "OS X",
            "osVersion": "Mojave",
            "browserVersion": "12.1",
            "sessionName" : "Safari 12.1",
            idleTimeout: 250
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
        extraCaps: {
            actionsEnabled: false
        }
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