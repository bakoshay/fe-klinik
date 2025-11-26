export interface JadwalDokter {
  id: string;
  dokterId: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormJadwalDokter {
  day: string;
  start: string;
  end: string;
}

export interface FormDokter {
  name: string;
  specialty: string;
  gender: string;
  phone: string;
  address: string;
  is_active: boolean;
  schedules: FormJadwalDokter[];
}

export interface Dokter {
  id: string;
  nama: string;
  spesialis: string;
  jenis_kelamin: 'L' | 'P';
  handphone: string;
  alamat: string;
  status: boolean;
  jadwal_dokter: JadwalDokter[];
}
export interface DataDokter {
  id: string;
  nama: string;
  spesialis: string;
  jenis_kelamin: 'L' | 'P';
  handphone: string;
  alamat: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  jadwal_dokter: JadwalDokter[];
}

export interface DokterResponse {
  status: boolean;
  message: string;
  data: DataDokter[];
}

export interface DokterByIdResponse {
  status: boolean;
  message: string;
  data: DataDokter;
}

export interface DokterSimpleResponse {
  status: boolean;
  message: string;
}
