/**
 * Created by Jose on 6/28/2015.
 */
var config = function () {
    var self = this;
    self.env = process.env.NODE_ENV || 'development';

    switch (self.env) {
        case 'development':
            self.mongoConnectionString = 'localhost:27018';
            self.web = {
                port:process.env.WEB_PORT || 3030
            };
            self.uktenaDb = 'uktenatest';
            self.tomatoCollection = 'tomato';
            self.userCollection = 'user';
            break;
        case 'staging':
            //TODO: Complete this info
            break;
        case 'production':
            self.mongoConnectionString = process.env.MONGO_LABS;
            self.web = {
                port:process.env.WEB_PORT || 3030
            };
            self.uktenaDb = 'uktena';
            self.tomatoCollection = 'tomato';
            self.userCollection = 'user';
            break;
    }


    return self;
};

module.exports = new config();