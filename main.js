var song = "";
var leftWristX, rightWristX;
var leftWristY, rightWristY;
var score_leftWrist,score_rightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);

}

function modelLoaded() {
    console.log("model loaded");
}

function draw() {

    image(video, 0, 0, 600, 500);
    fill(3, 252, 111);
    stroke(3, 252, 111);

    if (score_rightWrist > 0.20) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed: 1x";
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed: 2.0x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed: 2.5x";
            song.rate(2.5);
        }

    }



    if (score_leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        NumberLeftWristY = Number(leftWristY);
        decimalRemovedLeftWristY = floor(NumberLeftWristY);
        volumeValue = decimalRemovedLeftWristY / 500;

        document.getElementById("volume").innerHTML = "Volume" + " = " + volumeValue;
        song.setVolume(volumeValue);
    }

}

function play() {
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function gotPoses(results) {

    if (results.length > 0) {
        console.log(results);
        score_rightWrist = results[0].pose.keypoints[10].score;
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log(score_leftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " LeftWristY= " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + " RightWristY= " + rightWristY);

    }
}