document.addEventListener('alpine:init', () => {
    Alpine.data('annonceManager', () => ({
        annonces: [],
        search: '',
        loading: true,
        loadingMore: false,
        skip: 0,
        pageSize: 6,
        hasMore: true,
        HYGRAPH_ENDPOINT: 'https://eu-west-2.cdn.hygraph.com/content/cmkljmpnu00ib07wg8ksxcvat/master',

        async init() {
            await this.fetchAnnonces();
        },

        async fetchAnnonces(isLoadingMore = false) {
            if (isLoadingMore) this.loadingMore = true;
            else this.loading = true;

            const query = `{
                annonces(orderBy: dateDePublication_DESC, first: ${this.pageSize}, skip: ${this.skip}) {
                    titre 
                    description 
                    competences 
                    dateDePublication
                }
                annoncesConnection {
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
                const newAnnonces = json.data.annonces;
                const totalCount = json.data.annoncesConnection.aggregate.count;
                this.annonces = [...this.annonces, ...newAnnonces];
                this.skip += this.pageSize;
                this.hasMore = this.annonces.length < totalCount;

            } catch (error) {
                console.error("Erreur:", error);
            } finally {
                this.loading = false;
                this.loadingMore = false;
            }
        },

        async loadMore() {
            if (this.loadingMore || !this.hasMore || this.search.length > 0) return;
            await this.fetchAnnonces(true);
        },

        get filteredGroups() {
            const filtered = this.annonces.filter(a =>
                a.titre.toLowerCase().includes(this.search.toLowerCase()) ||
                a.description.toLowerCase().includes(this.search.toLowerCase())
            );

            const groups = {};
            filtered.forEach(article => {
                const dateDePublication = new Date(article.dateDePublication);
                const key = dateDePublication.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
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