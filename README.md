#Example
Tests for task) but you can use it like pattern)

## Install and Launch

To launching tests:

- add you path to file in "url" in `data.json` (ex. "url": "file:///Users/users/Documents/Projects/example/file.html")
- install all project dependencies with `npm install`
- run the selenium server or write `npm run start` (ensure you have at least Java version 8)
- run all tests using `npm run test`
- when finish stoped, create allure report `npm run allureReport` (ensure you install allure [allure](http://allure.qatools.ru/)
- all scripts you can find at `package.json`

## Project structure

- allure-results/ - after test all results copy to this directory and you can generate allure-report
- specs/ - store for all tests
- pages/ - describing Page Objects
- wdio.conf.js and data.json - configuration and test data
- tsconfig.json - root of a TypeScript project
