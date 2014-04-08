/**
 * Created by sungwoo on 14. 4. 3.
 */

/// <reference path="../def/node.d.ts" />
/// <reference path="../def/mocha.d.ts" />
/// <reference path="../def/async.d.ts" />
/// <reference path="../def/should.d.ts" />

import octopus = require('../octopus');
var should = require('should');

describe('octopus services', function() {

    var service: octopus.CMetaService;
    var fitServiceList: octopus.TService[];
    before((done) => {
        service = new octopus.CMetaService();
        console.log('fixture set up');
        service.GetServiceList((serviceList) => {
            fitServiceList = serviceList;
            console.log('count: ' + fitServiceList.length);
            done();
        });
    });

    it('should', (done) => {
        var s = fitServiceList[0];
        console.log(s);
        service.GetService(s.uid, (service: octopus.TService) => {
            console.log(service);
            should(octopus.compare_service(s, service)).ok;
            done();
        });
    });

});
