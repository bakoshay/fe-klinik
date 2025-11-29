import type { SelectedItems } from '@/types/pembayaran';

export const useCart = (
  biayaLayanan: Ref<number>,
  jenisPembayaran: Ref<string>,
  nominalPembayaran: Ref<number>
) => {
  const selectedItems = ref<SelectedItems[]>([]);

  // Tambah ke keranjang
  const handleAddToCart = (obat: any) => {
    const existingItem = selectedItems.value.find((item) => item.id === obat.id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      selectedItems.value.push({ ...obat, qty: 1 });
    }
  };

  // Update quantity
  const updateQuantity = (id: string, delta: number) => {
    const item = selectedItems.value.find((item) => item.id === id);
    if (item) {
      item.qty = Math.max(1, item.qty + delta);
    }
  };

  // Hapus item
  const removeItem = (id: string) => {
    selectedItems.value = selectedItems.value.filter((item) => item.id !== id);
  };

  // Subtotal obat
  const subtotal = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.harga * item.qty, 0)
  );

  // Total pembayaran
  const total = computed(() => subtotal.value + biayaLayanan.value);

  const kembalian = computed(() =>
    jenisPembayaran.value === 'cash' ? Math.max(0, nominalPembayaran.value - total.value) : 0
  );

  // Reset keranjang
  const resetCart = () => {
    selectedItems.value = [];
    nominalPembayaran.value = 0;
  };

  return {
    selectedItems,
    biayaLayanan,
    handleAddToCart,
    updateQuantity,
    removeItem,
    subtotal,
    total,
    kembalian,
    resetCart,
  };
};
