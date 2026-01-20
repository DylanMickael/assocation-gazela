document.addEventListener('DOMContentLoaded', function () {

    // Search Functionality
    const searchInput = document.getElementById('blogSearch');
    const blogCards = document.querySelectorAll('.blog-card');
    const timelineGroups = document.querySelectorAll('.timeline-group');
    const noResultsMsg = document.getElementById('noResults');

    if (searchInput) {
        searchInput.addEventListener('keyup', function (e) {
            const query = e.target.value.toLowerCase();
            let hasVisibleArticles = false;

            // Filter individual cards
            blogCards.forEach(card => {
                const title = card.querySelector('h3').innerText.toLowerCase();
                const text = card.querySelector('p').innerText.toLowerCase();
                const tagsElement = card.querySelector('.card-tags');
                const tags = tagsElement ? tagsElement.innerText.toLowerCase() : '';
                const date = card.querySelector('.card-date').innerText.toLowerCase();

                // Match against title, text, tags, or date
                if (title.includes(query) || text.includes(query) || tags.includes(query) || date.includes(query)) {
                    card.style.display = 'flex';
                    hasVisibleArticles = true;
                } else {
                    card.style.display = 'none';
                }
            });

            // Handle Timeline Groups visibility
            timelineGroups.forEach(group => {
                const grid = group.querySelector('.articles-grid');
                const visibleCards = grid.querySelectorAll('.blog-card[style="display: flex;"]');
                // Note: style="display: flex;" check is brittle if CSS sets it differently, 
                // but here JS sets it inline. A better check is excluding display: none

                // Let's count visible children more robustly
                let groupVisibleCount = 0;
                const cardsInGroup = group.querySelectorAll('.blog-card');
                cardsInGroup.forEach(c => {
                    if (c.style.display !== 'none') groupVisibleCount++;
                });

                if (groupVisibleCount > 0) {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });

            // Show no results message if nothing is found
            if (!hasVisibleArticles) {
                if (noResultsMsg) noResultsMsg.style.display = 'block';
            } else {
                if (noResultsMsg) noResultsMsg.style.display = 'none';
            }
        });
    }

    // Expand Card Functionality
    const readMoreLinks = document.querySelectorAll('.read-more-link');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const card = this.closest('.blog-card');
            const icon = this.querySelector('i');

            // Toggle expanded class
            card.classList.toggle('expanded');

            // Toggle button text and icon
            if (card.classList.contains('expanded')) {
                this.innerHTML = 'Lire moins <i class="fa-solid fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'Lire la suite <i class="fa-solid fa-arrow-right"></i>';
            }
        });
    });

});
