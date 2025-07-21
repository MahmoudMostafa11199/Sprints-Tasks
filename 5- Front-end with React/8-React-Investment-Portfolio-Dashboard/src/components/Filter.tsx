import { useSearchParams } from 'react-router';

type OptionsType = {
  label: string;
  value: string;
};

type Props = {
  filterField: string;
  options: OptionsType[];
};

function Filter({ filterField, options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get(filterField) || options[0].value;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('type', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      name={`filter-${filterField}`}
      id={`filter-${filterField}`}
      value={type}
      onChange={handleChange}
      className="input ps-10 pe-16 appearance-none shadow-sm"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Filter;
