---
layout: null
---
{%- assign deps = 'jquery,domReady!' | split: ',' -%}
{%- assign sm = site.staticman -%}
{%- if sm.reCaptcha.siteKey -%}
	{%- assign deps = deps | push: 'recaptcha' -%}
{%- endif -%}

define ({{ deps | jsonify }}, function ($) {

	var $spinner = $('#staticman-submit-wrapper > .spinner');
	var $form    = $('#staticman-form-wrapper > form');
	var $msgOk   = $form.children('.alert-success');
	var $msgBad  = $form.children('.alert-danger');

	$('#staticman-form-wrapper').removeClass('hidden');
	$spinner.hide();

	$('*[type="submit"]', $form).click( function(event) {
		$msgBad.addClass('hidden');
		$spinner.fadeIn();
	});

	$form.submit(function (event) {

		var endpt = '{{ sm.endpoint | default: "https://staticman3.herokuapp.com/v3/entry/github/" }}'.replace(/\/$/, '');

		event.preventDefault();

		$.ajax({
			method: 'post',
			url: [ endpt, '{{sm.repository}}', '{{sm.branch}}', 'comments' ].join('/'),
			data: $form.serialize(),
			success: function (data, status, jqXHR) {
				$('#staticman-submit-wrapper').fadeOut();
				$msgOk.removeClass('hidden');
				$msgBad.addClass('hidden');
			},
			error: function (jqXHR, status, error) {
				console.log('Error in form submission: ' + error);
				console.log(jqXHR);
				$msgOk.addClass('hidden');
				$msgBad.removeClass('hidden');
				if (jqXHR.responseJSON.message) {
					$('#staticman-ajax-error').html(jqXHR.responseJSON.message);
				} else if (jqXHR.responseJSON.rawError.message) {
					$('#staticman-ajax-error').html(jqXHR.responseJSON.rawError.message);
				} else {
					$('#staticman-ajax-error').html(error);
				};
			},
			complete: function (jqXHR, status) {
				$spinner.fadeOut();
			},
		});
	});
});
