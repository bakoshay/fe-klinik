export default defineNuxtRouteMiddleware((to) => {
  const { getCookie } = useCookieManager();
  const token = getCookie('token');

  // Jika sudah login dan ke /login, redirect ke home
  if (token && to.path === '/login') {
    return navigateTo('/', { replace: true });
  }

  // Daftar halaman private (hanya bisa diakses jika login)
  const privatePages = ['/manajemen-dokter', '/pengelolaan-obat', '/pembayaran'];

  // Jika belum login dan akses halaman private, redirect ke /
  if (!token && privatePages.includes(to.path)) {
    return navigateTo('/', { replace: true });
  }
});
