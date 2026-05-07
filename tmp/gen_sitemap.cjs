const fs = require('fs');

const BASE_URL = "https://www.coolcareservices.in";

// Read JSON data
const cities = JSON.parse(fs.readFileSync('./src/data/cities.json', 'utf8'));
const services = JSON.parse(fs.readFileSync('./src/data/services.json', 'utf8'));

const staticRoutes = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/about-us", priority: "0.8", changefreq: "monthly" },
    { path: "/services", priority: "0.9", changefreq: "weekly" },
    { path: "/contact", priority: "0.8", changefreq: "monthly" },
    { path: "/faqs", priority: "0.8", changefreq: "monthly" },
    { path: "/blog", priority: "0.8", changefreq: "weekly" }
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Static
staticRoutes.forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}${route.path}</loc>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>\n`;
});

// Cities
cities.forEach(city => {
    xml += `  <url>\n    <loc>${BASE_URL}/${city.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
});

// Service-City combinations (The deep high-value pages)
services.forEach(service => {
    cities.forEach(city => {
        xml += `  <url>\n    <loc>${BASE_URL}/services/${service.slug}-${city.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    });
});

xml += '</urlset>';

fs.writeFileSync('./public/sitemap.xml', xml);
console.log("Sitemap with indexing hints generated!");
