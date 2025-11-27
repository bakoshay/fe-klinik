export const useMenu = () => {
  const token = useCookie('token').value;

  const dataMenu = [
    {
      title: 'Antrian Online',
      icon: 'mdi:account-group',
      path: '/antrian',
      private: false,
    },
    {
      title: 'Jadwal Dokter',
      icon: 'mdi:calendar-clock',
      path: '/jadwal-dokter',
      private: false,
    },
    {
      title: 'Manajemen Dokter',
      icon: 'mdi:doctor',
      path: '/manajemen-dokter',
      private: true,
    },
    {
      title: 'Pengelolaan Obat',
      icon: 'mdi:pill',
      path: '/pengelolaan-obat',
      private: true,
    },
    {
      title: 'Pembayaran',
      icon: 'mdi:cash-multiple',
      path: '/pembayaran',
      private: true,
    },
  ];

  // Jika ada token, sembunyikan "Antrian Online"
  const filteredMenu = token
    ? dataMenu.filter((item) => item.title !== 'Antrian Online')
    : dataMenu.filter((item) => !item.private);

  return {
    dataMenu: filteredMenu,
  };
};
