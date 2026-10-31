
export function calculatePriority(ai) {
  const severity = {
    Low: 10,
    Medium: 25,
    High: 40,
    Critical: 50
  };

  const safety = {
    Low: 0,
    Medium: 15,
    High: 25
  };

  const impact = {
    Low: 0,
    Medium: 10,
    High: 25
  };

  const score =
    (severity[ai.severity] ?? 10) +
    (safety[ai.safetyRisk] ?? 0) +
    (impact[ai.affectedPeople] ?? 0);

  let level = "Low";

  if (score >= 80) level = "Critical";
  else if (score >= 60) level = "High";
  else if (score >= 30) level = "Medium";

  return {
    score,
    level,
    explanation: `Priority score ${score}/100 based on severity, safety risk and estimated public impact.`
  };
}
