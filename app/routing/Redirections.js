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