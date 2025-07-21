import { useSearchParams } from 'react-router';
import type { AssetType } from '../Assets/types';
import { format, subDays, eachDayOfInterval, isSameDay } from 'date-fns';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type Props = {
  assets: AssetType[];
};

function PortfolioValueChart({ assets }: Props) {
  const [searchParams] = useSearchParams();
  const days = Number(searchParams.get('last')) || 7;

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), days),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    const dailyAssets = assets.filter((asset) =>
      isSameDay(new Date(asset.updatedAt), date)
    );

    return {
      label: format(date, 'MMM dd'),
      totalValue: dailyAssets.reduce(
        (sum, asset) => sum + +asset.currentPrice * +asset.quantity,
        0
      ),
      totalInvested: dailyAssets.reduce(
        (sum, asset) => sum + +asset.buyPrice * +asset.quantity,
        0
      ),
    };
  });

  return (
    <div className="p-6 rounded-xl border border-gray-200 bg-white space-y-8 col-span-full">
      <h2 className="text-xl font-semibold">
        Portfolio Performance from {format(allDates[0], 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1)!, 'MMM dd yyyy')}
      </h2>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={80} unit="$" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalValue"
            stroke="#4f46e5"
            fill="#c7d2fe"
            name="Current Value"
          />
          <Area
            type="monotone"
            dataKey="totalInvested"
            stroke="#16a34a"
            fill="#bbf7d0"
            name="Invested Amount"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PortfolioValueChart;
