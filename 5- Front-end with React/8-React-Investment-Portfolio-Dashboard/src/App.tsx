import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import './App.css';

import SpinnerFullPage from './components/SpinnerFullPage';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const AddAsset = lazy(() => import('./pages/AddAsset'));
const EditAsset = lazy(() => import('./pages/EditAsset'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-asset" element={<AddAsset />} />
            <Route path="edit-asset/:id" element={<EditAsset />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '18px',
            maxWidth: '500px',
            padding: '16px 24px',
          },
        }}
      />
    </>
  );
}

export default App;
