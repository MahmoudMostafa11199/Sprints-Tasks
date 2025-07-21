import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { AssetType } from './types';

import Asset from './Asset';
import Spinner from '../Spinner';
import Error from '../Error';

type Props = {
  assets: AssetType[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
  deletingId?: string | null;
};

function Assets({ assets, loading, error, onDelete, deletingId }: Props) {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('type') || 'all';

  // Filter by assets type
  const filteredAssets = useMemo(() => {
    return filterValue === 'all'
      ? assets
      : assets.filter((asset) => asset.type === filterValue);
  }, [assets, filterValue]);

  return (
    <table className="w-full mb-8 border border-gray-300">
      <thead className="text-gray-500 bg-gray-100 shadow-sm text-xs font-medium tracking-wide">
        <tr className="grid grid-cols-8 justify-between py-4 px-8">
          <th className="text-start uppercase">Asset</th>
          <th className="text-start uppercase">Type</th>
          <th className="text-start uppercase">Quantity</th>
          <th className="text-start uppercase">Buy Price</th>
          <th className="text-start uppercase">Current Price</th>
          <th className="text-start uppercase">Total Value</th>
          <th className="text-start uppercase">Return</th>
          <th className="text-start uppercase">Actions</th>
        </tr>
      </thead>

      <tbody className="bg-white">
        {loading && (
          <tr>
            <td>
              <Spinner />
            </td>
          </tr>
        )}

        {error && (
          <tr>
            <td>
              <Error message={error} />
            </td>
          </tr>
        )}

        {!loading &&
          !error &&
          filteredAssets &&
          filteredAssets.map((asset) => (
            <Asset
              key={asset.id}
              asset={asset}
              onDelete={onDelete}
              isDeleting={deletingId == asset.id}
            />
          ))}
      </tbody>
    </table>
  );
}

export default Assets;
