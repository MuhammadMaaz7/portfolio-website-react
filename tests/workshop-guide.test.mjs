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
test("Every desk route reaches its stop without overshooting and returns home", async () => {
  const module = await import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
  const { deskHome, deskStops, deskRoute, advanceDeskWalk } = module;
  for (const stop of Object.values(deskStops))
    for (const [from, to] of [
      [deskHome, stop],
      [stop, deskHome],
    ]) {
      const path = deskRoute(from, to);
      let position = [...from],
        index = 0;
      for (let frame = 0; frame < 1000 && index < path.length; frame++) {
        const step = advanceDeskWalk(position, path, index, 0.025);
        assert.ok(step.travelled <= 0.025 + 1e-10);
        assert.ok(step.position.every(Number.isFinite));
        assert.ok(
          Math.abs(step.position[0]) <= 2.2 &&
            step.position[2] >= -0.82 &&
            step.position[2] <= 0.57,
        );
        position = step.position;
        index = step.index;
      }
      assert.equal(index, path.length);
      position.forEach((value, axis) =>
        assert.ok(Math.abs(value - to[axis]) < 1e-10),
      );
    }
  assert.deepEqual(deskRoute(deskHome, deskHome), []);
});
test("Changing tour stops mid-walk continues from the current position", async () => {
  const { deskHome, deskStops, deskRoute, advanceDeskWalk } = await import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
  const first = advanceDeskWalk(
    deskHome,
    deskRoute(deskHome, deskStops.experience),
    0,
    0.3,
  );
  const redirect = advanceDeskWalk(
    first.position,
    deskRoute(first.position, deskStops.about),
    0,
    0,
  );
  assert.deepEqual(redirect.position, first.position);
});
test("The About stop has room beside the profile frame in the camera view", async () => {
  const { deskStops } = await import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
  const [x, , z] = deskStops.about;
  const frame = [-2.04, -0.45];
  assert.ok(Math.hypot(x - frame[0], z - frame[1]) > 0.8);
  // Project the separation onto the camera's horizontal right axis, accounting for the room rotation.
  const angle = -0.12;
  const dx = x - frame[0],
    dz = z - frame[1];
  const worldX = Math.cos(angle) * dx + Math.sin(angle) * dz;
  const worldZ = -Math.sin(angle) * dx + Math.cos(angle) * dz;
  const separation = (7 * worldX - 5.8 * worldZ) / Math.hypot(7, 5.8);
  assert.ok(
    Math.abs(separation) > 0.75,
    "Character silhouette should stay beside the profile frame",
  );
});
