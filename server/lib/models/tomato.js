/**
 * Created by Jose on 3/29/2015.
 */
module.exports = function (description, dateCreated) {
    'use strict';

    var self = this;
    self.dateCreated = dateCreated || new Date();
    self.description = description || '';
};