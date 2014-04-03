// https://www.npmjs.org/package/dbus-native
/// <reference path="node.d.ts" />

declare module "dbus-native" {
    import net = require('net');

    export interface Message {
        serial: number;
        flags: number;
        type: number;
        body: any[];

        // header
        path?;
        interface?;
        member?;
        errorName?;
        replySerial?;
        destination?;
        sender?;
        signature?;
    }

    export interface Connection extends EventEmitter {
        stream: net.NodeSocket;
        write(buf: NodeBuffer);
        end();
        message(msg: Message);
    }

    export interface DBusObject {
        name: string;
        service: string;
        proxy: any;
    }

    export interface DBusService {
        name: string;
        bus: Bus;
        getObject(name, callback);
        getInterface(objName: string, ifaceName: string, callback: (err: Error, intf: any) => void);
    }

    export interface Bus {
        invoke(msg, callback);
        invokeDbus(msg, callback);
        mangle(path, iface, member);
        sendSignal(path, iface, name, signature, args);
        sendError(msg, errorName, errorText);
        sendReply(msg, signature, body);
        connection: Connection;
        setMethodCallHandler(objectPath, iface, member, handler);
        exportInterface(obj, path, iface);
        getService(name: string): DBusService;
        getObject(path, name, callback): DBusObject;
        getInterface(path: string, objname: string, name: string, callback: (err: Error, obj: DBusObject) => void);
    }

    export interface TCreateClientParam {
        socket?: string; // unix socket path
        port?: number; // TCP port
        host?: string; // TCP host
        busAddress?: string;
    }

    export function createConnection();
    export function createClient(param: TCreateClientParam): Bus;
    export function systemBus();
    export function sessionBus(opts);
    export var messageType;
    export function createServer();
}