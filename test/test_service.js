/**
* Created by sungwoo on 14. 4. 3.
*/
/// <reference path="../def/node.d.ts" />
/// <reference path="../def/mocha.d.ts" />
/// <reference path="../def/async.d.ts" />
/// <reference path="../def/should.d.ts" />
var octopus = require('../octopus');
var should = require('should');

describe('CMetaService', function () {
    var service;
    var fitServiceList;
    var fitFirstService;
    before(function (done) {
        service = new octopus.CMetaService();
        console.log('fixture set up');
        service.GetServiceList(function (serviceList) {
            fitServiceList = serviceList;
            console.log('count: ' + fitServiceList.length);
            fitFirstService = fitServiceList[0];
            console.log(fitFirstService);
            done();
        });
    });

    it('GetService', function (done) {
        service.GetService(fitFirstService.uid, function (service) {
            console.log(service);
            should(octopus.compare_service(fitFirstService, service)).ok;
            done();
        });
    });

    it('GetNetwork', function (done) {
        service.GetNetwork(fitFirstService.uid, function (networkInfo) {
            console.log(networkInfo);
            done();
        });
    });

    it('GetTransponder', function (done) {
        service.GetTransponder(fitFirstService.uid, function (transponderInfo) {
            console.log(transponderInfo);
            done();
        });
    });

    it('GetProvider', function (done) {
        service.GetProvider(fitFirstService.uid, function (providerInfo) {
            console.log(providerInfo);
            done();
        });
    });

    it('GetGroup', function (done) {
        service.GetGroup(fitFirstService.uid, function (groupInfo) {
            console.log(groupInfo);
            done();
        });
    });

    it('GetBouquet', function (done) {
        service.GetBouquet(fitFirstService.uid, function (bouquetInfo) {
            console.log(bouquetInfo);
            done();
        });
    });

    it('GetLogoUrl', function (done) {
        service.GetLogoUrl(fitFirstService.uid, null, function (channelLogoInfo) {
            console.log(channelLogoInfo);
            done();
        });
    });
});
//# sourceMappingURL=test_service.js.map
