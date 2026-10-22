const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const solutionsPath = path.join(rootDir, 'public', 'data', 'solutions.json');
const casosPath = path.join(rootDir, 'public', 'data', 'casos-exito.json');
const blogPath = path.join(rootDir, 'public', 'data', 'blog-posts.json');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));
const casos = JSON.parse(fs.readFileSync(casosPath, 'utf8'));
const blogs = JSON.parse(fs.readFileSync(blogPath, 'utf8'));

const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { loc: 'https://enertronic.com.pe/', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://enertronic.com.pe/nosotros/', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://enertronic.com.pe/soluciones-enertronic/', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://enertronic.com.pe/casos-de-exito/', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://enertronic.com.pe/blog/', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://enertronic.com.pe/contactos/', changefreq: 'monthly', priority: '0.7' },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Páginas Principales -->
`;

for (const page of staticPages) {
  xml += `    <url>
        <loc>${page.loc}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>
`;
}

xml += `
    <!-- Soluciones Técnicas Específicas -->
`;

for (const sol of solutions) {
  xml += `    <url>
        <loc>https://enertronic.com.pe/soluciones/${sol.slug}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
`;
}

xml += `
    <!-- Casos de Éxito -->
`;

for (const caso of casos) {
  xml += `    <url>
        <loc>https://enertronic.com.pe/casos-de-exito/${caso.slug}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
`;
}

xml += `
    <!-- Artículos Técnicos del Blog -->
`;

for (const post of blogs) {
  xml += `    <url>
        <loc>https://enertronic.com.pe/blog/${post.id}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
`;
}

xml += `</urlset>\n`;

fs.writeFileSync(sitemapPath, xml, 'utf8');
const total = staticPages.length + solutions.length + casos.length + blogs.length;
console.log(`✅ sitemap.xml actualizado con éxito (${staticPages.length} fijas + ${solutions.length} soluciones + ${casos.length} casos + ${blogs.length} blogs = ${total} URLs totales).`);
