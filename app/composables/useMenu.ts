export const useMenu = () => {
  const dataMenu = [
    {
      title: 'Antrian Online',
      icon: 'mdi:account-group',
      path: '/antrian',
    },
    {
      title: 'Jadwal Dokter',
      icon: 'mdi:calendar-clock',
      path: '/jadwal-dokter',
    },
    {
      title: 'Manajemen Dokter',
      icon: 'mdi:doctor',
      path: '/manajemen-dokter',
    },
    {
      title: 'Pengelolaan Obat',
      icon: 'mdi:pill',
      path: '/pengelolaan-obat',
    },
    {
      title: 'Pembayaran',
      icon: 'mdi:cash-multiple',
      path: '/pembayaran',
    },
  ];

  return {
    dataMenu,
  };
};
