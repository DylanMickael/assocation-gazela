document.addEventListener('alpine:init', () => {
    Alpine.data('blogManager', () => ({
        articles: [],
        search: '',
        loading: true,

        async init() {
            const HYGRAPH_ENDPOINT = 'https://eu-west-2.cdn.hygraph.com/content/cmkljmpnu00ib07wg8ksxcvat/master';
            const query = `{
                blogs(orderBy: date_DESC) {
                    titre 
                    description 
                    lirePlus 
                    date
                    image { url }
                }
            }`;

            try {
                const response = await fetch(HYGRAPH_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });
                const json = await response.json();
                this.articles = json.data.blogs;
            } catch (error) {
                console.error("Erreur lors de la récupération des articles:", error);
            } finally {
                this.loading = false;
            }
        },

        get filteredGroups() {
            // 1. Filtrer les articles selon la recherche
            const filtered = this.articles.filter(a =>
                a.titre.toLowerCase().includes(this.search.toLowerCase()) ||
                a.description.toLowerCase().includes(this.search.toLowerCase())
            );

            // 2. Grouper par Mois Année
            const groups = {};
            filtered.forEach(article => {
                const date = new Date(article.date);
                const key = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

                if (!groups[key]) groups[key] = [];
                groups[key].push(article);
            });

            return groups;
        },

        formatDay(d) {
            return new Date(d).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short'
            });
        }
    }));
});