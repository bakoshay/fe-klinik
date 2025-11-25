export default function useHelper() {
  const days = ref([
    { label: 'Senin', value: 'senin' },
    { label: 'Selasa', value: 'selasa' },
    { label: 'Rabu', value: 'rabu' },
    { label: 'Kamis', value: 'kamis' },
    { label: "Jum'at", value: 'jumat' },
    { label: 'Sabtu', value: 'sabtu' },
    { label: 'Minggu', value: 'minggu' },
  ]);

  const jenisKelamin = ref([
    { label: 'Laki-laki', value: 'L' },
    { label: 'Perempuan', value: 'P' },
  ]);

  const status = ref([
    { label: 'Hadir', value: true },
    { label: 'Tidak Hadir', value: false },
  ]);

  const schedule = ref<
    Array<{ day: string; selected: boolean; start: string | null; end: string | null }>
  >([
    { day: 'senin', selected: false, start: null, end: null },
    { day: 'selasa', selected: false, start: null, end: null },
    { day: 'rabu', selected: false, start: null, end: null },
    { day: 'kamis', selected: false, start: null, end: null },
    { day: 'jumat', selected: false, start: null, end: null },
    { day: 'sabtu', selected: false, start: null, end: null },
    { day: 'minggu', selected: false, start: null, end: null },
  ]);

  const parseTime = (timeStr: string): Date => {
    const [hours = '0', minutes = '0'] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return date;
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return { days, jenisKelamin, status, parseTime, formatTime, schedule };
}
