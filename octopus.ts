/**
 * Created by sungwoo on 14. 4. 3.
 */

/// <reference path="def/node.d.ts" />

var dbus = require('node-dbus');

var sAddress = 'tcp:host=192.168.0.2,port=55884'
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

export class CDBusInterface {
    private _dbusMsg;
    private _onResponse: Function;
    constructor(aDestination: string, aPath: string) {
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
                value: dbus.DBUS_MESSAGE_TYPE_METHOD_CALL, // dbus.DBUS_MESSAGE_TYPE_METHOD_RETURN,
                writable: true
            }
        });
        dbusMsg.on ("methodResponse", (data) => {
            if (this._onResponse) {
                this._onResponse(data);
            }
        });

        dbusMsg.on ("error", function (error) {
            console.log ("[FAILED] ERROR -- ");
            console.log(error);
        });

        this._dbusMsg = dbusMsg;
    }
    onResponse(aCb: (aData: any) => void) {
        this._onResponse = aCb;
    }
    call(aName: string, ...aArgs: any[]) {
        var callback = aArgs.pop();
        this.onResponse(callback);
        this._dbusMsg.clearArgs();
        aArgs.forEach((arg) => {
            if (typeof arg == 'string') {
                this._dbusMsg.appendArgs('s', arg);
            } else {
                this._dbusMsg.appendArgs('i', arg);
            }
        });
        this._dbusMsg.member = aName;
        this._dbusMsg.send();
    }
}

function convert_service(aDBusData: any): TService {
    var ret: TService = {
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
    }
    return ret;
}

export interface TService {
    uid: number;
    tsuid: number;
    prvuid: number;
    antuid: number;

    svcid: number;
    tsid: number;
    onid: number;

    lcn: number;

    svcType: number;
    deliType: number;
    casType: number;

    name: string;
    satType: string;
}

export interface TNetworkInfo {

}

export interface TTransponderInfo {

}

export interface TProviderInfo {

}

export interface TGroupInfo  {

}

export interface TBouquetInfo {

}

export interface TChannelLogoInfo {

}

export function compare_service(aA: TService, aB: TService): boolean {
    if (aA.uid != aB.uid) {
        return false;
    }
    return true;
}

export class CMetaService extends CDBusInterface {
    constructor() {
        super('Octopus.Appkit.Meta.Service', '/Octopus/Appkit/Meta/Service');
    }
    GetService(aUid: number, aCb: (service: TService) => void) {
        this.call('GetService', aUid, (data: any) => {
            aCb(convert_service(data));
        });
    }
    GetNetwork(aUid: number, aCb: (networkInfo: TNetworkInfo) => void) {
    }
    GetTransponder(aUid: number, aCb: (transponderInfo: TTransponderInfo) => void) {

    }
    GetProvider(aUid: number, aCb: (providerInfo: TProviderInfo) => void) {

    }
    GetGroup(aUid: number, aCb: (groupInfo: TGroupInfo) => void) {

    }
    GetBouquet(aUid: number, aCb: (bouquetInfo: TBouquetInfo) => void) {

    }
    GetLogoUrl(aUid: number, aBufChannelLogoInfo: any, aCb: (channelLogoInfo: TChannelLogoInfo) => void) {

    }
    GetServiceTriplet(aUid: number, aTsid: number, aOnid: number, aSid: number, aCb: (triplet: any) => void) {

    }
    FindServiceByTriplet(aOnId: number, aTsId: number, aSvcid: number, aCb:(service: TService) => void) {

    }
    FindServiceByNumber(aNumber: number, aCb: (service: TService) => void) {

    }
    GetServiceList(aCb: (serviceList: TService[]) => void) {
        this.call('GetServiceList', (data) => {
            var serviceList = [];
            data.forEach((s) => {
                serviceList.push(convert_service(s));
            });
            aCb(serviceList);
        });
    }
    GetGroupList(aCb: (groupList: TGroupInfo[]) => void) {

    }
    Load() {

    }
    Save() {

    }
    SetService(aService: TService) {

    }
    AddService(aService: TService) {

    }
    RemoveService(aService: TService) {

    }
    Reset() {

    }
    LoadPreferredList() {

    }
    LoadupdatedList() {

    }
    ChangeUpdateFlag() {

    }
    RemoveServiceWithFlag() {

    }

}
