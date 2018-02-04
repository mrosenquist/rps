# RPS

*An implementation of Rock, Paper, Scissors*

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

### Ways of working
* Written in Vanilla JavaScript
* Libraries only used for tests
* A simple JS Bundling tool is used to help keep the files organised
* Javascript files to be 100% covered by unit test 

### Tools Used:
 * Parcel - A low config bundling tool
 * Jest - Unit test tool (quite to get up and running), (Part of CI)
 * ESlint - The standard in (Part of CI)
   * AIRBNB Rules - Applied
   * Security Rules - Applied
 * Github - SCM 
 * Travis CI - Continuous integration tool with support for Sonar Cloud (CI)
 * Sonar Cloud - Static code analyses (Part of CI)
 * NSP - Node security test (Part of CI)
 * Cypress - E2E testing tool, quick to setup (Part of CI)
 * Greenkeeper - Monitors and updates dependencies (Scans GITHUB repo)
 * Snyk - Monitors for vulnerabilities in packages (Scans GITHUB repo)
 * Husky - Tool to help intgrate local githooks for pre-commit and pre-push
   * Pre-commit - Runs ESLint
   * Pre-push - Runt Unit and E2E tests
 
### If time was no option 
 * Security Headers (However content would need to be served using a HTTPD server e.g. Express, Nginx)
 * Scan security headers using [ahead](https://github.com/mrosenquist/ahead) 
 * Support PWA (would need to be serverd over HTTPS) 
 
### Attribution
 * Hand images from wikipedia
 * Quick generation of Favicon / Shortcuts using [realfavicongenerator](https://realfavicongenerator.net)
