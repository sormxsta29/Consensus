export type Mapping = Record<string, string>;

/**
 * Sanitizes PII from text using regex patterns
 * Masks: Emails, Phone numbers, Currency amounts, Dates, and Proper names
 * Returns sanitized text and a mapping for local rehydration
 */
export function sanitizePII(text: string) {
  const mapping: Mapping = {};
  const counts = { NAME: 0, DATE: 0, AMOUNT: 0, EMAIL: 0, PHONE: 0 };

  // Email pattern
  const emailRe = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  
  // Phone pattern (flexible for various formats)
  const phoneRe = /(?:\+?\d{1,3}[\s-]?)?(?:\(\d{2,3}\)[\s-]?|\d{2,4}[\s-])?\d{3,4}[\s-]?\d{3,4}/g;
  
  // Currency amounts (supports $, USD, EUR, £, €, INR, Rs.)
  const amountRe = /(?:\$|USD|EUR|£|€|INR|Rs\.?)(?:\s)?\d{1,3}(?:[,\s]\d{3})*(?:\.\d+)?/gi;
  
  // Date patterns (YYYY-MM-DD, MM/DD/YYYY, DD-MM-YYYY, etc.)
  const dateRe = /\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})\b/g;
  
  // Proper names (2-3 capitalized words)
  const nameRe = /\b([A-Z][a-z]{1,}(?:\s+[A-Z][a-z]{1,}){1,2})\b/g;

  let out = text;

  // Replace in order of specificity (most specific first)
  out = out.replace(emailRe, (m) => {
    const key = `[EMAIL_${++counts.EMAIL}]`;
    mapping[key] = m;
    return key;
  });

  out = out.replace(phoneRe, (m) => {
    const key = `[PHONE_${++counts.PHONE}]`;
    mapping[key] = m;
    return key;
  });

  out = out.replace(amountRe, (m) => {
    const key = `[AMOUNT_${++counts.AMOUNT}]`;
    mapping[key] = m;
    return key;
  });

  out = out.replace(dateRe, (m) => {
    const key = `[DATE_${++counts.DATE}]`;
    mapping[key] = m;
    return key;
  });

  out = out.replace(nameRe, (m) => {
    const key = `[NAME_${++counts.NAME}]`;
    mapping[key] = m;
    return key;
  });

  return { sanitized: out, mapping };
}

/**
 * Rehydrates sanitized text using the mapping
 * Restores original PII locally on the client
 */
export function rehydrate(sanitizedText: string, mapping: Mapping): string {
  let out = sanitizedText;
  Object.keys(mapping).forEach((key) => {
    // Escape special regex characters in the key
    const escaped = key.replace(/[[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const re = new RegExp(escaped, "g");
    out = out.replace(re, mapping[key]);
  });
  return out;
}

/**
 * Calculate a simple hash for contract text (for demo purposes)
 * In production, use SHA-256 or similar
 */
export function simpleHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}
