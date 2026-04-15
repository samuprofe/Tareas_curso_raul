import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-400 focus:ring-brand-400/40',
  secondary: 'bg-white/10 text-stone-100 hover:bg-white/15 focus:ring-white/20',
  ghost: 'bg-transparent text-stone-200 hover:bg-white/10 focus:ring-white/20',
  danger: 'bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-500/30',
};

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

