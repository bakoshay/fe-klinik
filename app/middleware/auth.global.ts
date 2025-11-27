export default defineNuxtRouteMiddleware((to) => {
  const { getCookie } = useCookieManager();
  const token = getCookie('token');

  if (token && to.path === '/login') {
    return navigateTo('/', { replace: true });
  }
});
