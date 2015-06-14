/**
 * Created by Jose on 6/11/2015.
 */
var assert = require("chai").assert,
    UserCtor = require('../../../lib/models/user');

describe('user model', function () {
    it('will throw error if no values are passed it for username and password', function () {
        // Act & Assert
        assert.throws(UserCtor, Error, "invalid credentials");
    });

    it('will throw error if no value is passed it for password', function () {
        // Arrange
        function oneParamInvocationMockation() {
            new UserCtor('username')
        }

        // Act
        assert.throws(oneParamInvocationMockation, Error, "invalid credentials");
    });

    it('will throw error if no value is passed it for username', function () {
        // Arrange
        function oneParamInvocationMockation() {
            new UserCtor(undefined,'pwd')
        }

        // Act
        assert.throws(oneParamInvocationMockation, Error, "invalid credentials");
    });

    it('will throw error if null is passed for username', function () {
        // Arrange
        function oneParamInvocationMockation() {
            new UserCtor(null,'pwd')
        }

        // Act
        assert.throws(oneParamInvocationMockation, Error, "invalid credentials");
    });

    it('will be created with the given username & password', function () {
        // Arrange
        var expectedUsername = 'username',
            expectedPwd = 'pwd';

        // Act
        var actualResult = new UserCtor(expectedUsername, expectedPwd);

        // Assert
        actualResult.username.should.equal(expectedUsername);
        actualResult.password.should.equal(expectedPwd);
    });
});