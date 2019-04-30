const JsonConfiguration = require('./../util/JsonConfiguration');
const express = require('express');

class Redirections
{

    /**
     * 
     * @param {JsonConfiguration} configuration 
     */
    constructor(configuration)
    {
        this.configuration = configuration;
    }

    getRedirections()
    {
        return this.configuration.get('redirections');
    }

    /**
     * 
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
                res.redirect(element.url);
            }
        });

        if (res.headersSent) return;
        res.status(404).send('This link is invalid!');
    }

}
module.exports = Redirections;