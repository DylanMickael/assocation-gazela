(function () {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
        if (mobileMenuToggle && mobileMenuToggle.checked) return;

        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (navbar) {
            navbar.style.transition = "top 0.3s bounce-in";
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.top = "-100px";
            } else {
                navbar.style.top = "0";
            }
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    const updateScrollLock = () => {
        const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
        if (mobileMenuToggle) {
            if (mobileMenuToggle.checked) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        }
    };

    document.addEventListener('change', (e) => {
        if (e.target.id === 'mobile-menu-toggle') {
            updateScrollLock();
        }
    });
    document.addEventListener('click', (e) => {
        const toggle = document.getElementById("mobile-menu-toggle");
        if (toggle) {
            setTimeout(updateScrollLock, 50);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            const toggle = document.getElementById("mobile-menu-toggle");
            if (toggle && toggle.checked) {
                toggle.checked = false;
                updateScrollLock();
            }
        }
    });
})();

