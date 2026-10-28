import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access, readdir, stat } from "node:fs/promises";
const projects = JSON.parse(await readFile("src/projects.json", "utf8"));
test("Every case study has a unique route and substantive content", () => {
  assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
  for (const p of projects) {
    for (const field of [
      "summary",
      "role",
      "problem",
      "contribution",
      "outcome",
      "note",
    ])
      assert.ok(p[field]?.length > 8, `${p.slug}: ${field}`);
    assert.ok(p.decisions.length >= 3);
    if (p.github)
      assert.match(p.github, /^https:\/\/github.com\/MuhammadMaaz7\//);
  }
});
test("All project pages deliver their title and contribution without JavaScript", async () => {
  for (const p of projects) {
    const html = await readFile(`dist/work/${p.slug}/index.html`, "utf8");
    assert.ok(html.includes(p.name));
    assert.ok(html.includes("My contribution."));
    assert.ok(html.includes(p.contribution.replaceAll("&", "&amp;")));
    assert.ok(!html.includes("<!--ssr-->"));
  }
});
test("Default portfolio represents Maaz and a balanced mix of four projects", async () => {
  const html = await readFile("dist/index.html", "utf8");
  const hero = html.slice(
    html.indexOf("welcome-section"),
    html.indexOf('data-view="work"'),
  );
  assert.ok(hero.includes("Hi, I"));
  assert.ok(hero.includes("Maaz"));
  assert.ok(!hero.includes("SCAI"));
  assert.ok(!hero.includes("Osmani"));
  const defaultSlugs = [...html.matchAll(/data-project="([^"]+)"/g)].map(
    (m) => m[1],
  );
  assert.deepEqual(defaultSlugs, [
    "clarimo",
    "jarvis",
    "golocal",
    "verification",
  ]);
  for (const id of ["work", "experience", "about", "contact"]) {
    assert.ok(html.includes(`id="${id}"`));
    assert.ok(html.includes(`href="#${id}"`));
  }
});
test("All homepage internal routes resolve and career status is explicit", async () => {
  const html = await readFile("dist/index.html", "utf8");
  for (const [, path] of html.matchAll(/href="(\/work\/[^"#]+)"/g))
    await access(`dist${path}index.html`);
  assert.ok(!html.includes("Incoming"));
  assert.ok(html.includes("OCLITS Systems"));
  assert.ok(html.includes("Current"));
  assert.ok(html.includes("Completed"));
  assert.ok(html.includes("November 2026"));
  assert.ok(html.includes("In this notebook"));
  await access("dist/privacy/index.html");
  await access("dist/404.html");
});
test("Workshop has a static illustration and keyboard-accessible alternatives before JavaScript", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.ok(html.includes("An illustrated workshop"));
  assert.ok(html.includes("Explore the workshop"));
  for (const name of ["Projects", "My journey", "About me", "Say hello"])
    assert.ok(html.includes(name));
  assert.ok(html.includes("Switch the portfolio to evening"));
  assert.ok(html.includes("Say hello to the workshop character"));
  assert.ok(html.includes("motion-control"));
});
test("3D rendering code is separate from the initial page bundle", async () => {
  const files = await readdir("dist/assets");
  assert.equal(files.filter((f) => /^WorkshopScene-.*\.js$/.test(f)).length, 1);
  const core = files.find((f) => /^index-.*\.js$/.test(f));
  assert.ok(core);
  assert.ok(
    (await stat(`dist/assets/${core}`)).size < 230000,
    "Initial bundle must stay below 230 KB uncompressed.",
  );
  const html = await readFile("dist/index.html", "utf8");
  assert.ok(
    !/rel="modulepreload"[^>]*WorkshopScene/.test(html),
    "3D should load on visibility, not be a mandatory initial preload.",
  );
});
test("Workshop navigation retains shareable project state and rejects invalid hashes", async () => {
  const { transform } = await import("esbuild");
  const source = await readFile("src/navigation.ts", "utf8");
  const { code } = await transform(source, { loader: "ts", format: "esm" });
  const { readPortfolioHash, portfolioHash } = await import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
  for (const section of ["home", "work", "experience", "about", "contact"])
    assert.deepEqual(readPortfolioHash(portfolioHash(section)), {
      section,
      project: null,
    });
  assert.deepEqual(readPortfolioHash(portfolioHash("work", "clarimo")), {
    section: "work",
    project: "clarimo",
  });
  assert.deepEqual(readPortfolioHash("#unknown/clarimo"), {
    section: "home",
    project: null,
  });
  assert.equal(readPortfolioHash("#about/clarimo").project, null);
  assert.equal(readPortfolioHash("#work/<script>").project, null);
});
test("Project previews use real content in accessible notes and career has a no-script alternative", async () => {
  const home = await readFile("dist/index.html", "utf8");
  assert.ok(home.includes("<dialog"));
  assert.ok(home.includes('aria-labelledby="project-note-title"'));
  assert.ok(home.includes("career-print"));
  for (const employer of [
    "VECTOR Inc.",
    "OCLITS Systems",
    "MazikGlobal",
    "OGDCL",
    "Jadeed",
  ])
    assert.ok(home.includes(employer));
  const work = await readFile("src/components/WorkCollection.tsx", "utf8");
  assert.ok(!work.includes("ProjectArt"));
  assert.ok(work.includes("preventDefault"));
});
test("Career corrections attribute current and completed roles to the right company", async () => {
  const html = await readFile("dist/index.html", "utf8");
  const printable = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];
  assert.ok(
    printable,
    "Career history must also exist without client interaction",
  );
  const roles = [...printable.matchAll(/<article>([\s\S]*?)<\/article>/g)].map(
    (m) => m[1],
  );
  assert.equal(roles.filter((role) => role.includes("Current")).length, 1);
  assert.ok(
    roles.find((role) => role.includes("VECTOR Inc."))?.includes("Current"),
  );
  const oclits = roles.filter((role) => role.includes("OCLITS Systems"));
  assert.equal(
    oclits.length,
    2,
    "The engineering role and earlier internship are distinct chapters",
  );
  assert.ok(
    oclits.some(
      (role) =>
        role.includes("AI Automation Engineer") &&
        role.includes("Completed") &&
        !role.includes("present"),
    ),
  );
  assert.ok(
    oclits.some(
      (role) =>
        role.includes("Frappe Developer Intern") && role.includes("2024"),
    ),
  );
  assert.ok(
    html.includes("https://www.linkedin.com/in/muhammad-maaz-uddin-2m8h/"),
  );
  assert.ok(!html.includes("desk-shortcuts"));
  for (const action of [
    "Show me around",
    "Open drawer",
    "Read notebook",
    "Meet Maaz",
    "Write a note",
  ])
    assert.ok(html.includes(action));
});
