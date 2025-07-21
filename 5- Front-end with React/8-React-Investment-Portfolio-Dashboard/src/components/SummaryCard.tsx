import { useMemo } from 'react';
import { formatNumber, getProfitLossConfig } from '../services/helpers';

interface Props {
  title: string;
  value: number | string;
  icon?: string;
  status?: 'profit' | 'loss' | '';
}

function SummaryCard({ title, value, icon, status = '' }: Props) {
  const { colorClass, icon: statusIcon } = useMemo(
    () => getProfitLossConfig(status),
    [status]
  );

  const displayValue = useMemo(() => {
    if (value.constructor.name === 'String' && status) {
      return `${statusIcon}${formatNumber(Math.abs(+value))}%`;
    } else {
      return formatNumber(+value);
    }
  }, [value, status, statusIcon]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h4 className="text-xs font-medium mb-1">{title}</h4>
        <p className={`text-2xl font-bold ${colorClass}`}>{displayValue}</p>
      </div>
      {icon && <img src={icon} className="icon" alt={title} />}
    </div>
  );
}

export default SummaryCard;
