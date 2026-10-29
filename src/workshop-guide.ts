export type GuideTarget = "work" | "experience" | "about" | "contact";
const targets: Record<GuideTarget, [number, number, number]> = {
  work: [0.02, 2.12, -0.43],
  experience: [1.25, 1.97, -0.2],
  about: [-2.04, 2.03, -0.45],
  contact: [2.1, 0.72, 1.25],
};
export function guidePose(target: GuideTarget | null) {
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
  const dx = x + (left ? 1.5 : 0.86),
    dy = y - 1.93,
    dz = z - 0.24;
  const yaw = Math.max(
    -0.6,
    Math.min(0.6, Math.atan2(dx, Math.abs(dz) + 1) * 0.55),
  );
  const shoulder = left ? -0.32 : 0.32;
  const aimedX = x + 1.18 - Math.cos(yaw) * shoulder;
  const aimedZ = z - 0.24 + Math.sin(yaw) * shoulder;
  const length = Math.hypot(aimedX, dy, aimedZ);
  // Convert the target direction into the character's turned local frame.
  return {
    left,
    yaw,
    headYaw: yaw * 0.5,
    headPitch: Math.max(
      -0.22,
      Math.min(0.22, -Math.atan2(y - 2.23, Math.hypot(x + 1.18, z - 0.24))),
    ),
    direction: [
      (Math.cos(yaw) * aimedX - Math.sin(yaw) * aimedZ) / length,
      dy / length,
      (Math.sin(yaw) * aimedX + Math.cos(yaw) * aimedZ) / length,
    ] as [number, number, number],
  };
}
