/**
 * Created by Jose on 5/2/2015.
 */
function generateFakePromise() {
    return {
        success: function (callback) {
            callback(5);
        },
        error: function (callback) {
            callback(5);
        },
        then: function (callback) {
            callback(5);
        }
    };
}
