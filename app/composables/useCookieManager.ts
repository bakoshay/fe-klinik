export const useCookieManager = () => {
  // Set cookie
  const setCookie = (key: string, value: string, opts: { maxAge?: number; path?: string } = {}) => {
    const cookie = useCookie(key, opts);
    cookie.value = value;
  };

  // Get cookie
  const getCookie = (key: string) => {
    const cookie = useCookie(key);
    return cookie.value;
  };

  // Remove cookie
  const removeCookie = (key: string) => {
    const cookie = useCookie(key);
    cookie.value = null;
  };

  // Clear all cookies (client-side only)
  const clearAllCookies = () => {
    if (import.meta.client) {
      const cookies = document.cookie.split(';');
      for (const c of cookies) {
        const eqPos = c.indexOf('=');
        const name = eqPos > -1 ? c.slice(0, eqPos).trim() : c.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    }
  };

  return { setCookie, getCookie, removeCookie, clearAllCookies };
};
