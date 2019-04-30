const Log4JS = require('log4js');
global.Log = Log4JS.getLogger('Janus');
Log.level = 'debug';

Log.info('Initializing...');
const JsonConfiguration = require('./util/JsonConfiguration');
const Config = new JsonConfiguration(__dirname + '/../janus.json');

Log.info('Loading configuration...');
Config.defaults
(
    {
        port: 2205,
        redirections: [
            {
                'key': 'test',
                'url': 'https://example.com'
            }
        ]
    }
);
Config.save();

Log.info('Configuration loaded. Starting express-service...');
const express = require('express');
const app = express();

try
{
    const Redirections = require('./routing/Redirections');
    const Router = new Redirections(Config);

    app.use( (req, res) => Router.resolve(req, res) );
    app.listen(Config.get('port'));
    Log.info('Listening on ' + Config.get('port'));
}
catch (e)
{
    Log.fatal('Unable to start express-service: ' + e);
}