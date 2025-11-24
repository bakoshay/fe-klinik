export interface Dokter {
  name: string;
  specialty: string;
  gender: 'L' | 'P';
  phone: string;
  address: string;
  practiceDays: string[];
  startTime: string;
  endTime: string;
  is_active: boolean;
}
