/**
 * @author Trieu Vi Tran - 15800120
 * @version 1.0.0
 */

/**
 * Waiting for site to load before running
 */
window.onload = function () {
    // Check if browser support Web bluetooth API
    if ('bluetooth' in navigator === false) {
        alert('Browser does not support the Web Bluetooth API');
    }

    let conB1 = document.getElementById('connect1');
    let disB1 = document.getElementById('disconnect1');
    
    let ti_sensortag1;
    let gyroDataReal1 = [];
    let gyroDataSmoothed1 = [];

    let accDataReal1 = [];
    let accDataSmothed1 = [];

    // let magData;

    conB1.onclick = e => {
        ti_sensortag1 = new MotionSensor();
        ti_sensortag1.connect();

        ti_sensortag1.onStateChange(state => {
            gyroDataReal1.push(state.gyroData);
            accDataReal1.push(state.accData);
            // gyroData = state.gyroData;
            // accData = state.accData;
            // magData = state.magData;

            displayData();
        })
    }

    function displayData() {

        if (gyroDataReal1.length > 0) {
            let tempGyro = gyroDataReal1[gyroDataReal1.length - 1];
            // Data smoothing here
            document.getElementById('gyroX').innerHTML = tempGyro.x;
            document.getElementById('gyroY').innerHTML = tempGyro.y;
            document.getElementById('gyroZ').innerHTML = tempGyro.z;
        }

        if (accDataReal1.length > 0) {
            let tempAcc = accDataReal1[accDataReal1.length - 1];
            // Data smoothing here
            document.getElementById('accX').innerHTML = tempAcc.x;
            document.getElementById('accY').innerHTML = tempAcc.y;
            document.getElementById('accZ').innerHTML = tempAcc.z;
        }

        // if (magData) {
        //     document.getElementById('magX').innerHTML = magData.x;
        //     document.getElementById('magY').innerHTML = magData.y;
        //     document.getElementById('magZ').innerHTML = magData.z;
        // }
    }

    disB1.onclick = e => {
        ti_sensortag.disconnect();
    }

    let conB2 = document.getElementById('connect2');
    let disB2 = document.getElementById('disconnect2');

    let ti_sensortag2;
    let gyroDataReal2 = [];
    let gyroDataSmoothed2 = [];

    let accDataReal2 = [];
    let accDataSmoothed2 = [];

    function smoothingData() {
        // implelment
    }
}
