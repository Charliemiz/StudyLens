// Variable Setup

let calibrationPoints = 0;
let Calibrated = false;

//Canvas Setup
let canvas = document.getElementById('overlay_canvas');
let context = canvas.getContext('2d')

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//WebGazer Setup

window.onload = function() {
    webgazer.setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function(data,clock) {
            if(data === null) {
                // Count the time looked off screen
                return;
            }

            let x = data.x
            let y = data.y

            //draw Dot on the canvas
            drawGaze(x,y)
        })

        .begin()
};

// Settings for the video and data collection
webgazer.showVideo(true);

function drawGaze(x,y) {
    context.clearRect(0,0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x,y, 10, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
}

//Start 