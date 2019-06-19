// vim: set sw=2 ts=2 sts=2 et :
// Dean Attali / Beautiful Jekyll 2016

var main = {

  bigImgEl: null,
  numImgs: null,

  init: function () {

    // Smooth scrolling when jumping to anchor of same page,
    // and prevents target text hiding under navigation bar.
    // Especially useful for footnote jumping.
    //
    $('a[href^="#"]').not([href = "#"]).click(function (ev) {
      // Caveat: kramdown footnote id contains colon which can be confused with pseudo elements
      // https://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
      var target = $($(this).attr('href').replace(/([:\.\[\],=@])/g, "\\$1"));
      if (!target.length) {
        return;
      }
      ev.preventDefault();
      $('html, body').animate({
          scrollTop: target.offset().top - $('.navbar').height() - 50
        }, {
          duration: 'slow',
          complete: function () {
            // setting focus for target anchor
            target.focus();
            if (! target.is(':focus')) {
              target.attr('tabindex', '-1');
              target.focus();
            }

            // both 'html' and 'body' triggers callback, so each
            // fadeToggle is called twice, simulating a slow blink
            target.fadeToggle();
            target.fadeToggle();
          }
        });
    });

    // Open external link in new tab. Discussion about rel=noopener:
    // https://mathiasbynens.github.io/rel-noopener/
    $('a').filter(function(){
      return this.hostname && this.hostname !== location.hostname;
    })
      .addClass("link-icon link-external")
      .attr("target", "_blank")
      .attr("rel", "noopener");

    const ext = [ "pdf", "zip", "xz", "xlsx", "docx" ];
    ext.forEach (function(e){
      $('a[href$=".' + e + '"]' ).addClass('link-icon link-' + e);
    });

    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function () {
      if ($(".navbar").offset().top > 50) {
        $(".navbar").addClass("top-nav-short");
        $(".navbar-custom .avatar-container").fadeOut(500);
      } else {
        $(".navbar").removeClass("top-nav-short");
        $(".navbar-custom .avatar-container").fadeIn(500);
      }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // On mobile, when clicking on a multi-level navbar menu, show the child links
    $('#main-navbar').on("click", ".navlinks-parent", function (e) {
      var target = e.target;
      $.each($(".navlinks-parent"), function (key, value) {
        if (value == target) {
          $(value).parent().toggleClass("show-children");
        } else {
          $(value).parent().removeClass("show-children");
        }
      });
    });

    // Ensure nested navbar menus are not longer than the menu header
    var menus = $(".navlinks-container");
    if (menus.length > 0) {
      var navbar = $("#main-navbar ul");
      var fakeMenuHtml = "<li class='fake-menu' style='display:none;'><a></a></li>";
      navbar.append(fakeMenuHtml);
      var fakeMenu = $(".fake-menu");

      $.each(menus, function (i) {
        var parent = $(menus[i]).find(".navlinks-parent");
        var children = $(menus[i]).find(".navlinks-children a");
        var words = [];
        $.each(children, function (idx, el) { words = words.concat($(el).text().trim().split(/\s+/)); });
        var maxwidth = 0;
        $.each(words, function (id, word) {
          fakeMenu.html("<a>" + word + "</a>");
          var width = fakeMenu.width();
          if (width > maxwidth) {
            maxwidth = width;
          }
        });
        $(menus[i]).css('min-width', maxwidth + 'px')
      });

      fakeMenu.remove();
    }

    // show the big header image
    main.initImgs();
  },

  initImgs: function () {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      main.bigImgEl = $("#header-big-imgs");
      main.numImgs = main.bigImgEl.attr("data-num-img");

      // set an initial image
      var imgInfo = main.getImgInfo();
      var src = imgInfo.src;
      var desc = imgInfo.desc;
      main.setImg(src, desc);

      // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      var getNextImg = function () {
        var imgInfo = main.getImgInfo();
        var src = imgInfo.src;
        var desc = imgInfo.desc;

        var prefetchImg = new Image();
        prefetchImg.src = src;
        // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

        setTimeout(function () {
          var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
          $(".intro-header.big-img").prepend(img);
          setTimeout(function () { img.css("opacity", "1"); }, 50);

          // after the animation of fading in the new image is done, prefetch the next one
          //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          setTimeout(function () {
            main.setImg(src, desc);
            img.remove();
            getNextImg();
          }, 1000);
          //});
        }, 6000);
      };

      // If there are multiple images, cycle through them
      if (main.numImgs > 1) {
        getNextImg();
      }
    }
  },

  getImgInfo: function () {
    var randNum = Math.floor((Math.random() * main.numImgs) + 1);
    var src = main.bigImgEl.attr("data-img-src-" + randNum);
    var desc = main.bigImgEl.attr("data-img-desc-" + randNum);

    return {
      src: src,
      desc: desc
    }
  },

  setImg: function (src, desc) {
    $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
    if (typeof desc !== typeof undefined && desc !== false) {
      $(".img-desc").text(desc).show();
    } else {
      $(".img-desc").hide();
    }
  }
};

document.addEventListener('DOMContentLoaded', main.init);
