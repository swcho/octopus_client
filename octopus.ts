/**
 * Created by sungwoo on 14. 4. 3.
 */

/// <reference path="def/node.d.ts" />

var dbus = require('node-dbus');

var sAddress = 'tcp:host=192.168.123.4,port=55884'
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
    uid: number;
    typeOf: string;
    version: number;
    onid: number;
    name: string;
    deliType: number;
}

export interface TTransponderInfo {
    uid: number;
    typeOf: string;
    version: number;
    netuid: number;
    tsid: number;
    onid: number;
    tunerid: number;
    deliType: number;
    eDeliType: number;
}

export interface TProviderInfo {
    uid: number;
    typeOf: string;
    version: number;
    name: string;
}

export interface TGroupInfo  {
    uid: number;
    typeOf: string;
    version: number;
    id: number;
    name: string;
}

export interface TBouquetInfo {
    uid: number;
    typeOf: string;
    version: number;
    id: number;
    name: string;
}

export interface TChannelLogoInfo {
    svcuid: number;
    ucServerLogoUrl: string;
    ucLocalLogoUrl: string;
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
    };
    return ret;
}

function convert_network(aDBusData: any): TNetworkInfo {
    var ret: TNetworkInfo = {
        uid: aDBusData[0],
        typeOf: aDBusData[1],
        version: aDBusData[2],
        onid: aDBusData[3],
        name: aDBusData[4],
        deliType: aDBusData[5]
    };
    return ret;
}

function convert_transponder(aDBusData: any): TTransponderInfo {
    var ret: TTransponderInfo = {
        uid: aDBusData[0],
        typeOf: aDBusData[1],
        version: aDBusData[2],
        netuid: aDBusData[3],
        tsid: aDBusData[4],
        onid: aDBusData[5],
        tunerid: aDBusData[6],
        deliType: aDBusData[7],
        eDeliType: aDBusData[8]
    };
    return ret;
}

function convert_provider(aDBusData: any): TProviderInfo {
    var ret: TProviderInfo = {
        uid: aDBusData[0],
        typeOf: aDBusData[1],
        version: aDBusData[2],
        name: aDBusData[3]
    };
    return ret;
}

function convert_group(aDBusData: any): TGroupInfo {
    var ret: TGroupInfo = {
        uid: aDBusData[0],
        typeOf: aDBusData[1],
        version: aDBusData[2],
        id: aDBusData[3],
        name: aDBusData[4]
    };
    return ret;
}

function convert_bouquet(aDBusData: any): TBouquetInfo {
    var ret: TBouquetInfo = {
        uid: aDBusData[0],
        typeOf: aDBusData[1],
        version: aDBusData[2],
        id: aDBusData[3],
        name: aDBusData[4]
    };
    return ret;
}

function convert_logo(aDBusData: any): TChannelLogoInfo {
    var ret: TChannelLogoInfo = {
        svcuid: aDBusData[0],
        ucServerLogoUrl: aDBusData[1],
        ucLocalLogoUrl: aDBusData[2]
    }
    return ret;
}

export function compare_service(aA: TService, aB: TService): boolean {
    if (aA.uid != aB.uid) {
        return false;
    }
    return true;
}

export class CDBusInterface {
    private _dbusMsg;
    private _onResponseCb: Function;
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
            if (this._onResponseCb) {
                this._onResponseCb(data);
            }
        });

        dbusMsg.on ("error", function (error) {
            console.log ("[FAILED] ERROR -- ");
            console.log(error);
        });

        this._dbusMsg = dbusMsg;
    }
    _onResponse(aCb: (aData: any) => void) {
        this._onResponseCb = aCb;
    }
    _call(aName: string, ...aArgs: any[]) {
        var callback = aArgs.pop();
        this._onResponse(callback);
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

export class CMetaService extends CDBusInterface {
    constructor() {
        super('Octopus.Appkit.Meta.Service', '/Octopus/Appkit/Meta/Service');
    }
    GetService(aUid: number, aCb: (service: TService) => void) {
        this._call('GetService', aUid, (data: any) => {
            aCb(convert_service(data));
        });
    }
    GetNetwork(aUid: number, aCb: (networkInfo: TNetworkInfo) => void) {
        this._call('GetNetwork', aUid, (data: any) => {
            aCb(convert_network(data));
        });
    }
    GetTransponder(aUid: number, aCb: (transponderInfo: TTransponderInfo) => void) {
        this._call('GetTransponder', aUid, (data: any) => {
            aCb(convert_transponder(data));
        });
    }
    GetProvider(aUid: number, aCb: (providerInfo: TProviderInfo) => void) {
        this._call('GetProvider', aUid, (data: any) => {
            aCb(convert_provider(data));
        });
    }
    GetGroup(aUid: number, aCb: (groupInfo: TGroupInfo) => void) {
        this._call('GetGroup', aUid, (data: any) => {
            aCb(convert_group(data));
        });
    }
    GetBouquet(aUid: number, aCb: (bouquetInfo: TBouquetInfo) => void) {
        this._call('GetBouquet', aUid, (data: any) => {
            aCb(convert_bouquet(data));
        });
    }
    GetLogoUrl(aUid: number, aBufChannelLogoInfo: any, aCb: (channelLogoInfo: TChannelLogoInfo) => void) {
        this._call('GetLogoUrl', aUid, (data: any) => {
            aCb(convert_logo(data));
        });
    }
    GetServiceTriplet(aUid: number, aTsid: number, aOnid: number, aSid: number, aCb: (triplet: any) => void) {

    }
    FindServiceByTriplet(aOnId: number, aTsId: number, aSvcid: number, aCb:(service: TService) => void) {

    }
    FindServiceByNumber(aNumber: number, aCb: (service: TService) => void) {

    }
    GetServiceList(aCb: (serviceList: TService[]) => void) {
        this._call('GetServiceList', (data) => {
            var serviceList = [];
            data.forEach((s) => {
                serviceList.push(convert_service(s));
            });
            aCb(serviceList);
        });
    }
    GetGroupList(aCb: (groupList: TGroupInfo[]) => void) {
        this._call('GetGroupList', (data) => {
            var groupList = [];
            data.forEach((g) => {
                groupList.push(convert_group(g));
            });
            aCb(groupList);
        })
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

export function set_config(aConnectionConfig: string) {
    sAddress = aConnectionConfig;
}