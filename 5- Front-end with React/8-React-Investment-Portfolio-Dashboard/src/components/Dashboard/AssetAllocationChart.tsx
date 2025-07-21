import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { AssetType } from '../Assets/types';

type Props = {
  assets: AssetType[];
};

const COLORS = [
  '#6366F1',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#3B82F6',
  '#A855F7',
  '#14B8A6',
];

function AssetAllocationChart({ assets }: Props) {
  const chartData = assets.map((asset) => ({
    name: asset.symbol.toUpperCase(),
    value: +asset.currentPrice * +asset.quantity,
  }));

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent ?? 0 * 100).toFixed(0)}%)`
            }
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              value.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AssetAllocationChart;
