/**
* Created by sungwoo on 14. 4. 3.
*/
/// <reference path="../def/node.d.ts" />
/// <reference path="../def/mocha.d.ts" />
/// <reference path="../def/async.d.ts" />
/// <reference path="../def/should.d.ts" />
var octopus = require('../octopus');
var should = require('should');

describe('octopus services', function () {
    var service;
    var fitServiceList;
    before(function (done) {
        service = new octopus.CMetaService();
        console.log('fixture set up');
        service.GetServiceList(function (serviceList) {
            fitServiceList = serviceList;
            console.log('count: ' + fitServiceList.length);
            done();
        });
    });

    it('should', function (done) {
        var s = fitServiceList[0];
        console.log(s);
        service.GetService(s.uid, function (service) {
            console.log(service);
            should(octopus.compare_service(s, service)).ok;
            done();
        });
    });
});
//# sourceMappingURL=test_service.js.map
