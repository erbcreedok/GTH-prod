$(document).ready(function() {

  var nav = $('.navbar');

  var navbarCheck = function() {
    nav.toggleClass('state-idle', window.scrollY < 100);
  };

  navbarCheck();

  $(document).scroll(function() {
    navbarCheck();
  });
});

$(document).ready(function() {
  var navItems = $('.navbar li.nav-item');

  $('.navbar li.nav-item:not(.dropdown) a.nav-link, .waypoint-link').bind('click', function(e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var elementOffset = document.querySelector(id).offsetTop;
    $('html, body').animate({
      scrollTop: elementOffset - 50
    }, '1000');
  });
  var checkWaypoint = function( waypoint ) {
    var hash = '';
    if (!waypoint.element.dataset.waypoint) {
      hash = $(waypoint.element).attr('id');
    } else {
      hash = waypoint.element.dataset.waypoint;
    }
    if (hash === '') {
      return;
    }
    if (hash === 'main') {
      $(navItems[0]).toggleClass('active', false);
    }
    $.each(navItems, function() {
      var b = $(this).children('a').attr('href').slice(1) === hash;
      $(this).toggleClass('active', b);
    });
  };

  var sections = $('section');

  sections.waypoint(function(direction) {
    if (direction === 'up') {
      checkWaypoint(this);
    }
  }, { offset: 45 });

  sections.waypoint(function(direction) {
    if (direction === 'down') {
      checkWaypoint(this);
    }
  }, { offset: 55 });
});

$(document).ready(function() {
  $('.callback-form').submit(function(e) {
    e.preventDefault();
    var form = this;
    if ($(form).hasClass('disabled')) return;
    var email = $(form).serializeArray()[0].value;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)){
      $(form).addClass('wrong-email');
      return;
    } else {
      $(form).removeClass('wrong-email');
    }

    var post_url = $(form).attr('action');
    var request_method = $(form).attr('method');
    var form_data = $(form).serialize();

    $(form).addClass('disabled');
    $.ajax({
      url : post_url,
      type: request_method,
      data : form_data
    }).done(function(response){
      $(form).addClass('success');
      console.log(response)
    }).fail(function(error){
      console.log(error);
    }).always(function(){
      console.log('finish');
      $(form).removeClass('disabled');
    });
  });
});