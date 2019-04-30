const fs = require('fs');

class JsonConfiguration
{

    constructor(file)
    {
        this.file = file;
        this.configuration = fs.existsSync(file) ? JSON.parse( fs.readFileSync(file) ) : {};
    }

    defaults(defaults)
    {
        for ( let key in defaults )
        {
            this.default(key, defaults[key]);
        }
    }

    default(property, value)
    {
        if (!this.isset(property)) this.set(property, value);
    }

    isset(property)
    {
        return this.configuration.hasOwnProperty(property);
    }

    set(property, value)
    {
        this.configuration[property] = value;
    }

    get(property)
    {
        return this.configuration[property];
    }

    save(file = this.file)
    {
        fs.writeFileSync(file, JSON.stringify( this.configuration, null, 4 ));
    }

}
module.exports = JsonConfiguration;