/**
* Created by sungwoo on 14. 4. 3.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="def/node.d.ts" />
var dbus = require('node-dbus');

var sAddress = 'tcp:host=192.168.0.2,port=55884';


function convert_service(aDBusData) {
    var ret = {
        uid: aDBusData[0],
        tsuid: aDBusData[1],
        prvuid: aDBusData[2],
        antuid: aDBusData[3],
        svcid: aDBusData[4],
        tsid: aDBusData[5],
        onid: aDBusData[6],
        lcn: aDBusData[7],
        svcType: aDBusData[8],
        deliType: aDBusData[9],
        casType: aDBusData[10],
        name: aDBusData[11],
        satType: aDBusData[12]
    };
    return ret;
}

function convert_network(aDBusData) {
    var ret = {
        uid: aDBusData[0],
        typeOf: aDBusData[1],
        version: aDBusData[2],
        onid: aDBusData[3],
        name: aDBusData[4],
        deliType: aDBusData[5]
    };
    return ret;
}

function compare_service(aA, aB) {
    if (aA.uid != aB.uid) {
        return false;
    }
    return true;
}
exports.compare_service = compare_service;

var CDBusInterface = (function () {
    function CDBusInterface(aDestination, aPath) {
        var _this = this;
        var dbusMsg = Object.create(dbus.DBusMessage, {
            address: {
                value: sAddress
            },
            destination: {
                value: aDestination
            },
            path: {
                value: aPath
            },
            iface: {
                value: aDestination
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
        dbusMsg.on("methodResponse", function (data) {
            if (_this._onResponse) {
                _this._onResponse(data);
            }
        });

        dbusMsg.on("error", function (error) {
            console.log("[FAILED] ERROR -- ");
            console.log(error);
        });

        this._dbusMsg = dbusMsg;
    }
    CDBusInterface.prototype.onResponse = function (aCb) {
        this._onResponse = aCb;
    };
    CDBusInterface.prototype.call = function (aName) {
        var aArgs = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            aArgs[_i] = arguments[_i + 1];
        }
        var _this = this;
        var callback = aArgs.pop();
        this.onResponse(callback);
        this._dbusMsg.clearArgs();
        aArgs.forEach(function (arg) {
            if (typeof arg == 'string') {
                _this._dbusMsg.appendArgs('s', arg);
            } else {
                _this._dbusMsg.appendArgs('i', arg);
            }
        });
        this._dbusMsg.member = aName;
        this._dbusMsg.send();
    };
    return CDBusInterface;
})();
exports.CDBusInterface = CDBusInterface;

var CMetaService = (function (_super) {
    __extends(CMetaService, _super);
    function CMetaService() {
        _super.call(this, 'Octopus.Appkit.Meta.Service', '/Octopus/Appkit/Meta/Service');
    }
    CMetaService.prototype.GetService = function (aUid, aCb) {
        this.call('GetService', aUid, function (data) {
            aCb(convert_service(data));
        });
    };
    CMetaService.prototype.GetNetwork = function (aUid, aCb) {
    };
    CMetaService.prototype.GetTransponder = function (aUid, aCb) {
    };
    CMetaService.prototype.GetProvider = function (aUid, aCb) {
    };
    CMetaService.prototype.GetGroup = function (aUid, aCb) {
    };
    CMetaService.prototype.GetBouquet = function (aUid, aCb) {
    };
    CMetaService.prototype.GetLogoUrl = function (aUid, aBufChannelLogoInfo, aCb) {
    };
    CMetaService.prototype.GetServiceTriplet = function (aUid, aTsid, aOnid, aSid, aCb) {
    };
    CMetaService.prototype.FindServiceByTriplet = function (aOnId, aTsId, aSvcid, aCb) {
    };
    CMetaService.prototype.FindServiceByNumber = function (aNumber, aCb) {
    };
    CMetaService.prototype.GetServiceList = function (aCb) {
        this.call('GetServiceList', function (data) {
            var serviceList = [];
            data.forEach(function (s) {
                serviceList.push(convert_service(s));
            });
            aCb(serviceList);
        });
    };
    CMetaService.prototype.GetGroupList = function (aCb) {
    };
    CMetaService.prototype.Load = function () {
    };
    CMetaService.prototype.Save = function () {
    };
    CMetaService.prototype.SetService = function (aService) {
    };
    CMetaService.prototype.AddService = function (aService) {
    };
    CMetaService.prototype.RemoveService = function (aService) {
    };
    CMetaService.prototype.Reset = function () {
    };
    CMetaService.prototype.LoadPreferredList = function () {
    };
    CMetaService.prototype.LoadupdatedList = function () {
    };
    CMetaService.prototype.ChangeUpdateFlag = function () {
    };
    CMetaService.prototype.RemoveServiceWithFlag = function () {
    };
    return CMetaService;
})(CDBusInterface);
exports.CMetaService = CMetaService;
//# sourceMappingURL=octopus.js.map
