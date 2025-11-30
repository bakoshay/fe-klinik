export interface SelectedItems {
  id: string;
  nama: string;
  harga: number;
  qty: number;
  total: number;
}

export interface Pembayaran {
  pasien: string;
  biaya_layanan: number;
  jumlah_bayar: number;
  kembalian?: number;
  metode: string;
  sub_total: number;
  total: number;
  obat: SelectedItems[];
}

export interface PembayaranResponse {
  status: boolean;
  message: string;
}
