// Variable Setup
let CalibrationPoints = 0;
let Calibrated = false;

// Canvas Setup
let canvas = document.getElementById('overlay_canvas');
let context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// WebGazer Setup
let gazeLogs = []; 
let lastGazeStatus = "on-screen";
let eventStartTime = new Date(); 
window.onload = function () {
    webgazer
        .setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function (data, clock) {
            if (data === null) {
                console.log("No gaze data detected.");
                if (lastGazeStatus === "on-screen") {
                    logGazeEvent("on-screen", eventStartTime, new Date());
                    lastGazeStatus = "off-screen";
                    eventStartTime = new Date();
                }
                return;
            }

            console.log(`Gaze data: x=${data.x}, y=${data.y}`);
            let x = data.x;
            let y = data.y;

            // Draw the gaze point
            drawGaze(x, y);

            if (lastGazeStatus === "off-screen") {
                logGazeEvent("off-screen", eventStartTime, new Date());
                lastGazeStatus = "on-screen";
                eventStartTime = new Date();
            }
        })
        .showVideo(false)
        .showPredictionPoints(false) 
        .begin();

    window.onbeforeunload = () => {
        webgazer.end();
    };
};


function drawGaze(x, y) {
    console.log(`Drawing gaze point at: (${x}, ${y})`);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
}


function logGazeEvent(status, startTime, endTime) {
    let durationMs = endTime - startTime; 
    gazeLogs.push({
        status: status,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration_ms: durationMs,
    });
    console.log(`Gaze event logged: ${status}, Duration: ${durationMs}ms`);
    console.log("Current gazeLogs:", gazeLogs);
}

function downloadGazeLogs() {
    if (gazeLogs.length === 0) {
        alert("No gaze logs available to download. Interact with the page to generate logs.");
        // console.error("No gaze logs to download.");
        return;
    }

    let logBlob = new Blob(
        [
            JSON.stringify(
                {
                    user_id: "TestUser",
                    sessions: [
                        {
                            session_id: "session1",
                            start_time: gazeLogs[0]?.start_time || new Date().toISOString(),
                            end_time: new Date().toISOString(),
                            gaze_events: gazeLogs,
                        },
                    ],
                },
                null,
                2
            ),
        ],
        { type: "application/json" }
    );

    let downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(logBlob);
    downloadLink.download = "TestUserLogs.json";
    downloadLink.click();

    console.log("Logs downloaded successfully.");
}

let downloadButton = document.createElement("button");
downloadButton.innerText = "Download Gaze Logs";
downloadButton.style.position = "fixed";
downloadButton.style.bottom = "20px";
downloadButton.style.right = "20px";
downloadButton.onclick = downloadGazeLogs;
document.body.appendChild(downloadButton);

function sendGazeLogsToServer() {
    if (gazeLogs.length === 0) {
        alert("No gaze logs available to send. Interact with the page to generate logs.");
        console.error("No gaze logs to send.");
        return;
    }

    const sessionData = {
        user_id: "TestUser",
        sessions: [
            {
                session_id: `session_${Date.now()}`,
                start_time: gazeLogs[0]?.start_time || new Date().toISOString(),
                end_time: new Date().toISOString(),
                gaze_events: gazeLogs,
            },
        ],
    };

    fetch("/save-logs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to save logs.");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Logs saved:", data);
            alert("Logs saved successfully.");
        })
        .catch((error) => {
            console.error("Error saving logs:", error);
            alert("Failed to save logs.");
        });
}
