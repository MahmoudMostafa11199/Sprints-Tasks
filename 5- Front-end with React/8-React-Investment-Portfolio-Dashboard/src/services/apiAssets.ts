import axios, { AxiosError } from 'axios';
import type { AssetType } from '../components/Assets/types';

const API_URL: string = 'http://localhost:2210/assets';

type OperationType = 'get' | 'create' | 'update' | 'delete';

const handleError = (
  error: AxiosError,
  operation: OperationType,
  resource: string = 'asset'
) => {
  const operationMessages = {
    get: `Error fetching ${resource}`,
    create: `Error creating ${resource}`,
    update: `Error updating ${resource}`,
    delete: `Error deleting ${resource}`,
  };

  let errorMessage = operationMessages[operation];

  if (error.response) {
    if (error.response.status === 404) {
      errorMessage = `Cannot ${operation} - ${resource} not found`;
    } else if (error.response.status >= 500) {
      errorMessage = 'Server error, please try again later';
    }
  } else if (error.request) {
    errorMessage = 'No response from server. Please check your connection';
  }

  return errorMessage;
};

//
export async function getAssets() {
  try {
    const res = await axios.get(API_URL);

    if (res.data.length == 0) return { data: null, error: 'No assets found' };

    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = handleError(error, 'get', 'assets');
    return { data: null, error: errorMessage };
  }
}

//
export async function getAsset(id: string) {
  try {
    const res = await axios.get(`${API_URL}/${id}`);

    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = handleError(error, 'get');
    return { data: null, error: errorMessage };
  }
}

//
export async function updateAsset(id: string, data: AssetType) {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);

    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = handleError(error, 'update');
    return { data: null, error: errorMessage };
  }
}

//
export async function createAsset(data: AssetType) {
  try {
    const res = await axios.post(API_URL, data);

    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = handleError(error, 'create');
    return { data: null, error: errorMessage };
  }
}

//
export async function deleteAsset(id: string) {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);

    return { data: res.data, error: null };
  } catch (err) {
    const error = err as AxiosError;
    const errorMessage = handleError(error, 'delete');
    return { data: null, error: errorMessage };
  }
}
