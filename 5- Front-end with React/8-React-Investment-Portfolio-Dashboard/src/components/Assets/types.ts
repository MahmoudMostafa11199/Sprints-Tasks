export enum AssetTypeEnum {
  all = 'all',
  stock = 'stock',
  crypto = 'crypto',
  bonds = 'bond',
}

export interface AssetType {
  id: string;
  name: string;
  symbol: string;
  type: AssetTypeEnum;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  updatedAt: string;
}
