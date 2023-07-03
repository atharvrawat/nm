status = "";
img = "";
objects = []
function preload() {
    img = loadImage("pic_3.webp")
}

function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    object_detector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status:detecting objects";

}

function draw() {
    image(img, 0, 0, 640, 420)
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status:Object Detected";
            fill("red")
            stroke("red")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }


}

function modelloaded() {
    console.log("model is loaded")
    status = true;
    object_detector.detect(img, gotresults);

}

function gotresults(error, results) {
    if (error) {
        console.log(error)

    }
    else {
        console.log(results);
        objects = results
    }
}