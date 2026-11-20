export const loginUser = () => {
  if (typeof window === "undefined") return;

  // Back from the login page can restore this page with its requests still
  // pending. Reload so the page fetches its data again.
  window.addEventListener(
    "pageshow",
    (event) => {
      if (event.persisted) window.location.reload();
    },
    { once: true },
  );
  window.location.href = `/syk/dialogmoter/oauth2/login?redirect=${window.location.pathname}`;
};
