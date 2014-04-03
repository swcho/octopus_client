/**
* Created by sungwoo on 14. 4. 3.
*/
/// <reference path="def/node.d.ts" />
/// <reference path="def/dbus.d.ts" />
var dbus = require('node-dbus');

var dbusMsg = Object.create(dbus.DBusMessage, {
    address: {
        value: 'tcp:host=192.168.0.2,port=55884'
    },
    destination: {
        value: 'Octopus.Appkit.Meta.Service'
    },
    path: {
        value: '/Octopus/Appkit/Meta/Service'
    },
    iface: {
        value: 'Octopus.Appkit.Meta.Service'
    },
    member: {
        value: 'GetServiceList',
        //value: 'Properties',
        writable: true
    },
    bus: {
        value: dbus.DBUS_BUS_SESSION
    },
    type: {
        value: dbus.DBUS_MESSAGE_TYPE_METHOD_CALL,
        writable: true
    }
});

dbusMsg.on("methodResponse", function (arg) {
    console.log("[PASSED] Got method response with data ::");
    console.log(arguments);
    arguments[0].forEach(function (s, i) {
        console.log('');
        console.log(i);
        console.log(s);
    });
});

dbusMsg.on("error", function (error) {
    console.log("[FAILED] ERROR -- ");
    console.log(error);
});


var CMetaService = (function () {
    function CMetaService() {
    }
    CMetaService.prototype.GetServiceList = function () {
        dbusMsg.clearArgs();
        dbusMsg.member = 'GetServiceList';
        dbusMsg.send();
    };
    return CMetaService;
})();

var metaSvc = new CMetaService();
metaSvc.GetServiceList();
//# sourceMappingURL=octopus.js.map
