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