import type { ComponentType, InputHTMLAttributes } from "react";

type InputProps = {
  icon?: ComponentType<{ className?: string }>;
  placeholder?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ icon: Icon, placeholder, className = "", ...props }: InputProps) => (
  <div className={`relative ${className}`}>
    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />}
    <input
      placeholder={placeholder}
      {...props}
      className={`w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500`}
    />
  </div>
);

export default Input;