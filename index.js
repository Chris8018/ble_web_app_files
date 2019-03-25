/**
 * @author Trieu Vi Tran - 15800120
 * @version 1.0.0
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

  conButton.onclick = e => {
      ti_sensortag = new MotionSensor();
      ti_sensortag.connect();

      ti_sensortag.onStateChange(state => {
          // code

          displayData();
      })
  }

  function displayData() {
      // code
  }

  disButton.onclick = e => {
      ti_sensortag.disconnect();
  }
}
  