var logTemperature = new Float32Array(200); // our logged temperature data
var logBatteryPercentage = new Float32Array(200); // our logged battery % data
var logIndex = 0; // index of last logged data item
var timePeriod = 600*1000; // every 10 minutes
var lastReadingTime; // time of last reading

// Store data into RAM
function storeMyData(temperature, batteryPercentage) {
  LED2.write(1);
  logIndex++;
  if (logIndex>=logTemperature.length) logIndex=0;
  logTemperature[logIndex] = temperature;
  logBatteryPercentage[logIndex] = batteryPercentage;
  LED2.write(0);
}

// Get Data and store it in RAM
function getData() {
  LED1.write(1);
  var temperature = E.getTemperature();
  var batteryPercentage = Puck.getBatteryPercentage();
  storeMyData(temperature, batteryPercentage);
  lastReadingTime = Date.now();
  LED1.write(0);
}

// Dump our data in a human-readable format
function exportData() {
  LED3.write(1);
  for (var i=1;i<=logTemperature.length;i++) {
    var time = new Date(lastReadingTime - (logTemperature.length-i)*timePeriod);
    var temperature = logTemperature[(i+logIndex)%logTemperature.length];
    var batteryPercentage = logBatteryPercentage[(i+logIndex)%logBatteryPercentage.length];
    console.log(time.toString()+"\t"+temperature+"\t"+batteryPercentage);
  }
  LED3.write(0);
}

// Start recording
setInterval(getData, timePeriod);