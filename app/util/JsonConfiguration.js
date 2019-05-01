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

const fs = require('fs');

/**
 * A simple json based configuration.
 */
class JsonConfiguration
{

    /**
     * Construction of JsonConfiguration
     * @param {string} file
     */
    constructor(file)
    {
        this.file = file;
        this.configuration = fs.existsSync(file) ? JSON.parse( fs.readFileSync(file) ) : {};
    }

    /**
     * Set multiple defaults from array.
     * @param {object} defaults
     */
    defaults(defaults)
    {
        for ( let key in defaults )
        {
            this.default(key, defaults[key]);
        }
    }

    /**
     * Set a properties defaults value.
     * @param {string} property
     * @param {string|number|object} value
     */
    default(property, value)
    {
        if (!this.isset(property)) this.set(property, value);
    }

    /**
     * True if the given property is set.
     * @param {string} property
     * @returns {boolean}
     */
    isset(property)
    {
        return this.configuration.hasOwnProperty(property);
    }

    /**
     * Set the value of the given property.
     * @param {string} property
     * @param {string|number|object} value
     */
    set(property, value)
    {
        this.configuration[property] = value;
    }

    /**
     * Get the value of the given property.
     * @param {string} property
     */
    get(property)
    {
        return this.configuration[property];
    }

    /**
     * Saves the configuration to a file.
     * @param {string} file
     */
    save(file = this.file)
    {
        fs.writeFileSync(file, JSON.stringify( this.configuration, null, 4 ));
    }

}
module.exports = JsonConfiguration;
