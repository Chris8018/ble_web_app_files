/**
 * @author Trieu Vi Tran - 15800120
 * @version 1.0.0
 */

const services = {
    motion: {
        name: 'Motion Service',
        uuid: 'f000aa80-0451-4000-b000-000000000000'
    }
}

const characteristics = {
    motion: {
        data: {
            name: 'Data',
            uuid: 'f000aa81-0451-4000-b000-000000000000'
        },
        config: {
            name: 'Config',
            uuid: 'f000aa82-0451-4000-b000-000000000000'
        },
        period: {
            name: 'Period',
            uuid: 'f000aa83-0451-4000-b000-000000000000'
        }
    }
}

let options = {
    // acceptAllDevices: true,
	filters: [
            {name: 'CC2650 SensorTag'}
    ],
    optionalServices: [services.motion.uuid]
};

var self;
var state = {};

class MotionSensor {
    constructor() {
        self = this;
        this.services = services;
        this.characteristics = characteristics;
    }

    connect() {
        return navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log('Found device');
            self.device = device;
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Connect to server');
            self.server = server;
            self.getServices(self.server, [self.services.motion.uuid],
                [self.characteristics.data.uuid, self.characteristics.config.uuid,
                    self.characteristics.period.uuid]);
        })
        .catch(error => {
            console.trace('Error: ' + error);
        })
    }

    disconnect() {
        console.log('Disconnect device');
        self.server.disconnect();
    }

    reconnect() {
        if (self.device !== null) {
            console.log('Reconnect previous device');
            self.device.connect();
        }
        else {
            console.log('No previous device')
            alert('No previous device connected');
        }
    }

    getServices(server, services, characteristics) {
        getMotion(server, services[0], characteristics[0], characteristics[1], characteristics[2]);
    }

    getMotion(server, service, dataChar, configChar, periodChar) {
        var pointer;
        server.getPrimaryService(service)
        .then(s => {
            pointer = s;
            return pointer.getCharacteristic(configChar);
        })
        .then(config => {
            // code
        })
        .then(_ => {
            return pointer.getCharacteristic(dataChar);
        })
        .then(data => {
            // code
        })
        .catch(e => {
            console.trace('Error' + e);
        })
    }

    handleMotion() {
        // code
    }

    onStateChangeCallback() {}

    onStateChange(callback){
        self.onStateChangeCallback = callback;
    }
}
