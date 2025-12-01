<template>
  <div class="w-full flex flex-col gap-4 items-start">
    <!-- Header -->
    <div class="bg-primary-light rounded-2xl shadow-xl p-4 w-full">
      <h1 class="text-xl md:text-2xl font-bold">Pembayaran</h1>
    </div>

    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-4 w-full">
      <!-- Daftar Obat -->
      <div
        class="w-full lg:col-span-2 flex flex-col gap-2 p-4 md:p-6 rounded-2xl bg-primary-light shadow-xl"
      >
        <h2 class="text-lg md:text-xl font-bold">Daftar Obat</h2>

        <!-- Search -->
        <InputText
          size="small"
          v-model="searchQuery"
          placeholder="Cari obat..."
          fluid
          @keyup.enter="handleSearch"
        />

        <!-- DataTable Desktop -->
        <div class="w-full overflow-x-auto">
          <DataTable
            :value="Array.isArray(data?.data) ? data.data : []"
            paginator
            :rows="10"
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
      </div>

      <!-- Keranjang & Summary -->
      <div
        class="lg:col-span-1 rounded-2xl shadow-xl p-4 md:p-6 bg-primary-light flex flex-col gap-4 w-full items-start lg:sticky lg:top-4 lg:h-fit"
      >
        <div class="flex items-center gap-2">
          <ShopingCartIcon class="size-5 md:size-6" />
          <h2 class="text-lg md:text-xl font-bold">Keranjang</h2>
        </div>

        <div class="flex flex-col items-start w-full gap-1">
          <label for="nomorurut" class="font-semibold text-xs md:text-sm">Nomor Urut</label>
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

        <div v-if="namaPasien" class="flex flex-col items-start w-full gap-1">
          <label for="nama" class="text-xs md:text-sm font-medium">Nama Pasien</label>
          <InputText
            id="nama"
            placeholder="Masukkan nama pasien"
            fluid
            disabled
            size="small"
            v-model="namaPasien"
          />
        </div>

        <div class="flex flex-col items-start w-full gap-1">
          <label for="biayalayanan" class="text-xs md:text-sm font-medium">Biaya Layanan</label>
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

        <div class="flex flex-col items-start w-full gap-1">
          <label for="jenispembayaran" class="text-xs md:text-sm font-medium"
            >Jenis Pembayaran</label
          >
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

        <div v-if="jenisPembayaran === 'cash'" class="flex flex-col items-start w-full gap-1">
          <label for="nominalpembayaran" class="text-xs md:text-sm font-medium"
            >Nominal Pembayaran</label
          >
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

        <div class="max-h-48 md:max-h-64 overflow-y-auto w-full flex flex-col items-start gap-2">
          <div v-if="selectedItems.length === 0" class="text-center text-gray-400 py-8 w-full">
            <Icon name="lucide:shopping-cart" class="size-8 md:size-12 mx-auto mb-2 opacity-50" />
            <p class="text-xs md:text-sm">Keranjang kosong</p>
          </div>

          <div
            v-for="item in selectedItems"
            :key="item.id"
            class="flex items-center justify-between p-2 md:p-3 bg-gray-50 rounded-lg w-full"
          >
            <div class="flex-1 min-w-0">
              <p class="font-medium text-xs md:text-sm truncate">{{ item.nama }}</p>
              <p class="text-xs text-gray-600">Rp {{ item.harga.toLocaleString('id-ID') }}</p>
            </div>

            <div class="flex items-center gap-1 md:gap-2 hrink-0">
              <Button
                icon="pi pi-minus"
                size="small"
                severity="secondary"
                text
                @click="updateQuantity(item.id, -1)"
              />
              <span class="w-6 md:w-8 text-center font-medium text-xs md:text-sm">{{
                item.qty
              }}</span>
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
                class="ml-1"
              />
            </div>
          </div>
        </div>

        <div class="border-t pt-3 md:pt-4 flex flex-col w-full gap-2">
          <div class="flex justify-between text-xs md:text-sm">
            <span>Subtotal Obat:</span>
            <span class="font-medium">Rp {{ subtotal.toLocaleString('id-ID') }}</span>
          </div>
          <div class="flex justify-between text-xs md:text-sm">
            <span>Biaya Layanan:</span>
            <span class="font-medium">Rp {{ biayaLayanan.toLocaleString('id-ID') }}</span>
          </div>
          <div class="flex justify-between text-base md:text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span class="text-primary-blue">Rp {{ total.toLocaleString('id-ID') }}</span>
          </div>
          <div
            v-if="jenisPembayaran === 'cash'"
            class="flex justify-between text-base md:text-lg font-bold"
          >
            <span>Kembalian:</span>
            <span class="text-green-600">Rp {{ kembalian.toLocaleString('id-ID') }}</span>
          </div>
        </div>

        <div class="flex flex-col w-full gap-2">
          <BaseButton
            color="primary-blue"
            size="sm"
            class="w-full"
            :disabled="loading"
            @click="handleSubmit"
          >
            <template #default>
              <span v-if="loading" class="flex items-center gap-2 justify-center">
                <Icon class="animate-spin h-4 w-4 md:h-5 md:w-5 inline" name="lucide:loader" />
                <span class="text-xs md:text-sm">Loading...</span>
              </span>
              <span v-else class="text-xs md:text-sm">Proses Pembayaran</span>
            </template>
          </BaseButton>
          <BaseButton
            color="danger"
            variant="ghost"
            size="sm"
            class="w-full text-xs md:text-sm"
            @click="resetCart"
            label="Reset Keranjang"
          />
        </div>
      </div>
    </div>
  </div>

  <PopupStruck
    :visible="visible"
    @update:visible="
      (val) => {
        visible = val;
        if (!val) resetAll();
      }
    "
    :data="dataStruk"
  />
</template>

<script lang="ts" setup>
import ShopingCartIcon from '@/assets/icons/ShopingCartIcon.vue';
import { useObat } from '@/composables/api/useObat';
import { usePembayaran } from '@/composables/api/usePembayaran';
import { useAntrian } from '@/composables/api/useAntrian';
import type { Pembayaran } from '@/types/pembayaran';

definePageMeta({
  layout: 'custom',
});

const visible = ref(false);
const searchQuery = ref('');
const noUrut = ref('');
const namaPasien = ref('');
const biayaLayanan = ref(50000);
const jenisPembayaran = ref('');
const nominalPembayaran = ref(0);
const dataStruk = ref<Pembayaran | null>(null);
const toast = useToast();
const loading = ref(false);

const { getByAvailable } = useObat();
const { getAntrianByCurrentDay } = useAntrian();
const { data } = await useAsyncData('obat-available', () =>
  getByAvailable('').then((res) => res.data.value)
);
const antrian = await useAsyncData('antrian-today', () =>
  getAntrianByCurrentDay().then((res) => res.data.value)
);
const { createPembayaran } = usePembayaran();

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

const resetAll = () => {
  resetCart();
  noUrut.value = '';
  namaPasien.value = '';
  jenisPembayaran.value = '';
  nominalPembayaran.value = 0;
  dataStruk.value = null;
};

// Submit
const handleSubmit = async () => {
  let jumlahBayar: number = 0;
  if (jenisPembayaran.value === 'cash') {
    jumlahBayar = Number(nominalPembayaran.value);
  } else if (jenisPembayaran.value === 'qris') {
    jumlahBayar = total.value;
  }

  loading.value = true;
  try {
    const payload = {
      pasien: namaPasien.value,
      biaya_layanan: biayaLayanan.value,
      jumlah_bayar: jumlahBayar,
      ...(jenisPembayaran.value === 'cash' && {
        kembalian: Math.max(0, Number(nominalPembayaran.value) - total.value),
      }),
      metode: jenisPembayaran.value,
      sub_total: subtotal.value,
      total: total.value,
      obat: selectedItems.value.map((item) => ({
        id: item.id,
        nama: item.nama,
        harga: item.harga,
        qty: item.qty,
        total: item.harga * item.qty,
      })),
    };

    const response = await createPembayaran(payload);

    toast.add({
      severity: 'success',
      summary: 'Sukses',
      detail: response.data.value?.message,
      life: 3000,
    });

    if (response.data.value?.status) {
      dataStruk.value = payload;
      visible.value = true;
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Gagal',
      detail:
        error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses pembayaran.',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
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
