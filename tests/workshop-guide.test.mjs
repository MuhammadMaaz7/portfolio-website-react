import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { transform } from "esbuild";
const { code } = await transform(
  await readFile("src/workshop-guide.ts", "utf8"),
  { loader: "ts", format: "esm" },
);
const { guidePose } = await import(
  `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
);
test("The guide points toward each object from the appropriate shoulder", () => {
  const targets = {
    work: [0.02, 2.12, -0.43],
    experience: [1.25, 1.97, -0.2],
    about: [-2.04, 2.03, -0.45],
    contact: [2.1, 0.72, 1.25],
  };
  for (const [target, [x, y, z]] of Object.entries(targets)) {
    const pose = guidePose(target);
    const [a, b, c] = pose.direction;
    assert.ok(Math.abs(Math.hypot(a, b, c) - 1) < 1e-10);
    const world = [
      Math.cos(pose.yaw) * a + Math.sin(pose.yaw) * c,
      b,
      -Math.sin(pose.yaw) * a + Math.cos(pose.yaw) * c,
    ];
    const shoulder = pose.left ? -0.32 : 0.32;
    const expected = [
      x + 1.18 - Math.cos(pose.yaw) * shoulder,
      y - 1.93,
      z - 0.24 + Math.sin(pose.yaw) * shoulder,
    ];
    const length = Math.hypot(...expected);
    world.forEach((value, index) =>
      assert.ok(
        Math.abs(value - expected[index] / length) < 1e-10,
        `${target} axis ${index}`,
      ),
    );
    assert.ok(Math.abs(pose.yaw) <= 0.6);
    assert.ok(Math.abs(pose.headPitch) <= 0.22);
  }
  assert.equal(guidePose("about").left, true);
  assert.ok(guidePose("contact").direction[1] < 0);
});
test("Leaving the tour restores the neutral facing direction", () => {
  const pose = guidePose(null);
  assert.equal(pose.yaw, 0);
  assert.equal(pose.headPitch, 0);
  assert.equal(pose.headYaw, 0);
});
test("Home includes a guided tour and keeps preference controls out of a floating overlay", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.ok(html.includes("Show me around"));
  assert.ok(html.includes("Maaz says"));
  const footer = html.slice(html.indexOf("<footer"));
  assert.ok(footer.includes("motion-control"));
  const css = await readFile("src/theme.css", "utf8");
  assert.ok(css.includes("100svh"));
  assert.ok(!/overflow:\s*hidden/.test(css));
});
