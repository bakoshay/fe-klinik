export interface FormObat {
  nama: string;
  jenis: string;
  harga: number;
  status: boolean;
}

interface DataObat {
  id: string;
  nama: string;
  jenis: 'tablet' | 'kapsul' | 'kaplet';
  harga: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ObatResponse {
  status: boolean;
  message: string;
  data: DataObat[];
}

export interface ObatByIdResponse {
  status: boolean;
  message: string;
  data: DataObat;
}

export interface ObatSimpleResponse {
  status: boolean;
  message: string;
}
