// Move this to index.js
/**
 * @author Trieu Vi Tran - 15800120
 * @version 0.2.0
 */

 /**
  * Waiting for site to load before running
  */
window.onload = function() {
    let conButton = document.getElementById('connect');
    let disButton = document.getElementById('disconnect');
    
    // Check if browser support Web bluetooth API
    if ('bluetooth' in navigator === false) {
        //button.style.display = 'none';
        //message.innerHTML = 'Browser does not support the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API" target="_blank">Web Bluetooth API</a>';
    }

    let ti_sensortag;
    let data;

    conButton.onclick = e => {
        ti_sensortag = new TISensorTag();
        ti_sensortag.connect();

        ti_sensortag.onStateChange(state => {
            //code

            displayData();
        })
    }

    function displayData() {
        //code
    }

    disButton.onclick = e => {
        //code
    }
}

const services = {
    deviceInfo: {
        name: 'Device Information Service',
        uuid: '0000180a-0000-1000-8000-00805f9b34fb'
    },
    irTemp: {
        name: 'IR Temperature Service',
        uuid: 'f000aa00-0451-4000-b000-000000000000'
    },
    humidity: {
        name: 'Humidity Service',
        uuid: 'f000aa20-0451-4000-b000-000000000000'
    }
}

const characteristics = {
    deviceInfo:{ 
        modelName: {
            name: 'Model Number String',
            uuid: '00002a24-0000-1000-8000-00805f9b34fb'
        }
    },
    irTemp: {
        data: {
            name: 'IR Temperature Data',
            uuid: 'f000aa01-0451-4000-b000-000000000000'
        },
        config: {
            name: 'IR Temperature Configuration',
            uuid: 'f000aa02-0451-4000-b000-000000000000'
        },
        period: {
            name: 'IR Temperature Period',
            uuid: 'f000aa03-0451-4000-b000-000000000000'
        }
    },
    humidity: {
        data: {
            name: 'Humidity Data',
            uuid: 'f000aa21-0451-4000-b000-000000000000'
        },
        config: {
            name: 'Humidity Configuration',
            uuid: 'f000aa22-0451-4000-b000-000000000000'
        },
        period: {
            name: 'Humidity Period',
            uuid: 'f000aa23-0451-4000-b000-000000000000'
        }
    }
}

let options = {
    acceptAllDevices: true,
    optionalServices: [services.deviceInfo.uuid]
};

var state = {};

class TISensorTag {
    constructor() {
        this.device;
        this.server;
        this.name;
        this.modelName;
        this.temperature;
        this.services = services;
        this.characteristics = characteristics;
    }

    connect() {
        return navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log('Found device');
            //code
            this.device = device;
            this.name = device.name;
            return device.gatt.connect();
        })
        .then(server => {
            console.log('Connect to server');
            this.server = server;
            this.getServices();
            //code
        })
        .catch(error => {
            console.trace('Error: ' + error);
        })
    }

    disconnect() {
        this.server.disconnect();
    }

    getServices() {
        getModelName();
    }

    getChar() {
        //code
    }

    getModelName() {
        this.server.getPrimaryService(this.services.deviceInfo.uuid)
        .then(service => {
            service.getCharacteristic(this.characteristics.deviceInfo.modelName.uuid);
        });
    }

    handleTempChange(event) {
        //code
    }

    convertoTemp(v1, v2) {
        //code
    }

}



function onScanButtonClick() {
    let options = {
        acceptAllDevices: true,
        optionalServices: [services.deviceInfo.uuid]
    };

    navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log(device);
            console.log('Request Device')
            return device.gatt.connect();
        })
        .then(server => {
            console.log(server);
            console.log('Try to get services')
            return server.getPrimaryService(services.deviceInfo.uuid);
        })
        .then(service =>{
            console.log(service);
            console.log('Try get characteristic')
            return service.getCharacteristic(characteristics.deviceInfo.modelName.uuid);
        })
        .then(char => {
            console.log('Got characteristic')
            console.log(char);
            return char.readValue();
        })
        .then(values => {
            console.log(values);
            let temp = '';
            for (var i = 0; i < 16; i++) {
                temp += String.fromCharCode(values.getUint8(i));
            }
            console.log(temp);
        })
        .catch(error => {
            console.log('Error: ' + error);
        });
}

// Turn data into ambient temperature
// var t = parseInt('0x0be4', 16);

// console.log(t);
// var t2 = t >> 2 & 0x3FFF;
// console.log(t2);
// var t3 = t2 * 0.03125;
// console.log(t3);

// Hex to ASCII
// function hex2a(hexx) {
//     var hex = hexx.toString();//force conversion
//     var str = '';
//     for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
//         str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
//     return str;
// }
