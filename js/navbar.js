(function ($) {
  "use strict";

  var windowOn = $(window);

  ////////////////////////////////////////////////////
  // 02. Sticky Header Js
  windowOn.on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 200) {
      $("#header-sticky").removeClass("tp-header-sticky");
    } else {
      $("#header-sticky").addClass("tp-header-sticky");
    }
  });

  ////////////////////////////////////////////////////
  // 03.Header Hight Js
  if ($(".tp-header-height").length > 0) {
    var headerHeight = document.querySelector(".tp-header-height");

    var setHeaderHeight = headerHeight.offsetHeight;

    $(".tp-header-height").each(function () {
      $(this).css({
        height: setHeaderHeight + "px",
      });
    });
  }

  ////////////////////////////////////////////////////
  // 04. Header Class Add Js
  $(".tp-main-menu ul li a").each(function () {
    $(this).wrapInner("<span></span>");
  });

  ////////////////////////////////////////////////////
  // 05. One Page Scroll Js
  function scrollNav() {
    $(".tp-onepage-menu li a").click(function () {
      $(".tp-onepage-menu li a.active").removeClass("active");
      $(this).addClass("active");

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($(this).attr("href")).offset().top - 96,
          },
          300
        );
      return false;
    });
  }
  scrollNav();

  ////////////////////////////////////////////////////
  // 07. Humburger Js
  $(".tp-hamburger-toggle").on("click", function () {
    $(".tp-header-side-menu").slideToggle("tp-header-side-menu");
  });

  ////////////////////////////////////////////////////
  // 08. Menu Style Js
  if ($(".tp-main-menu-content").length && $(".tp-main-menu-mobile").length) {
    let navContent = document.querySelector(".tp-main-menu-content").outerHTML;
    let mobileNavContainer = document.querySelector(".tp-main-menu-mobile");
    mobileNavContainer.innerHTML = navContent;

    let arrow = $(".tp-main-menu-mobile .has-dropdown > a");

    arrow.each(function () {
      let self = $(this);
      let arrowBtn = document.createElement("BUTTON");
      arrowBtn.classList.add("dropdown-toggle-btn");
      arrowBtn.innerHTML = "<i class='fa-solid fa-chevron-down'></i>";

      self.append(function () {
        return arrowBtn;
      });

      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("dropdown-opened");
        self.parent().toggleClass("expanded");
        self
          .parent()
          .parent()
          .addClass("dropdown-opened")
          .siblings()
          .removeClass("dropdown-opened");
        self.parent().parent().children(".submenu").slideToggle();
      });
    });
  }

  ////////////////////////////////////////////////////
  // 10. Offcanvas Js
  $(".offcanvas-open-btn").on("click", function () {
    $(".offcanvas__area").addClass("offcanvas-opened");
    $(".body-overlay").addClass("opened");
  });
  $(
    ".offcanvas-close-btn ,.tp-main-menu-mobile .tp-onepage-menu li a  > *:not(button)"
  ).on("click", function () {
    $(".offcanvas__area").removeClass("offcanvas-opened");
    $(".body-overlay").removeClass("opened");
  });

  ////////////////////////////////////////////////////
  // 11. Body overlay Js
  $(".body-overlay").on("click", function () {
    $(".offcanvas__area").removeClass("offcanvas-opened");
    $(".tp-search-area").removeClass("opened");
    $(".cartmini__area").removeClass("cartmini-opened");
    $(".body-overlay").removeClass("opened");
  });
})(jQuery);
