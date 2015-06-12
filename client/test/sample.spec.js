/**
 * Created by Jose on 5/2/2015.
 */
describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            should.equal(-1, [1,2,3].indexOf(5));
            should.equal(-1, [1,2,3].indexOf(0));
        })
    })
});