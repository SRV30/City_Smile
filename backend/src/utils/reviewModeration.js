const profanityWords = [
  "abuse",
  "idiot",
  "hate",
  "stupid",
  "harass",
  "fraud",
  "scam",
];

export const hasLink = (text = "") =>
  /(https?:\/\/|www\.|\.com|\.in|t\.me|telegram)/i.test(text);
export const hasProfanity = (text = "") =>
  profanityWords.some((word) => text.toLowerCase().includes(word));
export const isSpamPattern = (text = "") =>
  /(.)\1{8,}|(buy now|guaranteed profit|free money|loan)/i.test(text);
