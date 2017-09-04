// Wait for windows to load before exeuting the js code
window.addEventListener("load", function () {
    
    // Select elements
    video = document.getElementById("vid");
    playButton = document.getElementById("play-btn");
    pbar = document.getElementById("pbar");
    pbarContainer = document.getElementById("pbar-container");
    timer = document.getElementById("video-timer");
    soundButton = document.getElementById("sound-btn");
    sbarContainer = document.getElementById("sbar-container");
    sBar = document.getElementById("sbar");
    fullscreenButton = document.getElementById("fullscreen-btn");
    videoContainer = document.getElementById("video-container");

    //Wait for video to load
    video.load();
    video.addEventListener("canplay", function () {
        // Wait for the click event on the play button or the player and call the Play/Pause function
        playButton.addEventListener("click", playPause, false);
        videoContainer.addEventListener("click", playPause, false);
        // Wait for the click event on the progress bar and call the skip function  
        pbarContainer.addEventListener("click", skipVideo, false);
        // Wait for the slide event on the progress bar and call the skip function  
        pbarContainer.addEventListener("change", skipVideo, false);
        // Call the ProgressBar function to show the duration of the video when the page loads
        progressbar();
        // Mute or on Unmute the video once the sound button is clicked
        soundButton.addEventListener("click", setSound, false);
        // Change the volume whether the volume bar is clicked or you slide with the mouse
        sbarContainer.addEventListener("click", changeVolume, false);
        sbarContainer.addEventListener("change", changeVolume, false);
        // Go FullScreen
        fullscreenButton.addEventListener("click", fullScreen, false);
        videoContainer.addEventListener("dblclick", fullScreen, false);
    }, false);

}, false);

// Play/Pause function
function playPause () {
    if (video.paused) {
        video.play();
        playButton.src = "assets/images/pause.png";
        // Update the progess bar if the video is playing
        progress = setInterval(progressbar, 30);
    } else {
        video.pause();
        playButton.src = "assets/images/play.png";
        // Do not update the progress bar if the video is paused
        window.clearInterval(progress);
    }
}

// Function to update the progress bar 
function progressbar () {
    var percentage = (video.currentTime / video.duration ) * 100;
    pbar.style.width = percentage + "%";
    
    if (video.ended) {
        // If the video has ended then show the replay button
        window.clearInterval(progress);
        playButton.src = "assets/images/replay.png";
    } else if (video.paused) {
        // If we skip the video after it has ended show the play button back again
        playButton.src = "assets/images/play.png";
    }
    timer.innerHTML = getTime();
}

function skipVideo (event) {
    var mousePos = event.pageX - pbarContainer.offsetLeft;
    var barWidth = window.getComputedStyle(pbarContainer).getPropertyValue("width");
    
    barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2));
    
    video.currentTime = (mousePos / barWidth) * video.duration;
    
    progressbar();
}

function getTime() {

    // Calculate the current minutes/seconds of the video
    seconds = Math.round(video.currentTime);
    minutes = Math.floor(seconds/60);
    
    //If one minute has passed add a 0 to the time
    if (minutes > 0) {
        seconds -= minutes * 60;
    }

    if (seconds.toString().length === 1) {
        seconds = "0" + seconds;
    }
    
    // Calculate the total duration of the video
    totalSeconds = Math.round(video.duration);
    totalMinutes = Math.floor(totalSeconds/60);
    
    // If the video is longer than one kinutes add a zero to the time
    if (totalMinutes > 0) {
        totalSeconds -= totalMinutes *60;
    }

    if (totalSeconds.toString().length === 1) {
        totalSeconds = "0" + totalSeconds;
    }

    return minutes + ":" + seconds + " / " + totalMinutes + ":" + totalSeconds;
}

function setSound () {
    if (!video.muted) {
        video.muted = true;
        soundButton.src = "assets/images/mute.png";
        sbar.style.display = "none";
    } else {
        video.muted = false;
        soundButton.src = "assets/images/sound.png";
        sbar.style.display = "block";
    }
}

function changeVolume (event) {
    var mousePos = event.pageX - sbarContainer.offsetLeft;
    var sbarWidth = window.getComputedStyle(sbarContainer).getPropertyValue("width");
    
    sbarWidth = parseFloat(sbarWidth.substr(0, sbarWidth.length - 2));
    
    video.volume = (mousePos / sbarWidth);
    sbar.style.width = (mousePos / sbarWidth) * 100 + "%";
    video.muted = false;
    soundButton.src = "assets/images/sound.png";
    sbar.style.display = "block";
}

function fullScreen () {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } 
    if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }

    if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
    }

    if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}