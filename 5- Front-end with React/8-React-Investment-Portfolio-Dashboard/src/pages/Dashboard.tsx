import { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import DashboardLayout from '../components/Dashboard/DashboardLayout';
import SummaryCard from '../components/SummaryCard';
import NavigationTap from '../components/NavigationTap';
import AssetControls from '../components/AssetControls';
import Assets from '../components/Assets/Assets';

import { deleteAsset } from '../services/apiAssets';
import { getProfitLossConfig } from '../services/helpers';
import { useAssetData } from '../hooks/useAssetsData';
import { usePortfolioSummary } from '../hooks/usePortfolioSummary';

function Dashboard() {
  const [view, setView] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { assets, loading, error, removeAsset } = useAssetData();
  const { totalInvested, totalCurrentValue, totalReturn, returnPercentage } =
    usePortfolioSummary(assets);

  const status = totalReturn > 0 ? 'profit' : totalReturn < 0 ? 'loss' : '';
  const { imagePath } = useMemo(() => getProfitLossConfig(status), [status]);

  const handleDeleteAsset = async (id: string) => {
    setDeletingId(id);
    try {
      const { error } = await deleteAsset(id);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Asset delete successfully');
        removeAsset(id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleNavClick = (view: string) => {
    setView(view);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredAssets = useMemo(() => {
    if (searchQuery.trim().length < 3) return assets;

    return assets.filter((ass) =>
      ass.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [assets, searchQuery]);

  return (
    <section>
      <div className="container">
        <h1 className="text-3xl font-bold pt-4 mb-2">
          Investment Portfolio Dashboard
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Track and manage your investment portfolio
        </p>

        {view === 'overview' && (
          <div className="space-y-5">
            {/* <div className="grid grid-cols-2 items-center gap-4"> */}
            <SummaryCard
              title="Total Invested"
              value={totalInvested}
              icon="/imgs/dollar.png"
            />
            <SummaryCard
              title="Current Value"
              value={totalCurrentValue}
              icon="/imgs/bar-graph.png"
            />
            <SummaryCard
              title="Total Return"
              value={totalReturn}
              icon={imagePath}
              status={status}
            />
            <SummaryCard
              title="Return %"
              value={String(returnPercentage)}
              status={status}
            />
          </div>
        )}

        {view === 'chart' && <DashboardLayout assets={assets} />}

        <NavigationTap activeTab={view} onTabChange={handleNavClick} />

        <AssetControls query={searchQuery} onQueryChange={handleSearch} />

        <Assets
          assets={filteredAssets}
          loading={loading}
          error={error}
          onDelete={handleDeleteAsset}
          deletingId={deletingId}
        />
      </div>
    </section>
  );
}

export default Dashboard;
