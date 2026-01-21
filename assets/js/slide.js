let slideIndex = 1;

// Auto slide interval
let slideInterval = setInterval(() => {
    changeSlide(1);
}, 8000); // Change every 8 seconds

// Event listeners for arrows
document.querySelector('.prev-arrow').addEventListener('click', () => {
    changeSlide(-1);
    resetInterval();
});

document.querySelector('.next-arrow').addEventListener('click', () => {
    changeSlide(1);
    resetInterval();
});

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 8000);
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetInterval();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}