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
      path: '/dokter',
    },
    {
      title: 'Pengelolaan Obat',
      icon: 'mdi:pill',
      path: '/obat',
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
