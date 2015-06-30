/**
 * Created by Jose on 6/29/2015.
 */
angular.module('uktena')
    .factory('cookieSvc', [function () {
        var self = this;

        // Will return a cookie by name
        self.get = function (cname) {
            cname = 'uktena';
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }

            return "";
        };

        // Will set a cookie - that expires today
        self.set = function (userId) {
            var tomorrow = new Date();
            tomorrow.setDate((new Date()).getDate()+1);

            var result = 'uktena=' + userId + '; expires=' + tomorrow.toUTCString();

            document.cookie = result;
        };

        return self;
    }]);