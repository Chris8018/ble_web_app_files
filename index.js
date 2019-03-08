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
      alert('Browser does not support the Web Bluetooth API');
  }

  let ti_sensortag;
  let modelName;
  let irTempC;

  conButton.onclick = e => {
      ti_sensortag = new TISensorTag();
      ti_sensortag.connect();

      ti_sensortag.onStateChange(state => {
          modelName = state.modelName;
          irTempC = state.tempC;

          displayData();
      })
  }

  function displayData() {
      if (modelName) {
          let modelNamediv = document.getElementById('modelName');
          modelNamediv.innerHTML = modelName;
      }

      if (irTempC) {
        let irTempdiv = document.getElementById('tempC');
        irTempdiv.innerHTML = irTempC;
      }
  }

  disButton.onclick = e => {
      ti_sensortag.disconnect();
  }
}



// window.onload = function(){
//     let button = document.getElementById("connect");
//     let message = document.getElementById("message");
  
//     if ( 'bluetooth' in navigator === false ) {
//         button.style.display = 'none';
//         message.innerHTML = 'This browser doesn\'t support the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API" target="_blank">Web Bluetooth API</a> :(';
//     }
  
//     let renderer, scene, camera;
//     var mesh;
  
//     let accelerometerData, gyroscopeData, poseData, emgData,
//     orientationData, batteryLevel, armType, armSynced, myoDirection, myoLocked;
  
//     button.onclick = function(e){
//       var myoController = new MyoWebBluetooth("Myo");
//       myoController.connect();
  
//       myoController.onStateChange(function(state){
  
//         if(state.batteryLevel){
//           batteryLevel = state.batteryLevel + '%';
//         }
  
//         accelerometerData = state.accelerometer;
//         gyroscopeData = state.gyroscope;
//         poseData = state.pose;
//         emgData = state.emgData;
//         orientationData = state.orientation;
//         armType = state.armType;
//         armSynced = state.armSynced;
//         myoDirection = state.myoDirection;
//         myoLocked = state.myoLocked;
  
//         displayData();
  
//       });
//     }
  
//     function displayData(){
//       if(batteryLevel){
//         var batteryLevelDiv = document.getElementsByClassName('battery-data')[0];
//         batteryLevelDiv.innerHTML = batteryLevel;
//       }
  
//       if(armType){
//         var armTypeDiv = document.getElementsByClassName('arm-type-data')[0];
//         armTypeDiv.innerHTML = armType;
//       }
  
//       if(armSynced){
//         var armSyncedDiv = document.getElementsByClassName('arm-synced-data')[0];
//         armSyncedDiv.innerHTML = armSynced;
//       }
  
  //     if(myoDirection){
  //       var myoDirectionDiv = document.getElementsByClassName('myo-direction-data')[0];
  //       myoDirectionDiv.innerHTML = myoDirection;
  //     }
  
  //     if(myoLocked){
  //       var myoLockedDiv = document.getElementsByClassName('myo-locked-data')[0];
  //       myoLockedDiv.innerHTML = myoLocked;
  //     }
  
  //     if(poseData){
  //       var poseDiv = document.getElementsByClassName('pose-data')[0];
  //       poseDiv.innerHTML = poseData;
  
  //       var poseImage = document.getElementsByClassName('pose-image')[0];
  
  //       switch(poseData){
  //         case 'fist':
  //           poseImage.src = "images/fist.jpg";
  //           break;
  //         case 'wave out':
  //           poseImage.src = "images/wave-out.jpg";
  //           break;
  //         case 'wave in':
  //           poseImage.src = "images/wave-in.jpg";
  //           break;
  //         case 'double tap':
  //           poseImage.src = "images/double-tap.jpg";
  //           break;
  //         case 'fingers spread':
  //           poseImage.src = "images/fingers-spread.jpg";
  //           break;
  //       }
  //     }
  
  //     if(orientationData){
  //       var orientationXDiv = document.getElementsByClassName('orientation-x-data')[0];
  //       orientationXDiv.innerHTML = orientationData.x;
  
  //       var orientationYDiv = document.getElementsByClassName('orientation-y-data')[0];
  //       orientationYDiv.innerHTML = orientationData.y;
  
  //       var orientationZDiv = document.getElementsByClassName('orientation-z-data')[0];
  //       orientationZDiv.innerHTML = orientationData.z;
  //     }
  
  //     if(accelerometerData){
  //       var accelerometerXDiv = document.getElementsByClassName('accelerometer-x-data')[0];
  //       accelerometerXDiv.innerHTML = accelerometerData.x;
  
  //       var accelerometerYDiv = document.getElementsByClassName('accelerometer-y-data')[0];
  //       accelerometerYDiv.innerHTML = accelerometerData.y;
  
  //       var accelerometerZDiv = document.getElementsByClassName('accelerometer-z-data')[0];
  //       accelerometerZDiv.innerHTML = accelerometerData.z;
  //     }
  
  //     if(gyroscopeData){
  //       var gyroscopeXDiv = document.getElementsByClassName('gyroscope-x-data')[0];
  //       gyroscopeXDiv.innerHTML = gyroscopeData.x;
  
  //       var gyroscopeYDiv = document.getElementsByClassName('gyroscope-y-data')[0];
  //       gyroscopeYDiv.innerHTML = gyroscopeData.y;
  
  //       var gyroscopeZDiv = document.getElementsByClassName('gyroscope-z-data')[0];
  //       gyroscopeZDiv.innerHTML = gyroscopeData.z;
  //     }
  //   }
  
  // }
  