
const STOP_WORDS = new Set([
  "the", "is", "on", "and", "a", "an", "in", "at",
  "to", "of", "for", "are", "was", "with", "near",
  "this", "that", "it", "by", "from", "there",
  "causing", "cause", "creating", "issue", "problem"
]);

function normalize(text = "") {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(word => word.length > 2 && !STOP_WORDS.has(word))
  );
}

function similarityScore(text1, text2) {
  const words1 = normalize(text1);
  const words2 = normalize(text2);

  if (!words1.size || !words2.size) return 0;

  const common = [...words1].filter(word => words2.has(word));
  const union = new Set([...words1, ...words2]);

  return common.length / union.size;
}

export function findDuplicate(newReport, reports) {
  return reports.find(report => {
    const sameCategory =
      report.category?.toLowerCase() ===
      newReport.category?.toLowerCase();

    const sameLocation =
      report.location?.trim().toLowerCase() ===
      newReport.location?.trim().toLowerCase();

    if (!sameCategory || !sameLocation) return false;

    const score = similarityScore(
      report.description,
      newReport.description
    );

    console.log("Duplicate similarity:", score);

    return score >= 0.30;
  });
}
