import { build as viteBuild } from "vite";
import { build as bundle } from "esbuild";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
await viteBuild();
await mkdir(".build", { recursive: true });
await bundle({
  entryPoints: ["src/App.tsx"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: ".build/app.mjs",
  packages: "external",
  jsx: "automatic",
});
const { default: App } = await import("../.build/app.mjs");
const projects = JSON.parse(await readFile("src/projects.json", "utf8"));
const template = await readFile("dist/index.html", "utf8");
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const origin = (
  process.env.SITE_URL ||
  (process.env.VERCEL
    ? "https://muhammadmaaz7.vercel.app"
    : "https://maaz-systems-notebook.wellsugar256.chatgpt.site")
).replace(/\/+$/, "");
for (const p of [null, ...projects]) {
  const path = p ? `/work/${p.slug}/` : "/";
  const title = p
    ? `${p.name} — Muhammad Maaz`
    : "Muhammad Maaz — Software Engineer";
  const description =
    p?.summary ??
    "Hi, I’m Maaz. Explore my full-stack products, AI-powered tools, experience, and a little about the person behind the work.";
  let html = template
    .replace("<!--ssr-->", renderToString(createElement(App, { path })))
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${escape(description)}">`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${escape(title)}">`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${escape(description)}">`,
    );
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${origin}${path}"><meta property="og:url" content="${origin}${path}"></head>`,
  );
  const dir = p ? `dist/work/${p.slug}` : "dist";
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
}
await mkdir("dist/privacy", { recursive: true });
await writeFile(
  "dist/privacy/index.html",
  template
    .replace(
      "<!--ssr-->",
      renderToString(createElement(App, { path: "/privacy/" })),
    )
    .replace(/<title>.*?<\/title>/, "<title>Privacy — Muhammad Maaz</title>"),
);
await writeFile(
  "dist/404.html",
  template.replace(
    "<!--ssr-->",
    renderToString(createElement(App, { path: "/404" })),
  ),
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", ...projects.map((p) => `/work/${p.slug}/`)].map((p) => `<url><loc>${origin}${p}</loc></url>`).join("")}</urlset>`,
);
await rm(".build", { recursive: true });
console.log(
  `Prerendered ${projects.length + 2} portfolio pages, including privacy, plus 404.`,
);
