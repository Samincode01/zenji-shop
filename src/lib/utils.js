export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function formatPrice(amount, currency = "AUD") {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrency(amount, currency = "AUD") {
  const value = Number(amount);
  if (!Number.isFinite(value)) {
    return `$0 ${currency}`;
  }

  return `${formatPrice(value, currency)} ${currency}`;
}

export function cartLineId(productId, size) {
  return `${productId}::${size}`;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}
