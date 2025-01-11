export const getMoodIcon = (mood: string): string => {
  const moodIcons: Record<string, string> = {
    anxious: "sentiment_very_dissatisfied",
    happy: "sentiment_very_satisfied",
    relaxed: "self_improvement",
  };
  return moodIcons[mood.toLowerCase()] || "help_outline";
};
  