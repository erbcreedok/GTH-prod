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