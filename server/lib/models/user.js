/**
 * Created by Jose on 3/29/2015.
 */
// TODO: Find out if I can include underscore globally and configure it such that I don't have to include in every module that uses it.
// This would allow me to create a repository of composeable functions for all to enjoy
var _ = require('underscore');

module.exports = function (username, password) {
    'use strict';

    var self = this;

    if (_.isNull(username) || _.isUndefined(username) || _.isNull(password) || _.isUndefined(password))
    {
        throw new Error('invalid credentials')
    }

    self.username = username;
    self.password = password;
};