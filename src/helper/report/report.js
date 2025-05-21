"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Solução moderna, funciona na maioria dos casos:
var multiple_cucumber_html_reporter_1 = require("multiple-cucumber-html-reporter");
multiple_cucumber_html_reporter_1.default.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright Automation Report",
    pageTitle: "BookCart App test report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "Koushik - PC",
        platform: {
            name: "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Book Cart Application" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Smoke-1" },
        ],
    },
});
