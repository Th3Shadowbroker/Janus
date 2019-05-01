## Janus

[![travis-ci-build-status](https://travis-ci.com/Th3Shadowbroker/Janus.svg?branch=master)](https://travis-ci.com/Th3Shadowbroker/Janus)

Janus is a tiny webservice that's supposed to run behind a reverse proxy-configuration and
redirects incoming requests based on the first part of the host. So for example:


Let's assume the domain is test.example.com. In this case Janus looks at the first
part of the url (in this case "test") and get the target url based on the configuration.
According to the default configuration test will be redirected to example.com.

### Dependencies
- express
- log4js

### License
As I made this project for myself and cannot maintain it very activly it's licensed
under the MIT-License. Feel free to fork and contribute.
