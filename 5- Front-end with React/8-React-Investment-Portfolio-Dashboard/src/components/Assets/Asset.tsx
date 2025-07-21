import { Link } from 'react-router';
import type { AssetType } from './types';
import { formatNumber, getProfitLossConfig } from '../../services/helpers';

type Props = {
  asset: AssetType;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
};

function Asset({ asset, onDelete, isDeleting }: Props) {
  const { id, name, symbol, type, quantity, buyPrice, currentPrice } = asset;

  const totalValue = quantity * currentPrice;
  const investedAmount = quantity * buyPrice;
  const returnAmount = totalValue - investedAmount;
  const returnPercentage = (returnAmount / investedAmount) * 100;
  const status = returnAmount > 0 ? 'profit' : returnAmount < 0 ? 'loss' : '';

  const { colorClass, icon: statusIcon } = getProfitLossConfig(status);

  const colorAssetType = {
    stock: 'text-blue-800 bg-blue-100',
    crypto: 'text-orange-800 bg-orange-100',
    bond: 'text-yellow-800 bg-yellow-100',
  };

  // Confirm deletion
  const confirmDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      window.confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      onDelete(id);
    }
  };

  return (
    <tr className="grid grid-cols-8 gap-2 py-4 px-8 shadow-sm">
      <td className="font-semibold">
        {name}
        <span className="block text-sm font-medium text-gray-400">
          {symbol}
        </span>
      </td>
      <td>
        <span
          className={`py-1 px-2 text-xs font-semibold rounded-4xl capitalize ${colorAssetType[type]}`}
        >
          {type}
        </span>
      </td>
      <td>{quantity}</td>
      <td>${formatNumber(buyPrice)}</td>
      <td>${formatNumber(currentPrice)}</td>
      <td>${formatNumber(totalValue)}</td>

      <td className={`font-medium ${colorClass}`}>
        ${formatNumber(Math.abs(returnAmount))}
        <span className={`block text-sm font-normal`}>
          {statusIcon}
          {Math.abs(returnPercentage).toFixed(2)}%
        </span>
      </td>

      <td className="flex items-center gap-3">
        <Link
          to={`/edit-asset/${id}`}
          title="Edit asset"
          className={isDeleting ? 'pointer-events-none' : ''}
        >
          <img
            src="/imgs/edit.png"
            className="w-4 h-4 pointer-events-none"
            alt="pin-edit"
          />
        </Link>
        <button
          type="button"
          onClick={confirmDelete}
          disabled={isDeleting}
          title="Delete asset"
        >
          <img
            src="/imgs/trash.png"
            className="w-4 h-4 pointer-events-none"
            alt="trash-delete"
          />
        </button>
      </td>
    </tr>
  );
}

export default Asset;
