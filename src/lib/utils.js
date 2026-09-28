export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function formatCurrency(amount, currency = "AUD") {
  const value = Number(amount);
  if (!Number.isFinite(value)) {
    return `$0 ${currency}`;
  }

  return `$${Math.round(value)} ${currency}`;
}

export function cartLineId(productId, size) {
  return `${productId}::${size}`;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}
