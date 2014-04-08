/**
* Created by sungwoo on 14. 4. 3.
*/
/// <reference path="../def/node.d.ts" />
/// <reference path="../def/mocha.d.ts" />
/// <reference path="../def/async.d.ts" />
/// <reference path="../def/should.d.ts" />
var octopus = require('../octopus');

describe('octopus services', function () {
    var service;
    var fitServiceList;
    before(function (done) {
        service = new octopus.CMetaService();
        service.GetServiceList(function (serviceList) {
            fitServiceList = serviceList;
            console.log('count: ' + fitServiceList.length);
            done();
        });
    });

    it('should', function (done) {
    });
});
//# sourceMappingURL=test_service.js.map
