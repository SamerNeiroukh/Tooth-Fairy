
(function($) {
  "use strict"; 

/* Preloader */
$(window).on('load', function() {
  var preloaderFadeOutTime = 500;
  function hidePreloader() {
    var preloader = $('.spinner-wrapper');
    setTimeout(function() {
      preloader.fadeOut(preloaderFadeOutTime);
    }, 500);
  }
  hidePreloader();
});


/* Navbar Scripts */
// jQuery to collapse the navbar on scroll
  $(window).on('scroll load', function() {
  if ($(".navbar").offset().top > 60) {
    $(".fixed-top").addClass("top-nav-collapse");
  } else {
    $(".fixed-top").removeClass("top-nav-collapse");
  }
  });

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $(document).on('click', 'a.page-scroll', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 600, 'easeInOutExpo');
    event.preventDefault();
  });
});

  // closes the responsive menu on menu item click
  $(".navbar-nav li a").on("click", function(event) {
  if (!$(this).parent().hasClass('dropdown'))
      $(".navbar-collapse").collapse('hide');
  });
  

  /* Video Lightbox - Magnific Popup */
  $('.popup-youtube, .popup-vimeo').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
      iframe: {
          patterns: {
              youtube: {
                  index: 'youtube.com/', 
                  id: function(url) {        
                      var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                      if ( !m || !m[1] ) return null;
                      return m[1];
                  },
                  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
              },
              vimeo: {
                  index: 'vimeo.com/', 
                  id: function(url) {        
                      var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                      if ( !m || !m[5] ) return null;
                      return m[5];
                  },
                  src: 'https://player.vimeo.com/video/%id%?autoplay=1'
              }
          }
      }
  });


  /* Lightbox - Magnific Popup */
$('.popup-with-move-anim').magnificPopup({
  type: 'inline',
  fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
  fixedBgPos: true,
  overflowY: 'auto',
  closeBtnInside: true,
  preloader: false,
  midClick: true,
  removalDelay: 300,
  mainClass: 'my-mfp-slide-bottom'
});
  
  
  /* Move Form Fields Label When User Types */
  // for input and textarea fields
  $("input, textarea").keyup(function(){
  if ($(this).val() != '') {
    $(this).addClass('notEmpty');
  } else {
    $(this).removeClass('notEmpty');
  }
  });


  /* Request Form */
  $("#requestForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
          // handle the invalid form...
          rformError();
          rsubmitMSG(false, "Please fill all fields!");
      } else {
          // everything looks good!
          event.preventDefault();
          rsubmitForm();
      }
  });

  function rsubmitForm() {
      // initiate variables with form content
  var name = $("#rname").val();
  var email = $("#remail").val();
  var phone = $("#rphone").val();
      var select = $("#rselect").val();
      var terms = $("#rterms").val();
      
      $.ajax({
          type: "POST",
          url: "php/requestform-process.php",
          data: "name=" + name + "&email=" + email + "&phone=" + phone + "&select=" + select + "&terms=" + terms, 
          success: function(text) {
              if (text == "success") {
                  rformSuccess();
              } else {
                  rformError();
                  rsubmitMSG(false, text);
              }
          }
      });
}

  function rformSuccess() {
      $("#requestForm")[0].reset();
      rsubmitMSG(true, "Request Submitted!");
      $("input").removeClass('notEmpty'); // resets the field label after submission
  }

  function rformError() {
      $("#requestForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass();
      });
}

  function rsubmitMSG(valid, msg) {
      if (valid) {
          var msgClasses = "h3 text-center tada animated";
      } else {
          var msgClasses = "h3 text-center";
      }
      $("#rmsgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
  

  /* Contact Form */
  $("#contactForm")
    .validator()
    .on("submit", function (event) {
      if (event.isDefaultPrevented()) {
        // handle the invalid form...
        cformError();
        csubmitMSG(false, "Please fill all fields!");
      } else {
        // everything looks good!
        event.preventDefault();
        csubmitForm();
      }
    });

  // make a contact
  function csubmitForm() {
    // initiate variables with form content
    var name = $("#cname").val();
    var emailUser = $("#cemail").val();
    var message = $("#cmessage").val();
    var terms = $("#cterms").val();
    var toothEmail = "my.tooth.fairy0@gmail.com";
    //var ander = "מ%0D" + emailUser + message

    // *********** //
    window.open(
      "mailto:my.tooth.fairy0@gmail.com?subject=יצירת קשר  - " +
        name +
        "&body=מייל לחזרה: " +
        emailUser +
        "%0d" +
        "%0d" +
        message +
        "%0d"
    );

    // *********** //
  }

  /* request to join Form */
  $("#requestForm")
    .validator()
    .on("submit", function (event) {
      if (event.isDefaultPrevented()) {
        psubmitForm();

        // handle the invalid form...
        pformError();
        psubmitMSG(false, "Please fill all fields!");
      }
    });

  function psubmitForm() {
    // initiate variables with form content
    var name = $("#rname").val();
    var emailVol = $("#remail").val();
    var phone = $("#rphone").val();
    var select = $("#rselect").val(); // who am i
    var terms = $("#rterms").val(); // accept to condition
    var adress = $("#Address").val();
    var specialization = $("#specialization").val();

    window.open(
      "mailto:my.tooth.fairy0@gmail.com?subject=בקשת הצטרפות לעמותה  - " +
        name +
        "&body=היי, שמי " +
        name +
        ", אשמח לקחת חלק פעיל בעמותת פיית השיניים. פרטים על עצמי:" +
        "%0d" +
        "מייל: " +
        emailVol +
        "%0d" +
        "טלפון: " +
        phone +
        "%0d" +
        "כתובת: " +
        adress +
        "%0d" +
        "התמחות: " +
        specialization +
        "%0d" +
        "מי אני: " +
        select +
        "%0d"
    );

    // *********** //
  }

  function pformSuccess() {
      $("#privacyForm")[0].reset();
      psubmitMSG(true, "Request Submitted!");
      $("input").removeClass('notEmpty'); // resets the field label after submission
  }

  function pformError() {
      $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass();
      });
}

  function psubmitMSG(valid, msg) {
      if (valid) {
          var msgClasses = "h3 text-center tada animated";
      } else {
          var msgClasses = "h3 text-center";
      }
      $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
  

  /* Back To Top Button */
  // create the back to top button
  $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
  var amountScrolled = 700;
  $(window).scroll(function() {
      if ($(window).scrollTop() > amountScrolled) {
          $('a.back-to-top').fadeIn('500');
      } else {
          $('a.back-to-top').fadeOut('500');
      }
  });


/* Removes Long Focus On Buttons */
$(".button, a, button").mouseup(function() {
  $(this).blur();
});

})(jQuery);