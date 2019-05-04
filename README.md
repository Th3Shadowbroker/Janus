## Janus

[![travis-ci-build-status](https://travis-ci.com/Th3Shadowbroker/Janus.svg?branch=master)](https://travis-ci.com/Th3Shadowbroker/Janus)

Janus is a tiny webservice that's supposed to run behind a reverse proxy-configuration and
redirects incoming requests based on the first part of the host. So for example:


Let's assume the domain is test.example.com. In this case Janus looks at the first
part of the url (in this case "test") and get the target url based on the configuration.
According to the default configuration test will be redirected to example.com.

In case you're wondering why I created a whole microservice for that purpose: Some hosters offer only a limited amount of page-rules for registered domains and want extra money for these simple things that don't even need human interaction as they're fully automated processes. So basically I created this microservice for two simple reasons. First: It's easy to add more features (like stats etc.) and second: It allows you to use A-records at your DNS-Server instead of the limited page-rules.

### Dependencies
- express
- log4js

### License
As I made this project for myself and cannot maintain it very activly it's licensed
under the MIT-License. Feel free to fork and contribute.
