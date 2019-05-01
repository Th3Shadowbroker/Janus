/*
 * Copyright (c) 2019 Jens Fischer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
