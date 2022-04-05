status = "";
object = [];
function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(470, 350);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 470, 350);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("obj_no").innerHTML = "Number of objects detected are " + object.length;
            label = object[i].label;
            percent = floor(object[i].confidence * 100);
            stroke("red");
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            text(label+" " + percent + "%" , object[i].x + 15 , object[i].y + 15);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function Start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}