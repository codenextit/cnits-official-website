$("#slider").owlCarousel({
  loop: true,
  items: 1,
  margin: 15,
  dots: false,
  nav: true,
  smartSpeed: 900,
  navText: [
    "<i class='fa-solid fa-chevron-left'></i>",
    "<i class='fa-solid fa-chevron-right'></i>",
  ],
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});
