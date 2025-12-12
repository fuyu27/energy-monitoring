let heartRateData = [];      
let cumulativeKJ = 0;        
let monitoring = false;     
let updateInterval = 20000;  
let brightnessInterval;  
let maxBTU = 5000;      
let warningDisplayed = false; 

let config = {
  weight: 70,             
  age: 25,             
  gender: 0     
};

function calculateMetabolicRate(hr) {
  return config.gender === 1
    ? -55.0969 + (0.6309 * hr) + (0.1988 * config.weight) + (0.2017 * config.age)
    : -20.4022 + (0.4472 * hr) - (0.1263 * config.weight) + (0.074 * config.age);
}

function updateCumulativeKJ() {
  if (!monitoring || warningDisplayed) return;

  const recentData = heartRateData.slice(-20);
  const averageHR = recentData.length > 0
    ? recentData.reduce((sum, entry) => sum + entry.bpm, 0) / recentData.length
    : 0; 

  const metabolicRateKJPerSecond = averageHR > 0 
    ? calculateMetabolicRate(averageHR) / 3600 
    : 0; 

  cumulativeKJ += metabolicRateKJPerSecond * 20; 

  const maxKJ = maxBTU * 1.055;
  if (cumulativeKJ >= maxKJ - maxKJ * 0.9) {
    warningDisplayed = true;
    Bangle.buzz();

    g.clear();
    g.setFont("6x8", 3.0);
    g.drawString("WARNING !!", 10, 30);
    g.drawString("APPROACHING \nMAX BTU!!!", 10, 60);
    g.setFont("6x8", 2.0);
    g.drawString("Tap to dismiss", 10, 100);
    g.flip();

    setWatch(() => {
      warningDisplayed = false;
      redisplayData(); 
    }, BTN, { edge: "rising", debounce: 50, repeat: false });

    return; 
  }
  redisplayData();
  setTimeout(updateCumulativeKJ, updateInterval);
}
function redisplayData() {
  g.clear();
  g.setFont("6x8", 2.9); 
  g.drawString(`Cumulat. KJ:`, 10, 30);
  g.setFont("6x8", 4.0); 
  g.drawString(`${cumulativeKJ.toFixed(2)}`, 10, 60);
  g.setFont("6x8", 2.9);
  
  g.drawString(`\n\n\nMax kJ: \n`, 10, 50);

  g.setFont("6x8", 4.0);
  g.drawString(`\n\n${maxBTU.toFixed(2)}\n`, 10, 50);

  g.flip();
}
function onHeartRateReading(h) {
  if (h.confidence > 50 && monitoring) {
    heartRateData.push({ time: Date.now(), bpm: h.bpm });
    const twentySecondsAgo = Date.now() - 20000;
    heartRateData = heartRateData.filter(entry => entry.time >= twentySecondsAgo);
  }
}
setWatch(() => {
  monitoring = !monitoring;

  if (monitoring) {
    console.log("Monitoring started...");
    Bangle.on('HRM', onHeartRateReading);
    Bangle.setHRMPower(true);
    Bangle.setLCDBrightness(1); 
    updateCumulativeKJ();
    if (!brightnessInterval) {
      brightnessInterval = setInterval(() => Bangle.setLCDBrightness(1), 5000);
    }
  } else {
    console.log("Monitoring reset...");
    Bangle.removeListener('HRM', onHeartRateReading);
    Bangle.setHRMPower(false);
    Bangle.setLCDBrightness(0.1); 
    cumulativeKJ = 0;
    if (brightnessInterval) {
      clearInterval(brightnessInterval);
      brightnessInterval = null;
    }
    g.clear();
    g.setFont("6x8", 3.0);
    g.drawString("Press \nButton \nto Start", 10, 50);
    g.flip();
  }
}, BTN, { edge: "rising", debounce: 50, repeat: true });
g.clear();
g.setFont("6x8", 3.0);
g.drawString("Press \nButton \nto Start", 10, 50);
g.flip();
