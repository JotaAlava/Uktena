/**
 * Created by Jose on 6/29/2015.
 */
'use strict';
var cookieSvc, sandbox, fakePromise, $interval;

describe("cookieSvc", function () {
    beforeEach(module('uktena'));

    beforeEach(inject(function ($injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $interval = $injector.get('$interval');
        cookieSvc = $injector.get('cookieSvc');
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('will expose a get function', function () {
        cookieSvc.get.should.be.ok;
    });

    it('will expose a set function', function () {
        cookieSvc.set.should.be.ok;
    });

    // TODO: This svc should be replaced by the native angular cookie Svc
});