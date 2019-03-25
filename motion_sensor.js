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
            console.log('Get Motion Service');
            pointer = s;
            return pointer.getCharacteristic(configChar);
        })
        .then(config => {
            // Byte 1:
            // 0 0 0 0 0 0 0 0
            // ^ ^ ^ ^ ^ ^ ^ ^
            // | | | | | | | |
            // | | | | | | | Gyro Z
            // | | | | | | Gyro Y
            // | | | | | Gyro X
            // | | | | Accel. Z
            // | | | Accel. Y
            // | | Accel. X
            // | Magnetometer (all axes)
            // Wake up on motion

            // Byte 2:
            // 0 0 0 0 0 0 0 0
            //             ^ ^
            //             | |
            //             Accelerometer range (0 (00)=2G, 1 (01)=4G, 2 (10)=8G, 3 (11)=16G)

            console.log('Get Motion Config');
            let value = new Uint8Array([0b01111111,0b00000000]);
            config.writeValue(value);
        })
        .then(_ => {
            console.log('Finish writing to config');
            return pointer.getCharacteristic(dataChar);
        })
        .then(data => {
            console.log('Enable notification for Motion');
            data.startNotifications()
            .then(_ => {
                data.addEventListener('characteristicvaluechanged', self.handleMotion);
            });
        })
        .catch(e => {
            console.trace('Error' + e);
        })
    }

    handleMotion() {
        // code
        let raw_data = event.target.value;
    }

    combineRawData(data1, data2) {
        // data2 + data1
        if (data1.length < 2)
            data1 = '0' + data1;

        if (data2.length < 2)
            data2 = '0' + data2;

        return parseInt('0x' + data2 + data1, 16);
    }

    onStateChangeCallback() {}

    onStateChange(callback){
        self.onStateChangeCallback = callback;
    }
}
