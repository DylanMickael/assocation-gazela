document.addEventListener('alpine:init', () => {
    Alpine.data('testimonialManager', () => ({
        activeSlide: 0,
        testimonials: [
            {
                nom: "Benjaniaina ANDRIANOROMALALA",
                role: "Bénéficiaire Gazela",
                numero: "Success Story #1",
                citation: "Gazela me donne de la force, me pousse à être plus positif, me donne des leçons de vie comme le fait d'assumer davantage mes responsabilités.",
                image: "../../assets/img/hero.jpg"
            },
            {
                nom: "Fano ANDRIAMANANA",
                role: "Bénéficiaire Gazela",
                numero: "Success Story #2",
                citation: "Grâce à l'accompagnement, j'ai pu redéfinir mes objectifs professionnels et retrouver confiance.",
                image: "../../assets/img/hero.jpg"
            }
        ],
        next() {
            this.activeSlide = (this.activeSlide + 1) % this.testimonials.length;
        },
        prev() {
            this.activeSlide = (this.activeSlide - 1 + this.testimonials.length) % this.testimonials.length;
        }
    }));
});