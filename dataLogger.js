var log = new Float32Array(100); // our logged data
var logIndex = 0; // index of last logged data item
var timePeriod = 600*1000; // every 10 minutes
var lastReadingTime; // time of last reading

// Store data into RAM
function storeMyData(data) {
  logIndex++;
  if (logIndex>=log.length) logIndex=0;
  log[logIndex] = data;
}

// Get Data and store it in RAM
function getData() {
  LED3.write(1);
  var data = E.getTemperature();
  storeMyData(data);
  lastReadingTime = Date.now();
  LED3.write(0);
}

// Dump our data in a human-readable format
function exportData() {
  for (var i=1;i<=log.length;i++) {
    var time = new Date(lastReadingTime - (log.length-i)*timePeriod);
    var data = log[(i+logIndex)%log.length];
    console.log(time.toString()+"\t"+data);
  }
}

// Start recording
setInterval(getData, timePeriod);