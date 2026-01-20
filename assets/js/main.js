document.addEventListener('DOMContentLoaded', function () {
    // Select all sections that contain a text slider
    // The controls are usually siblings or children of the wrapper, but my HTML structure will have controls sibling to .text-slider-container inside .content-wrapper

    // We look for the controls actually.
    const controlSets = document.querySelectorAll('.ts-controls');

    controlSets.forEach(controls => {
        const wrapper = controls.parentElement; // content-wrapper
        const sliderContainer = wrapper.querySelector('.text-slider-container');
        if (!sliderContainer) return;

        const slides = sliderContainer.querySelectorAll('.text-slide');
        const nextBtn = controls.querySelector('.next');
        const prevBtn = controls.querySelector('.prev');
        let currentSlide = 0;

        if (slides.length === 0) return;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isClosing = navLinks.classList.contains('active');
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';

            if (isClosing) {
                navLinks.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const isDropdownToggle = link.parentElement.classList.contains('dropdown');

                // If it's a dropdown link and we are on mobile, prevent default and toggle submenu
                if (window.innerWidth <= 768 && isDropdownToggle) {
                    e.preventDefault();
                    e.stopPropagation();

                    const parent = link.parentElement;
                    const wasActive = parent.classList.contains('active');

                    // Close all dropdowns
                    navLinks.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));

                    // Toggle current one
                    if (!wasActive) {
                        parent.classList.add('active');
                    }
                    return;
                }

                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
