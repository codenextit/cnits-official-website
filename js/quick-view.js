const images = document.querySelectorAll(".preview-prtfolio img");
const modal = document.querySelector(".modals");
const modalImg = document.querySelector(".modalImgs");
const modalTxt = document.querySelector(".modalTxts");
const close = document.querySelector(".closes");


images.forEach((image) => {
    image.addEventListener("click", () => {
        modalImg.src = image.src;
        modalTxt.innerHTML = image.alt;
        modal.classList.add("appear");

        close.addEventListener("click", () => {
            modal.classList.remove("appear");
        });
    });
});

