(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});

})(jQuery);
// ===============================
"use strict";
const upperButtons = document.getElementById("upperButtons"),
  work = document.getElementById("work"),
  longBreak = document.getElementById("longBreak"),
  shortBreak = document.getElementById("shortBreak"),
  timer = document.getElementById("timer"),
  mode = document.getElementById("mode"),
  addTime = document.getElementById("addTime"),
  time = document.getElementById("time"),
  minutes = document.getElementById("minutes"),
  seconds = document.getElementById("seconds"),
  reduceTime = document.getElementById("reduceTime"),
  lowerButtons = document.getElementById("lowerButtons"),
  start = document.getElementById("start"),
  pause = document.getElementById("pause"),
  resume = document.getElementById("resume"),
  reset = document.getElementById("reset"),
  alarm = document.getElementById("alarm");

let clock,
  timerId,
  clockInterval,
  count,
  workTime = "25",
  longBreakTime = "15",
  shortBreakTime = "05";

function intervalTimer(callback, interval) {
  let startTime,
    remaining = 0,
    state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

  this.pause = function() {
    if (state != 1) {
      return;
    }

    remaining = interval - (new Date() - startTime);
    window.clearInterval(timerId);
    state = 2;
  };

  this.resume = function() {
    clearTimeout(timerId);
    if (state != 2) {
      return;
    }

    state = 3;
    window.setTimeout(this.timeoutCallback, remaining);
  };

  this.timeoutCallback = function() {
    if (state != 3) {
      return;
    }

    callback();

    startTime = new Date();
    timerId = window.setInterval(callback, interval);
    state = 1;
  };

  startTime = new Date();
  timerId = window.setInterval(callback, interval);
  state = 1;
}

work.addEventListener("click", workOn);
function workOn() {
  mode.innerHTML = this.innerHTML;
  minutes.innerHTML = workTime;
  seconds.innerHTML = "00";
  alarm.pause();
}

longBreak.addEventListener("click", longBreakOn);
function longBreakOn() {
  mode.innerHTML = this.innerHTML;
  minutes.innerHTML = longBreakTime;
  seconds.innerHTML = "00";
  alarm.pause();
}

shortBreak.addEventListener("click", shortBreakOn);
function shortBreakOn() {
  mode.innerHTML = this.innerHTML;
  minutes.innerHTML = shortBreakTime;
  seconds.innerHTML = "00";
  alarm.pause();
}

reset.addEventListener("click", function() {
  work.addEventListener("click", workOn);
  longBreak.addEventListener("click", longBreakOn);
  shortBreak.addEventListener("click", shortBreakOn);
  addTime.addEventListener("click", addTimeButton);
  reduceTime.addEventListener("click", reduceTimeButton);
  start.addEventListener("click", startTimer);
  pause.removeEventListener("click", pauseOn);
  resume.removeEventListener("click", resumeOn);
  clearInterval(timerId);
  alarm.pause();

  mode.innerHTML = "Work";
  minutes.innerHTML = "25";
  seconds.innerHTML = "00";

  workTime = "25";
  longBreakTime = "15";
  shortBreakTime = "05";
});

function leadingZeros(i) {
  return ("00" + i).slice(-2);
}

function timeSaver() {
  if (mode.innerHTML == "Work") {
    workTime = minutes.innerHTML;
  } else if (mode.innerHTML == "Long Break") {
    longBreakTime = minutes.innerHTML;
  } else {
    shortBreakTime = minutes.innerHTML;
  }
}

addTime.addEventListener("click", addTimeButton);
function addTimeButton() {
  minutes.innerHTML = parseInt(minutes.innerHTML) + 1;
  minutes.innerHTML = leadingZeros(minutes.innerHTML);
  if (minutes.innerHTML == 61) {
    minutes.innerHTML = "01";
  }

  timeSaver();
}

reduceTime.addEventListener("click", reduceTimeButton);
function reduceTimeButton() {
  minutes.innerHTML = parseInt(minutes.innerHTML) - 1;
  minutes.innerHTML = leadingZeros(minutes.innerHTML);
  if (minutes.innerHTML == 0) {
    minutes.innerHTML = "60";
  }

  timeSaver();
}

function pauseOn() {
  clockInterval.pause();
  pause.setAttribute("style", "display: none !important;");
  resume.setAttribute("style", "display: inline-block !important;");
}

function resumeOn() {
  clockInterval.resume();
  resume.setAttribute("style", "display: none !important;");
  pause.setAttribute("style", "display: inline-block !important;");
}

start.addEventListener("click", startTimer);
function startTimer() {
  work.removeEventListener("click", workOn);
  longBreak.removeEventListener("click", longBreakOn);
  shortBreak.removeEventListener("click", shortBreakOn);
  addTime.removeEventListener("click", addTimeButton);
  reduceTime.removeEventListener("click", reduceTimeButton);
  start.removeEventListener("click", startTimer);
  resume.addEventListener("click", resumeOn);
  pause.addEventListener("click", pauseOn);

  clockInterval = new intervalTimer(function() {
    if (seconds.innerHTML == 0) {
      if (minutes.innerHTML !== "00") {
        minutes.innerHTML -= 1;
        minutes.innerHTML = leadingZeros(minutes.innerHTML);
        seconds.innerHTML = "59";
      } else if (minutes.innerHTML == "00") {
        clearInterval(clock);
        alarm.play();
        work.addEventListener("click", workOn);
        longBreak.addEventListener("click", longBreakOn);
        shortBreak.addEventListener("click", shortBreakOn);
      }
    } else if (seconds.innerHTML !== 0) {
      seconds.innerHTML -= 1;
      seconds.innerHTML = leadingZeros(seconds.innerHTML);
    }
  }, 1000);
}
