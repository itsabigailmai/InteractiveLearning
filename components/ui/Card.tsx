import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const CardComponent = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -4 },
    whileTap: { y: 0 },
    transition: { duration: 0.2 }
  } : {};
  
  return (
    <CardComponent
      className={`
        bg-white rounded-2xl shadow-lg p-6
        ${hover ? 'cursor-pointer hover:shadow-2xl' : ''}
        transition-shadow duration-200
        ${className}
      `}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </CardComponent>
  );
}

