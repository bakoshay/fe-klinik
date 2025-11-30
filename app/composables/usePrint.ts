import pdfMake from 'pdfmake/build/pdfmake';
import PrintHub from 'printhub';
import useHelper from '@/utils/helper';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import type { Pembayaran } from '@/types/pembayaran';

export const usePrint = () => {
  const klinik = 'KLINIK VIRZA MEDIKA';
  const alamat =
    'Jl. Raden Umar Wirahadikusumah, Situraja, Kec. Situraja, Kabupaten Sumedang, Jawa Barat 45371';
  const kontak = 'Nomor: 0815-0641-996';
  const ukuranKertas = '58'; // atau '80'
  const footer = 'TERIMA KASIH!';

  const printBluetoothAntrian = async ({ nomor, pasien }: { nomor: string; pasien: string }) => {
    try {
      const printer = new PrintHub({
        paperSize: ukuranKertas,
        printerType: 'bluetooth',
      });

      printer.connectToPrint({
        async onReady(printer) {
          await printer.writeText(klinik.toUpperCase(), {
            align: 'center',
            bold: true,
            size: 'double',
          });
          await printer.writeText(alamat, { align: 'center' });
          await printer.writeText(kontak, { align: 'center' });
          await printer.writeLineBreak();

          await printer.writeText('NOMOR ANTRIAN', {
            align: 'center',
            bold: true,
          });
          await printer.writeText(nomor, {
            align: 'center',
            size: 'double',
            bold: true,
          });
          await printer.writeLineBreak();

          await printer.writeText(`Nama: ${pasien}`, { align: 'center' });
          await printer.writeLineBreak();

          await printer.writeLineBreak({ count: 2 });
        },
        onFailed(message) {
          console.error('Connection failed', message);
        },
      });
    } catch (error) {
      console.error('Bluetooth printing failed:', error);
      throw error;
    }
  };

  const printPDFAntrian = async ({ nomor, pasien }: { nomor: string; pasien: string }) => {
    try {
      let contents: any[] = [
        { text: klinik, style: 'header' },
        { text: alamat, style: 'subheader' },
        { text: kontak, style: 'subheader', margin: [0, 0, 0, 10] },
        { text: 'NOMOR ANTRIAN', style: 'label' },
        { text: nomor, style: 'nomor' },
        { text: `Nama: ${pasien}`, style: 'info' },
      ];

      const docDefinition: TDocumentDefinitions = {
        pageSize: {
          width: (`${ukuranKertas}mm` === '58mm' ? 58 : 80) * 2.83465,
          height: 'auto',
        },
        content: contents,
        styles: {
          header: { fontSize: 12, bold: true, alignment: 'center' },
          subheader: { fontSize: 8, alignment: 'center' },
          label: { fontSize: 10, bold: true, alignment: 'center', margin: [0, 10, 0, 0] },
          nomor: { fontSize: 32, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
          info: { fontSize: 9, alignment: 'center' },
        },
        defaultStyle: { font: 'Roboto', fontSize: 8 },
        pageMargins: [8, 10, 8, 10],
      };

      // Preview PDF di Browser (sama seperti PrintPDFStruk)
      let fonts = {
        Roboto: {
          normal:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
        },
      };
      pdfMake.fonts = fonts;
      pdfMake.createPdf(docDefinition).print();
    } catch (error) {
      console.error('PDF printing failed:', error);
      throw error;
    }
  };

  const PrintBluetoothStruk = async (data: Pembayaran, waktu: string) => {
    try {
      const printer = new PrintHub({
        paperSize: ukuranKertas,
        printerType: 'bluetooth',
      });

      printer.connectToPrint({
        async onReady(printer) {
          await printer.writeText(klinik.toUpperCase(), {
            align: 'center',
            bold: true,
            size: 'double',
          });
          await printer.writeText(alamat, {
            align: 'center',
          });
          await printer.writeText(kontak, {
            align: 'center',
          });
          await printer.writeLineBreak();
          await printer.writeText(`PELANGGAN : ${data.pasien.toUpperCase()}`, {
            align: 'left',
          });
          await printer.writeText(`WAKTU : ${waktu}`, {
            align: 'left',
          });

          await printer.writeDashLine();

          for (const obat of data.obat) {
            await printer.writeTextWith2Column(
              `${obat.qty} ${obat.nama.toUpperCase()}`,
              useHelper().formatMoney(obat.total)
            );
          }

          await printer.writeDashLine();

          await printer.writeTextWith2Column(
            `SUB TOTAL (${data.obat.length} item)`,
            useHelper().formatMoney(data.sub_total)
          );

          await printer.writeTextWith2Column(
            'BIAYA LAYANAN',
            useHelper().formatMoney(data.biaya_layanan)
          );

          await printer.writeTextWith2Column('TOTAL', useHelper().formatMoney(data.total), {
            bold: true,
          });

          if (data.metode === 'qris') {
            await printer.writeTextWith2Column('PEMBAYARAN', 'QRIS');
          } else {
            await printer.writeTextWith2Column(
              'JUMLAH BAYAR',
              useHelper().formatMoney(data.jumlah_bayar)
            );
            await printer.writeTextWith2Column(
              'KEMBALIAN',
              useHelper().formatMoney(data.kembalian || 0)
            );
          }

          await printer.writeLineBreak({ count: 1 });

          await printer.writeText(footer, {
            align: 'center',
          });

          await printer.writeLineBreak({ count: 2 });
        },
        onFailed(message) {
          console.error('Connection failed', message);
        },
      });
    } catch (error) {
      console.error('PDF printing failed:', error);
      throw error;
    }
  };

  const PrintPDFStruk = async (data: Pembayaran, waktu: string) => {
    try {
      let totalBody: any[] = [
        [
          `SUB TOTAL (${data.obat.length} item)`,
          {
            text: useHelper().formatMoney(data.sub_total),
            alignment: 'right',
            margin: [0, 0, 0, 0],
          },
        ],
      ];

      totalBody.push([
        `BIAYA LAYANAN`,
        {
          text: useHelper().formatMoney(data.biaya_layanan),
          alignment: 'right',
          margin: [0, 0, 0, 0],
        },
      ]);

      totalBody.push([
        {
          text: 'TOTAL',
          bold: true,
        },
        {
          text: useHelper().formatMoney(data.total),
          style: 'totalText',
          margin: [0, 0, 0, 0],
        },
      ]);

      if (data.metode === 'qris') {
        totalBody.push([
          `PEMBAYARAN`,
          {
            text: 'QRIS',
            alignment: 'right',
            margin: [0, 0, 0, 0],
          },
        ]);
      } else {
        totalBody.push([
          `JUMLAH BAYAR`,
          {
            text: useHelper().formatMoney(data.jumlah_bayar),
            alignment: 'right',
            margin: [0, 0, 0, 0],
          },
        ]);

        totalBody.push([
          `KEMBALIAN`,
          {
            text: useHelper().formatMoney(data.kembalian || 0),
            alignment: 'right',
            margin: [0, 0, 0, 0],
          },
        ]);
      }

      let contents: any[] = [
        { text: klinik, style: 'header' },
        { text: alamat, style: 'subheader' },
        { text: kontak, style: 'subheader', margin: [0, 0, 0, 0] },

        {
          text: `PASIEN : ${data.pasien.toUpperCase()}`,
          margin: [0, 10, 0, 0],
        },
        {
          text: `WAKTU : ${waktu}`,
          margin: [0, 0, 0, 0],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: (`${ukuranKertas}mm` === '58mm' ? 53 : 75) * 2.83465, // Panjang garis
              y2: 0,
              lineWidth: 0.5, // Ketebalan garis
              dash: { length: 3, space: 3 }, // Gaya putus-putus
            },
          ],
          margin: [0, 10, 0, 10], // Margin atas dan bawah garis
        },
        {
          layout: 'noBorders',
          table: {
            widths: ['*', 'auto'],
            body: [
              ...data.obat.map((menu) => [
                `${menu.qty} ${menu.nama.toUpperCase()}`,
                {
                  text: useHelper().formatMoney(menu.qty * menu.harga),
                  alignment: 'right',
                  margin: [0, 0, 0, 0],
                },
              ]),
            ],
          },
          margin: [0, 0, 0, 0],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: (`${ukuranKertas}mm` === '58mm' ? 53 : 75) * 2.83465, // Panjang garis
              y2: 0,
              lineWidth: 0.5, // Ketebalan garis
              dash: { length: 3, space: 3 }, // Gaya putus-putus
            },
          ],
          margin: [0, 10, 0, 10], // Margin atas dan bawah garis
        },
        {
          layout: 'noBorders',
          table: {
            widths: ['*', 'auto'],
            body: totalBody,
          },
          margin: [0, 0, 0, 10],
        },
        {
          text: footer,
          style: 'footer',
          margin: [0, 0, 0, 10],
        },
      ];
      const docDefinition: TDocumentDefinitions = {
        pageSize: {
          width: (`${ukuranKertas}mm` === '58mm' ? 58 : 80) * 2.83465,
          height: 'auto',
        }, // 58mm lebar
        content: contents,
        styles: {
          header: { fontSize: 12, bold: true, alignment: 'center' },
          subheader: { fontSize: 8, alignment: 'center' },
          footer: { fontSize: 8, alignment: 'center' },
          rightText: { fontSize: 8, alignment: 'right' },
          totalText: { fontSize: 10, bold: true, alignment: 'right' },
        },
        defaultStyle: { font: 'Roboto', fontSize: 8 },
        pageMargins: [8, 10, 8, 10],
      };

      // Preview PDF di Browser
      let fonts = {
        Roboto: {
          normal:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics:
            'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
        },
      };
      pdfMake.fonts = fonts;
      pdfMake.createPdf(docDefinition).print();
    } catch (error) {
      console.error('PDF printing failed:', error);
      throw error;
    }
  };

  return {
    PrintPDFStruk,
    PrintBluetoothStruk,
    printPDFAntrian,
    printBluetoothAntrian,
  };
};
