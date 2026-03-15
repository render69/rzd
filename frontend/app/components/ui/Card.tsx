import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  variant = 'default',
  onClick
}) => {
  const baseStyles = `
    bg-white rounded-xl transition-all duration-300
  `;
  
  const variantStyles = {
    default: 'shadow-md border border-gray-200',
    elevated: 'shadow-lg border border-gray-100',
    outlined: 'shadow-sm border-2 border-gray-200'
  };
  
  const hoverStyles = hover ? 'hover:shadow-xl hover:scale-[1.01]' : '';
  
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const combinedStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${hoverStyles}
    ${paddingStyles[padding]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={combinedStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;