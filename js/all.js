//Get the button:
mybutton = document.getElementById("bt-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    mybutton.style.display = "block";
    mybutton.style.zIndex = 100;
  } else {
    mybutton.style.display = "none";
  }
}

//// navbar
const menuBox = document.querySelector(".menu-item");
const navOpenBtn = document.querySelector(".nav-open");
const closeBtn = document.querySelector(".close-btn");

navOpenBtn.addEventListener("click", () => {
  menuBox.style.left = "0px";
  navOpenBtn.style.opacity = "0";
});

closeBtn.addEventListener("click", () => {
  menuBox.style.left = "-100%";
  navOpenBtn.style.opacity = "1";
});

$(document).ready(function () {
  $(".review-cards").slick({
    slidesToShow: 1,
    centerMode: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow:
      '<span class="prev_arrow"><i class="fa-solid fa-angle-left"></i></span>',
    nextArrow:
      '<span class="next_arrow"><i class="fa-solid fa-angle-right"></i></span>',
    arrows: true,
    dots: false,
    pauseOnHover: false,
    focusOnSelect: true,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

/*
The default country is US and the default site is google.com
The code below is placed on the default site. The other site where you want to send visitors from the rest of the world is google.co.uk
*/
// var defaultCountry = "BD";
// var defaultSite = "http://127.0.0.1:5500/index.html";
// var otherSite = "http://127.0.0.1:5500/index-en.html";
// fetch("https://ipapi.co/country/")
//  .then(response => {
//    if (response.ok) {
//      return response.text();
//    } else {
//      throw new Error (HTTP Error , { statusCode: 404 });
//    }
//  })
//  .then(country => {
//    if (country == defaultCountry) {
//      // No action needed - already on the default site
//      console.log("Already on default site");
//    } else {
//      // Redirect rest of the world
//      console.log("Redirecting to country specific website");
//      window.location = otherSite;
//    }
//  })
//  .catch(function(error) {
//    // Network error
//    // Script blocked by browser extension
//    // 429 error (too many requests)
//    console.log(error);
//  });

var defaultCountry = "BD";
var defaultSite = "http://127.0.0.1:5500/index.html";
var otherSite = "http://127.0.0.1:5500/index-en.html";

fetch("https://ipapi.co/country/")
  .then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error("HTTP Error " + response.status);
    }
  })
  .then((country) => {
    if (country == defaultCountry) {
      // No action needed - already on the default site
      console.log("Already on default site");
    } else {
      // Redirect rest of the world
      console.log("Redirecting to country specific website");
      window.location = otherSite;
    }
  })
  .catch(function (error) {
    // Network error
    // Script blocked by browser extension
    // 429 error (too many requests)
    console.log(error);
  });

//contact from success and failed message

const submitBtn = document.getElementById("contact-form-btn");

submitBtn.addEventListener("click", () => {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let number = document.getElementById("number");
  let message = document.getElementById("message");
  const success = document.getElementById("success");
  const danger = document.getElementById("danger");

  if (name.value === "" || email.value === "" || number.value === "") {
    danger.style.display = "block";
  } else {
    setTimeout(() => {
      name.value = "";
      email.value = "";
      number.value = "";
      message.value = "";
    }, 1000);

    success.style.display = "block";
  }

  setTimeout(() => {
    success.style.display = "none";
    danger.style.display = "none";
  }, 10000);
});
