type ProfitLossConfig = {
  colorClass: string;
  icon: string;
  imagePath: string;
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

//
export const getProfitLossConfig = (
  status: 'profit' | 'loss' | ''
): ProfitLossConfig => {
  switch (status.toLowerCase()) {
    case 'profit':
      return {
        colorClass: 'text-green-600',
        icon: '+',
        imagePath: 'imgs/increase.png',
      };

    case 'loss':
      return {
        colorClass: 'text-red-600',
        icon: '-',
        imagePath: 'imgs/decrease.png',
      };

    default:
      return {
        colorClass: 'text-gray-600',
        icon: '',
        imagePath: '',
      };
  }
};
