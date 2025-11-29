<template>
  <div class="w-full flex flex-col gap-4 items-start">
    <!-- Header -->
    <div class="bg-primary-light rounded-2xl shadow-xl p-4 w-full">
      <h1 class="text-2xl font-bold">Pembayaran</h1>
    </div>

    <div class="grid lg:grid-cols-3 gap-4 w-full">
      <!-- Daftar Obat -->
      <div
        class="lg:col-span-2 w-full flex flex-col gap-2 p-6 rounded-2xl bg-primary-light shadow-xl"
      >
        <h2 class="text-xl font-bold">Daftar Obat</h2>

        <!-- Search -->
        <InputText
          size="small"
          v-model="searchQuery"
          placeholder="Cari obat..."
          fluid
          @keyup.enter="handleSearch"
        />

        <!-- DataTable -->
        <DataTable
          :value="Array.isArray(data?.data) ? data.data : []"
          paginator
          :rows="5"
          stripedRows
          scrollable
        >
          <Column field="nama" header="Nama Obat" sortable></Column>
          <Column field="jenis" header="Jenis Obat">
            <template #body="{ data }">
              {{ data.jenis.charAt(0).toUpperCase() + data.jenis.slice(1) }}
            </template>
          </Column>
          <Column field="harga" header="Harga">
            <template #body="{ data }">
              {{
                new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                  data.harga
                )
              }}
            </template>
          </Column>
          <Column header="Aksi">
            <template #body="slotProps">
              <Button
                icon="pi pi-plus"
                size="small"
                @click="handleAddToCart(slotProps.data)"
                :disabled="slotProps.data.stok === 0"
              />
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Keranjang & Summary -->
      <div
        class="lg:col-span-1 rounded-2xl shadow-xl p-6 bg-primary-light flex flex-col gap-4 w-full items-start"
      >
        <div class="flex items-center gap-2">
          <ShopingCartIcon class="size-6" />
          <h2 class="text-xl font-bold">Keranjang</h2>
        </div>

        <!-- Nomor Urut -->
        <div class="flex flex-col items-start w-full gap-1">
          <label for="nomorurut" class="font-semibold text-sm">Nomor Urut</label>
          <Select
            id="nomorurut"
            v-model="noUrut"
            fluid
            size="small"
            placeholder="Pilih nomor urut"
            :options="Array.isArray(antrian.data.value?.data) ? antrian.data.value.data : []"
            option-label="nomor"
            option-value="pasien"
          />
        </div>

        <!-- Nama Pasien -->
        <div v-if="namaPasien" class="flex flex-col items-start w-full gap-1">
          <label for="nama" class="text-sm font-medium">Nama Pasien</label>
          <InputText
            id="nama"
            placeholder="Masukkan nama pasien"
            fluid
            disabled
            size="small"
            v-model="namaPasien"
          />
        </div>

        <!-- Biaya Layanan -->
        <div class="flex flex-col items-start w-full gap-1">
          <label for="biayalayanan" class="text-sm font-medium">Biaya Layanan</label>
          <InputNumber
            id="biayalayanan"
            mode="currency"
            currency="IDR"
            locale="id-ID"
            v-model="biayaLayanan"
            fluid
            size="small"
            disabled
          />
        </div>

        <!-- Jenis Pembayaran -->
        <div class="flex flex-col items-start w-full gap-1">
          <label for="jenispembayaran" class="text-sm font-medium">Jenis Pembayaran</label>
          <Select
            size="small"
            :options="jenisPembayaranOption"
            placeholder="Pilih jenis pembayaran"
            fluid
            option-label="label"
            v-model="jenisPembayaran"
            option-value="value"
          />
        </div>

        <!-- Nominal Pembayaran -->
        <div v-if="jenisPembayaran === 'cash'" class="flex flex-col items-start w-full gap-1">
          <label for="nominalpembayaran" class="text-sm font-medium">Nominal Pembayaran</label>
          <InputNumber
            id="nominalpembayaran"
            mode="currency"
            currency="IDR"
            locale="id-ID"
            fluid
            v-model="nominalPembayaran"
            size="small"
            placeholder="Masukan nominal pembayaran"
          />
        </div>

        <!-- Item List -->
        <div class="max-h-64 overflow-y-auto w-full flex flex-col items-start gap-2">
          <div v-if="selectedItems.length === 0" class="text-center text-gray-400 py-8 w-full">
            Keranjang kosong
          </div>

          <div
            v-for="item in selectedItems"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg w-full"
          >
            <div class="flex-1">
              <p class="font-medium text-sm">{{ item.nama }}</p>
              <p class="text-xs text-gray-600">Rp {{ item.harga.toLocaleString('id-ID') }}</p>
            </div>

            <div class="flex items-center gap-2">
              <Button
                icon="pi pi-minus"
                size="small"
                severity="secondary"
                text
                @click="updateQuantity(item.id, -1)"
              />
              <span class="w-8 text-center font-medium">{{ item.qty }}</span>
              <Button
                icon="pi pi-plus"
                size="small"
                severity="secondary"
                text
                @click="updateQuantity(item.id, 1)"
              />
              <Button
                icon="pi pi-trash"
                size="small"
                severity="danger"
                text
                @click="removeItem(item.id)"
              />
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="border-t pt-4 flex flex-col w-full gap-2">
          <div class="flex justify-between text-sm">
            <span>Subtotal Obat:</span>
            <span class="font-medium">Rp {{ subtotal.toLocaleString('id-ID') }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Biaya Layanan:</span>
            <span class="font-medium">Rp {{ biayaLayanan.toLocaleString('id-ID') }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span class="text-primary-blue">Rp {{ total.toLocaleString('id-ID') }}</span>
          </div>
          <div v-if="jenisPembayaran === 'cash'" class="flex justify-between text-lg font-bold">
            <span>Kembalian:</span>
            <span class="text-primary-blue">Rp {{ kembalian.toLocaleString('id-ID') }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col w-full gap-2">
          <BaseButton
            color="primary-blue"
            size="sm"
            class="w-full"
            @click="handleSubmit"
            label="Proses Pembayaran"
          />
          <BaseButton
            color="danger"
            variant="ghost"
            size="sm"
            class="w-full"
            @click="resetCart"
            label="Reset Keranjang"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ShopingCartIcon from '@/assets/icons/ShopingCartIcon.vue';
import { useObat } from '@/composables/api/useObat';
import { useAntrian } from '@/composables/api/useAntrian';

definePageMeta({
  layout: 'custom',
});

const searchQuery = ref('');
const noUrut = ref('');
const namaPasien = ref('');
const biayaLayanan = ref(50000);
const jenisPembayaran = ref('');
const nominalPembayaran = ref(0);

const { getByAvailable } = useObat();
const { getAntrianByCurrentDay } = useAntrian();
const { data } = await useAsyncData('obat-available', () =>
  getByAvailable('').then((res) => res.data.value)
);

const antrian = await useAsyncData('antrian-today', () =>
  getAntrianByCurrentDay().then((res) => res.data.value)
);

const {
  selectedItems,
  handleAddToCart,
  updateQuantity,
  removeItem,
  subtotal,
  total,
  kembalian,
  resetCart,
} = useCart(biayaLayanan, jenisPembayaran, nominalPembayaran);

const handleSearch = async () => {
  const res = await getByAvailable(searchQuery.value);
  data.value = res.data.value;
};

const jenisPembayaranOption = ref([
  { label: 'Cash', value: 'cash' },
  { label: 'Qris', value: 'qris' },
]);

// Submit
const handleSubmit = () => {
  let jumlahBayar: number | null = null;
  if (jenisPembayaran.value === 'cash') {
    jumlahBayar = Number(nominalPembayaran.value);
  } else if (jenisPembayaran.value === 'qris') {
    jumlahBayar = total.value;
  }

  const payload = {
    pasien: namaPasien.value,
    biaya_layanan: biayaLayanan.value,
    jumlah_bayar: jumlahBayar,
    kembalian:
      jenisPembayaran.value === 'cash'
        ? Math.max(0, Number(nominalPembayaran.value) - total.value)
        : null,
    metode: jenisPembayaran.value,
    total: total.value,
    obat: selectedItems.value.map((item) => ({
      id: item.id,
      nama: item.nama,
      harga: item.harga,
      qty: item.qty,
      total: item.harga * item.qty,
    })),
  };

  console.log('Payload:', payload);
  alert('Pembayaran berhasil! Cek console untuk detail.');
};

watch(searchQuery, async (val) => {
  if (!val) {
    const res = await getByAvailable('');
    data.value = res.data.value;
  }
});

watch(noUrut, (val) => {
  const dataArr = Array.isArray(antrian.data.value?.data) ? antrian.data.value.data : [];
  const selected = dataArr.find((item) => item.pasien === val);
  namaPasien.value = selected ? selected.pasien : '';
});
</script>

<style scoped>
/* center header */
:deep(.p-datatable-column-header-content) {
  justify-content: center !important;
}
/* center body */
:deep(.p-datatable-tbody > tr > td) {
  text-align: center !important;
}
</style>
