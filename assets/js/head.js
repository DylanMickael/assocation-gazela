(function () {
    const siteConfig = {
        titleSuffix: " | Association Gazela",
        description: "L'association Gazela œuvre pour l'éducation, la culture et le développement social des enfants et jeunes à Madagascar depuis 2011.",
        image: window.location.origin + "/assets/img/gazela_hero_madagascar.png",
        url: window.location.origin + "/",
        email: "association.gazela@gmail.com"
    };

    let base = document.querySelector('base');
    if (!base) {
        base = document.createElement('base');
        document.head.prepend(base);
    }
    base.href = siteConfig.url;

    if (!document.title.includes("Gazela")) {
        document.title = document.title + siteConfig.titleSuffix;
    }

    const metaData = {
        "description": siteConfig.description,
        "og:title": document.title,
        "og:description": siteConfig.description,
        "og:image": siteConfig.image,
        "og:url": window.location.origin + window.location.pathname,
        "og:type": "website",
        "twitter:card": "summary_large_image",
        "robots": "index, follow"
    };

    Object.entries(metaData).forEach(([name, content]) => {
        let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            if (name.includes('og:')) meta.setAttribute('property', name);
            else meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.content = content;
    });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "Association Gazela",
        "url": siteConfig.url,
        "logo": siteConfig.url + "assets/img/logo.png",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Antananarivo",
            "addressCountry": "MG"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": siteConfig.email,
            "contactType": "customer service"
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    console.log("SEO & Base URL chargés avec succès.");
})();