export const ECO = ["A", "B", "C", "D", "E"];

export const PACKAGING = [
  { value: "recyclable", label: "Recyclable" },
  { value: "partial", label: "Partly recyclable" },
  { value: "not recyclable", label: "Not recyclable" },
];

export function scoreLabel(score) {
  if (!score) return "—";
  return `Eco: ${score}`;
}

export function ecoPoints(ecoScore) {
  switch (ecoScore) {
    case "A":
      return 5;
    case "B":
      return 4;
    case "C":
      return 3;
    case "D":
      return 2;
    case "E":
      return 1;
    default:
      return 3;
  }
}

export function pointsToLetter(avgPoints) {
  if (avgPoints >= 4.5) return "A";
  if (avgPoints >= 3.5) return "B";
  if (avgPoints >= 2.5) return "C";
  if (avgPoints >= 1.5) return "D";
  return "E";
}

export function nextBadge(current) {
  if (current === "bronze") return "silver";
  if (current === "silver") return "gold";
  return "gold";
}
