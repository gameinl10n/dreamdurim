export const FOUNDATION_DATE = new Date(2024, 8, 1);

export const getDaysSinceDate = (targetDate, baseDate = new Date()) => {
  const dayMs = 24 * 60 * 60 * 1000;
  const baseDayStart = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  return Math.max(1, Math.floor((baseDayStart - targetDate) / dayMs) + 1);
};
