/**
 * Created by Jose on 5/2/2015.
 */
/**
 * Created by Jose on 4/11/2015.
 */
'use strict';
var tomatoSvc, sandbox, fakePromise, $interval;

describe("tomatoSvc", function () {
    beforeEach(module('uktena'));

    beforeEach(inject(function ($injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $interval = $injector.get('$interval');
        tomatoSvc = $injector.get('tomatoesSvc');
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('will expose a get function', function () {
        tomatoSvc.get.should.be.ok;
    });

    it('will expose a set function', function () {
        tomatoSvc.set.should.be.ok;
    });

    // TODO: This svc should be replaced by the native angular cookie Svc
});