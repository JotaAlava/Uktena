/**
 * Created by Jose on 6/11/2015.
 */
var should = require("chai").should(),
    TomatoCtor = require('../../../lib/models/tomato');

describe('tomato model', function () {
    it('will be created with a default date of today and a blank description when built without parameters', function () {
        // Arrange
        var expectedDate = new Date();

        // Act
        var actualResult = new TomatoCtor();

        // Assert
        actualResult.dateCreated.getDate().should.equal(expectedDate.getDate());
        actualResult.dateCreated.getDay().should.equal(expectedDate.getDay());
        actualResult.dateCreated.getYear().should.equal(expectedDate.getYear());

        actualResult.description.should.equal('');
    });

    it('will be created with the given date and description', function () {
        // Arrange
        var expectedDate = new Date(),
            expectedDescription = 'test';

        // Act
        var actualResult = new TomatoCtor(expectedDescription, expectedDate);

        // Assert
        actualResult.dateCreated.should.equal(expectedDate);
        actualResult.description.should.equal(expectedDescription);
    });
});