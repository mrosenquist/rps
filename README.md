# RPS

**An implementation of Rock, Paper, Scissors**

[![Greenkeeper badge](https://badges.greenkeeper.io/mrosenquist/rps.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/mrosenquist/rps.svg?branch=master)](https://travis-ci.org/mrosenquist/rps)
[![Known Vulnerabilities](https://snyk.io/test/github/mrosenquist/rps/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mrosenquist/rps?targetFile=package.json)
[![Quality Gate](https://sonarcloud.io/api/badges/gate?key=mrosenquist.rps)](https://sonarcloud.io/dashboard?id=mrosenquist.rps)
[![SonarCloud Coverage](https://sonarcloud.io/api/badges/measure?key=mrosenquist.rps&metric=coverage)](https://sonarcloud.io/component_measures/metric/coverage/list?id=mrosenquist.rps)
[![SonarCloud Bugs](https://sonarcloud.io/api/badges/measure?key=mrosenquist.rps&metric=bugs)](https://sonarcloud.io/component_measures/metric/reliability_rating/list?id=mrosenquist.rps)
[![SonarCloud Vulnerabilities](https://sonarcloud.io/api/badges/measure?key=mrosenquist.rps&metric=vulnerabilities)](https://sonarcloud.io/component_measures/metric/security_rating/list?id=mrosenquist.rps)
[![Code smells](https://sonarcloud.io/api/badges/measure?key=mrosenquist.rps&metric=code_smells)](https://sonarcloud.io/component_measures?id=mrosenquist.rps&metric=code_smells)
[![Technical debt](https://sonarcloud.io/api/badges/measure?key=mrosenquist.rps&metric=sqale_index)](https://sonarcloud.io/component_measures?id=mrosenquist.rps&metric=sqale_index)
[![Known Vulnerabilities](https://snyk.io/test/github/mrosenquist/rps/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mrosenquist/rps?targetFile=package.json)

## Running the built code
 1. open `dist/index.html` in a browser of your choice
 
 OR 
 
 1. open [https://mrosenquist.github.io/rps/dist/](https://mrosenquist.github.io/rps/dist/) in a browser of your choice
 
 
## Development 

##### _Prerequisites_
 * node 8+
 * npm 5+

### Getting started
 
 1. Install yarn: `npm install -g yarn`
 1. Clone repo: `git@github.com:mrosenquist/rps.git`
 1. Install development tools: `yarn install`
 1. Start bundler: `yarn start`
 1. Open browser: `http://localhost:1234`
    _Or port given if already allocated_
    
### Testing
 * **Lint** `yarn lint`
 * **Unit test** `yarn test`
 * **E2E test** `yarn cypress:open`
 * **Securty** `yarn test:security`

### Ways of working
 * Written in Vanilla JavaScript
 * Libraries only used for tests
 * A simple JS Bundling tool is used to help keep the files organised
 * Javascript files to be 100% covered by unit test 
 * E2E for main flows 
 * Code simply (for this application all the logic can be done client side)
 * Keep the solution simple (MVP), however this should be usable, not minimal functional product. Needs to be usable.
 * Support Safari, Chrome, and FF, Mobile Chrome, Mobile Safari. Should work an majority of browsers due to features used according to [caniuse](https://caniuse.com)
 * Responsive support using [Flexbox](https://caniuse.com/#feat=flexbox) and [Viewport units](https://caniuse.com/#feat=viewport-units)
 * Run build and commit the file (this is irregular, but for pruposes of demoing without tools, necessary)
 * Where probible use the right tools for the job. CSS for Styling and animarion, HTML for layout / Interface, JS for logic

### Known issues
 * Mobile Chrome animation issues on the wait

### Build Commands
 * `build` - Bundle the files from `src` to `dist`, no medication or obfuscation, scss files converted to css
 * `lint` -  Run eslint
 * `lint:fix` - Run eslint with fix flag
 * `start` - Start development, will allow access to build code on [http://localhost:1234](http://localhost:1234)
 * `cypress:open` -    cypress open
 * `test` - Run unit tests
 * `test:no-coverage` - Run unit tests without coverage, useful for testing individual test  files e.g. yarn run test:no-coverage src/app/index.spec.js
 * `test:e2e` - Run e2e tests
 * `test:security` - Run node security checks

### If time was no option 
 - [ ] Refactor JS and UI to be more cleanly separated
 - [ ] Security Headers (However content would need to be served using a HTTPD server e.g. Express, Nginx)
 - [ ] Scan security headers using [ahead](https://github.com/mrosenquist/ahead) 
 - [ ] Support PWA (would need to be serverd over HTTPS) 
 
## Development tools used:
 * **[YARN](https://yarnpkg.com/lang/en/)** - Fast, reliable, and secure dependency management
 * **[Parcel](https://parceljs.org)** - A low config bundling tool
 * **[Jest](https://facebook.github.io/jest/)** - Unit test tool (quite to get up and running), (Part of CI)
 * **[ESlint](https://eslint.org/)** - The standard in (Part of CI)
   * [AIRBNB Rules](https://github.com/airbnb/javascript)
   * [Security Rules](https://github.com/nodesecurity/eslint-plugin-security)
 * **[Github](https://github.com/mrosenquist/rps)** - SCM 
 * **[Travis CI](https://travis-ci.org/mrosenquist/rps)** - Continuous integration tool with support for Sonar Cloud (CI)
 * **[Sonar Cloud](https://sonarcloud.io/dashboard?id=mrosenquist.rps)** - Static code analyses (Part of CI)
 * **[NSP](https://nodesecurity.io/)** - Node security test (Part of CI)
 * **[Cypress](https://www.cypress.io/)** - E2E testing tool, quick to setup (Part of CI)
 * **[Greenkeeper](https://greenkeeper.io/)** - Monitors and updates dependencies (Scans GITHUB repo)
 * **[Snyk](https://snyk.io/org/mrosenquist-github-marketplace/projects?)** - Monitors for vulnerabilities in packages (Scans GITHUB repo)
 * **[Husky](https://github.com/typicode/husky)** - Tool to help intgrate local githooks for pre-commit and pre-push
   * Pre-commit - Runs ESLint
   * Pre-push - Runt Unit and E2E tests
 
## Attribution
 * Hand images from wikipedia
 * Quick generation of Favicon / Shortcuts using [realfavicongenerator](https://realfavicongenerator.net)
