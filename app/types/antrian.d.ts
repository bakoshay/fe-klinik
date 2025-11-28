export interface AntrianForm {
  nama: string;
  nik: string;
  jenis_kelamin: string;
  keluhan: string;
}

export interface DataResponse {
  nomor: string;
  raw?: string;
  pasien?: string;
}

export interface AntrianResponse {
  status: boolean;
  message: string;
  data: DataResponse;
}
