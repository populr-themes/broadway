(function() {
  var fixColumnHeights;

  fixColumnHeights = function() {
    $('body').removeClass('assets-resized'); // ie7
    if ($('html').css('content') == "\u2063") {
      $('#pop .asset').css('min-height', '');
      if($.browser.msie && parseInt($.browser.version, 10) == 7) {
        $('#pop .asset').css('height', '');
      }

    } else {
      $('#pop').imagesLoaded(function() {
        // remove the min-height so that the row size can go down
        $('#pop .asset').css('min-height', '');
        $('#pop .columnizer-row').each(function(idx, el) {
          $(this).find('.asset').css('min-height', $(this).height());
          if($.browser.msie && parseInt($.browser.version, 10) == 7) {
            $(this).find('.asset').css('height', $(this).height());
          }
        });
      });
      $('body').addClass('assets-resized'); // ie7
    }
  };

  $(document).on('pop-initialized', function() {
    $(window).on('resize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('initialize', _.throttle(fixColumnHeights));
    $('.columnizer-row .asset').live('destroy', function() {
      $(this).find('.asset').css('min-height', '');
      if($.browser.msie && parseInt($.browser.version, 10) == 7) {
        $('#pop .asset').css('height', '');
      }
    });
  });

}).call(this);