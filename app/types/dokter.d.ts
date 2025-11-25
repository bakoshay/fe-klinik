export interface Dokter {
  name: string;
  specialty: string;
  gender: 'L' | 'P';
  phone: string;
  address: string;
  schedules: {
    day: string;
    start: string | null;
    end: string | null;
  }[];
  is_active: boolean;
}
