import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
const script = await readFile("public/assets/preferences.js", "utf8");
function initialize({
  theme = null,
  motion = null,
  dark = false,
  reduced = false,
  blocked = false,
} = {}) {
  const root = { dataset: {}, style: {} };
  const meta = {
    value: "",
    setAttribute(_, value) {
      this.value = value;
    },
  };
  runInNewContext(script, {
    document: { documentElement: root, querySelector: () => meta },
    localStorage: {
      getItem(key) {
        if (blocked) throw Error("blocked");
        return key === "portfolio-theme" ? theme : motion;
      },
    },
    matchMedia: (query) => ({
      matches: query.includes("color-scheme") ? dark : reduced,
    }),
  });
  return { ...root, meta: meta.value };
}
test("First paint follows device preference until the visitor chooses lighting", () => {
  assert.equal(initialize({ dark: true }).dataset.theme, "dark");
  assert.equal(
    initialize({ theme: "light", dark: true }).dataset.theme,
    "light",
  );
  assert.equal(
    initialize({ theme: "dark", dark: false }).dataset.theme,
    "dark",
  );
  assert.equal(
    initialize({ theme: "unknown", dark: true }).dataset.theme,
    "dark",
  );
  assert.equal(initialize({ blocked: true, dark: true }).dataset.theme, "dark");
  assert.equal(initialize({ theme: "dark" }).meta, "#252f38");
  assert.equal(initialize({ theme: "light" }).style.colorScheme, "light");
});
test("Reduced motion overrides saved animation-on and storage failure is safe", () => {
  assert.equal(
    initialize({ motion: "on", reduced: true }).dataset.motion,
    "off",
  );
  assert.equal(initialize({ motion: "off" }).dataset.motion, "off");
  assert.equal(initialize({ motion: "on" }).dataset.motion, "on");
  assert.equal(
    initialize({ blocked: true, reduced: true }).dataset.motion,
    "off",
  );
});
function luminance(hex) {
  return hex
    .slice(1)
    .match(/../g)
    .map((part) => parseInt(part, 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    )
    .reduce(
      (sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index],
      0,
    );
}
function contrast(a, b) {
  const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y);
  return (high + 0.05) / (low + 0.05);
}
test("Text colors have at least 4.5:1 contrast on their shared reading surfaces", async () => {
  const css = await readFile("src/theme.css", "utf8");
  const base = await readFile("src/index.css", "utf8");
  const variables = (block) =>
    Object.fromEntries(
      [...block.matchAll(/(--[\w-]+):\s*(#[\da-f]{6})/gi)].map((match) => [
        match[1],
        match[2],
      ]),
    );
  const light = {
    ...variables(base.match(/:root\s*{([^}]+)/)[1]),
    ...variables(css.match(/:root\s*{([^}]+)/)[1]),
  };
  const dark = {
    ...light,
    ...variables(css.match(/:root\[data-theme=["']dark["']\]\s*{([^}]+)/)[1]),
  };
  for (const [mode, colors] of Object.entries({ light, dark }))
    for (const text of ["--ink", "--muted"])
      for (const surface of [
        "--paper",
        "--surface",
        "--surface-soft",
        "--surface-sage",
        "--surface-blue",
      ])
        assert.ok(
          contrast(colors[text], colors[surface]) >= 4.5,
          `${mode} ${text} on ${surface}`,
        );
});
test("All prerendered entry points initialize the same preferences before React", async () => {
  for (const path of [
    "dist/index.html",
    "dist/privacy/index.html",
    "dist/work/clarimo/index.html",
    "dist/404.html",
  ]) {
    const html = await readFile(path, "utf8");
    assert.ok(html.indexOf("/assets/preferences.js") < html.indexOf("<body>"));
    assert.ok(html.includes('aria-label="Portfolio color theme"'));
  }
});
