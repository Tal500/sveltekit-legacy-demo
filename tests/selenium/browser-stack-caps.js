export default [
    {
        name: 'IE11 (Windows 7)',
        browserName: "IE",
        'bstack:options' : {
            "os": "Windows",
            "osVersion": "7",
            "browserVersion": "11.0",
            "buildName" : "browserstack-build-1",
            "sessionName" : "Parallel test 1",
        },
    },
    {
        name: 'IE10 (Windows 7)',
        browserName: "IE",
        'bstack:options' : {
            "os": "Windows",
            "osVersion": "7",
            "browserVersion": "10.0",
            "buildName" : "browserstack-build-1",
            "sessionName" : "Parallel test 2",
        }
    },
    {
        name: 'Safari 10.1',
        browserName: "Safari",
        'bstack:options' : {
            "os": "OS X",
            "osVersion": "Sierra",
            "browserVersion": "10.1",
            "buildName" : "browserstack-build-1",
            "sessionName" : "Parallel test 3",
        },
    },
];