// JavaScript code to control the timer
var timeDisplay = document.querySelector('.time-display');
var workButton = document.querySelector('#work-btn');
var shortBreakButton = document.querySelector('#short-break-btn');
var longBreakButton = document.querySelector('#long-break-btn');
var stopButton = document.querySelector('#stop-btn');
var timer;
var isTimerRunning = false;

workButton.addEventListener('click', function() {
  if (!isTimerRunning) {
    startTimer(25, timerCompleted);
    isTimerRunning = true;
  }
});
shortBreakButton.addEventListener('click', function() {
  if (!isTimerRunning) {
    startTimer(5, timerCompleted);
    isTimerRunning = true;
  }
});
longBreakButton.addEventListener('click', function() {
  if (!isTimerRunning) {
    startTimer(15, timerCompleted);
    isTimerRunning = true;
  }
});
stopButton.addEventListener('click', stopTimer);

function startTimer(minutes, callback) {
  var endTime = new Date().getTime() + minutes * 60000;
  var remainingTime = minutes * 60;

  timer = setInterval(function() {
    if (remainingTime <= 0) {
      clearInterval(timer);
      flashScreen();
      callback();
      isTimerRunning = false;
      return;
    }

    var minutes = Math.floor(remainingTime / 60);
    var seconds = remainingTime % 60;

    var formattedTime = padNumber(minutes) + ':' + padNumber(seconds);
    timeDisplay.textContent = formattedTime;

    remainingTime--;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isTimerRunning = false;
  timeDisplay.textContent = '00:00'; // Reset the timer display to 00:00
}

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

function flashScreen() {
  var body = document.querySelector('body');
  var originalColor = body.style.backgroundColor;

  // Set the desired flash color
  var flashColor = '#FF0000'; // Red color

  var flashDuration = 500; // Duration of each flash in milliseconds
  var flashCount = 6; // Number of flashes

  var currentFlash = 0;
  var isFlashing = false;

  var flashInterval = setInterval(function() {
    if (currentFlash >= flashCount) {
      clearInterval(flashInterval);
      body.style.backgroundColor = originalColor; // Restore the original background color
      return;
    }

    if (isFlashing) {
      body.style.backgroundColor = originalColor;
    } else {
      body.style.backgroundColor = flashColor;
    }

    isFlashing = !isFlashing;
    currentFlash++;
  }, flashDuration);
}

function timerCompleted() {
  // Custom code to be executed when the timer reaches the end
  alert('Timer completed!');
  // Add your desired functionality here
}
