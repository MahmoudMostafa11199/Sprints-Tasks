import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import type { AssetType, AssetTypeEnum } from './Assets/types';

import FormRow from './FormRow';
import { updateAsset, createAsset } from '../services/apiAssets';

interface IFormInput {
  id: string;
  name: string;
  symbol: string;
  type: AssetTypeEnum;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  updatedAt?: string;
}

type FormProps = {
  editAsset?: AssetType | null;
};

function Form({ editAsset = null }: FormProps) {
  const navigate = useNavigate();
  const id = editAsset?.id;
  const isEditSession = Boolean(id);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (editAsset) {
      reset(editAsset);
    }
  }, [editAsset, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const assetData: AssetType = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      if (isEditSession && editAsset) {
        const { error } = await updateAsset(id!, assetData);

        if (error) {
          setErrorMessage(error);
          toast.error(`${error}`);
        } else {
          toast.success(`Successfully update asset #${id}!`);
          navigate('/');
        }

        //
      } else {
        const newAsset = {
          ...assetData,
          id: Date.now().toString(),
        };

        const { error } = await createAsset(newAsset);
        if (error) {
          setErrorMessage(error);
          toast.error(`${error}`);
        } else {
          toast.success(`Successfully created new asset!`);
          navigate('/');
        }
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[800px] mx-auto">
      <FormRow label="Name" error={errors?.name?.message}>
        <input
          type="text"
          id="name"
          className="input"
          {...register('name', {
            required: 'This field is requried',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters',
            },
          })}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
      </FormRow>

      <FormRow label="Symbol" error={errors?.symbol?.message}>
        <input
          type="text"
          id="symbol"
          className="input uppercase"
          {...register('symbol', {
            required: 'Symbol is required',
            minLength: {
              value: 2,
              message: 'Symbol must be at least 2 characters',
            },
            maxLength: {
              value: 5,
              message: 'Symbol must be at most 5 characters',
            },
          })}
          aria-invalid={errors.symbol ? 'true' : 'false'}
        />
      </FormRow>

      <FormRow label="Type" error={errors.type?.message}>
        <select
          id="type"
          className="input appearance-none"
          {...register('type', {
            required: 'Type is required',
          })}
          aria-invalid={errors.type ? 'true' : 'false'}
        >
          <option value="">Select a type</option>
          <option value="stock">Stock</option>
          <option value="crypto">Crypto</option>
          <option value="bond">Bonds</option>
        </select>
      </FormRow>

      <FormRow label="Quantity" error={errors?.quantity?.message}>
        <input
          type="number"
          min="0"
          id="quantity"
          className="input"
          {...register('quantity', {
            required: 'Quantity is required',
            min: {
              value: 1,
              message: 'Quantity must be at least 1',
            },
          })}
          aria-invalid={errors.quantity ? 'true' : 'false'}
        />
      </FormRow>

      <FormRow label="Buy price" error={errors?.buyPrice?.message}>
        <input
          type="number"
          min="0"
          step="0.01"
          id="buy-price"
          className="input"
          {...register('buyPrice', {
            required: 'Buy price is required',
            min: {
              value: 0.01,
              message: 'Price must be greater than 0',
            },
          })}
          aria-invalid={errors.buyPrice ? 'true' : 'false'}
        />
      </FormRow>

      <FormRow label="Current price" error={errors?.currentPrice?.message}>
        <input
          type="number"
          min="0"
          step="0.01"
          id="current-price"
          className="input"
          {...register('currentPrice', {
            required: 'Current price is required',
            min: {
              value: 0,
              message: 'Current price must be 0 or more',
            },
          })}
          aria-invalid={errors.currentPrice ? 'true' : 'false'}
        />
      </FormRow>

      <div className="input-box flex justify-end gap-3 border-0 pb-0 pt-8">
        <button
          type="button"
          className="py-3 px-5 rounded-md border transition-all duration-200 hover:bg-gray-200"
          disabled={isSubmitting}
          onClick={() => navigate('/')}
          title="back to home"
        >
          Back to home
        </button>

        <button
          type="submit"
          className={`bg-blue-600 py-3 px-5 rounded-md text-white transition-all duration-200 ${
            isSubmitting || !isDirty ? '' : 'hover:bg-blue-800'
          }`}
          disabled={isSubmitting || !isDirty}
          title="submit"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              Processing...
            </span>
          ) : isEditSession ? (
            'Update asset'
          ) : (
            'Create new asset'
          )}
        </button>
      </div>
    </form>
  );
}

export default Form;
