/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

		$(document).ready(function() {
			const form = $('#contact-form');
			
			form.on('submit', function(e) {
				e.preventDefault();
				
				// Reset previous error states
				clearErrors();
				
				// Get form values
				const name = $('#name').val().trim();
				const email = $('#email').val().trim();
				const message = $('#message').val().trim();
				
				// Validate all fields
				let isValid = true;
				
				// Name validation
				if (!name) {
					showError('name', 'Name is required');
					isValid = false;
				} else if (name.length < 2) {
					showError('name', 'Name must be at least 2 characters');
					isValid = false;
				}
				
				// Email validation
				if (!email) {
					showError('email', 'Email is required');
					isValid = false;
				} else if (!isValidEmail(email)) {
					showError('email', 'Please enter a valid email address');
					isValid = false;
				}
				
				// Message validation
				if (!message) {
					showError('message', 'Message is required');
					isValid = false;
				} else if (message.length < 10) {
					showError('message', 'Message must be at least 10 characters');
					isValid = false;
				}
				
				// If all validations pass, submit the form
				if (isValid) {
					const $submit = form.find('button[type="submit"]');
					$submit.prop('disabled', true);
					$submit.text('Sending...');
					
					const formData = new FormData();
					formData.append('entry.2005620554', $('#name').val());
					formData.append('entry.1045781291', $('#email').val());
					formData.append('entry.1065046570', $('#message').val());
				
					$.ajax({
						url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd9-oh0xq0odQjksh7XjZPKXFt8NN4G-HGEhSI9A7ZYqGp5IA/formResponse',
						type: 'POST',
						data: formData,
						processData: false,
						contentType: false,
						success: function() {
							handleSuccess();
						},
						error: function() {
							// Form might still have submitted despite CORS error
							handleSuccess();
						}
					});
				}
			});
			
			// Helper functions
			function isValidEmail(email) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(email);
			}
			
			function showError(fieldId, message) {
				const field = $(`#${fieldId}`);
				field.addClass('error');
				
				// Remove any existing error message
				$(`#${fieldId}-error`).remove();
				
				// Add new error message
				field.after(`<div id="${fieldId}-error" class="error-message">${message}</div>`);
			}
			
			function clearErrors() {
				$('.error').removeClass('error');
				$('.error-message').remove();
			}
			
			function handleSuccess() {
				form[0].reset();
				clearErrors();
				
				// Reset button state
				const $submit = form.find('button[type="submit"]');
				$submit.prop('disabled', false);
				$submit.text('Send');
				
				// Show success message
				showSuccessMessage('Thank you! Your message has been sent.');
			}
			
			function showSuccessMessage(message) {
				// Remove any existing success message
				$('.success-message').remove();
				
				// Add new success message
				form.before(`<div class="success-message">${message}</div>`);
				
				// Automatically remove success message after 5 seconds
				setTimeout(() => {
					$('.success-message').fadeOut('slow', function() {
						$(this).remove();
					});
				}, 5000);
			}
		});

	})(jQuery);