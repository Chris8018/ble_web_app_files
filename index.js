/**
 * @author Trieu Vi Tran - 15800120
 * @version 3.0
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

    conB1.onclick = e => {
        if (ti_sensortag1 === undefined || ti_sensortag1 === null) {
            ti_sensortag1 = new MotionSensor();
            ti_sensortag1.connect();

            ti_sensortag1.onStateChange(state => {
                gyroDataReal1.push(state.gyroData);
                accDataReal1.push(state.accData);

                displayData1();
            })
        } else {
            alert("This device is connected")
            console.log("This device is connected")
        }
    }

    function displayData1() {
        let tempGyro = gyroDataReal1[gyroDataReal1.length - 1];

        if (tempGyro) {
            document.getElementById('gyroX1').innerHTML = tempGyro.x;
            document.getElementById('gyroY1').innerHTML = tempGyro.y;
            document.getElementById('gyroZ1').innerHTML = tempGyro.z;
        }

        let tempAcc = accDataReal1[accDataReal1.length - 1];

        if (tempAcc) {
            document.getElementById('accX1').innerHTML = tempAcc.x;
            document.getElementById('accY1').innerHTML = tempAcc.y;
            document.getElementById('accZ1').innerHTML = tempAcc.z;
        }
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

    conB2.onclick = e => {
        if (ti_sensortag2 === undefined || ti_sensortag2 === null) {
            ti_sensortag2 = new MotionSensor2();
            ti_sensortag2.connect();

            ti_sensortag2.onStateChange(state => {
                gyroDataReal2.push(state.gyroData);
                accDataReal2.push(state.accData);

                displayData2();
            })
        } else {
            alert("This device is connected")
            console.log("This device is connected")
        }
    }

    function displayData2() {
        let tempGyro = gyroDataReal2[gyroDataReal2.length - 1];

        if (tempGyro) {
            document.getElementById('gyroX2').innerHTML = tempGyro.x;
            document.getElementById('gyroY2').innerHTML = tempGyro.y;
            document.getElementById('gyroZ2').innerHTML = tempGyro.z;
        }

        let tempAcc = accDataReal2[accDataReal2.length - 1];

        if (tempAcc) {
            document.getElementById('accX2').innerHTML = tempAcc.x;
            document.getElementById('accY2').innerHTML = tempAcc.y;
            document.getElementById('accZ2').innerHTML = tempAcc.z;
        }
    }

    function smoothingData() {
        // implelment
    }
}
