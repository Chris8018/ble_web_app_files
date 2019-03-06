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
            name: '',
            uuid: ''
        },
        period: {
            name: '',
            uuid: ''
        }
    },
    humidity: {
        data: {
            name: 'Humidity Data',
            uuid: 'f000aa21-0451-4000-b000-000000000000'
        },
        config: {
            name: '',
            uuid: ''
        },
        period: {
            name: '',
            uuid: ''
        }
    }
}

function onScanButtonClick() {
    let options = {
        acceptAllDevices: true,
        optionalServices: [services.deviceInfo.uuid]
    };

    var handleValueChange = (event) => {
        let data = event.target.value;
        console.log(data.getInt8(0));
    }

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
            //return service.getCharacteristic(characteristics.deviceInfoModelName.uuid);
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
