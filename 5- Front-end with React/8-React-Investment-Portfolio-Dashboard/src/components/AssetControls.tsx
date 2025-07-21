import { Link } from 'react-router';
import Filter from './Filter';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
};

function AssetControls({ query, onQueryChange }: Props) {
  return (
    <div className="bg-white py-8 px-10 rounded shadow-lg mb-8 border border-gray-200">
      <div>
        <div className="flex gap-6 mb-4">
          <div className="relative">
            <input
              type="search"
              id="search-assets"
              name="search-assets"
              placeholder="Search by name..."
              className="input ps-10"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
            <img
              src="/imgs/search.png"
              alt="magnifier"
              className="w-4.5 h-4.5 absolute top-1/2 left-2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          <div className="relative">
            <Filter
              filterField="type"
              options={[
                { value: 'all', label: 'All' },
                { value: 'stock', label: 'Stock' },
                { value: 'crypto', label: 'Crypto' },
                { value: 'bond', label: 'Bonds' },
              ]}
            />

            <img
              src="/imgs/filter.png"
              alt="filter icon"
              className="w-4.5 h-4.5 absolute top-1/2 left-2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
        <Link
          to="/add-asset"
          className="w-fit flex items-center justify-center gap-2 bg-blue-600 py-3 px-5 rounded-md text-white transition-all duration-200 hover:bg-blue-800"
          title="Add asset"
        >
          <img src="/imgs/plus.png" alt="plus sign" className="w-4.5 h-4.5" />
          <span>Add Asset</span>
        </Link>
      </div>
    </div>
  );
}

export default AssetControls;
