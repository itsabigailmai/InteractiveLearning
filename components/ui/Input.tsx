import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl border-2 
            ${error ? 'border-red-400' : 'border-gray-200'}
            focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20
            text-gray-900 placeholder-gray-400
            transition-all duration-200
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

