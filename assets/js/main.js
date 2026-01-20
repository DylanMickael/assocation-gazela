document.addEventListener('DOMContentLoaded', function() {
    // Select all sections that contain a text slider
    // The controls are usually siblings or children of the wrapper, but my HTML structure will have controls sibling to .text-slider-container inside .content-wrapper
    
    // We look for the controls actually.
    const controlSets = document.querySelectorAll('.ts-controls');
    
    controlSets.forEach(controls => {
        const wrapper = controls.parentElement; // content-wrapper
        const sliderContainer = wrapper.querySelector('.text-slider-container');
        if(!sliderContainer) return;

        const slides = sliderContainer.querySelectorAll('.text-slide');
        const nextBtn = controls.querySelector('.next');
        const prevBtn = controls.querySelector('.prev');
        let currentSlide = 0;
        
        if(slides.length === 0) return;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        if(nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        if(prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
    });

    // Also init existing testimonial slider if present (from old main.js if any??) 
    // Just in case I broke something else? No, there was no main.js before.
});
