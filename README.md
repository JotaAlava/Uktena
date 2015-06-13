# Uktena
Mythological Productivity

# Required Config File
A config module is required, it should look like this:

var config = function () {
    var self = this;
    self.env = process.env.NODE_ENV || 'development';

    switch (self.env) {
        case 'development':
            self.mongoConnectionString = 'yourconnectionstringhere';
            self.web = {
                port:process.env.WEB_PORT || 667
            };
            self.uktenaDb = 'uktenatest';
            self.tomatoCollection = 'tomato';
            break;
        case 'staging':
            //TODO: Complete this info
            break;
        case 'production':
            self.mongoConnectionString = 'yourconnectionstringhere';
            self.web = {
                port:process.env.WEB_PORT || 667
            };
            self.uktenaDb = 'uktena';
            self.tomatoCollection = 'tomato';
            break;
    }


    return self;
};

module.exports = new config();
