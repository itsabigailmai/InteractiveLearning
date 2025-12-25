import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Exclude props that conflict between HTML and Framer Motion
type ConflictingProps = 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'transition';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, ConflictingProps> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  playful?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', playful = true, className = '', disabled, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
    
    const variants = {
      primary: 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white',
      secondary: 'bg-[#FBBF24] hover:bg-[#F59E0B] text-gray-900',
      accent: 'bg-[#3B82F6] hover:bg-[#2563EB] text-white',
      success: 'bg-[#10B981] hover:bg-[#059669] text-white',
      danger: 'bg-[#EF4444] hover:bg-[#DC2626] text-white',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl',
    };
    
    const classNames = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    
    if (playful) {
      return (
        <motion.button
          ref={ref}
          className={classNames}
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          transition={{ duration: 0.15 }}
          {...props}
        >
          {children}
        </motion.button>
      );
    }
    
    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

