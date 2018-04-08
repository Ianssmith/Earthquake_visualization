var table;
var latitude;
var longitude;
//var magsx;
var magsy;
var time;
var timek;
var c = 0;

var R = [];
var B = [];



function preload() {
  table = loadTable("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv", "csv", "header");
}


function setup() {

  createCanvas(windowWidth, windowHeight);
  clear();
}

function draw() {
  noLoop();
  smooth();
  background(0);
  latitude = table.getColumn("latitude");
  longitude = table.getColumn("longitude");
  // magsx = table.getColumn("mag");
  magsy = table.getColumn("mag");
  time = table.getColumn("time");
  timek = table.getColumn("time");

  for (var i = 0; i < latitude.length; i++) {
    latitude[i] = map(latitude[i], 90.0, -90.0, 0, windowHeight);
    longitude[i] = map(longitude[i], -180.0, 180.0, 70, windowWidth - 100);

    magsy[i] = map(magsy[i], -1.0, 9.0, 1, 150);

    time[i] = splitTokens(time[i], '-');
    time[i] = reverse(time[i]);
    time[i] = shorten(time[i]);
    time[i] = shorten(time[i]);

    time[i] = int(time[i]);
    time[i] = map(time[i], 0, 30, 0, 255);

    timek[i] = splitTokens(timek[i], '-');
    timek[i] = reverse(timek[i]);
    timek[i] = shorten(timek[i]);
    timek[i] = shorten(timek[i]);

    timek[i] = int(timek[i]);
    timek[i] = map(timek[i], 0, 30, 255, 0)



    R[i] = color(timek[i], 30, 30, timek[i]);
    B[i] = color(30, 30, time[i], timek[i]);

  }


  for (var j = 0; j < table.getRowCount(); j++) {


    var Color1 = lerpColor(R[j], B[j], 0.25);
    var Color2 = lerpColor(R[j], B[j], 0.75);


    strokeWeight(1.5);


    if (timek[j] >= 145) {
      stroke(Color1)
      line(longitude[j], latitude[j], longitude[j] + 85, latitude[j] + (magsy[j]));
      line(longitude[j], latitude[j], longitude[j] - 19, latitude[j]);


    } else if (timek[j] < 145) {
      stroke(Color2);
      line(longitude[j], latitude[j], longitude[j] + 85, latitude[j] + (magsy[j]));
      line(longitude[j], latitude[j], longitude[j] - 19, latitude[j]);


    }
  }
  strokeWeight(0.75);
  stroke(255);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);
  noStroke();
  textFont("Courier New")
  textAlign(LEFT, TOP)
  fill(255)
  text("Prime-Meridian", windowWidth / 2, 0);
  text("Equator", 0, windowHeight / 2);

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
