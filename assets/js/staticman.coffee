---
---

{%- assign deps = 'jquery,domReady!' | split: ',' -%}
{%- assign sm = site.staticman -%}
{%- if sm.reCaptcha.siteKey -%}
  {%- assign deps = deps | push: 'recaptcha' -%}
{%- endif -%}

define {{ deps | jsonify }}, ($) ->
  $spinner = $ '#staticman-submit-wrapper > .spinner'
  $form    = $ '#staticman-form-wrapper > form'
  $msgOk   = $form.children '.alert-success'
  $msgBad  = $form.children '.alert-danger'

  # Form won't work anyway w/o javascript
  $ '#staticman-form-wrapper'
    .removeClass 'hidden'
  $spinner.hide();

  $ '*[type="submit"]', $form
    .click (event) ->
      $msgBad.addClass 'hidden'
      $spinner.fadeIn()

  $form.submit (event) ->
    event.preventDefault()

    endpt = '{{ sm.endpoint | default: "https://staticman3.herokuapp.com/v3/entry/github/" }}'
      .replace /\/$/, ''

    $.ajax
      method: 'post'
      url: [ endpt, '{{sm.repository}}', '{{sm.branch}}', 'comments' ]
        .join '/'
      data: $form.serialize()
      success: (data, status, jqXHR) ->
        $ '#staticman-submit-wrapper'
          .fadeOut()
        $msgOk.removeClass 'hidden'
        $msgBad.addClass 'hidden'
      error: (jqXHR, status, error) ->
        console.log "Error in form submission: #{error}"
        console.log jqXHR
        $msgOk.addClass 'hidden'
        $msgBad.removeClass 'hidden'
        msg = jqXHR.responseJSON.message ? jqXHR.responseJSON.rawError.message ? error
        $ '#staticman-ajax-error'
          .html msg
      complete: (jqXHR, status) ->
        $spinner.fadeOut()

# vim: set sw=2 ts=2 sts=-1 et :