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

const JsonConfiguration = require('./../util/JsonConfiguration');
const express = require('express');

/**
 * The class that is used to resolve the way a request should go.
 */
class Redirections
{

    /**
     * Construction of Redirections.
     * @param {JsonConfiguration} configuration
     */
    constructor(configuration)
    {
        this.configuration = configuration;
    }

    /**
     * Get the array containing all redirections objects.
     */
    getRedirections()
    {
        return this.configuration.get('redirections');
    }

    /**
     * Resolves a request.
     * @param {Request} req
     * @param {Response} res
     */
    resolve(req, res)
    {
        let hostname = req.headers.host.split(".")[0].split(":")[0];
        Log.info("Received request from " + req.connection.remoteAddress + ": " + hostname + "...");

        this.getRedirections().forEach(element =>
        {
            if (element.key === hostname.toLowerCase())
            {
                Log.info("Request resolved: " + hostname.toLowerCase() + " -> " + element.url);
                res.redirect(302, element.url);
            }
        });

        if (res.headersSent) return;
        res.status(404).send('This link is invalid!');
    }

}
module.exports = Redirections;
