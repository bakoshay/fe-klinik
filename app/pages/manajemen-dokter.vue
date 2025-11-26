<template>
  <div class="flex flex-col gap-4 items-start w-full bg-primary-light p-4 rounded-xl">
    <div class="flex items-center justify-between w-full border-b pb-4 border-gray-300">
      <h1 class="font-bold text-xl">Manajemen Dokter</h1>

      <BaseButton @click="visible = true" label="Tambah" size="sm" color="secondary">
        <template #icon-left>
          <Icon name="line-md:plus-circle" size="16" />
        </template>
      </BaseButton>
    </div>

    <!-- search bar -->
    <InputText placeholder="Cari dokter..." size="small" class="w-1/3" />

    <!-- table -->
    <div class="w-full">
      <DataTable
        :value="dokterData"
        paginator
        :rows="5"
        show-gridlines
        scrollable
        tableStyle="min-width: 80rem"
      >
        <Column header="No" class="col-center">
          <template #body="slotProps">
            {{ slotProps.index + 1 }}
          </template>
        </Column>

        <Column field="name" header="Nama"></Column>

        <Column field="specialty" header="Spesialis">
          <template #body="{ data }">
            {{ data.specialty.charAt(0).toUpperCase() + data.specialty.slice(1) }}
          </template>
        </Column>

        <Column field="gender" header="Jenis Kelamin">
          <template #body="{ data }">
            {{ data.gender === 'L' ? 'Laki-laki' : 'Perempuan' }}
          </template>
        </Column>

        <Column field="phone" header="No HP"></Column>
        <Column field="address" header="Alamat"></Column>

        <Column header="Jadwal Praktek">
          <template #body="{ data }">
            <div class="flex flex-col">
              <div v-for="(j, i) in data.schedules" :key="i">
                {{ capitalizeFirst(j.day) }} ({{ j.start }} - {{ j.end }})
              </div>
            </div>
          </template>
        </Column>

        <Column header="Status">
          <template #body="{ data }">
            <Tag
              :value="data.is_active ? 'Hadir' : 'Tidak Hadir'"
              :severity="data.is_active ? 'success' : 'danger'"
            />
          </template>
        </Column>

        <Column header="Aksi">
          <template #body="{ data }">
            <div class="flex gap-2 w-full items-center">
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

  <FormManajemenDokter :visible="visible" :data="dataDokter" @update:visible="visible = $event" />
</template>

<script lang="ts" setup>
import type { Dokter } from '@/types/dokter';

definePageMeta({
  layout: 'custom',
});

const visible = ref(false);
const dataDokter = ref<Dokter | null>(null);
const confirm = useConfirm();
const toast = useToast();

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const handleTriggerUpdate = (data: Dokter) => {
  dataDokter.value = data;
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
    dataDokter.value = null;
  }
});

const dokterData = ref<Dokter[]>([
  {
    name: 'Dr. Aulia Pratama',
    specialty: 'umum',
    gender: 'L',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 10, Jakarta',
    schedules: [
      { day: 'senin', start: '08:00', end: '16:00' },
      { day: 'selasa', start: '08:00', end: '16:00' },
      { day: 'rabu', start: '08:00', end: '16:00' },
    ],
    is_active: true,
  },
  {
    name: 'Dr. Siti Nurhaliza',
    specialty: 'anak',
    gender: 'P',
    phone: '081234567891',
    address: 'Jl. Sudirman No. 25, Jakarta',
    schedules: [
      { day: 'senin', start: '09:00', end: '17:00' },
      { day: 'rabu', start: '09:00', end: '17:00' },
      { day: 'sabtu', start: '09:00', end: '17:00' },
    ],
    is_active: true,
  },
  {
    name: 'Dr. Ahmad Fauzi',
    specialty: 'gigi',
    gender: 'L',
    phone: '081234567894',
    address: 'Jl. Rasuna Said No. 5, Jakarta',
    schedules: [
      { day: 'selasa', start: '09:00', end: '16:00' },
      { day: 'kamis', start: '09:00', end: '16:00' },
    ],
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
