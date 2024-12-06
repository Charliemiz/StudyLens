// Variable Setup
let CalibrationPoints = 0;
let Calibrated = false;

//Canvas Setup
let canvas = document.getElementById('overlay_canvas');
let context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// WebGazer Setup
let gazeLogs = []; // Array to store gaze events
let lastGazeStatus = "on-screen";
let eventStartTime = new Date(); // Track the start time of the current event

window.onload = function () {
    webgazer
        .setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function (data, clock) {
            let currentTime = new Date();

            if (data === null) {
                if (lastGazeStatus === "on-screen") {
                    // Log "on-screen" event and transition to "off-screen"
                    logGazeEvent("on-screen", eventStartTime, currentTime);
                    lastGazeStatus = "off-screen";
                    eventStartTime = currentTime;
                }
                return;
            }

            let x = data.x;
            let y = data.y;

            // Draw dot on the canvas
            drawGaze(x, y);

            if (lastGazeStatus === "off-screen") {
                // Log "off-screen" event and transition to "on-screen"
                logGazeEvent("off-screen", eventStartTime, currentTime);
                lastGazeStatus = "on-screen";
                eventStartTime = currentTime;
            }
        })
        .begin();
};

// Settings for the video and data collection
webgazer.showVideo(false);

function drawGaze(x, y) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
}

function logGazeEvent(status, startTime, endTime) {
    let durationMs = endTime - startTime; // Calculate duration in milliseconds
    gazeLogs.push({
        status: status,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration_ms: durationMs
    });
    console.log(`Gaze event logged: ${status}, Duration: ${durationMs}ms`);
}

// Function to download logs as JSON
function downloadGazeLogs() {
    let logBlob = new Blob([JSON.stringify({ user_id: "TestUser", sessions: [{ session_id: "session1", start_time: gazeLogs[0].start_time, end_time: new Date().toISOString(), gaze_events: gazeLogs }] }, null, 2)], { type: "application/json" });
    let downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(logBlob);
    downloadLink.download = "gaze_logs.json";
    downloadLink.click();
}

// Add a button to download logs
let downloadButton = document.createElement("button");
downloadButton.innerText = "Download Gaze Logs";
downloadButton.style.position = "fixed";
downloadButton.style.bottom = "20px";
downloadButton.style.right = "20px";
downloadButton.onclick = downloadGazeLogs;
document.body.appendChild(downloadButton);