import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <label className="block">
      <span className="label-base">{label}</span>
      <input id={id} className={`input-base ${className}`.trim()} {...props} />
    </label>
  );
}

