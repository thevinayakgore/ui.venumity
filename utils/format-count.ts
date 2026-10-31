type FormatCountOptions = {
  padSingleDigits?: boolean;
};

export function formatCount(
  value: number,
  options: FormatCountOptions = {},
): string {
  const { padSingleDigits = true } = options;

  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(
      value >= 10_000_000_000 ? 0 : 1,
    )}B`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(
      value >= 10_000_000 ? 0 : 1,
    )}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1)}K`;
  }

  if (padSingleDigits && value >= 1 && value <= 9) {
    return `0${value}`;
  }

  return String(value);
}