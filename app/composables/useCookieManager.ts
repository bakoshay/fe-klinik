export const useCookieManager = () => {
  const setCookie = (key: string, value: string, opts = {}) => {
    const cookie = useCookie(key, { ...opts });
    cookie.value = value;
  };

  const getCookie = (key: string) => {
    return useCookie(key).value;
  };

  const removeCookie = (key: string) => {
    // Nuxt way
    const cookie = useCookie(key);
    cookie.value = null;
  };

  const clearAllCookies = () => {
    if (import.meta.client) {
      const cookies = document.cookie.split(';');
      for (const c of cookies) {
        const eqPos = c.indexOf('=');
        const name = eqPos > -1 ? c.slice(0, eqPos).trim() : c.trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      }
    }
  };

  return { setCookie, getCookie, removeCookie, clearAllCookies };
};
