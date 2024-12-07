# StudyLens

# StudyLens Project Milestones

## **Milestone 1: Initial Prototype and Tutorial**
- **Lo-Fi Prototype:** Simple hand-drawn sketches outlining key screens (e.g., Home, Goals, Reports).  
- **WebGazer Integration:** Explored WebGazer.js for eye-tracking calibration.  
  - **Tutorial Code:** [WebGazer Repository](https://github.com/brownhci/WebGazer/wiki)  
  - **Video:** [WebGazer Training Demo](https://unomaha.yuja.com/V/Video?v=11564554&node=51135684&a=109162700)  
- **Outcome:** Demonstrated basic eye-tracking calibration for user sessions.

---

## **Milestone 2: Refined Prototype**
- **Runnable Prototype:** Interactive paper prototype with key screens:  
  - **Home, Goals, Productivity Reports, Settings, Personal.**  
- **Updates:** Improved layout, clearer navigation, added sidebar and visual graphs.  
- **Video:** [Refined Prototype Demo](https://unomaha.yuja.com/V/Video?v=11658375&node=51396122&a=14455099)  
- **Outcome:** Defined usage scenarios and improved usability for first-time users.

---

## **Milestone 3: Implementation and Testing**
- **Progress Video:** [Implementation Demo](https://unomaha.yuja.com/V/Video?v=11768370&node=51678862&a=74765470)  
- **Usability Testing:** Conducted via Zoom with tasks including:  
  - Eye-tracking calibration.  
  - Setting and checking goals.  
  - Navigating dashboard and reports.  
- **Outcome:** Gathered valuable feedback to refine features and improve user experience.  



## Run App (have to use http:/)
- **python3 -m http.server**
- **Access:** http://localhost:8000/

## Features
- **Distraction Detection**: Alerts if the user looks away.
- **Focus Timer**: Tracks productive time.
- **Productivity Reports**: Summarizes focus sessions.
- **Goal Tracking**: Rewards for staying focused.

## Project Structure
- **/src**: Source code
- **/docs**: Documentation
- **/prototypes**: Lo-fi prototypes
- **README.md**: Project overview

## Documentation
- **https://webgazer.cs.brown.edu/**
- **https://github.com/brownhci/WebGazer/wiki**
- The above links are where we learned most of the syntax regarding WebGazer.js

## Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Charliemiz/StudyLens.git
   cd StudyLens

- Use HTML / JS (WebGrazer.js)

### Index.html 
The main webpage.

### Style.css
Handles the UI styling.

### App.js
Includes all JavaScript logic, including WebGazer.js tracking.
