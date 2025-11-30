<template>
  <Dialog
    :visible="visible"
    @update:visible="updateVisible"
    position="center"
    :closable="false"
    :modal="true"
    :draggable="false"
    :style="{ width: '23rem' }"
    :pt="{
      header: { class: '!p-0' },
      content: { class: '!p-0' },
      footer: { class: '!p-0' },
    }"
  >
    <template #header>
      <!-- Header -->
      <div class="flex p-3 w-full justify-between items-center border-b border-gray-200">
        <h1 class="text-sm font-semibold">Detail Pembayaran</h1>

        <button @click="updateVisible(false)" class="shrink-0 cursor-pointer">
          <CloseIcon class="w-5 h-5 md:w-6 md:h-6 shrink-0" />
        </button>
      </div>
    </template>

    <!-- Content -->
    <div class="flex flex-col items-start p-3 gap-2 w-full">
      <div class="flex flex-col py-3 items-start w-full border-dashed border-b border-gray-500">
        <div class="flex items-start w-full gap-10">
          <div class="flex flex-col items-start">
            <span class="font-normal text-black text-xs md:text-sm">PASIEN</span>
            <span class="font-normal text-black text-xs md:text-sm">WAKTU</span>
          </div>

          <div class="flex flex-col items-start">
            <span class="font-normal text-black text-xs md:text-sm">: {{ data?.pasien }}</span>
            <span class="font-normal text-black text-xs md:text-sm">: {{ displayWaktu }}</span>
          </div>
        </div>
      </div>

      <div
        v-for="obat in data?.obat"
        :key="obat.id"
        class="py-2 flex items-center justify-between w-full"
      >
        <div class="flex items-center gap-3.5">
          <span class="font-normal text-black text-xs md:text-sm">{{ obat.qty }}</span>
          <span class="font-normal text-black text-xs md:text-sm">{{ obat.nama }}</span>
        </div>
        <span class="font-normal text-black text-xs md:text-sm">{{
          useHelper().formatMoney(obat.total)
        }}</span>
      </div>

      <div class="py-3 flex flex-col items-start w-full border-dashed border-t border-gray-500">
        <div class="flex items-center w-full justify-between">
          <span class="font-normal text-black text-xs md:text-sm"
            >SUB TOTAL ({{ data?.obat.length }} item)</span
          >
          <span class="font-normal text-black text-xs md:text-sm">{{
            useHelper().formatMoney(data?.sub_total ?? 0)
          }}</span>
        </div>
        <div v-if="(data?.biaya_layanan ?? 0) > 0" class="flex items-center w-full justify-between">
          <span class="font-normal text-black text-xs md:text-sm">BIAYA LAYANAN</span>
          <span class="font-normal text-black text-xs md:text-sm">{{
            useHelper().formatMoney(data?.biaya_layanan ?? 0)
          }}</span>
        </div>
        <div class="flex items-center w-full justify-between">
          <span class="font-semibold text-black text-xs md:text-sm">TOTAL</span>
          <span class="font-semibold text-black text-xs md:text-sm">{{
            useHelper().formatMoney(data?.total ?? 0)
          }}</span>
        </div>
        <div v-if="data?.metode === 'qris'" class="flex items-center w-full justify-between">
          <span class="font-normal text-black text-xs md:text-sm">PEMBAYARAN</span>
          <span class="font-normal text-black text-xs md:text-sm">QRIS</span>
        </div>
        <div v-if="data?.metode === 'cash'" class="flex items-center w-full justify-between">
          <span class="font-normal text-black text-xs md:text-sm">JUMLAH BAYAR</span>
          <span class="font-normal text-black text-xs md:text-sm">{{
            useHelper().formatMoney(data?.jumlah_bayar ?? 0)
          }}</span>
        </div>
        <div v-if="data?.metode === 'cash'" class="flex items-center w-full justify-between">
          <span class="font-normal text-black text-xs md:text-sm">KEMBALIAN</span>
          <span class="font-normal text-black text-xs md:text-sm">{{
            useHelper().formatMoney(data?.kembalian ?? 0)
          }}</span>
        </div>
      </div>
    </div>

    <!-- footer -->
    <template #footer>
      <div class="flex p-3 items-center w-full">
        <BaseButton class="w-full" label="Cetak" @click="handlePrint" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import CloseIcon from '@/assets/icons/CloseIcon.vue';
import useHelper from '@/utils/helper';
import type { Pembayaran } from '@/types/pembayaran';

const props = defineProps({
  visible: Boolean,
  data: {
    type: Object as () => Pembayaran | null,
    default: null,
  },
});

const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();

const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

const { PrintPDFStruk, PrintBluetoothStruk } = usePrint();

// current date in format HH:MM - DD Month YYYY
const displayWaktu = computed(() => {
  if (!props.data) return '';
  const date = new Date();
  return `${useHelper().formatTime(date)} - ${date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })}`;
});

const handlePrint = () => {
  if (props.data) {
    PrintBluetoothStruk(props.data, displayWaktu.value);
  }
};
</script>
