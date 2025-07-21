import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { AssetType } from '../Assets/types';

type Props = {
  assets: AssetType[];
};

function ProfitLossChart({ assets }: Props) {
  const chartData = assets.map((asset) => {
    const buy = +asset.buyPrice;
    const current = +asset.currentPrice;
    const quantity = +asset.quantity;

    return {
      name: asset.symbol.toUpperCase(),
      return: (current - buy) * quantity,
    };
  });

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Profit / Loss</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) =>
              value.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })
            }
          />
          <Bar dataKey="return">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.return >= 0 ? '#16a34a' : '#dc2626'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProfitLossChart;
