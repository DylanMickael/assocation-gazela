document.addEventListener('alpine:init', () => {
    Alpine.data('blogManager', () => ({
        articles: [],
        search: '',
        loading: true,
        loadingMore: false,
        skip: 0,
        pageSize: 6,
        hasMore: true,
        HYGRAPH_ENDPOINT: 'https://eu-west-2.cdn.hygraph.com/content/cmkljmpnu00ib07wg8ksxcvat/master',

        async init() {
            await this.fetchArticles();
        },

        async fetchArticles(isLoadingMore = false) {
            if (isLoadingMore) this.loadingMore = true;
            else this.loading = true;

            const query = `{
                blogs(orderBy: date_DESC, first: ${this.pageSize}, skip: ${this.skip}) {
                    titre 
                    description 
                    lirePlus 
                    date
                    image { url }
                }
                blogsConnection {
                    aggregate {
                        count
                    }
                }
            }`;

            try {
                const response = await fetch(this.HYGRAPH_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query })
                });
                const json = await response.json();
                const newArticles = json.data.blogs;
                const totalCount = json.data.blogsConnection.aggregate.count;
                this.articles = [...this.articles, ...newArticles];
                this.skip += this.pageSize;
                this.hasMore = this.articles.length < totalCount;

            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                this.loading = false;
                this.loadingMore = false;
            }
        },

        async loadMore() {
            if (this.loadingMore || !this.hasMore || this.search.length > 0) return;
            await this.fetchArticles(true);
        },

        get filteredGroups() {
            const filtered = this.articles.filter(a =>
                a.titre.toLowerCase().includes(this.search.toLowerCase()) ||
                a.description.toLowerCase().includes(this.search.toLowerCase())
            );

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
            return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
        }
    }));
});