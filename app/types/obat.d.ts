export interface Obat {
  name: string;
  type_of_drug: 'tablet' | 'kapsul' | 'kaplet';
  price: number;
  is_active: boolean;
}
