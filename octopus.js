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

/*
reval._1 		=	(int32_t)pstSrc->uid;
reval._2 		=	(int32_t)pstSrc->tsuid;
reval._3 		=	(int32_t)pstSrc->prvuid;
reval._4 		=	(int32_t)pstSrc->antuid;
reval._5 		=	(int32_t)pstSrc->svcid;
reval._6 		=	(int32_t)pstSrc->tsid;
reval._7 		=	(int32_t)pstSrc->onid;
reval._8 		=	(int32_t)pstSrc->lcn;
reval._9 		=	(uint32_t)pstSrc->svcType;
reval._10 		=	(uint32_t)pstSrc->deliType;
reval._11 		=	(uint32_t)pstSrc->casType;
reval._12 		=	std::string(pstSrc->name);
reval._13 		=	std::string(pstSrc->satType);
*/
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
        aArgs.forEach(function (arg) {
            if (typeof arg == 'string') {
                _this._dbusMsg.appendArgs('s', arg);
            } else {
                _this._dbusMsg.appendArgs('i', arg);
            }
        });
        this._dbusMsg.clearArgs();
        this._dbusMsg.member = aName;
        this._dbusMsg.send();
    };
    return CDBusInterface;
})();

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

var CMetaService = (function (_super) {
    __extends(CMetaService, _super);
    function CMetaService() {
        _super.call(this, 'Octopus.Appkit.Meta.Service', '/Octopus/Appkit/Meta/Service');
    }
    CMetaService.prototype.GetService = function (aUid, aCb) {
        this.call('GetService', aUid, aCb);
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
    return CMetaService;
})(CDBusInterface);

var metaSvc = new CMetaService();
metaSvc.GetServiceList(function (serviceList) {
    console.log(serviceList);
});
//# sourceMappingURL=octopus.js.map
