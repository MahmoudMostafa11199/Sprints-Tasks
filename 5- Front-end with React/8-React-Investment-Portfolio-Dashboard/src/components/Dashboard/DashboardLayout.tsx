import type { AssetType } from '../Assets/types';

import PortfolioValueChart from './PortfolioValueChart';
import ProfitLossChart from './ProfitLossChart';
import AssetAllocationChart from './AssetAllocationChart';

type Props = {
  assets: AssetType[];
};

function DashboardLayout({ assets }: Props) {
  return (
    <div className="charts-page p-4">
      <h1 className="text-2xl font-bold mb-6">Portfolio Charts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfitLossChart assets={assets} />
        <AssetAllocationChart assets={assets} />
        <PortfolioValueChart assets={assets} />
      </div>
    </div>
  );
}

export default DashboardLayout;
