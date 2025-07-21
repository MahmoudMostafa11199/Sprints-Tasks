import type { ReactElement } from 'react';

type Props = {
  label: string;
  error?: string;
  children: ReactElement<{ id: string }>;
};

function FormRow({ label, error, children }: Props) {
  const inputId: string = children.props.id;

  return (
    <div className="input-box">
      {label && (
        <label htmlFor={inputId} className="text-base font-medium">
          {label}
        </label>
      )}

      {children}

      {error && (
        <span role="alert" className="text-sm text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormRow;
