$(document).ready(function () {
  $('.customer-logos').slick({
    slidesToShow: 4,
    centerMode: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: '<span class="prev_arrow"><i class="fa-solid fa-angle-left"></i></span>',
    nextArrow: '<span class="next_arrow"><i class="fa-solid fa-angle-right"></i></span>',
    arrows: true,
    dots: false,
    pauseOnHover: false,
    focusOnSelect: true,


    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 575,
      settings: {
        slidesToShow: 1
      }
    }]
  });
});