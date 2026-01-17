export type Mapping = Record<string, string>;

export function sanitizePII(text: string) {
  const mapping: Mapping = {};
  const counts = { NAME: 0, DATE: 0, AMOUNT: 0, EMAIL: 0, PHONE: 0 };

  const emailRe = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const phoneRe = /(?:\+?\d{1,3}[\s-]?)?(?:\(\d{2,3}\)[\s-]?|\d{2,4}[\s-])?\d{3,4}[\s-]?\d{3,4}/g;
  const amountRe = /(?:\$|USD|EUR|£|€|INR|Rs\.?)(?:\s)?\d{1,3}(?:[,\s]\d{3})*(?:\.\d+)?/gi;
  const dateRe = /\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})\b/g;
  const nameRe = /\b([A-Z][a-z]{1,}(?:\s+[A-Z][a-z]{1,}){1,2})\b/g;

  let out = text;

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

export function rehydrate(sanitizedText: string, mapping: Mapping) {
  let out = sanitizedText;
  Object.keys(mapping).forEach((k) => {
    const escaped = k.replace(/[[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const re = new RegExp(escaped, "g");
    out = out.replace(re, mapping[k]);
  });
  return out;
}
