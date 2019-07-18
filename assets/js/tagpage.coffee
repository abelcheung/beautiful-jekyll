---
---

define ['jquery','domReady!'], ($) ->

  ###
  Mark only clicked tag button as disabled
  Show only posts associated with that tag
  ###
  $('#usage-hints').removeClass "hidden"

  $('.post-list').addClass "hidden"

  $('.btn-tag').click ->
    $prev = $('.btn-tag.disabled')
    $prev.removeClass "disabled"
    $( "\##{$prev.attr 'data-tag-id'}" )
    .addClass "hidden"

    $(this).addClass "disabled"
    id = $(this).attr "data-tag-id"
    $( "\##{id}" ).removeClass "hidden"

    window.location.hash = id

  # Simulate click if URL contains hash mark
  if window.location.hash.length
    $("a[href='#{window.location.hash}']").click()

# vim: set sw=2 ts=2 sts=-1 et :
