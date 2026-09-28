"use client";

import Swal from "sweetalert2";

function getThemeColors() {
  if (typeof window === "undefined") {
    return {
      background: "#F1EFE9",
      foreground: "#111111",
      border: "#D7D3CA",
      accent: "#B52B2B",
    };
  }

  const styles = getComputedStyle(document.documentElement);
  return {
    background: styles.getPropertyValue("--background").trim() || "#F1EFE9",
    foreground: styles.getPropertyValue("--foreground").trim() || "#111111",
    border: styles.getPropertyValue("--border").trim() || "#D7D3CA",
    accent: styles.getPropertyValue("--accent").trim() || "#B52B2B",
  };
}

function baseOptions() {
  const colors = getThemeColors();
  return {
    background: colors.background,
    color: colors.foreground,
    confirmButtonColor: colors.accent,
    cancelButtonColor: colors.border,
    buttonsStyling: true,
    customClass: {
      popup: "zenji-swal",
      title: "zenji-swal-title",
      htmlContainer: "zenji-swal-text",
      confirmButton: "zenji-swal-confirm",
      cancelButton: "zenji-swal-cancel",
    },
  };
}

export function toastSuccess(title) {
  return Swal.fire({
    ...baseOptions(),
    toast: true,
    position: "bottom-end",
    icon: undefined,
    title,
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
  });
}

export function alertInfo({ title, text, confirmText = "Understood" }) {
  return Swal.fire({
    ...baseOptions(),
    title,
    text,
    confirmButtonText: confirmText,
  });
}

export function alertWarning({ title, text, confirmText = "OK" }) {
  return Swal.fire({
    ...baseOptions(),
    title,
    text,
    confirmButtonText: confirmText,
    icon: "warning",
  });
}

export function confirmAction({
  title,
  text,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  return Swal.fire({
    ...baseOptions(),
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
}
