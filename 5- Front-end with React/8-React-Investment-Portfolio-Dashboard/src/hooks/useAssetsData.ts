import { useState, useEffect, useCallback } from 'react';
import type { AssetType } from '../components/Assets/types';

import { getAssets } from '../services/apiAssets';

export const useAssetData = () => {
  const [assets, setAssets] = useState<AssetType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAssets = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await getAssets();
      if (error) {
        setError(error);
      } else {
        setAssets(data);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeAsset = useCallback((id: string) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  }, []);

  useEffect(() => {
    refreshAssets();
  }, [refreshAssets]);

  return {
    assets,
    loading,
    error,
    refreshAssets,
    removeAsset,
  };
};
