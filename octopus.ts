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
        value: dbus.DBUS_MESSAGE_TYPE_METHOD_CALL, // dbus.DBUS_MESSAGE_TYPE_METHOD_RETURN,
        writable: true
    }
});

dbusMsg.on ("methodResponse", function (arg) {
    console.log ("[PASSED] Got method response with data ::");
    console.log (arguments);
    arguments[0].forEach(function (s, i) {
        console.log('');
        console.log(i);
        console.log(s);
    });
});

dbusMsg.on ("error", function (error) {
    console.log ("[FAILED] ERROR -- ");
    console.log(error);
});

/*
 reval._1._1				=	(int32_t)pstService->uid;
 reval._1._2				=	std::string(pstService->typeOf);
 reval._1._3				=	(int32_t)pstService->version;
 reval._1._4				=	(int32_t)pstService->tsuid;
 reval._1._5				=	(int32_t)pstService->prvuid;
 reval._1._6				=	(int32_t)pstService->antuid;
 reval._1._7				=	(int32_t)pstService->grpuids[0];	//	!!!!!!!!!!!!!!!!!! 나머지 포함 확인 !!!!!
 reval._1._8				=	(int32_t)pstService->bqtuids[0];	//	!!!!!!!!!!!!!!!!!! 나머지 포함 확인 !!!!!

 reval._2._1				=	(int32_t)pstService->svcid;
 reval._2._2				=	(int32_t)pstService->tsid;
 reval._2._3				=	(int32_t)pstService->onid;

 reval._3._1				=	(int32_t)pstService->lcn;

 reval._4._1				=	std::string(pstService->name);
 reval._4._2				=	(uint32_t)pstService->svcType;
 reval._4._3				=	(uint32_t)pstService->orgSvcType;
 reval._4._4				=	(int32_t)pstService->optype;
 reval._4._5				=	(uint32_t)pstService->deliType;
 reval._4._6				=	std::string(pstService->satType);
 reval._4._7				=	(bool)pstService->visibleFlag;
 reval._4._8				=	(bool)pstService->locked;
 reval._4._9				=	(bool)pstService->removed;
 reval._4._10			=	(bool)pstService->renamed;

 reval._5._1				=	(int32_t)pstService->pmtPid;
 reval._5._2				=	(int32_t)pstService->pcrPid;
 reval._5._3				=	(int32_t)pstService->videoPid;
 reval._5._4				=	(int32_t)pstService->audioPid;
 reval._5._5				=	(int32_t)pstService->ttxPid;
 reval._5._6				=	(int32_t)pstService->audioAuxPid;
 reval._5._7				=	(int32_t)pstService->dolbyPid;

 reval._6._1				=	(uint32_t)pstService->highDefinition;
 reval._6._2				=	(uint32_t)pstService->casType;
 reval._6._3				=	(bool)pstService->dolbyFlag;
 reval._6._4				=	(uint32_t)pstService->videoCodec;
 reval._6._5				=	(uint32_t)pstService->audioCodec;
 reval._6._6				=	(uint32_t)pstService->audioAuxCodec;
 reval._6._7				=	(uint32_t)pstService->dolbyCodec;
 reval._6._8				=	(bool)pstService->lcnFlag;
 reval._6._9				=	(uint32_t)pstService->svcSection;
 */
interface TService {
    uid: number;
    typeOf: string;
}

class CMetaService {
    constructor() {

    }
    GetServiceList() {
        dbusMsg.clearArgs();
        dbusMsg.member = 'GetServiceList';
        dbusMsg.send();
    }
}

var metaSvc = new CMetaService();
metaSvc.GetServiceList();