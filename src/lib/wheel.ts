// Utility functions to compute final rotation angle and map angles <-> indices.
// Keep logic in one place so UI and tests use same math.

export function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

/**
 * Compute the final rotation angle (degrees) that will align the center of `winnerIndex`
 * with the top pointer.
 *
 * @param winnerIndex index of the chosen segment [0..slicesCount-1]
 * @param slicesCount number of segments
 * @param spins number of full 360 spins (can be fractional)
 * @param pointerOffset optional degrees to offset pointer (0 = top). Use if pointer is not at top.
 * @returns degrees to rotate (add to current rotation)
 */
export function computeFinalAngle(
  winnerIndex: number,
  slicesCount: number,
  spins = 8,
  pointerOffset = 0
) {
  const segmentAngle = 360 / slicesCount;
  // centerAngle = angular position (0..360) of segment center measured from 0deg reference
  const centerAngle = winnerIndex * segmentAngle + segmentAngle / 2;
  // We want the centerAngle to end up at pointerOffset (e.g., 0 = top). To rotate the wheel so that centerAngle aligns with pointerOffset:
  // rotate degrees = spins*360 + (360 - (centerAngle - pointerOffset)) mod 360
  const align = normalizeAngle(360 - normalizeAngle(centerAngle - pointerOffset));
  return spins * 360 + align;
}

/**
 * Convert an absolute rotation angle (0..360, where 0 means no rotation applied) to a segment index.
 * This assumes pointer is at top. If pointerOffset != 0, pass it.
 */
export function angleToIndex(angle: number, slicesCount: number, pointerOffset = 0) {
  const segmentAngle = 360 / slicesCount;
  const normalized = normalizeAngle(angle - pointerOffset);
  // wheel rotation positive values rotate clockwise; to find which segment is at the pointer we invert:
  const adjusted = normalizeAngle(360 - normalized);
  // choose index by dividing adjusted by segmentAngle, using rounding to nearest center
  return Math.floor(normalizeAngle(adjusted + segmentAngle / 2) / segmentAngle) % slicesCount;
}
