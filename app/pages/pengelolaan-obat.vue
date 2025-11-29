<template>
  <div class="flex flex-col gap-4 items-start w-full bg-primary-light p-4 rounded-xl">
    <div class="flex items-center justify-between w-full border-b pb-4 border-gray-300">
      <h1 class="font-bold text-xl">Pengelolaan Obat</h1>

      <BaseButton @click="visible = true" label="Tambah" size="sm" color="secondary">
        <template #icon-left>
          <Icon name="line-md:plus-circle" size="16" />
        </template>
      </BaseButton>
    </div>

    <!-- search bar -->
    <InputText
      placeholder="Cari obat..."
      size="small"
      class="w-1/3"
      v-model="searchQuery"
      @keyup.enter="handleSearch"
    />

    <!-- table -->
    <div class="w-full">
      <DataTable
        :value="data?.data"
        paginator
        :rows="5"
        show-gridlines
        scrollable
        tableStyle="min-width: 80rem"
      >
        <Column header="No" headerStyle="text-align:center">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>

        <Column field="nama" header="Nama"></Column>

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

        <Column header="Status">
          <template #body="{ data }">
            <Tag
              :value="data.status ? 'Tersedia' : 'Tidak Tersedia'"
              :severity="data.status ? 'success' : 'danger'"
            />
          </template>
        </Column>

        <Column header="Aksi">
          <template #body="{ data }">
            <div class="flex gap-2 w-full items-center justify-center">
              <Button severity="secondary" rounded @click="handleTriggerUpdate(data)">
                <Icon name="ph:note-pencil-bold" size="16" style="color: green" />
              </Button>
              <Button severity="secondary" rounded @click="confirmDelete(data.id)">
                <Icon name="ph:trash-bold" size="16" style="color: red" />
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <FormPengelolaanObat
    :visible="visible"
    :data="selectedObat"
    @update:visible="visible = $event"
    @saved="fetchObat"
  />
</template>

<script lang="ts" setup>
import { useObat } from '@/composables/api/useObat';
import type { DataObat } from '@/types/obat';

definePageMeta({
  layout: 'custom',
});

const visible = ref(false);
const confirm = useConfirm();
const toast = useToast();
const searchQuery = ref('');
const selectedObat = ref<DataObat | null>(null);

const { getAll, deleteObat } = useObat();
const { data } = await useAsyncData('obat', () => getAll('').then((res) => res.data.value));

const handleTriggerUpdate = (data: DataObat) => {
  selectedObat.value = data;
  visible.value = true;
};

const handleSearch = async () => {
  const res = await getAll(searchQuery.value);
  data.value = res.data.value;
};

const fetchObat = async () => {
  const res = await getAll('');
  data.value = res.data.value;
};

const confirmDelete = (id: string) => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus data ini?',
    header: 'Hapus Data',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Batal',
    rejectProps: {
      label: 'Batal',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Hapus',
      severity: 'danger',
    },
    accept: async () => {
      const response = await deleteObat(id);

      if (response.data.value?.status === true) {
        fetchObat();
        toast.add({
          severity: 'success',
          summary: 'Sukses',
          detail: response.data.value?.message,
          life: 3000,
        });
      } else {
        toast.add({
          severity: 'error',
          summary: 'Gagal',
          detail: response.data.value?.message,
          life: 3000,
        });
      }
    },
  });
};

watch(searchQuery, async (val) => {
  if (!val) {
    const res = await getAll('');
    data.value = res.data.value;
  }
});

// Reset dataDokter saat dialog ditutup untuk mode tambah
watch(visible, (newVal) => {
  if (!newVal) {
    selectedObat.value = null;
  }
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
