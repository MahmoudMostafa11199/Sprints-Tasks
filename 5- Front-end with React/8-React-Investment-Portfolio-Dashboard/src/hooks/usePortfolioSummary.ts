import { useMemo } from 'react';
import type { AssetType } from '../components/Assets/types';

export const usePortfolioSummary = (assets: AssetType[]) => {
  // Total invested
  const totalInvested = useMemo(
    () =>
      assets.reduce((sum, asset) => {
        return sum + asset.buyPrice * asset.quantity;
      }, 0),
    [assets]
  );

  // current value every assets
  const totalCurrentValue = useMemo(
    () =>
      assets.reduce((sum, asset) => {
        return sum + asset.currentPrice * asset.quantity;
      }, 0),
    [assets]
  );

  // net profit
  const totalReturn = totalCurrentValue - totalInvested;

  // percentage return
  const returnPercentage =
    totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return {
    totalInvested,
    totalCurrentValue,
    totalReturn,
    returnPercentage,
  };
};
