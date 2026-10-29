export type GuideTarget = "work" | "experience" | "about" | "contact";
const targets: Record<GuideTarget, [number, number, number]> = {
  work: [0.02, 2.12, -0.43],
  experience: [1.25, 1.97, -0.2],
  about: [-2.04, 2.03, -0.45],
  contact: [2.1, 0.72, 1.25],
};
export type DeskPosition = [number, number, number];
export const deskHome: DeskPosition = [-1.18, 1.51, 0.24];
export const deskStops: Record<GuideTarget, DeskPosition> = {
  work: [-1, 1.51, -0.1],
  experience: [1.18, 1.51, 0.52],
  about: [-1.63, 1.51, 0.23],
  contact: [1.78, 1.51, 0.53],
};
export function deskRoute(
  from: DeskPosition,
  to: DeskPosition,
): DeskPosition[] {
  if (Math.hypot(...from.map((value, i) => value - to[i])) < 0.001) return [];
  const crossesKeyboard =
    Math.min(from[0], to[0]) < 0.9 && Math.max(from[0], to[0]) > -0.9;
  if (!crossesKeyboard) return [[...to]];
  const height = 1.73;
  return [[from[0], height, 0.56], [to[0], height, 0.56], [...to]];
}
export function advanceDeskWalk(
  position: DeskPosition,
  path: DeskPosition[],
  index: number,
  budget: number,
) {
  let next: DeskPosition = [...position];
  let direction: DeskPosition = [0, 0, 0];
  let travelled = 0;
  while (index < path.length && budget > 0) {
    const delta = path[index].map((value, i) => value - next[i]);
    const length = Math.hypot(...delta);
    if (length < 0.00001) {
      index++;
      continue;
    }
    direction = delta.map((value) => value / length) as DeskPosition;
    const step = Math.min(length, budget);
    next = next.map((value, i) => value + direction[i] * step) as DeskPosition;
    budget -= step;
    travelled += step;
    if (step >= length) {
      next = [...path[index]];
      index++;
    }
  }
  return {
    position: next,
    index,
    direction,
    travelled,
    walking: index < path.length,
  };
}
export function guidePose(
  target: GuideTarget | null,
  origin: DeskPosition = deskHome,
) {
  if (!target)
    return {
      left: false,
      yaw: 0,
      headYaw: 0,
      headPitch: 0,
      direction: [0, 1, 0] as [number, number, number],
    };
  const [x, y, z] = targets[target];
  const left = target === "about";
  const dx = x - origin[0] - (left ? -0.32 : 0.32),
    dy = y - origin[1] - 0.42,
    dz = z - origin[2];
  const yaw = Math.max(
    -0.6,
    Math.min(0.6, Math.atan2(dx, Math.abs(dz) + 1) * 0.55),
  );
  const shoulder = left ? -0.32 : 0.32;
  const aimedX = x - origin[0] - Math.cos(yaw) * shoulder;
  const aimedZ = z - origin[2] + Math.sin(yaw) * shoulder;
  const length = Math.hypot(aimedX, dy, aimedZ);
  // Convert the target direction into the character's turned local frame.
  return {
    left,
    yaw,
    headYaw: yaw * 0.5,
    headPitch: Math.max(
      -0.22,
      Math.min(
        0.22,
        -Math.atan2(
          y - origin[1] - 0.72,
          Math.hypot(x - origin[0], z - origin[2]),
        ),
      ),
    ),
    direction: [
      (Math.cos(yaw) * aimedX - Math.sin(yaw) * aimedZ) / length,
      dy / length,
      (Math.sin(yaw) * aimedX + Math.cos(yaw) * aimedZ) / length,
    ] as [number, number, number],
  };
}
