/**
 * Created by sungwoo on 14. 4. 3.
 */

/// <reference path="../def/node.d.ts" />
/// <reference path="../def/mocha.d.ts" />
/// <reference path="../def/async.d.ts" />
/// <reference path="../def/should.d.ts" />

import octopus = require('../octopus');

describe('octopus services', function() {

    var service: octopus.CMetaService;
    var fitServiceList: octopus.TService[];
    before((done) => {
        service = new octopus.CMetaService();
        service.GetServiceList((serviceList) => {
            fitServiceList = serviceList;
            console.log('count: ' + fitServiceList.length);
            done();
        });
    });

    it('should', (done) => {

    });

});
