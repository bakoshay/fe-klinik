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
    <InputText placeholder="Cari obat..." size="small" class="w-1/3" />

    <!-- table -->
    <div class="w-full">
      <DataTable
        :value="obatData"
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

        <Column field="name" header="Nama"></Column>

        <Column field="type_of_drug" header="Jenis Obat">
          <template #body="{ data }">
            {{ data.type_of_drug.charAt(0).toUpperCase() + data.type_of_drug.slice(1) }}
          </template>
        </Column>

        <Column field="price" header="Harga">
          <template #body="{ data }">
            {{
              new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                data.price
              )
            }}
          </template>
        </Column>

        <Column header="Status">
          <template #body="{ data }">
            <Tag
              :value="data.is_active ? 'Tersedia' : 'Tidak Tersedia'"
              :severity="data.is_active ? 'success' : 'danger'"
            />
          </template>
        </Column>

        <Column header="Aksi">
          <template #body="{ data }">
            <div class="flex gap-2 w-full items-center justify-center">
              <Button severity="secondary" rounded @click="handleTriggerUpdate(data)">
                <Icon name="ph:note-pencil-bold" size="16" style="color: green" />
              </Button>
              <Button severity="secondary" rounded @click="confirmDelete">
                <Icon name="ph:trash-bold" size="16" style="color: red" />
              </Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <FormPengelolaanObat :visible="visible" :data="dataObat" @update:visible="visible = $event" />
</template>

<script lang="ts" setup>
import type { Obat } from '@/types/obat';

definePageMeta({
  layout: 'custom',
});

const visible = ref(false);
const dataObat = ref<Obat | null>(null);
const confirm = useConfirm();
const toast = useToast();

const handleTriggerUpdate = (data: Obat) => {
  dataObat.value = data;
  visible.value = true;
};

const confirmDelete = () => {
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
    accept: () => {
      toast.add({
        severity: 'success',
        summary: 'Confirmed',
        detail: 'Record deleted',
        life: 3000,
      });
    },
  });
};

// Reset dataDokter saat dialog ditutup untuk mode tambah
watch(visible, (newVal) => {
  if (!newVal) {
    dataObat.value = null;
  }
});

const obatData = ref<Obat[]>([
  {
    name: 'Paracetamol',
    type_of_drug: 'tablet',
    price: 5000,
    is_active: true,
  },
  {
    name: 'Amoxicillin',
    type_of_drug: 'kapsul',
    price: 15000,
    is_active: false,
  },
  {
    name: 'Ibuprofen',
    type_of_drug: 'kaplet',
    price: 8000,
    is_active: true,
  },
  {
    name: 'Cetirizine',
    type_of_drug: 'tablet',
    price: 6000,
    is_active: true,
  },
  {
    name: 'Doxycycline',
    type_of_drug: 'kapsul',
    price: 20000,
    is_active: false,
  },
]);
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
