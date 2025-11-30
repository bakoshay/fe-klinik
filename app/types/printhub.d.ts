declare module 'printhub' {
  class PrintHub {
    encoder: TextEncoder;
    center: Uint8Array;
    right: Uint8Array;
    left: Uint8Array;
    boldOn: Uint8Array;
    boldOff: Uint8Array;
    underlineOn: Uint8Array;
    underlineOff: Uint8Array;
    doubleSize: Uint8Array;
    normalSize: Uint8Array;
    printChar: BluetoothRemoteGATTCharacteristic | USBDevice | null;
    printerType: string;
    paperSize: string;

    constructor(options?: { paperSize?: string; printerType?: string });

    setPaperSize(paperSize: string): void;
    checkBluetooth(): Promise<boolean>;
    setDefault(charp: BluetoothRemoteGATTCharacteristic): Promise<void>;
    writeLineBreak(options?: { count?: number }): Promise<void>;
    writeDashLine(): Promise<void>;
    writeTextWith2Column(
      text1: string,
      text2: string,
      options?: {
        bold?: boolean;
        underline?: boolean;
        align?: string;
        size?: string;
      }
    ): Promise<void>;
    writeText(
      text: string,
      options?: {
        bold?: boolean;
        underline?: boolean;
        align?: string;
        size?: string;
      }
    ): Promise<void>;
    connectToPrint(callbacks: {
      onReady: (printer: PrintHub) => void;
      onFailed: (message: string) => void;
    }): Promise<void>;
    createItemData(start: string, end: string): string;
  }

  export const init: typeof PrintHub;
  export default PrintHub;
}
