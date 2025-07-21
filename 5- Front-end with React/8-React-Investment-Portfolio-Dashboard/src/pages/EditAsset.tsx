import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import type { AssetType } from '../components/Assets/types';

import Form from '../components/Form';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import { getAsset } from '../services/apiAssets';

function EditAsset() {
  const { id } = useParams();
  const [asset, setAsset] = useState<AssetType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async (id: string) => {
      setError(null);
      setLoading(true);

      try {
        const { data, error } = await getAsset(id);

        if (error) setError(error);
        else setAsset({ ...data, type: data.type.toLowerCase() });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetch(id);
  }, [id]);

  return (
    <section>
      <div className="container pt-10">
        <h2 className="text-4xl font-semibold mb-10 text-center">Edit Asset</h2>

        {loading && <Spinner />}

        {error && (
          <div className="flex flex-col items-center gap-3">
            <Error message={error} />
            <Link
              to="/"
              className="py-3 px-5 rounded-md border transition-all duration-200 hover:bg-gray-200"
            >
              Back to home
            </Link>
          </div>
        )}

        {!loading && !error && asset && <Form editAsset={asset} />}
      </div>
    </section>
  );
}

export default EditAsset;
